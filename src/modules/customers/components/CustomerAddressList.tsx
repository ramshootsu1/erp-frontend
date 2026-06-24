import { TrashIcon } from '@heroicons/react/24/outline';
import type { CustomerAddress } from '../types/customer.types';
import { EmptyState, StatusBadge } from '../../../components/ui';

type CustomerAddressListProps = {
  addresses: CustomerAddress[];
  onAdd: () => void;
  onDelete: (address: CustomerAddress) => void;
};

function formatAddress(address: CustomerAddress) {
  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(', ');
}

function getAddressTypeLabel(address: CustomerAddress) {
  if (address.isBilling && address.isShipping) {
    return 'Billing + Shipping';
  }

  if (address.isBilling) {
    return 'Billing';
  }

  if (address.isShipping) {
    return 'Shipping';
  }

  return 'General';
}

export function CustomerAddressList({
  addresses,
  onAdd,
  onDelete,
}: CustomerAddressListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
            Addresses
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Manage delivery and billing addresses for this customer.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <EmptyState
          title="No addresses"
          description="This customer does not have any saved addresses yet."
          action={
            <button
              type="button"
              onClick={onAdd}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Add Address
            </button>
          }
        />
      ) : (
        <div className="grid gap-3">
          {addresses.map((address) => (
            <article
              key={address.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-slate-900">
                    {address.label || 'Address'}
                  </div>
                  <div className="mt-1">
                    <StatusBadge variant="neutral">{getAddressTypeLabel(address)}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{formatAddress(address)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {address.isDefault ? <StatusBadge variant="info">Default</StatusBadge> : null}
                  <button
                    type="button"
                    onClick={() => onDelete(address)}
                    className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
