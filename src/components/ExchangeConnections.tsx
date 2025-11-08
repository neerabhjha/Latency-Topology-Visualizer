'use client';
import { useMemo } from 'react';
import { EXCHANGES } from '@/data/exchanges';
import { CLOUD_REGIONS } from '@/data/cloudRegions';
import { distanceKm, estimateRttMs } from '@/utils/latency';
import type { Connection } from '@/components/Globe';

function colorForLatency(ms: number) {
    if (ms < 40) return 'limegreen';
    if (ms < 80) return 'yellow';
    if (ms < 150) return 'orange';
    return 'red';
}

/** Build animated exchange→region connections (top K closest per exchange) */
export function useExchangeConnections(topK = 6) {
    return useMemo<Connection[]>(() => {
        const conns: Connection[] = [];
        for (const ex of EXCHANGES) {
            // rank cloud regions by geo distance
            const ranked = CLOUD_REGIONS
                .map(r => {
                    const km = distanceKm({ lat: ex.lat, lng: ex.lng }, { lat: r.lat, lng: r.lng });
                    const ms = estimateRttMs(km);
                    return { r, km, ms };
                })
                .sort((a, b) => a.km - b.km)
                .slice(0, topK);

            ranked.forEach(({ r, ms }) => {
                if (
                    Number.isFinite(ex.lat) && Number.isFinite(ex.lng) &&
                    Number.isFinite(r.lat) && Number.isFinite(r.lng)
                ) {
                    conns.push({
                        from: { lat: ex.lat, lng: ex.lng },
                        to: { lat: r.lat, lng: r.lng },
                        ms,
                        meta: { label: `${ex.name} → ${r.name}: ${ms.toFixed(0)} ms (est)` }
                    } as any);
                }
            });
        }
        return conns;
    }, [topK]);
}
