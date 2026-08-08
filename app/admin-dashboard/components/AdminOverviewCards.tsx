"use client";

import { Users, Calendar, Wrench, DollarSign } from "lucide-react";
import { IAdminOverview } from "@/types/user.interface";

interface AdminOverviewCardsProps {
  overview: IAdminOverview | null;
}

export function AdminOverviewCards({ overview }: AdminOverviewCardsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: `$${overview?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/40",
    },
    {
      title: "Total Users",
      value: overview?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900/40",
    },
    {
      title: "Total Bookings",
      value: overview?.totalBookings || 0,
      icon: Calendar,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/50 border-purple-100 dark:border-purple-900/40",
    },
    {
      title: "Total Services",
      value: overview?.totalServices || 0,
      icon: Wrench,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                {stat.title}
              </p>
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </h4>
            </div>
            <div className={`p-3.5 rounded-2xl border ${stat.color} shadow-xs shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}