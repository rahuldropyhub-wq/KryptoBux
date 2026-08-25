import { cn } from '@/utils/helpers';

const Card = ({
  children,
  className = '',
  padding = true,
  hover = false,
  onClick,
  title,
  subtitle,
  action,
  ...props
}) => {
  return (
    <div
      className={cn(
        'card',
        padding && 'p-6',
        hover && 'card-interactive',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>}
            {subtitle && <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
