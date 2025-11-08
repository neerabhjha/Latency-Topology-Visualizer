'use client';

type ProviderColors = {
  aws: string;
  gcp: string;
  azure: string;
};
type LatencyColors = {
  low: string;    // < 100ms
  med: string;    // 100–200ms
  high: string;   // > 200ms
};

export default function LegendPanel({
  providerColors = { aws: '#f59e0b', gcp: '#2563eb', azure: '#1d4ed8' }, // orange + blues (like your mock)
  latencyColors = { low: '#22c55e', med: '#f59e0b', high: '#ef4444' },    // green / amber / red
}: {
  providerColors?: ProviderColors;
  latencyColors?: LatencyColors;
}) {
  const Dot = ({ color }: { color: string }) => (
    <span
      className="inline-block w-3.5 h-3.5 rounded-full ring-2 ring-black/10 dark:ring-white/10"
      style={{ background: color }}
      aria-hidden
    />
  );

  const Row = ({ color, label }: { color: string; label: string }) => (
    <div className="flex items-center gap-3">
      <Dot color={color} />
      <span>{label}</span>
    </div>
  );

  return (
    <aside
      className="pointer-events-auto select-none w-72 rounded-3xl border 
                 border-white/10 backdrop-blur-xl text-sm
                 text-white shadow-2xl p-5 space-y-4 bg-white/40 dark:bg-black/40"
      aria-label="Legend"
    >
      <h3 className="text-lg font-semibold">Legend</h3>

      <section className="space-y-3">
        <h4 className="font-medium opacity-90">Cloud Providers</h4>
        <div className="grid grid-cols-1 gap-2">
          <Row color={providerColors.aws} label="AWS" />
          <Row color={providerColors.gcp} label="GCP" />
          <Row color={providerColors.azure} label="Azure" />
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="font-medium opacity-90">Latency Status</h4>
        <div className="grid grid-cols-1 gap-2">
          <Row color={latencyColors.low} label="Low (< 100ms)" />
          <Row color={latencyColors.med} label="Medium (100–200ms)" />
          <Row color={latencyColors.high} label="High (> 200ms)" />
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="font-medium opacity-90">Markers</h4>
        <div className="grid grid-cols-1 gap-2">
          <Row color="#e5e7eb" label="Exchange Server" />
          <Row color="#9ca3af" label="Cloud Region" />
        </div>
      </section>
    </aside>
  );
}
