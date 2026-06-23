import { useQuery } from '@tanstack/react-query';
import { getCustomerAddresses } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';

export function useCustomerAddresses(customerId?: string) {
  return useQuery({
    queryKey: customerId
      ? queryKeys.customerAddresses.list(customerId)
      : queryKeys.customerAddresses.list(''),
    queryFn: () => getCustomerAddresses(customerId ?? ''),
    enabled: Boolean(customerId),
  });
}
