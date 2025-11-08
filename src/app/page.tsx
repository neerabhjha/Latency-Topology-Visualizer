'use client';

import HomeGlobe from '@/components/HomeGlobe';
import RealtimePanel from '@/components/RealtimePanel';
import HistoryPanel from '@/components/HistoryPanel';
import LegendPanel from '@/components/Legend'; // ensure filename matches
import ThemeToggle from '@/components/ThemeToggle';
import { useFps } from '@/hooks/useFps';
import ControlPanel from '@/components/ControlPanel';
import PerformanceBar from '@/components/PerformanceBar';
import StatusCard from '@/components/StatusCard'; // make sure this file exists

export default function Home() {
  useFps();

  return (
    <main className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Latency Topology Visualizer</h1>
        {/* <ThemeToggle /> */}
      </header>

      {/* Main hero section: sidebar + globe + status */}
      <section
        className="rounded-3xl border border-black/10 dark:border-white/10
                   bg-white dark:bg-[#05050a] overflow-hidden"
      >
        <div className="flex gap-4 p-4">
          {/* Left: Controls */}
          <div className="hidden lg:block">
            <ControlPanel />
          </div>

          {/* Center: Globe with overlays */}
          <div className="relative min-h-[60vh]">
            <div
              className="absolute inset-0 -z-10"
              aria-hidden
            />
            <HomeGlobe />
            <div className="absolute left-4 bottom-4">
              <LegendPanel />
            </div>
            <div className="absolute left-4 top-4">
              <StatusCard />
            </div>
          </div>

          {/* Right: Status */}
          {/* <div className="">
            <StatusCard />
          </div> */}
        </div>
      </section>

      {/* Data panels */}
      <section className="grid lg:grid-cols-2 gap-6">
        <RealtimePanel />
        <HistoryPanel />
      </section>

      {/* Perf bar */}
      <PerformanceBar />
    </main>
  );
}
