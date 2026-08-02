"use client";

import { CheckCircle2, Clock, XCircle, Ban } from "lucide-react";

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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        Booking Status Breakdown
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusOverview).map(([status, count]) => (
          <div
            key={status}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(status)}
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {status}
              </span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}