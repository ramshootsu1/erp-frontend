import { NavLink } from 'react-router-dom';

function Sidebar() {
  const base =
    'block rounded-md px-3 py-2 text-sm';

  const inactive =
    'text-slate-700 hover:bg-slate-100';

  const active =
    'bg-indigo-50 text-indigo-700 font-medium';

  return (
    <nav className="p-6">
      <div className="mb-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Menu
      </div>

      <div className="space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/invoices"
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
