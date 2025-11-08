'use client';
import Globe, { Connection } from '@/components/Globe';
import { useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { GCP_REGION_COORDS } from '@/data/gcpRegionCoords';
import { useExchangeConnections } from '@/components/ExchangeConnections';

export default function HomeGlobe() {
  const latest = useAppSelector(s => s.latency.latest);
  const client = { lat: 19.0760, lng: 72.8777 }; // or geolocated user

  // client → region arcs (top 12 by measured RTT)
  const clientConns: Connection[] = useMemo(() => {
    return Object.entries(latest)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 12)
      .map(([id, ms]) => {
        const dest = GCP_REGION_COORDS[id] ?? { lat: 37.7749, lng: -122.4194 };
        return {
          from: client,
          to: { lat: dest.lat, lng: dest.lng },
          ms,
          meta: { label: `Client → ${id}: ${ms.toFixed(0)} ms` },
        };
      });
  }, [latest]);

  // exchange → region arcs (estimated)
  const exConns = useExchangeConnections(6);

  return <Globe connections={clientConns} exConnections={exConns} />;
}
