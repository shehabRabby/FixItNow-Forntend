"use client";

import { useEffect, useState } from "react";
import { getAdminDashboardOverview } from "@/services/profile.service"; // ফাংশন নাম পরিবর্তন করা হয়েছে
import { IAdminOverview } from "@/types/user.interface";
import { AdminOverviewCards } from "./components/AdminOverviewCards";
import { BookingStatusBreakdown } from "./components/BookingStatusBreakdown";

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<IAdminOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const data = await getAdminDashboardOverview(); // এখানে নতুন ফাংশন কল করা হলো
        setOverview(data);
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
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
          Welcome back, Admin. Here is what is happening today.
        </p>
      </div>

      {/* Top Metrics Cards */}
      <AdminOverviewCards overview={overview} />

      {/* Booking Status Overview Section */}
      <BookingStatusBreakdown statusOverview={overview?.bookingStatusOverview} />
    </div>
  );
}