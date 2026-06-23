function Dashboard() {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-sm">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
          Overview
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          A clean operational view for the workspace. This space is ready for ERP modules,
          workflow shortcuts, and daily activity summaries.
        </p>
      </div>
    </section>
  );
}

export default Dashboard;
