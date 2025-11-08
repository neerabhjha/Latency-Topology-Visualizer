'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface LatencyPoint { toId: string; ms: number; t: number }


interface LatencyState {
    latest: Record<string, number>;
    history: Record<string, LatencyPoint[]>;
}


const initialState: LatencyState = { latest: {}, history: {} };


const slice = createSlice({
    name: 'latency',
    initialState,
    reducers: {
        setLatest(state, action: PayloadAction<Record<string, number>>) {
            state.latest = action.payload;
            const now = Date.now();
            for (const [toId, ms] of Object.entries(action.payload)) {
                const arr = state.history[toId] ?? [];
                arr.push({ toId, ms, t: now });
                // cap history per region
                state.history[toId] = arr.slice(-500);
            }
        },
    }
});


export const { setLatest } = slice.actions;
export default slice.reducer;