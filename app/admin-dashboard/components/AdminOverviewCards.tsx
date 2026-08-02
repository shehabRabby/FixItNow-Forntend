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
      value: `$${overview?.totalRevenue || 0}`,
      icon: DollarSign,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50",
    },
    {
      title: "Total Users",
      value: overview?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Total Bookings",
      value: overview?.totalBookings || 0,
      icon: Calendar,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/50",
    },
    {
      title: "Total Services",
      value: overview?.totalServices || 0,
      icon: Wrench,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500">{stat.title}</p>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {stat.value}
              </h4>
            </div>
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}