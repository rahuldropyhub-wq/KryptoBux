import { cn, getStatusClass } from '@/utils/helpers';

const Badge = ({
  children,
  variant = 'neutral',
  dot = false,
  size = 'sm',
  className = '',
}) => {
  const variantClass = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    danger: 'badge-error',
    info: 'badge-info',
    neutral: 'badge-neutral',
    primary: 'badge-primary',
  }[variant] || 'badge-neutral';

  const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-400',
    primary: 'bg-[var(--primary)]',
  };

  return (
    <span className={cn('badge', variantClass, className)}>
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant] || 'bg-slate-400')} />
      )}
      {children}
    </span>
  );
};

export const StatusBadge = ({ status, className = '' }) => {
  const variantMap = {
    active: 'success', available: 'success', completed: 'info', approved: 'success',
    pending: 'warning', processing: 'warning',
    paused: 'neutral', inactive: 'neutral', cancelled: 'neutral',
    rejected: 'error', failed: 'error', banned: 'error',
  };
  const variant = variantMap[status?.toLowerCase()] || 'neutral';
  return (
    <Badge variant={variant} dot className={className}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : '-'}
    </Badge>
  );
};

export default Badge;
