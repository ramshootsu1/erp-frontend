import { NavLink } from 'react-router-dom';

type Props = {
  onNavigate?: () => void;
};

function Sidebar({ onNavigate }: Props) {
  const base =
    'block rounded-md px-3 py-2 text-base';

  const inactive =
    'text-slate-700 hover:bg-slate-100';

  const active =
    'bg-indigo-50 text-indigo-700 font-medium';

  return (
    <nav className="min-h-screen p-4">
      <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Menu
      </div>

      <div className="space-y-1">
        <NavLink
          to="/dashboard"
          onClick={onNavigate}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/customers"
          onClick={onNavigate}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/invoices"
          onClick={onNavigate}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Invoices
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;
