'use client';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { EXCHANGES } from '@/data/exchanges';
import Toggle from './ui/Toggle';
import Badge from './ui/Badge';
import { setSearch, toggleProvider, setLayer, setLatencyRange, setSelectedExchanges } from '@/store/uiSlice';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(s => s.ui);
  const latest = useAppSelector(s => s.latency.latest);

  const exchanges = useMemo(() => {
    const arr = EXCHANGES.map(x => ({ ...x, ms: latest[x.id as keyof typeof latest] as number | undefined }));
    return arr;
  }, [latest]);

  return (
    <aside className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl text-sm p-4 w-[320px] space-y-5">
      {/* Search */}
      <div className="space-y-2">
        <div className="font-medium">Search Exchanges</div>
        <input
          className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none"
          placeholder="Search by name or location..."
          value={ui.search}
          onChange={e=>dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* Providers */}
      <div className="space-y-3">
        <div className="font-medium">Cloud Providers</div>
        {(['AWS','GCP','Azure'] as const).map(p => (
          <label key={p} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${p==='AWS'?'bg-amber-400':p==='GCP'?'bg-blue-500':'bg-blue-700'}`} />
              {p}
            </div>
            <Toggle checked={ui.providers[p]} onChange={()=>dispatch(toggleProvider(p))} />
          </label>
        ))}
      </div>

      {/* Layers */}
      <div className="space-y-3">
        <div className="font-medium">Visualization Layers</div>
        {([
          ['clientArcs','Real-time Connections'],
          ['regions','Cloud Regions'],
          ['historyPanel','Historical View'],
          ['exchangeArcs','Exchange Connections'],
        ] as const).map(([k,label]) => (
          <label key={k} className="flex items-center justify-between">
            <span>{label}</span>
            <Toggle checked={ui.layers[k]} onChange={(v)=>dispatch(setLayer({ key: k, value: v }))} />
          </label>
        ))}
      </div>

      {/* Latency slider */}
      <div className="space-y-2">
        <div className="font-medium">Latency Range: {ui.latencyMin}ms – {ui.latencyMax}ms</div>
        <input
          type="range" min={0} max={1000} step={10}
          value={ui.latencyMax}
          onChange={e=>dispatch(setLatencyRange({ min: ui.latencyMin, max: +e.target.value }))}
          className="w-full accent-emerald-400"
        />
        <div className="flex items-center gap-2">
          <input
            type="number" className="w-20 rounded border border-white/10 bg-white/5 px-2 py-1"
            value={ui.latencyMin}
            onChange={e=>dispatch(setLatencyRange({ min: +e.target.value, max: ui.latencyMax }))}
          />
          <span className="opacity-60">to</span>
          <input
            type="number" className="w-20 rounded border border-white/10 bg-white/5 px-2 py-1"
            value={ui.latencyMax}
            onChange={e=>dispatch(setLatencyRange({ min: ui.latencyMin, max: +e.target.value }))}
          />
        </div>
      </div>

      {/* Active exchanges */}
      <div className="space-y-3">
        <div className="font-medium">Active Exchanges</div>
        <ul className="space-y-2 max-h-52 overflow-auto pr-1">
          {exchanges.map(x => (
            <li key={x.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                {x.name}
              </div>
              <Badge>{x.ms ? `${x.ms.toFixed(0)}ms` : '—'}</Badge>
            </li>
          ))}
        </ul>
        <div className="text-xs opacity-60">Total Exchanges: {exchanges.length}</div>

        {/* multiselect to limit exchanges */}
        <select
          multiple
          className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 h-24"
          value={ui.selectedExchanges}
          onChange={(e)=>{
            const vals = Array.from(e.target.selectedOptions).map(o=>o.value);
            dispatch(setSelectedExchanges(vals));
          }}
        >
          {EXCHANGES.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      </div>
    </aside>
  );
}
