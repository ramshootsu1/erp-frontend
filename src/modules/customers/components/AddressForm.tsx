import { useEffect, useState } from 'react';
import { StatusBadge } from '../../../components/ui';
import type { CustomerAddressInput } from '../types/customer.types';

type AddressFormValues = CustomerAddressInput;

type AddressFormProps = {
  mode: 'add' | 'edit';
  initialValues?: Partial<AddressFormValues>;
  isSubmitting?: boolean;
  error?: string | null;
  onSubmit: (values: AddressFormValues) => void;
  onCancel: () => void;
};

const emptyValues: AddressFormValues = {
  label: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  isBilling: false,
  isShipping: false,
  isDefault: false,
};

export function AddressForm({
  mode,
  initialValues,
  isSubmitting,
  error,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [values, setValues] = useState<AddressFormValues>({
    ...emptyValues,
    ...initialValues,
  });

  useEffect(() => {
    setValues({
      ...emptyValues,
      ...initialValues,
    });
  }, [initialValues]);

  const setField = <K extends keyof AddressFormValues>(
    field: K,
    value: AddressFormValues[K],
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
          label: values.label?.trim() || undefined,
          line1: values.line1.trim(),
          line2: values.line2?.trim() || undefined,
          city: values.city.trim(),
          state: values.state?.trim() || undefined,
          postalCode: values.postalCode.trim(),
          country: values.country.trim(),
          isBilling: Boolean(values.isBilling),
          isShipping: Boolean(values.isShipping),
          isDefault: Boolean(values.isDefault),
        });
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {mode === 'add' ? 'Add address' : 'Edit address'}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Keep the customer address record tidy and ready for ERP workflows.
          </p>
        </div>
        <StatusBadge variant="info">{mode === 'add' ? 'New' : 'Editing'}</StatusBadge>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Label</label>
          <input
            value={values.label ?? ''}
            onChange={(e) => setField('label', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Head Office"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Line 1</label>
          <input
            required
            value={values.line1}
            onChange={(e) => setField('line1', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Street address"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Line 2</label>
          <input
            value={values.line2 ?? ''}
            onChange={(e) => setField('line2', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Apartment, suite, floor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">City</label>
          <input
            required
            value={values.city}
            onChange={(e) => setField('city', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">State</label>
          <input
            value={values.state ?? ''}
            onChange={(e) => setField('state', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Postal code</label>
          <input
            required
            value={values.postalCode}
            onChange={(e) => setField('postalCode', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Country</label>
          <input
            required
            value={values.country}
            onChange={(e) => setField('country', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={Boolean(values.isBilling)}
            onChange={(e) => setField('isBilling', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Billing address
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={Boolean(values.isShipping)}
            onChange={(e) => setField('isShipping', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Shipping address
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={Boolean(values.isDefault)}
            onChange={(e) => setField('isDefault', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Default address
        </label>
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
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : mode === 'add' ? 'Add address' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
