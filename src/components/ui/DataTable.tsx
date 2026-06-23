import type { ReactNode } from 'react';

export type DataTableColumn = {
  key: string;
  header: ReactNode;
  className?: string;
};

type DataTableProps = {
  columns: DataTableColumn[];
  children: ReactNode;
  className?: string;
  caption?: string;
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function DataTable({
  columns,
  children,
  className,
  caption,
}: DataTableProps) {
  return (
    <div className={joinClasses('overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm', className)}>
      <table className="min-w-full divide-y divide-slate-200">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={joinClasses(
                  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500',
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        {children}
      </table>
    </div>
  );
}
