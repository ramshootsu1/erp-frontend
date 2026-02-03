import { http } from '../http';

export type Customer = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
};

export async function getCustomers(): Promise<Customer[]> {
  return http<Customer[]>('/customers');
}
