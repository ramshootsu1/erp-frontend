import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.09),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.14),_transparent_24%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="relative flex flex-1">
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[1px] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside
            className={`
              fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white text-slate-900 shadow-[20px_0_60px_-40px_rgba(15,23,42,0.25)]
              backdrop-blur-xl transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </aside>

          <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
