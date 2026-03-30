import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  
  const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'));
  return parts.map((part, idx) =>
    part.toLowerCase() === query.toLowerCase().trim() ? (
      <mark key={idx} className="bg-yellow-200 font-semibold">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function TenantSelect() {
  const { user, memberships, selectTenant, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTenantId, setSelectedTenantId] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const filtered = memberships
    ? memberships.filter((m) =>
        m.tenantName.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  const handleSelectTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenantId || !user) return;

    try {
      await selectTenant(user.userId, selectedTenantId);
      navigate('/dashboard');
    } catch (err) {
      console.error('Tenant selection failed:', err);
    }
  };

  if (!memberships || memberships.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Workspaces</h1>
            <p className="text-gray-600 mb-6">
              You don't have access to any workspaces yet. Please contact your administrator.
            </p>
            <button
              onClick={logout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Select Workspace</h1>
            <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
          </div>

          <form onSubmit={handleSelectTenant} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose a workspace to continue
              </label>

              <div className="mb-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search workspaces..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {query && filtered.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Found {filtered.length} of {memberships?.length} workspace{memberships?.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filtered.length === 0 && (
                  <div className="text-sm text-gray-500 p-3 text-center">
                    {query ? 'No workspaces match your search.' : 'No workspaces available.'}
                  </div>
                )}

                {filtered.map((membership) => (
                  <label key={membership.tenantId} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                    style={{
                      backgroundColor: selectedTenantId === membership.tenantId ? '#eff6ff' : 'transparent',
                      borderColor: selectedTenantId === membership.tenantId ? '#3b82f6' : '#d1d5db',
                    }}
                  >
                    <input
                      type="radio"
                      name="tenant"
                      value={membership.tenantId}
                      checked={selectedTenantId === membership.tenantId}
                      onChange={(e) => setSelectedTenantId(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-900">
                        {highlightMatch(membership.tenantName, query)}
                      </p>
                      <p className="text-xs text-gray-500">Role: {membership.role}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedTenantId || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mt-6"
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </button>
          </form>

          <button
            onClick={logout}
            className="w-full mt-4 text-gray-600 hover:text-gray-900 font-medium py-2 px-4 border border-gray-300 rounded-lg transition duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
