import { http } from './http';

export interface LoginResponse {
  userId: string;
  name: string;
  memberships: Array<{
    tenantId: string;
    tenantName: string;
    role: string;
  }>;
}

export interface SelectTenantResponse {
  accessToken: string;
  userId: string;
  tenantId: string;
  role: string;
}

export const authApi = {
  login: (email: string, password: string) =>
    http<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  selectTenant: (userId: string, tenantId: string) =>
    http<SelectTenantResponse>('/auth/select-tenant', {
      method: 'POST',
      body: JSON.stringify({ userId, tenantId }),
    }),

  getMe: () =>
    http<{ userId: string; tenantId: string; role: string }>('/auth/me', {
      method: 'GET',
    }),
};
