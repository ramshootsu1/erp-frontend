import { useQuery } from '@tanstack/react-query';
import { getCustomerContacts } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';

export function useCustomerContacts(customerId?: string) {
  return useQuery({
    queryKey: customerId
      ? queryKeys.customerContacts.list(customerId)
      : queryKeys.customerContacts.list(''),
    queryFn: () => getCustomerContacts(customerId ?? ''),
    enabled: Boolean(customerId),
  });
}
