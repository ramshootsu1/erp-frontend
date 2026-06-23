import { useEffect, useState } from 'react';
import { StatusBadge } from '../../../components/ui';
import type {
  CreateCustomerInput,
  UpdateCustomerInput,
} from '../types/customer.types';

type CustomerFormValues = {
  name: string;
  code: string;
  email: string;
  phone: string;
  notes: string;
};

type CustomerFormProps = {
  mode: 'add' | 'edit';
  initialValues?: Partial<CustomerFormValues>;
  isSubmitting?: boolean;
  error?: string | null;
  onCancel: () => void;
  onSubmit: (values: CreateCustomerInput | UpdateCustomerInput) => void;
};

const emptyValues: CustomerFormValues = {
  name: '',
  code: '',
  email: '',
  phone: '',
  notes: '',
};

export function CustomerForm({
  mode,
  initialValues,
  isSubmitting,
  error,
  onCancel,
  onSubmit,
}: CustomerFormProps) {
  const [values, setValues] = useState<CustomerFormValues>({
    ...emptyValues,
    ...initialValues,
  });

  useEffect(() => {
    setValues({
      ...emptyValues,
      ...initialValues,
    });
  }, [initialValues]);

  const setField = <K extends keyof CustomerFormValues>(
    field: K,
    value: CustomerFormValues[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({
          name: values.name.trim(),
          code: values.code.trim() || undefined,
          email: values.email.trim() || undefined,
          phone: values.phone.trim() || undefined,
          notes: values.notes.trim() || undefined,
        });
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {mode === 'add' ? 'Add customer' : 'Edit customer'}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Update the customer identity details used across the ERP.
          </p>
        </div>
        <StatusBadge variant="info">{mode === 'add' ? 'New' : 'Editing'}</StatusBadge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            required
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Code</label>
          <input
            value={values.code}
            onChange={(e) => setField('code', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Phone</label>
          <input
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea
            value={values.notes}
            onChange={(e) => setField('notes', e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : mode === 'add' ? 'Add customer' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
