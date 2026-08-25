import { cn } from '@/utils/helpers';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  }[size] || 'w-8 h-8 border-2';

  return (
    <div
      className={cn(
        sizeClass,
        'border-[var(--lavender)] border-t-[var(--primary)] rounded-full animate-spin',
        className
      )}
    />
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-[var(--background)] flex items-center justify-center z-[1000]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-3 border-[var(--lavender)] border-t-[var(--primary)] rounded-full animate-spin" />
      <p className="text-sm font-medium text-[var(--text-secondary)]">Loading...</p>
    </div>
  </div>
);

export const SkeletonBox = ({ className = '' }) => (
  <div className={cn('skeleton rounded-card-sm', className)} />
);

export const SkeletonLine = ({ width = 'w-full', className = '' }) => (
  <div className={cn('skeleton h-4 rounded', width, className)} />
);

export const CardSkeleton = () => (
  <div className="card p-6 space-y-4">
    <SkeletonLine width="w-32" />
    <SkeletonLine width="w-20" className="h-8" />
    <SkeletonLine width="w-48" />
  </div>
);

const Loader = ({ fullPage = false, size = 'md', text = 'Loading...' }) => {
  if (fullPage) return <PageLoader />;

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spinner size={size} />
      {text && <p className="text-sm text-[var(--text-muted)]">{text}</p>}
    </div>
  );
};

export default Loader;
