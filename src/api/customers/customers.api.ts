import { http } from '../http';

export type Customer = {
  id: string;
  name: string;
  code?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
};

export type CreateCustomerInput = {
  name: string;
  email?: string;
  phone?: string;
};

/**
 * Get active customers (deleted customers are excluded by backend)
 */
export async function getCustomers(): Promise<Customer[]> {
  return http<Customer[]>('/customers');
}

/**
 * Create a new customer
 */
export async function createCustomer(
  input: CreateCustomerInput
): Promise<Customer> {
  return http<Customer>('/customers', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

/**
 * Soft-delete a customer
 */
export async function deleteCustomer(id: string): Promise<void> {
  await http(`/customers/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Get a single customer profile by id
 */
export async function getCustomerById(id: string): Promise<Customer> {
  return http<Customer>(`/customers/${id}`);
}
