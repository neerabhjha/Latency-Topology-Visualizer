'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useMemo } from 'react';
import type { GlobeMethods } from 'react-globe.gl';
import { CLOUD_REGIONS } from '@/data/cloudRegions';
import { EXCHANGES } from '@/data/exchanges';
import { CloudProvider } from '@/types/topology';

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

function colorForProvider(p: CloudProvider) {
    return p === 'AWS' ? '#f59e0b' : p === 'GCP' ? '#22c55e' : '#3b82f6';
}

export interface Connection {
    from: { lat: number; lng: number };
    to: { lat: number; lng: number };
    ms: number;
    meta: any
}

export default function Globe({
    connections = [] as Connection[],            // client→region arcs
    exConnections = [] as Connection[],          // exchange→region arcs
}: {
    connections?: Connection[];
    exConnections?: Connection[];
}) {
    const globeRef = useRef<GlobeMethods>(undefined);

    // Optional: enable autorotate once the globe is ready
    const handleGlobeReady = () => {
        const controls = globeRef.current?.controls();
        if (controls) {
            // controls.autoRotate = true;
            // controls.autoRotateSpeed = 0.6;
        }
    };

    const markers = useMemo(
        () => [
            ...CLOUD_REGIONS.map(r => ({
                lat: r.lat,
                lng: r.lng,
                size: 0.6,
                color: colorForProvider(r.provider),
                label: r.name,
            })),
            ...EXCHANGES.map(x => ({
                lat: x.lat,
                lng: x.lng,
                size: 0.9,
                color: '#ef4444',
                label: x.name,
            })),
        ],
        []
    );

    const allArcs = useMemo(
        () => [
            // tag so we can style differently if desired
            ...connections.map(a => ({ ...a, _kind: 'client' })),
            ...exConnections.map(a => ({ ...a, _kind: 'exchange' })),
        ],
        [connections, exConnections]
    );
    const safeArcs = useMemo(
        () =>
            allArcs.filter(
                (a: any) =>
                    Number.isFinite(a?.from?.lat) &&
                    Number.isFinite(a?.from?.lng) &&
                    Number.isFinite(a?.to?.lat) &&
                    Number.isFinite(a?.to?.lng)
            ),
        [allArcs]
    );

    return (
        <div className="max-w-[1120px] h-[90vh] rounded-2xl overflow-hidden border bg-white dark:bg-black/5 border-white/10">
            <GlobeGL
                ref={globeRef}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="#000011"
                atmosphereColor="#1e3a8a"
                atmosphereAltitude={0.15}
                pointsData={markers}
                pointAltitude={(d: any) => d.size * 0.02}
                pointColor={(d: any) => d.color}
                pointLabel={(d: any) => d.label}
                arcsData={safeArcs}
                arcStartLat={(d: any) => d.from.lat}
                arcStartLng={(d: any) => d.from.lng}
                arcEndLat={(d: any) => d.to.lat}
                arcEndLng={(d: any) => d.to.lng}
                arcColor={(a: any) => a.meta?.color ?? (a.ms < 80 ? 'green' : a.ms < 150 ? 'yellow' : 'red')}
                arcDashLength={0.6}
                arcDashGap={0.2}
                arcDashAnimateTime={2500}
                onGlobeReady={handleGlobeReady}
            />
        </div>
    );
}
