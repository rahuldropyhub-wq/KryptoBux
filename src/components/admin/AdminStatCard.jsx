import React from 'react';
import { cn } from '@/utils/helpers';
import { formatCompact } from '@/utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorThemes = [
  {
    bg: 'bg-blue-50/80',
    iconBg: 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20',
    border: 'border-blue-100',
    accentText: 'text-blue-600',
    ring: 'hover:border-blue-300'
  },
  {
    bg: 'bg-emerald-50/80',
    iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20',
    border: 'border-emerald-100',
    accentText: 'text-emerald-600',
    ring: 'hover:border-emerald-300'
  },
  {
    bg: 'bg-purple-50/80',
    iconBg: 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20',
    border: 'border-purple-100',
    accentText: 'text-purple-600',
    ring: 'hover:border-purple-300'
  },
  {
    bg: 'bg-amber-50/80',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20',
    border: 'border-amber-100',
    accentText: 'text-amber-600',
    ring: 'hover:border-amber-300'
  },
];

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
  const theme = colorThemes[accentIndex % colorThemes.length];
  const isPositive = trend === 'up';

  return (
    <div className={cn(
      'bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group',
      theme.ring,
      className
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            {typeof value === 'number' ? formatCompact(value) : value}
          </h3>
        </div>
        {Icon && (
          <div className={cn('w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105', theme.iconBg)}>
            <Icon size={20} strokeWidth={2.2} />
          </div>
        )}
      </div>

      {(sub || trendValue) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
          {trendValue && (
            <div className={cn(
              'flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px]',
              isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            )}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{trendValue}</span>
            </div>
          )}
          {sub && <span className="text-slate-500 font-medium text-[11px] truncate">{sub}</span>}
        </div>
      )}
    </div>
  );
};

export default AdminStatCard;
