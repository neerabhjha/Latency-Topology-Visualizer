// components/ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const next = resolvedTheme === 'dark' ? 'light' : 'dark';
  return (
    <button onClick={() => setTheme(next)} className="px-3 py-1 border rounded-md text-sm">
      {resolvedTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
