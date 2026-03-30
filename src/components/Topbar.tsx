import { useAuth } from '../context/AuthContext';

type Props = {
  onMenuClick?: () => void;
};

function Topbar({ onMenuClick }: Props) {
  const { user, currentTenant } = useAuth();

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          ☰
        </button>

        <div className="font-semibold text-slate-800">
          ERP {currentTenant && <span className="ml-2 text-sm font-normal text-slate-600">- {currentTenant.tenantName}</span>}
        </div>
      </div>

      {/* User menu */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
