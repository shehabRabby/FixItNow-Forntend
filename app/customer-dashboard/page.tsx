"use client";

import { useEffect, useState } from "react";
import { getCustomerDashboardOverview } from "@/services/profile.service";
import { Calendar, CreditCard, CheckCircle2, ArrowUpRight, Activity, ShieldCheck, Headphones, Wrench, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-slate-500 text-sm font-bold animate-pulse">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  const total = Number(overview?.totalBookings) || 0;
  const completed = Number(overview?.completedJobs) || 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-blue-500/20">
              Customer Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, <span className="text-blue-600 dark:text-blue-400">Valued Client</span>!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Track your service requests, monitor payments, and manage bookings seamlessly from one place.
          </p>
        </div>

        <Link
          href="/customer-dashboard/bookings/create"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 inline-flex items-center gap-2 shrink-0 active:scale-95"
        >
          <span>Book New Service</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Bookings Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Total Bookings</p>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">
            {overview?.totalBookings || 0}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">Active</span> service requests overall
          </p>
        </div>

        {/* Pending Payments Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Pending Payments</p>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">
            {overview?.pendingPayments || 0}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
            <span className="text-amber-600 font-bold">Action required</span> for pending dues
          </p>
        </div>

        {/* Completed Jobs Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Completed Jobs</p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">
            {overview?.completedJobs || 0}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">Successfully</span> delivered services
          </p>
        </div>
      </div>

      {/* Analytics & Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Summary Bar Chart/Progress */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Service Performance Overview</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ratio of completed services vs total bookings</p>
            </div>
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-6 my-auto">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Job Completion Rate</span>
                <span className="text-blue-600 dark:text-blue-400">{completionRate}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Success Status</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Fully Verified
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Account Standing</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Client
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Static Quick Support / Service Health Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Need Professional Help?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Our support team is available 24/7 to help you resolve any issues regarding your bookings or payments.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Response time: <strong>Under 15 mins</strong></span>
            </div>
            <Link
              href="/customer-dashboard/bookings"
              className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black rounded-2xl transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md hover:bg-blue-600 dark:hover:bg-blue-500"
            >
              <span>View All Bookings</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Extra Static Section: Quick Tips & Features */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">Smart Maintenance Tips</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Best practices to keep your home appliances running efficiently</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <Wrench className="w-4 h-4" /> Regular Servicing
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Schedule your HVAC or AC servicing prior to summer and winter seasons for peak performance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Instant Payment
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Clear your pending service bills promptly through the portal to unlock priority scheduling.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> Verified Experts
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              All assigned professionals are background-checked, certified, and rated by real clients.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}