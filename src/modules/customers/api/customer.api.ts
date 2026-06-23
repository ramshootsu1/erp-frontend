import { http } from '../../../api/http';
import type {
  CustomerAddressInput,
  CreateCustomerInput,
  Customer,
  CustomerAddress,
  CustomerContact,
  UpdateCustomerInput,
} from '../types/customer.types';

export async function getCustomers(): Promise<Customer[]> {
  return http<Customer[]>('/customers');
}

export async function getCustomer(id: string): Promise<Customer> {
  return http<Customer>(`/customers/${id}`);
}

export async function createCustomer(
  input: CreateCustomerInput,
): Promise<Customer> {
  return http<Customer>('/customers', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function deleteCustomer(id: string): Promise<void> {
  await http(`/customers/${id}`, {
    method: 'DELETE',
  });
}

export async function updateCustomer(
  id: string,
  input: UpdateCustomerInput,
): Promise<Customer> {
  return http<Customer>(`/customers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export async function getCustomerAddresses(
  customerId: string,
): Promise<CustomerAddress[]> {
  return http<CustomerAddress[]>(`/customers/${customerId}/addresses`);
}

export async function getCustomerContacts(
  customerId: string,
): Promise<CustomerContact[]> {
  return http<CustomerContact[]>(`/customers/${customerId}/contacts`);
}

export async function createCustomerAddress(
  customerId: string,
  input: CustomerAddressInput,
): Promise<CustomerAddress> {
  return http<CustomerAddress>(`/customers/${customerId}/addresses`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function deleteCustomerAddress(addressId: string): Promise<void> {
  await http(`/customers/addresses/${addressId}`, {
    method: 'DELETE',
  });
}
