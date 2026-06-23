export const queryKeys = {
  customers: {
    all: ['customers'] as const,
    list: () => [...queryKeys.customers.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.customers.all, 'detail', id] as const,
  },

  customerAddresses: {
    all: ['customer-addresses'] as const,
    list: (customerId: string) =>
      [...queryKeys.customerAddresses.all, customerId] as const,
  },

  customerContacts: {
    all: ['customer-contacts'] as const,
    list: (customerId: string) =>
      [...queryKeys.customerContacts.all, customerId] as const,
  },

  invoices: {
    all: ['invoices'] as const,
    list: () => [...queryKeys.invoices.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.invoices.all, 'detail', id] as const,
  },
};
