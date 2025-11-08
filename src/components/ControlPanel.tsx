'use client';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleProvider, setLatencyRange, setSearch, setSelectedExchanges, setLayer } from '@/store/uiSlice';
import { EXCHANGES } from '@/data/exchanges';

export default function ControlPanel() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(s => s.ui);

  const exchangeOptions = useMemo(() => EXCHANGES.map(e => ({ id: e.id, name: e.name })), []);

  return (
    <div className="border rounded-2xl p-4 bg-white/70 dark:bg-black/30 backdrop-blur border-black/10 dark:border-white/10 space-y-4">
      <h3 className="font-semibold">Controls</h3>

      {/* Providers */}
      <div className="space-y-2">
        <div className="text-sm opacity-80">Cloud Providers</div>
        <div className="flex gap-3 text-sm">
          {(['AWS','GCP','Azure'] as const).map(p => (
            <label key={p} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={ui.providers[p]}
                onChange={()=>dispatch(toggleProvider(p))}
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      {/* Latency range */}
      <div className="space-y-2">
        <div className="text-sm opacity-80">Latency (ms)</div>
        <div className="flex items-center gap-3">
          <input
            type="number" className="w-20 rounded border bg-transparent px-2 py-1"
            value={ui.latencyMin}
            onChange={e=>dispatch(setLatencyRange({min: +e.target.value, max: ui.latencyMax}))}
          />
          <span>to</span>
          <input
            type="number" className="w-20 rounded border bg-transparent px-2 py-1"
            value={ui.latencyMax}
            onChange={e=>dispatch(setLatencyRange({min: ui.latencyMin, max: +e.target.value}))}
          />
        </div>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <div className="text-sm opacity-80">Search exchanges/regions</div>
        <input
          className="w-full rounded border bg-transparent px-3 py-2"
          placeholder="type to filter…"
          value={ui.search}
          onChange={e=>dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* Exchange filter */}
      <div className="space-y-2">
        <div className="text-sm opacity-80">Limit to exchanges</div>
        <select
          multiple
          className="w-full rounded border bg-transparent px-3 py-2 h-28"
          value={ui.selectedExchanges}
          onChange={(e) => {
            const vals = Array.from(e.target.selectedOptions).map(o=>o.value);
            dispatch(setSelectedExchanges(vals));
          }}
        >
          {exchangeOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
        </select>
        <div className="text-xs opacity-70">Hold Cmd/Ctrl to multi-select</div>
      </div>

      {/* Layer toggles */}
      <div className="space-y-2">
        <div className="text-sm opacity-80">Layers</div>
        {(['clientArcs','exchangeArcs','regions'] as const).map(k => (
          <label key={k} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ui.layers[k]}
              onChange={(e)=>dispatch(setLayer({ key: k, value: e.target.checked }))}
            />
            {k}
          </label>
        ))}
      </div>
    </div>
  );
}
