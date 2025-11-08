import { useEffect, useRef, useState } from 'react';
import type { GcpEndpointMap } from '@/types/topology';

function pingImage(url: string, timeoutMs = 4000): Promise<number> {
  return new Promise((resolve) => {
    const t0 = performance.now();
    const img = new Image();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      resolve(performance.now() - t0);
    };

    const timer = setTimeout(() => {
      finish(); // timeout counts as slow
      cleanup();
    }, timeoutMs);

    function cleanup() {
      clearTimeout(timer);
      // @ts-ignore
      img.onload = img.onerror = null;
    }

    img.onload = () => { cleanup(); finish(); };
    img.onerror = () => { cleanup(); finish(); };

    // cache-bust
    img.src = `${url}${url.includes('?') ? '&' : '?'}_=${Math.random().toString(36).slice(2)}`;
  });
}

export function useGcpLatency(pollsEveryMs = 8000) {
  const [latencies, setLatencies] = useState<Record<string, number>>({});
  const [labels, setLabels] = useState<Record<string, string>>({}); // id -> RegionName
  const timer = useRef<NodeJS.Timeout | null>(null);

  async function measure() {
    try {
      const r = await fetch('/api/gcping', { cache: 'no-store' });
      const map: GcpEndpointMap = await r.json();

      // Flatten to array; skip "global"
      const entries = Object.entries(map)
        .filter(([id]) => id !== 'global')
        .map(([id, e]) => ({ id, name: e.RegionName, url: e.URL }));

      // Save labels once
      if (Object.keys(labels).length === 0) {
        const next: Record<string, string> = {};
        entries.forEach(e => { next[e.id] = e.name; });
        setLabels(next);
      }

      // Concurrency control for image pings
      const BATCH = 8;
      const results: Record<string, number> = {};
      for (let i = 0; i < entries.length; i += BATCH) {
        const slice = entries.slice(i, i + BATCH);
        const times = await Promise.all(slice.map(e => pingImage(e.url)));
        slice.forEach((e, idx) => { results[e.id] = times[idx]; });
      }
      setLatencies(results);
    } catch (e) {
      console.warn('measure(/api/gcping) failed', e);
    }
  }

  useEffect(() => {
    measure();
    timer.current = setInterval(measure, pollsEveryMs);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [pollsEveryMs]);

  return { latencies, labels };
}
