function Sidebar() {
  return (
    <nav className="p-6 text-sm text-slate-700">
      <div className="mb-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Menu
      </div>

      <div className="space-y-1">
        {/* Active item */}
        <div className="rounded-md px-3 py-2 bg-indigo-50 text-indigo-700 font-medium">
          Dashboard
        </div>

        {/* Inactive items */}
        <div className="rounded-md px-3 py-2 hover:bg-slate-100 cursor-pointer">
          Customers
        </div>
        <div className="rounded-md px-3 py-2 hover:bg-slate-100 cursor-pointer">
          Invoices
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
