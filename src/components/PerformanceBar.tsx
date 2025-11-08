'use client';
import { useAppSelector } from '@/store/store';

export default function PerformanceBar() {
  const { avgLatencyMs, arcCount, lastPollAt, fps } = useAppSelector(s => s.ui);
  return (
    <div className="mt-4 text-sm flex flex-wrap gap-4 rounded-xl border px-4 py-3
                    bg-white/70 dark:bg-black/30 border-black/10 dark:border-white/10 backdrop-blur">
      <span>FPS: <strong>{fps ?? '—'}</strong></span>
      <span>Avg latency: <strong>{avgLatencyMs ? avgLatencyMs.toFixed(0) : '—'} ms</strong></span>
      <span>Arcs: <strong>{arcCount ?? 0}</strong></span>
      <span>Last poll: <strong>{lastPollAt ? new Date(lastPollAt).toLocaleTimeString() : '—'}</strong></span>
    </div>
  );
}
