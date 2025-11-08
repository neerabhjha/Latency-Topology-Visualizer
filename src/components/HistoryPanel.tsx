'use client';
import { useMemo, useState } from 'react';
import { useAppSelector } from '@/store/store';
import LatencyChart from './LatencyChart';

export default function HistoryPanel(){
  const { latest, history } = useAppSelector(s => s.latency);
  const [selected, setSelected] = useState<string | null>(null);

  const regions = useMemo(
    () => Object.keys(latest).sort((a,b)=> (latest[a]??Infinity) - (latest[b]??Infinity)),
    [latest]
  );

  const currentRegion = selected ?? regions[0] ?? null;
  const data = currentRegion ? (history[currentRegion] ?? []) : [];

  return (
    <section className="space-y-3 border rounded-xl p-4">
      <div className="flex items-center gap-3">
        <h3 className="font-medium">Historical trend</h3>
        <select
          className="border rounded-md px-2 py-1 text-sm"
          value={currentRegion ?? ''}
          onChange={(e)=> setSelected(e.target.value)}
        >
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <LatencyChart data={data} />
      {currentRegion && data.length > 0 && (
        <div className="text-sm opacity-80">
          <span>Latest: {latest[currentRegion]?.toFixed(0)} ms • </span>
          <span>Samples: {data.length}</span>
        </div>
      )}
    </section>
  );
}
