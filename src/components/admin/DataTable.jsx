import { StatusBadge } from '@/components/common/Badge';
import EmptyState from '@/components/common/EmptyState';
import Loader from '@/components/common/Loader';
import { Database } from 'lucide-react';

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = 'No data found',
  emptyDescription = 'There are no records to display.',
  actions,
}) => {
  if (loading) return <Loader text="Loading data..." />;

  if (!data.length) {
    return <EmptyState icon={Database} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
            {actions && <th className="text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : (
                    col.type === 'status' ? (
                      <StatusBadge status={row[col.key]} />
                    ) : (
                      <span className={col.className}>{row[col.key] ?? '-'}</span>
                    )
                  )}
                </td>
              ))}
              {actions && (
                <td>
                  <div className="flex items-center justify-end gap-2">
                    {actions(row)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
