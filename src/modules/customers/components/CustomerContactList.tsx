import { TrashIcon } from '@heroicons/react/24/outline';
import type { CustomerContact } from '../types/customer.types';
import { EmptyState, StatusBadge } from '../../../components/ui';

type CustomerContactListProps = {
  contacts: CustomerContact[];
  onAdd: () => void;
  onDelete: (contact: CustomerContact) => void;
};

export function CustomerContactList({
  contacts,
  onAdd,
  onDelete,
}: CustomerContactListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
            Contacts
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Manage the people connected to this customer account.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Add Contact
        </button>
      </div>

      {contacts.length === 0 ? (
        <EmptyState
          title="No contacts"
          description="This customer does not have any saved contacts yet."
          action={
            <button
              type="button"
              onClick={onAdd}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Add Contact
            </button>
          }
        />
      ) : (
        <div className="grid gap-3">
          {contacts.map((contact) => (
            <article
              key={contact.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-slate-900">{contact.name}</div>
                  <p className="mt-1 text-sm text-slate-600">
                    {contact.designation || 'Contact'}
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    {contact.email ? <div>{contact.email}</div> : null}
                    {contact.phone ? <div>{contact.phone}</div> : null}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {contact.isPrimary ? <StatusBadge variant="success">Primary</StatusBadge> : null}
                  <button
                    type="button"
                    onClick={() => onDelete(contact)}
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
