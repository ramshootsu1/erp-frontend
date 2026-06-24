import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomerContact } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';
import type { CreateCustomerContactInput } from '../types/customer.types';

export function useCreateCustomerContact(customerId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCustomerContactInput) => {
      if (!customerId) {
        throw new Error('Customer id is missing');
      }

      return createCustomerContact(customerId, input);
    },
    onSuccess: async () => {
      if (!customerId) return;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.customerContacts.list(customerId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.customers.detail(customerId),
        }),
      ]);
    },
  });
}
