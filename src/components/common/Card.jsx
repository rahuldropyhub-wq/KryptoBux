import React from 'react';
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
        'bg-white rounded-2xl border border-slate-200/80 shadow-xs transition-all duration-200',
        padding && 'p-5 sm:p-6',
        hover && 'hover:shadow-md hover:border-slate-300 transition-all cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            {title && (
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
