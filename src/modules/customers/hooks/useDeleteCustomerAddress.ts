import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCustomerAddress } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';

export function useDeleteCustomerAddress(customerId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      if (!customerId) {
        throw new Error('Customer id is missing');
      }

      await deleteCustomerAddress(addressId);
    },
    onSuccess: async () => {
      if (!customerId) return;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.customerAddresses.list(customerId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.customers.detail(customerId),
        }),
      ]);
    },
  });
}
