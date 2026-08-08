"use client";

import { CheckCircle2, Clock, XCircle, Ban, PieChart } from "lucide-react";

interface BookingStatusBreakdownProps {
  statusOverview?: {
    [key: string]: number;
  };
}

export function BookingStatusBreakdown({ statusOverview }: BookingStatusBreakdownProps) {
  if (!statusOverview) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "REQUESTED":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "DECLINED":
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case "CANCELLED":
        return <Ban className="w-4 h-4 text-slate-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 border border-blue-100 dark:border-blue-900/50">
          <PieChart className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Booking Status Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Platform-wide breakdown of bookings based on current status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(statusOverview).map(([status, count]) => (
          <div
            key={status}
            className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-all hover:bg-slate-50 dark:hover:bg-slate-800/70"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-2xs border border-slate-100 dark:border-slate-800">
                {getStatusIcon(status)}
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {status}
              </span>
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}