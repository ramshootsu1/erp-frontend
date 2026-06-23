import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';

export function useCustomer(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.customers.detail(id) : queryKeys.customers.detail(''),
    queryFn: () => getCustomer(id ?? ''),
    enabled: Boolean(id),
  });
}
