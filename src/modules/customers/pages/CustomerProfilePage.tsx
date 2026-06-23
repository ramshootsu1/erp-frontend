import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  EmptyState,
  LoadingState,
  PageContainer,
  PageHeader,
} from '../../../components/ui';
import { queryKeys } from '../../../lib/query/queryKeys';
import { AddressForm } from '../components/AddressForm';
import { CustomerAddressList } from '../components/CustomerAddressList';
import { CustomerContactList } from '../components/CustomerContactList';
import { CustomerSummaryCard } from '../components/CustomerSummaryCard';
import {
  createCustomerAddress,
  deleteCustomerAddress,
} from '../api/customer.api';
import { useCustomer } from '../hooks/useCustomer';
import { useCustomerAddresses } from '../hooks/useCustomerAddresses';
import { useCustomerContacts } from '../hooks/useCustomerContacts';
import type {
  CustomerAddress,
  CustomerAddressInput,
} from '../types/customer.types';

type TabKey = 'overview' | 'addresses' | 'contacts';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'contacts', label: 'Contacts' },
];

type AddressDialogState =
  | { mode: 'add'; address: null }
  | { mode: 'edit'; address: CustomerAddress };

export function CustomerProfilePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    const initial = searchParams.get('tab');
    return initial === 'addresses' || initial === 'contacts' ? initial : 'overview';
  });
  const [addressDialog, setAddressDialog] = useState<AddressDialogState | null>(null);

  const queryClient = useQueryClient();

  const customerQuery = useCustomer(id);
  const addressesQuery = useCustomerAddresses(id);
  const contactsQuery = useCustomerContacts(id);

  const invalidateAddressState = async () => {
    if (!id) return;

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.customerAddresses.list(id) }),
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.detail(id) }),
    ]);
  };

  const saveAddressMutation = useMutation({
    mutationFn: async (payload: {
      mode: AddressDialogState['mode'];
      addressId?: string;
      values: CustomerAddressInput;
    }) => {
      if (!id) {
        throw new Error('Customer id is missing');
      }

      if (payload.mode === 'edit') {
        if (!payload.addressId) {
          throw new Error('Address id is missing');
        }

        await deleteCustomerAddress(payload.addressId);
      }

      return createCustomerAddress(id, payload.values);
    },
    onSuccess: async () => {
      await invalidateAddressState();
      setAddressDialog(null);
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      await deleteCustomerAddress(addressId);
    },
    onSuccess: async () => {
      await invalidateAddressState();
    },
  });

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
          onAdd={() => setAddressDialog({ mode: 'add', address: null })}
          onEdit={(address) => setAddressDialog({ mode: 'edit', address })}
          onDelete={(address) => {
            if (
              window.confirm(
                `Delete address "${address.label || address.line1}"?`,
              )
            ) {
              deleteAddressMutation.mutate(address.id);
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

    return <CustomerContactList contacts={contactsQuery.data ?? []} />;
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
    addressDialog?.mode === 'edit'
      ? {
          label: addressDialog.address.label ?? '',
          line1: addressDialog.address.line1,
          line2: addressDialog.address.line2 ?? '',
          city: addressDialog.address.city,
          state: addressDialog.address.state ?? '',
          postalCode: addressDialog.address.postalCode,
          country: addressDialog.address.country,
          isBilling: addressDialog.address.isBilling,
          isShipping: addressDialog.address.isShipping,
          isDefault: addressDialog.address.isDefault,
        }
      : undefined;

  return (
    <PageContainer>
      <PageHeader
        title={customerQuery.data.name}
        description={`Customer ID: ${customerQuery.data.id}`}
      />

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
              isSubmitting={saveAddressMutation.isPending}
              error={saveAddressMutation.error instanceof Error ? saveAddressMutation.error.message : null}
              onCancel={() => setAddressDialog(null)}
              onSubmit={(values) => {
                saveAddressMutation.mutate({
                  mode: addressDialog.mode,
                  addressId: addressDialog.address?.id,
                  values,
                });
              }}
            />
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
}
