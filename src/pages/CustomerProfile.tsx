import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  getCustomerById,
  type Customer,
} from '../api/customers/customers.api';

type TabKey = 'info' | 'invoices' | 'payments';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'info', label: 'Information' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'payments', label: 'Payments' },
];

function formatDate(value?: string) {
  if (!value) return '--';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString();
}

export default function CustomerProfile() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeTab = useMemo<TabKey>(() => {
    const tab = searchParams.get('tab');
    if (tab === 'invoices' || tab === 'payments') return tab;
    return 'info';
  }, [searchParams]);

  useEffect(() => {
    if (!id) {
      setError('Customer id is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getCustomerById(id)
      .then(setCustomer)
      .catch((err) =>
        setError(err?.message ?? 'Failed to load customer profile'),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const onTabChange = (tab: TabKey) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tab === 'info') {
        next.delete('tab');
      } else {
        next.set('tab', tab);
      }
      return next;
    });
  };

  if (loading) {
    return <div className="text-slate-600">Loading customer profile...</div>;
  }

  if (error || !customer) {
    return (
      <div className="space-y-4">
        <Link to="/customers" className="text-sm text-indigo-600 hover:underline">
          Back to customers
        </Link>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {error ?? 'Customer not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/customers" className="inline-block text-sm text-indigo-600 hover:underline">
        Back to customers
      </Link>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {customer.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Customer ID: {customer.id}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
            Joined on {formatDate(customer.createdAt)}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Email</div>
            <div className="mt-1 font-medium text-slate-900">
              {customer.email || '--'}
            </div>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Phone</div>
            <div className="mt-1 font-medium text-slate-900">
              {customer.phone || '--'}
            </div>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Code</div>
            <div className="mt-1 font-medium text-slate-900">
              {customer.code || '--'}
            </div>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Updated</div>
            <div className="mt-1 font-medium text-slate-900">
              {formatDate(customer.updatedAt)}
            </div>
          </div>
        </div>

        <div className="mt-6 border-b border-slate-200">
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onTabChange(tab.key)}
                  className={`rounded-t-md border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border-slate-200 border-b-white bg-white text-slate-900'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-5">
          {activeTab === 'info' && (
            <div className="rounded-md border border-slate-200 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Customer Notes
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-700">
                {customer.notes || 'No notes available for this customer yet.'}
              </p>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="rounded-md border border-slate-200 p-4 text-sm text-slate-700">
              Invoice list will appear here once invoice APIs are connected to customer profile.
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="rounded-md border border-slate-200 p-4 text-sm text-slate-700">
              Payment history will appear here once payment APIs are connected to customer profile.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
