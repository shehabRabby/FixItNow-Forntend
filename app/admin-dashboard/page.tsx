"use client";

import { useEffect, useState } from "react";
import { getDashboardOverview } from "@/services/profile.service";
import { IAdminOverview } from "@/types/user.interface";

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<IAdminOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOverview = async () => {
      const data = await getDashboardOverview();
      setOverview(data);
      setLoading(false);
    };
    loadOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-slate-500 text-sm font-semibold animate-pulse">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, Admin. Here whats happening today.
        </p>
      </div>

      {/*Dynamic Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Revenue</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            ${overview?.totalRevenue || 0}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Customers</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {overview?.totalCustomers || 0}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Technicians</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {overview?.totalTechnicians || 0}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Services</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {overview?.totalServices || 0}
          </p>
        </div>
      </div>
    </div>
  );
}