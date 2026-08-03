"use client";

import { useEffect, useState } from "react";
import { getCustomerDashboardOverview } from "@/services/profile.service";

interface ICustomerOverview {
  totalBookings?: number;
  pendingPayments?: number;
  completedJobs?: number;
  [key: string]: string | number | undefined;
}

export default function CustomerDashboardPage() {
  const [overview, setOverview] = useState<ICustomerOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const data = await getCustomerDashboardOverview();
        setOverview(data);
      } catch (error) {
        console.error("Failed to load overview", error);
      } finally {
        setLoading(false);
      }
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
          Customer Portal
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track your service requests and payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Bookings</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {overview?.totalBookings || 0}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">
            Pending Payments
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {overview?.pendingPayments || 0}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Completed Jobs</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {overview?.completedJobs || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
