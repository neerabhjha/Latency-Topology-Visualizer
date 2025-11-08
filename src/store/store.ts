'use client';
import { configureStore } from '@reduxjs/toolkit';
import latencyReducer from '@/store/latencySlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import uiReducer from '@/store/uiSlice';


export const store = configureStore({
    reducer: { latency: latencyReducer, ui: uiReducer  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;