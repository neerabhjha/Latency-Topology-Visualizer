

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setMetrics } from '@/store/uiSlice';

export function useFps() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let frames = 0, last = performance.now(), raf = 0;
    const loop = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 1000) {
        dispatch(setMetrics({ fps: frames }));
        frames = 0; last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dispatch]);
}
