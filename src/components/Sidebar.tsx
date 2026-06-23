import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  CubeIcon,
  Squares2X2Icon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';

type Props = {
  onNavigate?: () => void;
};

type MenuKey = 'customers' | 'sales' | 'products' | 'reports' | 'settings' | null;

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Sidebar({ onNavigate }: Props) {
  const [openMenu, setOpenMenu] = useState<MenuKey>('customers');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const itemBase =
    'group flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400/25';

  const activeItem =
    'border-indigo-100 bg-indigo-50 text-indigo-700 shadow-[0_8px_30px_-20px_rgba(59,130,246,0.35)]';
  const inactiveItem =
    'text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900';

  const subItem =
    'flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900';
  const activeSubItem = 'bg-indigo-50 text-indigo-700';
  const iconClass = 'h-5 w-5 text-slate-400 transition group-hover:text-slate-600';

  const renderChevron = (isOpen: boolean) =>
    isOpen ? (
      <ChevronUpIcon className="h-4 w-4 text-slate-400" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-slate-400" />
    );

  const noop = () => {
    // placeholder for future routes
  };

  const handleSignOut = () => {
    logout();
    onNavigate?.();
    navigate('/login');
  };

  return (
    <div className="flex h-full flex-col bg-white px-4 py-4">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-semibold text-white shadow-md shadow-indigo-200/60">
            ER
          </div>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-slate-900">ERP Suite</div>
            <div className="truncate text-xs text-slate-500">Operations workspace</div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-5 overflow-y-auto pr-1">
        <div>
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Main
          </div>

          <NavLink
            to="/dashboard"
            onClick={onNavigate}
            className={({ isActive }) =>
              joinClasses(itemBase, isActive ? activeItem : inactiveItem)
            }
          >
            <span className="flex items-center gap-3">
              <Squares2X2Icon className={iconClass} />
              Dashboard
            </span>
          </NavLink>
        </div>

        <div className="space-y-2">
          <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Operations
          </div>

          <button
            type="button"
            onClick={() => toggleMenu('customers')}
            className={joinClasses(itemBase, inactiveItem, 'justify-between')}
          >
            <span className="flex items-center gap-3">
              <UsersIcon className={iconClass} />
              Customers
            </span>
            {renderChevron(openMenu === 'customers')}
          </button>

          {openMenu === 'customers' ? (
            <div className="space-y-1 pl-3">
              <NavLink
                to="/customers"
                onClick={onNavigate}
                className={({ isActive }) =>
                  joinClasses(subItem, isActive && activeSubItem)
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
          ) : null}

          <button
            type="button"
            onClick={() => toggleMenu('sales')}
            className={joinClasses(itemBase, inactiveItem, 'justify-between')}
          >
            <span className="flex items-center gap-3">
              <BanknotesIcon className={iconClass} />
              Sales
            </span>
            {renderChevron(openMenu === 'sales')}
          </button>

          {openMenu === 'sales' ? (
            <div className="space-y-1 pl-3">
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
          ) : null}

          <button
            type="button"
            onClick={() => toggleMenu('products')}
            className={joinClasses(itemBase, inactiveItem, 'justify-between')}
          >
            <span className="flex items-center gap-3">
              <CubeIcon className={iconClass} />
              Products
            </span>
            {renderChevron(openMenu === 'products')}
          </button>

          {openMenu === 'products' ? (
            <div className="space-y-1 pl-3">
              <button className={subItem} onClick={noop}>
                Products
              </button>
              <button className={subItem} onClick={noop}>
                Inventory
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => toggleMenu('reports')}
            className={joinClasses(itemBase, inactiveItem, 'justify-between')}
          >
            <span className="flex items-center gap-3">
              <ChartBarSquareIcon className={iconClass} />
              Reports
            </span>
            {renderChevron(openMenu === 'reports')}
          </button>

          {openMenu === 'reports' ? (
            <div className="space-y-1 pl-3">
              <button className={subItem} onClick={noop}>
                Sales report
              </button>
              <button className={subItem} onClick={noop}>
                Customer report
              </button>
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            System
          </div>

          <button
            type="button"
            onClick={() => toggleMenu('settings')}
            className={joinClasses(itemBase, inactiveItem, 'justify-between')}
          >
            <span className="flex items-center gap-3">
              <Cog6ToothIcon className={iconClass} />
              Settings
            </span>
            {renderChevron(openMenu === 'settings')}
          </button>

          {openMenu === 'settings' ? (
            <div className="space-y-1 pl-3">
              <button className={subItem} onClick={noop}>
                Company
              </button>
              <button className={subItem} onClick={noop}>
                Users
              </button>
              <button
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
