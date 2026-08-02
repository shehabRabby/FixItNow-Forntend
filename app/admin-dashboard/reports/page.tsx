import { ReportMetricsGrid } from "./components/ReportMetricsGrid";
import { ReportTransactionTable } from "./components/ReportTransactionTable";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Platform Reports & Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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