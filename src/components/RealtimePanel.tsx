'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setLatest } from '@/store/latencySlice';
import { useGcpLatency } from '@/hooks/useGcpLatency';

export default function RealtimePanel() {
  const { latencies, labels } = useGcpLatency(8000);
  const dispatch = useAppDispatch();
  const latest = useAppSelector(s => s.latency.latest);

  useEffect(() => {
    if (Object.keys(latencies).length) dispatch(setLatest(latencies));
  }, [latencies, dispatch]);

  const entries = Object.entries(latest).sort((a,b)=>a[1]-b[1]);

  return (
    <div className="border rounded-xl p-4">
      <h2 className="font-medium mb-2">Real-time latency (GCP regions)</h2>
      <div className="text-sm grid grid-cols-2 gap-2 xl:grid-cols-3">
        {entries.map(([id, ms]) => (
          <div key={id} className="flex justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
            <span>{labels[id] ?? id}</span>
            <span>{ms.toFixed(0)} ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}
