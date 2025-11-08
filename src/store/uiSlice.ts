'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Provider = 'AWS' | 'GCP' | 'Azure';

interface Layers {
    clientArcs: boolean;
    exchangeArcs: boolean;
    regions: boolean;
    realtimePanel: boolean;
    historyPanel: boolean;
}

interface UiState {
    providers: Record<Provider, boolean>;
    latencyMin: number;         // ms
    latencyMax: number;         // ms
    search: string;             // free text
    selectedExchanges: string[]; // ids from EXCHANGES
    layers: Layers;

    // perf/telemetry
    avgLatencyMs?: number;
    arcCount?: number;
    lastPollAt?: number;        // epoch ms
    fps?: number;
}

const initialState: UiState = {
    providers: { AWS: true, GCP: true, Azure: true },
    latencyMin: 0,
    latencyMax: 300,
    search: '',
    selectedExchanges: [],
    layers: { clientArcs: true, exchangeArcs: true, regions: true, realtimePanel: true, historyPanel: true },
    avgLatencyMs: undefined,
    arcCount: undefined,
    lastPollAt: undefined,
    fps: undefined,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleProvider(s, a: PayloadAction<Provider>) { s.providers[a.payload] = !s.providers[a.payload]; },
        setLatencyRange(s, a: PayloadAction<{ min: number; max: number }>) { s.latencyMin = a.payload.min; s.latencyMax = a.payload.max; },
        setSearch(s, a: PayloadAction<string>) { s.search = a.payload; },
        setSelectedExchanges(s, a: PayloadAction<string[]>) { s.selectedExchanges = a.payload; },
        setLayer(s, a: PayloadAction<{ key: keyof Layers; value: boolean }>) { s.layers[a.payload.key] = a.payload.value; },
        setMetrics(s, a: PayloadAction<{ avgLatencyMs?: number; arcCount?: number; lastPollAt?: number; fps?: number }>) {
            Object.assign(s, a.payload);
        }
    }
});

export const { toggleProvider, setLatencyRange, setSearch, setSelectedExchanges, setLayer, setMetrics } = uiSlice.actions;
export default uiSlice.reducer;
