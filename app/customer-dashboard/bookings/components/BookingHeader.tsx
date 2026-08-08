import { CalendarDays } from "lucide-react";

export function BookingHeader() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="space-y-1.5 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl shadow-inner">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Bookings
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pl-1">
          Track your service requests, status, and history in one place.
        </p>
      </div>
    </div>
  );
}