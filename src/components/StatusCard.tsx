'use client';
import { useAppSelector } from '@/store/store';
import Badge from './ui/Badge';

export default function StatusCard() {
  const { avgLatencyMs, arcCount, lastPollAt } = useAppSelector(s => s.ui);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl w-[300px] p-4 text-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">System Status</div>
        <Badge>Live</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="opacity-70">Success Rate</div>
          <div className="text-emerald-400 font-semibold">91.7%</div>
        </div>
        <div className="space-y-1">
          <div className="opacity-70">Active Nodes</div>
          <div className="font-semibold">{arcCount ?? 0}</div>
        </div>
        <div className="space-y-1">
          <div className="opacity-70">Avg Latency</div>
          <div className="font-semibold">{avgLatencyMs ? `${avgLatencyMs.toFixed(0)}ms` : '—'}</div>
        </div>
        <div className="space-y-1">
          <div className="opacity-70">Last Update</div>
          <div className="font-semibold">
            {lastPollAt ? new Date(lastPollAt).toLocaleTimeString() : '—'}
          </div>
        </div>
      </div>

      <div className="mt-3 opacity-70">Next refresh in <Badge>~8s</Badge></div>
    </div>
  );
}
