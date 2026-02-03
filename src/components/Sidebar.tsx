function Sidebar() {
  return (
    <nav className="p-4 space-y-2 text-sm text-slate-700">
      <div className="font-semibold text-slate-900 mb-4">
        Menu
      </div>

      <div className="rounded px-2 py-1 hover:bg-slate-100 cursor-pointer">
        Dashboard
      </div>
      <div className="rounded px-2 py-1 hover:bg-slate-100 cursor-pointer">
        Customers
      </div>
      <div className="rounded px-2 py-1 hover:bg-slate-100 cursor-pointer">
        Invoices
      </div>
    </nav>
  );
}

export default Sidebar;
