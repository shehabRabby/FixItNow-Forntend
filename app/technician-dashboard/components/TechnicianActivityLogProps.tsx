"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, Clock } from "lucide-react";
import { IBooking } from "@/types";

interface TechnicianActivityLogProps {
  bookings: IBooking[];
}

export function TechnicianActivityLog({ bookings }: TechnicianActivityLogProps) {
  // Take top 3 recent bookings as activity items
  const recentActivities = bookings.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Recent Activities & Updates
        </h3>
        <span className="text-xs font-semibold text-slate-400">Live Feed</span>
      </div>

      <div className="space-y-3">
        {recentActivities.length > 0 ? (
          recentActivities.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {item.service?.title || "Service Assigned"}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Client: {item.customer?.name || "N/A"} • Status: <strong className="text-blue-600">{item.status}</strong>
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                {item.timeSlot || "Recent"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">No recent activity logs available.</p>
        )}
      </div>
    </motion.div>
  );
}