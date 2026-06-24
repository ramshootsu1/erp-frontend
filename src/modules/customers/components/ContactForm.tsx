import { useEffect, useState } from 'react';
import { StatusBadge } from '../../../components/ui';
import type { CreateCustomerContactInput } from '../types/customer.types';

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  isPrimary: boolean;
};

export type ContactFormMode = 'create' | 'edit';

type ContactFormProps = {
  mode: ContactFormMode;
  initialValues?: Partial<ContactFormValues>;
  isSubmitting?: boolean;
  error?: string | null;
  onSubmit: (values: ContactFormValues) => void;
  onCancel: () => void;
};

const emptyValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  designation: '',
  isPrimary: false,
};

function toContactFormValues(
  initialValues?: Partial<ContactFormValues>,
): ContactFormValues {
  return {
    ...emptyValues,
    ...initialValues,
  };
}

export function mapContactFormValuesToInput(
  values: ContactFormValues,
): CreateCustomerContactInput {
  const fullName = [values.firstName.trim(), values.lastName.trim()]
    .filter(Boolean)
    .join(' ')
    .trim();

  return {
    name: fullName,
    email: values.email.trim() || undefined,
    phone: values.phone.trim() || undefined,
    designation: values.designation.trim() || undefined,
    isPrimary: Boolean(values.isPrimary),
  };
}

export function splitContactName(name: string): Pick<ContactFormValues, 'firstName' | 'lastName'> {
  const trimmed = name.trim();

  if (!trimmed) {
    return { firstName: '', lastName: '' };
  }

  const [firstName, ...rest] = trimmed.split(/\s+/);

  return {
    firstName,
    lastName: rest.join(' '),
  };
}

export function ContactForm({
  mode,
  initialValues,
  isSubmitting,
  error,
  onSubmit,
  onCancel,
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(
    toContactFormValues(initialValues),
  );

  useEffect(() => {
    setValues(toContactFormValues(initialValues));
  }, [initialValues]);

  const setField = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K],
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
          ...values,
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          designation: values.designation.trim(),
        });
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {mode === 'create' ? 'Add contact' : 'Edit contact'}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Keep customer contacts structured for ERP follow-up workflows.
          </p>
        </div>
        <StatusBadge variant="info">
          {mode === 'create' ? 'New' : 'Editing'}
        </StatusBadge>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">First name</label>
          <input
            required
            value={values.firstName}
            onChange={(e) => setField('firstName', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Last name</label>
          <input
            value={values.lastName}
            onChange={(e) => setField('lastName', e.target.value)}
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
          <label className="block text-sm font-medium text-slate-700">Designation</label>
          <input
            value={values.designation}
            onChange={(e) => setField('designation', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Manager, Accountant, Owner..."
          />
        </div>
      </div>

      <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={Boolean(values.isPrimary)}
          onChange={(e) => setField('isPrimary', e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        Primary contact
      </label>

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
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Add contact' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
