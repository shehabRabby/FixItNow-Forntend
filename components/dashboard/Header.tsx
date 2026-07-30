"use client";

import { Search, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  actionButtonText?: string;
  onActionClick?: () => void;
}

export default function DashboardHeader({
  actionButtonText = "Book Now",
  onActionClick,
}: HeaderProps) {
  return (
    <header className="w-full bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Global search for users, pros, or bookings..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5"></span>
        </button>

        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <HelpCircle className="w-4 h-4" />
        </button>

        {actionButtonText && (
          <button
            onClick={onActionClick}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all"
          >
            {actionButtonText}
          </button>
        )}
      </div>
    </header>
  );
}
