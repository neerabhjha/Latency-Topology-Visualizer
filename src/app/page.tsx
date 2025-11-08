import HomeGlobe from '@/components/HomeGlobe';
import RealtimePanel from '@/components/RealtimePanel';
import HistoryPanel from '@/components/HistoryPanel';
import LegendPanel from '@/components/Legend';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="p-6 space-y-6 relative">
      <ThemeToggle />
      <div className="relative">
        <HomeGlobe />
        <div className="absolute top-4 left-4">
          <LegendPanel />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <RealtimePanel />
        <HistoryPanel />
      </div>
    </main>
  );
}
