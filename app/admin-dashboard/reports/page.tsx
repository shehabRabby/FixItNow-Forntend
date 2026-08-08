import { ReportMetricsGrid } from "./components/ReportMetricsGrid";
import { ReportTransactionTable } from "./components/ReportTransactionTable";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Platform Reports & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor financial summaries, transaction records, and platform growth metrics.
        </p>
      </div>

      {/* Top Summary Metrics */}
      <ReportMetricsGrid />

      {/* Transaction Records Table */}
      <ReportTransactionTable />
    </div>
  );
}