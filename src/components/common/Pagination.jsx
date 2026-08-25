import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  canNext,
  canPrev,
  className = '',
  showInfo = true,
  totalItems = 0,
  pageSize = 10,
}) => {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-3 pt-4', className)}>
      {showInfo && totalItems > 0 && (
        <p className="text-xs text-[var(--text-secondary)]">
          Showing <span className="font-medium text-[var(--text-primary)]">{start}–{end}</span> of <span className="font-medium text-[var(--text-primary)]">{totalItems}</span> results
        </p>
      )}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPrev}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--background)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
        >
          <ChevronLeft size={15} />
        </button>

        {getPageNumbers().map((page, i) => (
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-[var(--text-muted)]">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all',
                currentPage === page
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--background)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
              )}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNext}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--background)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
