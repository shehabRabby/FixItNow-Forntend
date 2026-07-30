export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Customer Portal
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your bookings and explore home services.
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          Welcome to Customer Dashboard!
        </p>
      </div>
    </div>
  );
}