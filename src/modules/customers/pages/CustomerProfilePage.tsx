import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  EmptyState,
  LoadingState,
  PageContainer,
  PageHeader,
} from '../../../components/ui';
import { queryKeys } from '../../../lib/query/queryKeys';
import { updateCustomer } from '../api/customer.api';
import { AddressForm, mapAddressFormValuesToInput } from '../components/AddressForm';
import { ContactForm, mapContactFormValuesToInput, splitContactName } from '../components/ContactForm';
import { CustomerAddressList } from '../components/CustomerAddressList';
import { CustomerContactList } from '../components/CustomerContactList';
import { CustomerForm } from '../components/CustomerForm';
import { CustomerSummaryCard } from '../components/CustomerSummaryCard';
import { useCreateCustomerAddress } from '../hooks/useCreateCustomerAddress';
import { useCreateCustomerContact } from '../hooks/useCreateCustomerContact';
import { useCustomer } from '../hooks/useCustomer';
import { useCustomerAddresses } from '../hooks/useCustomerAddresses';
import { useCustomerContacts } from '../hooks/useCustomerContacts';
import { useDeleteCustomerAddress } from '../hooks/useDeleteCustomerAddress';
import { useDeleteCustomerContact } from '../hooks/useDeleteCustomerContact';
import type {
  CustomerAddress,
  CustomerContact,
  CreateCustomerInput,
  UpdateCustomerInput,
} from '../types/customer.types';
import type { AddressFormValues } from '../components/AddressForm';
import type { ContactFormValues } from '../components/ContactForm';

type TabKey = 'overview' | 'addresses' | 'contacts';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'contacts', label: 'Contacts' },
];

type AddressDialogState =
  | { mode: 'create'; address: null }
  | { mode: 'edit'; address: CustomerAddress };

type ContactDialogState =
  | { mode: 'create'; contact: null }
  | { mode: 'edit'; contact: CustomerContact };

type CustomerDialogState = { mode: 'edit' } | null;

function mapAddressToFormValues(address: CustomerAddress): Partial<AddressFormValues> {
  const addressType = address.isBilling && address.isShipping
    ? 'both'
    : address.isBilling
      ? 'billing'
      : address.isShipping
        ? 'shipping'
        : 'other';

  return {
    addressType,
    addressLine1: address.line1,
    addressLine2: address.line2 ?? '',
    city: address.city,
    state: address.state ?? '',
    postalCode: address.postalCode,
    country: address.country,
    isDefault: address.isDefault,
  };
}

function mapContactToFormValues(contact: CustomerContact): Partial<ContactFormValues> {
  return {
    ...splitContactName(contact.name),
    email: contact.email ?? '',
    phone: contact.phone ?? '',
    designation: contact.designation ?? '',
    isPrimary: contact.isPrimary,
  };
}

