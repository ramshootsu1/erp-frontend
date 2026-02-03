import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <Topbar />

      {/* Main area */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
