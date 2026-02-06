import { useEffect, useState } from 'react';
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from '../api/customers/customers.api';
import type { Customer } from '../api/customers/customers.api';
import { TrashIcon } from '@heroicons/react/24/outline';


function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search / filter
  const [filter, setFilter] = useState('');

  // Add customer modal state
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const q = filter.toLowerCase();

    return (
      c.name.toLowerCase().includes(q) ||
      (c.email?.toLowerCase().includes(q) ?? false)
    );
  });

  async function handleAddCustomer() {
    if (!name.trim()) {
      setAddError('Customer name is required');
      return;
    }

    try {
      setSaving(true);
      setAddError(null);

      const newCustomer = await createCustomer({
        name,
        email: email || undefined,
        phone: phone || undefined,
      });

      setCustomers((prev) => [newCustomer, ...prev]);

      setName('');
      setEmail('');
      setPhone('');
      setShowAdd(false);
    } catch (err: any) {
      setAddError(err.message ?? 'Failed to create customer');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCustomer(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.message ?? 'Failed to delete customer');
    }
  }

  if (loading) {
    return <div className="text-slate-600">Loading customers…</div>;
  }

  if (error) {
    return (
      <div className="text-red-600">
        Failed to load customers: {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-xl font-semibold text-slate-800">
          Customers
        </h1>

        <button
          onClick={() => setShowAdd(true)}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:w-auto"
        >
          Add customer
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search customers…"
        className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
      />

      {/* Add Customer Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-medium max-w-md rounded-lg bg-white p-6 shadow-lg mx-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Add customer
            </h2>

            <div className="mt-4 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {addError && (
              <div className="mt-3 text-sm text-red-600">
                {addError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowAdd(false)}
                disabled={saving}
                className="rounded-md px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleAddCustomer}
                disabled={saving}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customers List */}
      {filteredCustomers.length === 0 ? (
        <div className="text-slate-600">
          No customers found.
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
          {filteredCustomers.map((c) => (
            <li
              key={c.id}
              className="space-y-2 p-4 sm:flex sm:items-center sm:justify-between sm:space-y-0"
            >
              <div>
                <div className="font-medium text-slate-800">
                  {c.name}
                </div>

                {c.email && (
                  <div className="text-sm text-slate-600">
                    {c.email}
                  </div>
                )}
              </div>

             <button
                 onClick={() => handleDeleteCustomer(c.id)}
                    className="flex items-center justify-center rounded-md p-2 text-red-600 hover:bg-red-50"
                    aria-label="Delete customer"
>
                <TrashIcon className="h-5 w-5" />
            </button>
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Customers;
