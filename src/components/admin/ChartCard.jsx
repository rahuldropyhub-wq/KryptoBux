import Card from '@/components/common/Card';

// Simple SVG line chart placeholder — will be replaced with a real chart library later
const SimpleLineChart = ({ data = [], height = 200 }) => {
  if (!data || data.length === 0) return (
    <div className="flex items-center justify-center" style={{ height }}>
      <p className="text-sm text-[var(--text-muted)]">No chart data</p>
    </div>
  );

  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const w = 100 / (data.length - 1);

  const points = data.map((d, i) => {
    const x = i * w;
    const y = 100 - ((d.value - min) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#234398" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#234398" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#234398"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
        {data.map((d, i) => {
          const x = i * w;
          const y = 100 - ((d.value - min) / range) * 80 - 10;
          return (
            <circle key={i} cx={x} cy={y} r="1.5" fill="#234398" vectorEffect="non-scaling-stroke" />
          );
        })}
      </svg>
    </div>
  );
};

const ChartCard = ({ title, subtitle, data = [], height = 200, labels = [], action }) => {
  return (
    <Card title={title} subtitle={subtitle} action={action} className="overflow-hidden">
      {/* Simple label row */}
      {labels.length > 0 && (
        <div className="flex items-center gap-4 mb-4">
          {labels.map((label) => (
            <div key={label.key} className="flex items-center gap-1.5">
              <div className="w-3 h-1 rounded-full" style={{ background: label.color || '#234398' }} />
              <span className="text-xs text-[var(--text-muted)]">{label.label}</span>
            </div>
          ))}
        </div>
      )}
      <SimpleLineChart data={data} height={height} />
    </Card>
  );
};

export default ChartCard;
