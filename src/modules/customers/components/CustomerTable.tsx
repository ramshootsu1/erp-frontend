import { TrashIcon } from '@heroicons/react/24/outline';
import { DataTable, EmptyState } from '../../../components/ui';
import type { Customer } from '../types/customer.types';

type CustomerTableProps = {
  customers: Customer[];
  onSelectCustomer: (id: string) => void;
  onDeleteCustomer?: (id: string) => void;
};

function formatDate(value?: string | null) {
  if (!value) return '--';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

export function CustomerTable({
  customers,
  onSelectCustomer,
  onDeleteCustomer,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <EmptyState
        title="No customers found"
        description="Create a customer to start building your ERP customer list."
      />
    );
  }

  return (
    <DataTable
      caption="Customers"
      columns={[
        { key: 'name', header: 'Customer' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone' },
        { key: 'code', header: 'Code' },
        { key: 'updatedAt', header: 'Updated' },
        { key: 'actions', header: 'Actions', className: 'text-right' },
      ]}
    >
      <tbody className="divide-y divide-slate-200 bg-white">
        {customers.map((customer) => (
          <tr
            key={customer.id}
            tabIndex={0}
            className="cursor-pointer transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => onSelectCustomer(customer.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelectCustomer(customer.id);
              }
            }}
          >
            <td className="px-4 py-3">
              <div className="font-medium text-slate-900">{customer.name}</div>
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">{customer.email || '--'}</td>
            <td className="px-4 py-3 text-sm text-slate-600">{customer.phone || '--'}</td>
            <td className="px-4 py-3 text-sm text-slate-600">{customer.code || '--'}</td>
            <td className="px-4 py-3 text-sm text-slate-600">
              {formatDate(customer.updatedAt)}
            </td>
            <td className="px-4 py-3 text-right">
              {onDeleteCustomer ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteCustomer(customer.id);
                  }}
                  className="inline-flex items-center rounded-md p-2 text-red-600 transition hover:bg-red-50"
                  aria-label={`Delete ${customer.name}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
