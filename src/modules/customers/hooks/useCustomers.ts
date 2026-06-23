import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../api/customer.api';
import { queryKeys } from '../../../lib/query/queryKeys';

export function useCustomers() {
  return useQuery({
    queryKey: queryKeys.customers.list(),
    queryFn: getCustomers,
  });
}
