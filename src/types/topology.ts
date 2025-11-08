export type CloudProvider = 'AWS' | 'GCP' | 'Azure';


export interface CloudRegion {
    id: string; // e.g., 'us-east-1' | 'europe-west4'
    name: string; // human label
    provider: CloudProvider;
    lat: number;
    lng: number;
}


export interface Exchange {
    id: string; // 'binance-ldn'
    name: string; // 'Binance (London)'
    provider: CloudProvider; // where their colo lives (assumption)
    lat: number;
    lng: number;
}


export interface LatencySample {
    fromId: string; // source region id (or 'client')
    toId: string; // destination region id
    ms: number; // latency in ms
    t: number; // epoch millis
}

export interface GcpEndpoint {
    Region: string;      // e.g. "asia-east1"
    RegionName: string;  // e.g. "Taiwan"
    URL: string;         // pingable URL
}
export type GcpEndpointMap = Record<string, GcpEndpoint>;
