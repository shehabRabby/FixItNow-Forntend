import { BarChart3, PieChart, TrendingUp } from "lucide-react";

export function SpendingAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Spending Trends (Static Chart Preview) */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Spending Trends</h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl">
            Last 6 Months
          </span>
        </div>

        {/* Visual Bar Representation */}
        <div className="grid grid-cols-6 gap-3 items-end h-40 pt-6 px-2 border-b border-slate-100 dark:border-slate-800">
          <div className="bg-blue-500/10 hover:bg-blue-500/20 h-[35%] rounded-t-xl transition-all"></div>
          <div className="bg-blue-500/20 hover:bg-blue-500/30 h-[60%] rounded-t-xl transition-all"></div>
          <div className="bg-blue-500/10 hover:bg-blue-500/20 h-[40%] rounded-t-xl transition-all"></div>
          <div className="bg-blue-500/30 hover:bg-blue-500/40 h-[80%] rounded-t-xl transition-all"></div>
          <div className="bg-blue-500/20 hover:bg-blue-500/30 h-[55%] rounded-t-xl transition-all"></div>
          <div className="bg-blue-600 h-[95%] rounded-t-xl shadow-lg shadow-blue-500/30 relative group">
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-md shadow">
              ৳8.5k
            </span>
          </div>
        </div>
        <div className="grid grid-cols-6 text-center text-[11px] font-bold text-slate-400">
          <span>MAY</span>
          <span>JUN</span>
          <span>JUL</span>
          <span>AUG</span>
          <span>SEP</span>
          <span className="text-blue-600 dark:text-blue-400">OCT</span>
        </div>
      </div>

      {/* Category Split */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Category Split</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Electrical</span>
              <span className="text-blue-600">45%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-[45%]"></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Plumbing</span>
              <span className="text-emerald-600">30%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[30%]"></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Cleaning</span>
              <span className="text-amber-600">25%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[25%]" ></div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex items-center gap-2 text-xs text-slate-500">
          <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Electrical service leads your monthly billing.</span>
        </div>
      </div>
    </div>
  );
}