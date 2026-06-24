import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomerAddress } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';
import type { CustomerAddressInput } from '../types/customer.types';

export function useCreateCustomerAddress(customerId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CustomerAddressInput) => {
      if (!customerId) {
        throw new Error('Customer id is missing');
      }

      return createCustomerAddress(customerId, input);
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
