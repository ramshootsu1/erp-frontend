import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';
import Invoices from './pages/Invoices';
import Login from './pages/Login';
import TenantSelect from './pages/TenantSelect';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const { token, currentTenant, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/tenant-select" element={<TenantSelect />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerProfile />} />
          <Route path="/invoices" element={<Invoices />} />
        </Route>

        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to={token && currentTenant ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
