export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, Admin. Here what is happening today.
        </p>
      </div>

      {/* Overview Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Revenue</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">$124,500</p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Active Bookings</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">1,240</p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">New Technicians</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">45</p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Customer Satisfaction</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">4.8/5</p>
        </div>
      </div>
    </div>
  );
}