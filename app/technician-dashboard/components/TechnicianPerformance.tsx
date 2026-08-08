"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { IBooking } from "@/types";

interface TechnicianPerformanceProps {
  bookings: IBooking[];
}

export function TechnicianPerformance({ bookings }: TechnicianPerformanceProps) {
  const total = bookings.length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Performance & Reliability
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Based on your overall service delivery and completion history.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/10 text-blue-600 border border-blue-500/20">
          Top Rated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Bar Item */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-slate-600 dark:text-slate-300">Job Success Rate</span>
            <span className="text-emerald-600">{completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Badge 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Verified Expert</h4>
            <p className="text-[10px] text-slate-500">ID & Skills Verified</p>
          </div>
        </div>

        {/* Badge 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fast Response</h4>
            <p className="text-[10px] text-slate-500">Under 15 mins avg.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}