export type Customer = {
  id: string;
  name: string;
  code?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type CustomerAddress = {
  id: string;
  customerId: string;
  tenantId: string;
  label?: string | null;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string;
  isBilling: boolean;
  isShipping: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  deletedByCascade?: boolean;
};

export type CustomerContact = {
  id: string;
  customerId: string;
  tenantId: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  designation?: string | null;
  isPrimary: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  deletedByCascade?: boolean;
};

export type CreateCustomerInput = {
  name: string;
  code?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

export type UpdateCustomerInput = Partial<CreateCustomerInput>;

export type CustomerAddressInput = {
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isBilling?: boolean;
  isShipping?: boolean;
  isDefault?: boolean;
};

export type CreateCustomerContactInput = {
  name: string;
  email?: string;
  phone?: string;
  designation?: string;
  isPrimary?: boolean;
};
