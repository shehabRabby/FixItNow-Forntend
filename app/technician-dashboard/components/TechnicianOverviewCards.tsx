"use client";

import { motion } from "framer-motion";
import { TrendingUp, UserCheck, Briefcase, Clock, CheckCircle } from "lucide-react";
import { IBooking, ITechnicianProfile } from "@/types";

interface TechnicianOverviewCardsProps {
  profile: ITechnicianProfile | null;
  bookings: IBooking[];
}

export function TechnicianOverviewCards({ profile, bookings }: TechnicianOverviewCardsProps) {
  const totalBookingsCount = bookings.length;
  const inProgressCount = bookings.filter((b) => b.status === "IN_PROGRESS").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;
  
  const totalEarnings = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.service?.price || 0), 0);

  const slotsCount = Array.isArray(profile?.availabilitySlots)
    ? profile.availabilitySlots.length
    : typeof profile?.availabilitySlots === "string"
    ? profile.availabilitySlots.split(",").filter(Boolean).length
    : 0;

  const skillsCount = typeof profile?.skills === "string"
    ? profile.skills.split(",").filter(Boolean).length
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Earnings Overview Card */}
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex justify-between items-start z-10">
          <div>
            <p className="text-[11px] uppercase font-extrabold tracking-wider text-slate-400">
              Total Earnings (Completed)
            </p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              ৳{totalEarnings.toLocaleString()}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <TrendingUp className="w-3.5 h-3.5" /> {completedCount} Jobs Done
          </span>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 z-10">
          <div>
            <span className="block font-bold text-slate-900 dark:text-white text-base">{totalBookingsCount}</span>
            <span>Total Assigned</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <span className="block font-bold text-indigo-600 text-base">{inProgressCount}</span>
            <span>In Progress</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <span className="block font-bold text-emerald-600 text-base">{completedCount}</span>
            <span>Completed</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Account Status", value: profile?.user?.status || "ACTIVE", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/50" },
          { label: "Experience", value: `${profile?.experienceYears || 0} Years`, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/50" },
          { label: "Total Skills", value: `${skillsCount} Skills`, icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/50" },
          { label: "Available Slots", value: `${slotsCount} Slots`, icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/50" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1 uppercase">
                  {stat.value}
                </h4>
              </div>
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}