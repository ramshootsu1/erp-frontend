import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Squares2X2Icon,
  UsersIcon,
  BanknotesIcon,
  CubeIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";

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
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const itemBase =
    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors w-full";

  const inactive = "text-slate-700 hover:bg-slate-100";

  const active = "bg-indigo-50 text-indigo-700 font-medium";

  const subItem =
    "rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 text-left";

  const iconClass = "h-5 w-5 text-slate-500";

  const renderChevron = (isOpen: boolean) =>
    isOpen ? (
      <ChevronUpIcon className="h-4 w-4 text-slate-500" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-slate-500" />
    );

  const noop = () => {
    // placeholder for future routes
  };

  const handleSignOut = () => {
    logout();
    onNavigate?.();
    navigate("/login");
  };

  return (
    <aside className="h-full p-4">
      <div className="mb-6">
        <div className="text-lg font-semibold text-indigo-600">MyBusiness</div>
        <div className="text-sm text-slate-500">ERP Dashboard</div>
      </div>

      <NavLink
        to="/dashboard"
        onClick={onNavigate}
        className={({ isActive }) => `${itemBase} ${isActive ? active : inactive}`}
      >
        <Squares2X2Icon className={iconClass} />
        Dashboard
      </NavLink>

      <button
        type="button"
        onClick={() => toggleMenu("customers")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <UsersIcon className={iconClass} />
          Customers
        </div>
        <span className="text-xs">{renderChevron(openMenu === "customers")}</span>
      </button>

      {openMenu === "customers" && (
        <div className="mt-1 flex flex-col gap-1 pl-10">
          <NavLink
            to="/customers"
            onClick={onNavigate}
            className={({ isActive }) => `${subItem} ${isActive ? active : ""}`}
          >
            All customers
          </NavLink>

          <NavLink to="/customers?mode=add" onClick={onNavigate} className={subItem}>
            Add customer
          </NavLink>
        </div>
      )}

      <button
        type="button"
        onClick={() => toggleMenu("sales")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <BanknotesIcon className={iconClass} />
          Sales
        </div>
        <span className="text-xs">{renderChevron(openMenu === "sales")}</span>
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

      <button
        type="button"
        onClick={() => toggleMenu("products")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <CubeIcon className={iconClass} />
          Products
        </div>
        <span className="text-xs">{renderChevron(openMenu === "products")}</span>
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

      <button
        type="button"
        onClick={() => toggleMenu("reports")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <ChartBarSquareIcon className={iconClass} />
          Reports
        </div>
        <span className="text-xs">{renderChevron(openMenu === "reports")}</span>
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

      <button
        type="button"
        onClick={() => toggleMenu("settings")}
        className={`${itemBase} ${inactive} justify-between mt-2`}
      >
        <div className="flex items-center gap-3">
          <Cog6ToothIcon className={iconClass} />
          Settings
        </div>
        <span className="text-xs">{renderChevron(openMenu === "settings")}</span>
      </button>

      {openMenu === "settings" && (
        <div className="mt-1 flex flex-col gap-1 pl-10">
          <button className={subItem} onClick={noop}>
            Company
          </button>
          <button className={subItem} onClick={noop}>
            Users
          </button>
          <button
            className={`${subItem} text-left text-red-600 hover:bg-red-50`}
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
