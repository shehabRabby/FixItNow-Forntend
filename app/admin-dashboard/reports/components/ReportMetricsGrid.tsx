import { reportMetrics } from "../reports.data";
import { TrendingUp, TrendingDown } from "lucide-react";

export function ReportMetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {reportMetrics.map((item, index) => (
        <div
          key={index}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
        >
          <p className="text-xs font-semibold text-slate-500">{item.title}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {item.value}
            </h3>
            <span
              className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                item.isPositive
                  ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50"
                  : "text-rose-600 bg-rose-50 dark:bg-rose-950/50"
              }`}
            >
              {item.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {item.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}