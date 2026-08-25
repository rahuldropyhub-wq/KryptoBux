import { cn, getAccentVariant } from '@/utils/helpers';
import { formatCompact } from '@/utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

const AdminStatCard = ({
  label,
  value,
  sub,
  trend,
  trendValue,
  accentIndex = 0,
  icon: Icon,
  className = '',
}) => {
  const accent = getAccentVariant(accentIndex);
  const isPositive = trend === 'up';

  return (
    <div className={cn('card p-6 stat-card', `stat-card-accent-${accent}`, className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="stat-card-label">{label}</p>
        {Icon && (
          <div className="w-8 h-8 bg-[var(--background)] rounded-lg flex items-center justify-center">
            <Icon size={16} className="text-[var(--text-secondary)]" />
          </div>
        )}
      </div>
      <p className="stat-card-value">
        {typeof value === 'number' ? formatCompact(value) : value}
      </p>
      {sub && <p className="stat-card-sub mt-1">{sub}</p>}
      {trendValue && (
        <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', isPositive ? 'text-[var(--success)]' : 'text-[var(--error)]')}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
};

export default AdminStatCard;
