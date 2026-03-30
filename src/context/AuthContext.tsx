import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../api/auth';

export interface Membership {
  tenantId: string;
  tenantName: string;
  role: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  currentTenant: { tenantId: string; tenantName: string; role: string } | null;
  memberships: Membership[] | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  selectTenant: (userId: string, tenantId: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentTenant, setCurrentTenant] = useState<{
    tenantId: string;
    tenantName: string;
    role: string;
  } | null>(null);
  const [memberships, setMemberships] = useState<Membership[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    const storedTenant = localStorage.getItem('currentTenant');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      if (storedTenant) {
        setCurrentTenant(JSON.parse(storedTenant));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await authApi.login(email, password);

      const userData: User = {
        userId: data.userId,
        name: data.name,
        email: email,
      };

      setUser(userData);
      setMemberships(data.memberships);

      localStorage.setItem('authUser', JSON.stringify(userData));

      // If user has only one membership, auto-select it
      if (data.memberships.length === 1) {
        await selectTenant(data.userId, data.memberships[0].tenantId);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const selectTenant = async (userId: string, tenantId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await authApi.selectTenant(userId, tenantId);

      const tenantData = {
        tenantId,
        tenantName: memberships?.find(m => m.tenantId === tenantId)?.tenantName || '',
        role: memberships?.find(m => m.tenantId === tenantId)?.role || '',
      };

      setCurrentTenant(tenantData);
      setToken(data.accessToken);

      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('currentTenant', JSON.stringify(tenantData));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCurrentTenant(null);
    setMemberships(null);
    setError(null);

    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('currentTenant');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        currentTenant,
        memberships,
        isLoading,
        error,
        login,
        selectTenant,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
