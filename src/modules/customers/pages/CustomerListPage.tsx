import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PageContainer, LoadingState, SearchInput } from '../../../components/ui';
import { queryKeys } from '../../../lib/query/queryKeys';
import { CustomerHeader } from '../components/CustomerHeader';
import { CustomerTable } from '../components/CustomerTable';
import { createCustomer, deleteCustomer } from '../api/customer.api';
import { useCustomers } from '../hooks/useCustomers';

export function CustomerListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: customers = [], isLoading, error } = useCustomers();

  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    const q = debouncedFilter.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(q) ||
        (customer.email?.toLowerCase().includes(q) ?? false) ||
        (customer.phone?.toLowerCase().includes(q) ?? false) ||
        (customer.code?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [customers, debouncedFilter]);

  const handleAddCustomer = async () => {
    if (!name.trim()) {
      setAddError('Customer name is required');
      return;
    }

    try {
      setSaving(true);
      setAddError(null);

      await createCustomer({
        name,
        email: email || undefined,
        phone: phone || undefined,
      });

      await queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });

      setName('');
      setEmail('');
      setPhone('');
      setShowAdd(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create customer';
      setAddError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      await queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete customer';
      window.alert(message);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingState message="Loading customers..." />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load customers: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <CustomerHeader
        actions={
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <PlusIcon className="h-4 w-4" />
            Add customer
          </button>
        }
      />

      <div className="mt-4">
        <SearchInput
          value={filter}
          onChange={setFilter}
          onDebouncedChange={setDebouncedFilter}
          placeholder="Search customers..."
          ariaLabel="Search customers"
        />
      </div>

      <div className="mt-4">
        <CustomerTable
          customers={filteredCustomers}
          onSelectCustomer={(id) => navigate(`/customers/${id}`)}
          onDeleteCustomer={handleDeleteCustomer}
        />
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-800">Add customer</h2>

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

            {addError ? <div className="mt-3 text-sm text-red-600">{addError}</div> : null}

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
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