export function CustomerProfilePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    const initial = searchParams.get('tab');
    return initial === 'addresses' || initial === 'contacts' ? initial : 'overview';
  });
  const [addressDialog, setAddressDialog] = useState<AddressDialogState | null>(null);
  const [contactDialog, setContactDialog] = useState<ContactDialogState | null>(null);
  const [customerDialog, setCustomerDialog] = useState<CustomerDialogState>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const customerQuery = useCustomer(id);
  const addressesQuery = useCustomerAddresses(id);
  const contactsQuery = useCustomerContacts(id);

  const createAddressMutation = useCreateCustomerAddress(id);
  const deleteAddressMutation = useDeleteCustomerAddress(id);
  const createContactMutation = useCreateCustomerContact(id);
  const deleteContactMutation = useDeleteCustomerContact(id);

  const saveCustomerMutation = useMutation({
    mutationFn: async (values: CreateCustomerInput | UpdateCustomerInput) => {
      if (!id) {
        throw new Error('Customer id is missing');
      }

      return updateCustomer(id, values);
    },
    onSuccess: async () => {
      if (!id) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.customers.detail(id) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.customers.list() }),
      ]);

      setCustomerDialog(null);
      setFlashMessage('Customer saved successfully.');
    },
  });

  useEffect(() => {
    if (!flashMessage) return undefined;

    const timer = window.setTimeout(() => {
      setFlashMessage(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [flashMessage]);

  const closeAddressDialog = () => {
    createAddressMutation.reset();
    setAddressDialog(null);
  };

  const closeContactDialog = () => {
    createContactMutation.reset();
    setContactDialog(null);
  };

  const closeCustomerDialog = () => {
    saveCustomerMutation.reset();
    setCustomerDialog(null);
  };

  const activeContent = useMemo(() => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-4">
          {customerQuery.data ? <CustomerSummaryCard customer={customerQuery.data} /> : null}
        </div>
      );
    }

    if (activeTab === 'addresses') {
      if (addressesQuery.isLoading) {
        return <LoadingState message="Loading addresses..." />;
      }

      if (addressesQuery.error) {
        return (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load addresses:{' '}
            {addressesQuery.error instanceof Error ? addressesQuery.error.message : 'Unknown error'}
          </div>
        );
      }

      return (
        <CustomerAddressList
          addresses={addressesQuery.data ?? []}
          onAdd={() => setAddressDialog({ mode: 'create', address: null })}
              onDelete={(address) => {
                if (
                  window.confirm(
                    `Delete address "${address.label || address.line1}"?`,
                  )
                ) {
                  deleteAddressMutation.mutate(address.id, {
                    onSuccess: () => setFlashMessage('Address deleted successfully.'),
                    onError: (error) => {
                      setFlashMessage(
                        error instanceof Error ? error.message : 'Failed to delete address.',
                      );
                    },
                  });
                }
              }}
        />
      );
    }

    if (contactsQuery.isLoading) {
      return <LoadingState message="Loading contacts..." />;
    }

    if (contactsQuery.error) {
      return (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load contacts:{' '}
          {contactsQuery.error instanceof Error ? contactsQuery.error.message : 'Unknown error'}
        </div>
      );
    }

    return (
      <CustomerContactList
        contacts={contactsQuery.data ?? []}
        onAdd={() => setContactDialog({ mode: 'create', contact: null })}
        onDelete={(contact) => {
          if (window.confirm(`Delete contact "${contact.name}"?`)) {
            deleteContactMutation.mutate(contact.id, {
              onSuccess: () => setFlashMessage('Contact deleted successfully.'),
              onError: (error) => {
                setFlashMessage(
                  error instanceof Error ? error.message : 'Failed to delete contact.',
                );
              },
            });
          }
        }}
      />
    );
  }, [
    activeTab,
    addressesQuery.data,
    addressesQuery.error,
    addressesQuery.isLoading,
    contactsQuery.data,
    contactsQuery.error,
    contactsQuery.isLoading,
    customerQuery.data,
    deleteAddressMutation,
    deleteContactMutation,
  ]);

  if (!id) {
    return (
      <PageContainer>
        <EmptyState
          title="Customer not found"
          description="The customer profile URL is missing an id."
          action={
            <Link to="/customers" className="text-sm font-medium text-indigo-600 hover:underline">
              Back to customers
            </Link>
          }
        />
      </PageContainer>
    );
  }

  if (customerQuery.isLoading) {
    return (
      <PageContainer>
        <LoadingState message="Loading customer profile..." />
      </PageContainer>
    );
  }

  if (customerQuery.error || !customerQuery.data) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <Link to="/customers" className="text-sm text-indigo-600 hover:underline">
            Back to customers
          </Link>
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {customerQuery.error instanceof Error
              ? customerQuery.error.message
              : 'Customer not found'}
          </div>
        </div>
      </PageContainer>
    );
  }

  const initialAddressValues =
    addressDialog?.mode === 'edit' ? mapAddressToFormValues(addressDialog.address) : undefined;

  const initialContactValues =
    contactDialog?.mode === 'edit' ? mapContactToFormValues(contactDialog.contact) : undefined;

  return (
    <PageContainer>
      <PageHeader
        title={customerQuery.data.name}
        description={`Customer ID: ${customerQuery.data.id}`}
        actions={
          <button
            type="button"
            onClick={() => setCustomerDialog({ mode: 'edit' })}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Edit customer
          </button>
        }
      />

      {flashMessage ? (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {flashMessage}
        </div>
      ) : null}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200">
          <nav className="flex gap-2 px-4 pt-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
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

        <div className="p-5">{activeContent}</div>
      </div>

      {addressDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <AddressForm
              mode={addressDialog.mode}
              initialValues={initialAddressValues}
              isSubmitting={createAddressMutation.isPending}
              error={createAddressMutation.error instanceof Error ? createAddressMutation.error.message : null}
              onCancel={closeAddressDialog}
              onSubmit={(values) => {
                createAddressMutation.mutate(mapAddressFormValuesToInput(values), {
                  onSuccess: () => {
                    closeAddressDialog();
                    setFlashMessage('Address added successfully.');
                  },
                });
              }}
            />
          </div>
        </div>
      ) : null}

      {contactDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <ContactForm
              mode={contactDialog.mode}
              initialValues={initialContactValues}
              isSubmitting={createContactMutation.isPending}
              error={createContactMutation.error instanceof Error ? createContactMutation.error.message : null}
              onCancel={closeContactDialog}
              onSubmit={(values) => {
                createContactMutation.mutate(mapContactFormValuesToInput(values), {
                  onSuccess: () => {
                    closeContactDialog();
                    setFlashMessage('Contact added successfully.');
                  },
                });
              }}
            />
          </div>
        </div>
      ) : null}

      {customerDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <CustomerForm
              mode="edit"
              initialValues={{
                name: customerQuery.data.name,
                code: customerQuery.data.code ?? '',
                email: customerQuery.data.email ?? '',
                phone: customerQuery.data.phone ?? '',
                notes: customerQuery.data.notes ?? '',
              }}
              isSubmitting={saveCustomerMutation.isPending}
              error={saveCustomerMutation.error instanceof Error ? saveCustomerMutation.error.message : null}
              onCancel={closeCustomerDialog}
              onSubmit={(values) => {
                saveCustomerMutation.mutate(values);
              }}
            />
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
}
