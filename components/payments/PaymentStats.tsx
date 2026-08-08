import { Wallet, CheckCircle2, Sparkles } from "lucide-react";

interface PaymentStatsProps {
  totalSpent: number;
  completedJobsCount: number;
}

export function PaymentStats({ totalSpent, completedJobsCount }: PaymentStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="absolute right-4 top-4 p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl">
          <Wallet className="w-6 h-6" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Spent</span>
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          ৳{totalSpent.toLocaleString()}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold pt-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lifetime service investment</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="absolute right-4 top-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed Jobs</span>
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          {completedJobsCount}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
          <span>Successfully verified & paid</span>
        </div>
      </div>
    </div>
  );
}