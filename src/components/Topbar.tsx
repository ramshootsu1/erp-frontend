import { Bars3Icon, ChevronRightIcon, CircleStackIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';

type Props = {
  onMenuClick?: () => void;
};

function Topbar({ onMenuClick }: Props) {
  const { user, currentTenant } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-900">
              <CircleStackIcon className="h-5 w-5 text-indigo-600" />
              <span className="truncate">ERP Suite</span>
            </div>
            {currentTenant ? (
              <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <span className="truncate">{currentTenant.tenantName}</span>
                <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400" />
                <span className="uppercase tracking-[0.18em] text-slate-400">
                  tenant
                </span>
              </div>
            ) : (
              <div className="mt-0.5 text-xs text-slate-500">Workspace ready</div>
            )}
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-semibold text-white shadow-md shadow-indigo-200/60">
              {user.name?.slice(0, 1)?.toUpperCase() ?? 'U'}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Topbar;
