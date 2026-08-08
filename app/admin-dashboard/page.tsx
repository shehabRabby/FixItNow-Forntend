"use client";

import { useEffect, useState, useRef } from "react";
import { getAdminDashboardOverview } from "@/services/profile.service"; 
import { IAdminOverview } from "@/types/user.interface";
import { AdminOverviewCards } from "./components/AdminOverviewCards";
import { BookingStatusBreakdown } from "./components/BookingStatusBreakdown";
import { RevenueBookingsChart } from "./components/RevenueBookingsChart";
import { Sparkles, Loader2, ShieldCheck } from "lucide-react";
import gsap from "gsap";

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<IAdminOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const data = await getAdminDashboardOverview(); 
        setOverview(data);
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".gsap-fade-up",
          { opacity: 0, y: 25, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-md animate-pulse"></div>
          <div className="relative w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide animate-pulse">
          Loading dashboard insights...
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      {/* Header Section */}
      <div className="gsap-fade-up relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-900/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Platform Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Welcome back, Master Admin. Global command center status.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 ml-1" />
            <span>System Status: All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="gsap-fade-up">
        <AdminOverviewCards overview={overview} />
      </div>

      {/* Revenue & Bookings Bar Chart Section (Connected with real overview data) */}
      <div className="gsap-fade-up">
        <RevenueBookingsChart overview={overview} />
      </div>

      {/* Booking Status Overview Section */}
      <div className="gsap-fade-up">
        <BookingStatusBreakdown statusOverview={overview?.bookingStatusOverview} />
      </div>
    </div>
  );
}