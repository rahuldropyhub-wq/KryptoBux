import { cn, getAccentVariant } from '@/utils/helpers';
import { formatNumber } from '@/utils/formatters';

const StatCard = ({
  label,
  value,
  sub,
  accentIndex = 0,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const accent = getAccentVariant(accentIndex);

  return (
    <div className={cn('card p-6 stat-card', `stat-card-accent-${accent}`, className)}>
      <p className="stat-card-label">{label}</p>
      <p className="stat-card-value">
        {prefix}{typeof value === 'number' ? formatNumber(value) : value}{suffix}
      </p>
      {sub && <p className="stat-card-sub">{sub}</p>}
    </div>
  );
};

export default StatCard;
