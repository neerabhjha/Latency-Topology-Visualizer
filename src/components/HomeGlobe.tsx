'use client';
import Globe, { Connection } from '@/components/Globe';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { GCP_REGION_COORDS } from '@/data/gcpRegionCoords';
import { EXCHANGES } from '@/data/exchanges';
import { CLOUD_REGIONS } from '@/data/cloudRegions';
import { setMetrics } from '@/store/uiSlice';
import { useAppDispatch } from '@/store/store';

export default function HomeGlobe() {
  const dispatch = useAppDispatch();
  const latest = useAppSelector(s => s.latency.latest);
  const ui = useAppSelector(s => s.ui);
  const search = ui.search.trim().toLowerCase();

  // Filter providers for markers
  const regionsFiltered = useMemo(() => {
    return CLOUD_REGIONS.filter(r => ui.providers[r.provider] &&
      (search ? r.name.toLowerCase().includes(search) || r.id.toLowerCase().includes(search) : true)
    );
  }, [ui.providers, search]);

  const exchangesFiltered = useMemo(() => {
    const base = ui.selectedExchanges.length
      ? EXCHANGES.filter(e => ui.selectedExchanges.includes(e.id))
      : EXCHANGES;
    return base.filter(e => (search ? e.name.toLowerCase().includes(search) || e.id.toLowerCase().includes(search) : true));
  }, [ui.selectedExchanges, search]);

  // Client → region arcs
  const client = { lat: 19.0760, lng: 72.8777 }; // replace with geolocation if you want
  const clientConns: Connection[] = useMemo(() => {
    if (!ui.layers.clientArcs) return [];
    const list: Connection[] = [];
    for (const [id, ms] of Object.entries(latest)) {
      if (ms < ui.latencyMin || ms > ui.latencyMax) continue;
      const dest = GCP_REGION_COORDS[id];
      if (!dest) continue;
      list.push({ from: client, to: { lat: dest.lat, lng: dest.lng }, ms, meta: { label: `Client → ${id}: ${ms.toFixed(0)} ms` } });
    }
    return list.sort((a,b)=>a.ms-b.ms).slice(0, 20);
  }, [latest, ui.layers.clientArcs, ui.latencyMin, ui.latencyMax]);

  // Exchange → region arcs (estimated): only into visible providers
  const exConns: Connection[] = useMemo(() => {
    if (!ui.layers.exchangeArcs) return [];
    const allowedRegionIds = new Set(regionsFiltered.map(r => r.id));
    const conns: Connection[] = [];
    exchangesFiltered.forEach(ex => {
      regionsFiltered.forEach(r => {
        // lightweight estimate by geographic proximity (you already have helper if desired)
        const approx = 100; // or use your estimateRttMs(distanceKm(...))
        if (approx < ui.latencyMin || approx > ui.latencyMax) return;
        conns.push({
          from: { lat: ex.lat, lng: ex.lng },
          to: { lat: r.lat, lng: r.lng },
          ms: approx,
          meta: { label: `${ex.name} → ${r.name}` }
        });
      });
    });
    return conns.slice(0, 200); // cap
  }, [exchangesFiltered, regionsFiltered, ui.layers.exchangeArcs, ui.latencyMin, ui.latencyMax]);

  // report arc count to metrics
  useEffect(() => {
    dispatch(setMetrics({ arcCount: clientConns.length + exConns.length }));
  }, [clientConns.length, exConns.length, dispatch]);

  return (
    <Globe
      connections={clientConns}
      exConnections={exConns}
      // Optionally pass filtered markers if your Globe component supports it
      // e.g., markersRegions={regionsFiltered} markersExchanges={exchangesFiltered}
    />
  );
}
