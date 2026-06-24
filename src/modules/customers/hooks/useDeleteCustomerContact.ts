import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCustomerContact } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';

export function useDeleteCustomerContact(customerId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId: string) => {
      if (!customerId) {
        throw new Error('Customer id is missing');
      }

      await deleteCustomerContact(contactId);
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
