import type { Customer } from '../types/customer.types';
import { StatusBadge } from '../../../components/ui';

type CustomerSummaryCardProps = {
  customer: Customer;
};

function formatDate(value?: string | null) {
  if (!value) return '--';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

export function CustomerSummaryCard({ customer }: CustomerSummaryCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{customer.name}</h2>
          <p className="mt-1 text-sm text-slate-600">Customer ID: {customer.id}</p>
        </div>
        <StatusBadge variant="info">Customer</StatusBadge>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Email</div>
          <div className="mt-1 font-medium text-slate-900">{customer.email || '--'}</div>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Phone</div>
          <div className="mt-1 font-medium text-slate-900">{customer.phone || '--'}</div>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Code</div>
          <div className="mt-1 font-medium text-slate-900">{customer.code || '--'}</div>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Updated</div>
          <div className="mt-1 font-medium text-slate-900">
            {formatDate(customer.updatedAt)}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          Notes
        </h3>
        <p className="mt-2 whitespace-pre-line text-sm text-slate-700">
          {customer.notes || 'No notes available for this customer yet.'}
        </p>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Joined on {formatDate(customer.createdAt)}
      </div>
    </section>
  );
}
