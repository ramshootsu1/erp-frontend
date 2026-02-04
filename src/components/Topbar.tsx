type Props = {
  onMenuClick?: () => void;
};

function Topbar({ onMenuClick }: Props) {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4">
      {/* Hamburger (mobile only) */}
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
      >
        ☰
      </button>

      <div className="font-semibold text-slate-800">
        ERP
      </div>
    </header>
  );
}

export default Topbar;
