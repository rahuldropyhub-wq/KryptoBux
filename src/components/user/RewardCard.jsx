import { Clock, Coins } from 'lucide-react';
import Button from '@/components/common/Button';
import { StatusBadge } from '@/components/common/Badge';

const RewardCard = ({
  title,
  reward,
  duration,
  type,
  status = 'available',
  onStart,
  loading = false,
}) => {
  return (
    <div className="card p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{title}</p>
          {type && <p className="text-xs text-[var(--text-muted)] mt-0.5">{type}</p>}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Coins size={13} className="text-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--primary)]">{reward}</span>
        </div>
        {duration && (
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-secondary)]">{duration}</span>
          </div>
        )}
      </div>

      <Button
        onClick={onStart}
        size="sm"
        fullWidth
        disabled={status === 'completed'}
        loading={loading}
        variant={status === 'completed' ? 'secondary' : 'primary'}
      >
        {status === 'completed' ? 'Completed' : 'View Ad'}
      </Button>
    </div>
  );
};

export default RewardCard;
