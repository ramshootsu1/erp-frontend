import type { CustomerContact } from '../types/customer.types';
import { EmptyState, StatusBadge } from '../../../components/ui';

type CustomerContactListProps = {
  contacts: CustomerContact[];
};

export function CustomerContactList({ contacts }: CustomerContactListProps) {
  if (contacts.length === 0) {
    return (
      <EmptyState
        title="No contacts"
        description="This customer does not have any saved contacts yet."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {contacts.map((contact) => (
        <article key={contact.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
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
            {contact.isPrimary ? <StatusBadge variant="success">Primary</StatusBadge> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
