import { NavLink } from "react-router-dom";
import { useState } from "react";

type Props = {
  onNavigate?: () => void;
};

type MenuKey =
  | "customers"
  | "sales"
  | "products"
  | "reports"
  | "settings"
  | null;

function Sidebar({ onNavigate }: Props) {
  const [openMenu, setOpenMenu] = useState<MenuKey>("customers");

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu(prev => (prev === key ? null : key));
  };

  const itemBase =
    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors w-full";

  const inactive =
    "text-slate-700 hover:bg-slate-100";

  const active =
    "bg-indigo-50 text-indigo-700 font-medium";

  const subItem =
    "rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 text-left";

  const noop = () => {
    // placeholder for future routes
  };

  return (
    <aside className="h-full p-4">
      {/* Brand */}
      <div className="mb-6">
        <div className="text-lg font-semibold text-indigo-600">
          MyBusiness
        </div>
        <div className="text-sm text-slate-500">
          ERP Dashboard
        </div>
      </div>

      {/* Dashboard */}
      <NavLink
        to="/dashboard"
        onClick={onNavigate}
        className={({ isActive }) =>
          `${itemBase} ${isActive ? active : inactive}`
        }
      >
        <span>📊</span>
        Dashboard
      </NavLink>

      {/* Customers */}
      <button
        type="button"
        onClick={() => toggleMenu("customers")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <span>👥</span>
          Customers
        </div>
        <span className="text-xs">
          {openMenu === "customers" ? "▲" : "▼"}
        </span>
      </button>

      {openMenu === "customers" && (
        <div className="mt-1 flex flex-col gap-1 pl-10">
          <NavLink
            to="/customers"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${subItem} ${isActive ? active : ""}`
            }
          >
            All customers
          </NavLink>

          <NavLink
            to="/customers?mode=add"
            onClick={onNavigate}
            className={subItem}
          >
            Add customer
          </NavLink>
        </div>
      )}

      {/* Sales */}
      <button
        type="button"
        onClick={() => toggleMenu("sales")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <span>💰</span>
          Sales
        </div>
        <span className="text-xs">
          {openMenu === "sales" ? "▲" : "▼"}
        </span>
      </button>

      {openMenu === "sales" && (
        <div className="mt-1 flex flex-col gap-1 pl-10">
          <button className={subItem} onClick={noop}>
            Invoices
          </button>
          <button className={subItem} onClick={noop}>
            Payments
          </button>
          <button className={subItem} onClick={noop}>
            Quotations
          </button>
        </div>
      )}

      {/* Products */}
      <button
        type="button"
        onClick={() => toggleMenu("products")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <span>📦</span>
          Products
        </div>
        <span className="text-xs">
          {openMenu === "products" ? "▲" : "▼"}
        </span>
      </button>

      {openMenu === "products" && (
        <div className="mt-1 flex flex-col gap-1 pl-10">
          <button className={subItem} onClick={noop}>
            Products
          </button>
          <button className={subItem} onClick={noop}>
            Inventory
          </button>
        </div>
      )}

      {/* Reports */}
      <button
        type="button"
        onClick={() => toggleMenu("reports")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <span>📈</span>
          Reports
        </div>
        <span className="text-xs">
          {openMenu === "reports" ? "▲" : "▼"}
        </span>
      </button>

      {openMenu === "reports" && (
        <div className="mt-1 flex flex-col gap-1 pl-10">
          <button className={subItem} onClick={noop}>
            Sales report
          </button>
          <button className={subItem} onClick={noop}>
            Customer report
          </button>
        </div>
      )}

      {/* Settings */}
      <button
        type="button"
        onClick={() => toggleMenu("settings")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <span>⚙️</span>
          Settings
        </div>
        <span className="text-xs">
          {openMenu === "settings" ? "▲" : "▼"}
        </span>
      </button>

      {openMenu === "settings" && (
        <div className="mt-1 flex flex-col gap-1 pl-10">
          <button className={subItem} onClick={noop}>
            Company
          </button>
          <button className={subItem} onClick={noop}>
            Users
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
