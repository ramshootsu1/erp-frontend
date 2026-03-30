import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed z-50 h-full w-64 bg-white border-r border-slate-200
            transform transition-transform duration-200
            lg:static lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
