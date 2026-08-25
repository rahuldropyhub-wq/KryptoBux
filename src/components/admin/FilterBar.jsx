import { Search, Filter, X } from 'lucide-react';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';

const FilterBar = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  filterValues = {},
  onFilterChange,
  onReset,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
      {/* Search */}
      {onSearchChange && (
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="input-field pl-9 text-sm"
          />
        </div>
      )}

      {/* Filters */}
      {filters.map((filter) => (
        <div key={filter.key} className="min-w-[160px]">
          <Select
            options={filter.options}
            value={filterValues[filter.key] || ''}
            onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
            placeholder={filter.placeholder}
            className="text-sm py-2"
          />
        </div>
      ))}

      {/* Reset */}
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} leftIcon={<X size={13} />}>
          Clear
        </Button>
      )}

      {/* Right Actions */}
      {actions && <div className="sm:ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default FilterBar;
