import { cn } from '@/utils/helpers';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title = 'No data found',
  description = '',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {Icon && (
        <div className="w-16 h-16 bg-[var(--lavender)] rounded-2xl flex items-center justify-center mb-4">
          <Icon size={28} className="text-[var(--primary)]" />
        </div>
      )}
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">{description}</p>
      )}
      {actionText && onAction && (
        <Button onClick={onAction} size="sm">{actionText}</Button>
      )}
    </div>
  );
};

export default EmptyState;
