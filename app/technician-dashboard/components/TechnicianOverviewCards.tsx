"use client";

import { UserCheck, Briefcase, Star, Clock } from "lucide-react";
import { ITechnicianProfile } from "@/types";

interface TechnicianOverviewCardsProps {
  profile: ITechnicianProfile | null;
}

export function TechnicianOverviewCards({ profile }: TechnicianOverviewCardsProps) {
  const slotsCount = Array.isArray(profile?.availabilitySlots)
    ? profile.availabilitySlots.length
    : typeof profile?.availabilitySlots === "string"
    ? profile.availabilitySlots.split(",").filter(Boolean).length
    : 0;

  const skillsCount = typeof profile?.skills === "string"
    ? profile.skills.split(",").filter(Boolean).length
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">Account Status</p>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 uppercase">
            {profile?.user?.status || "ACTIVE"}
          </h4>
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">Experience Years</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {profile?.experienceYears || 0} Years
          </h4>
        </div>
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600">
          <Briefcase className="w-5 h-5" />
        </div>
      </div>

      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">Total Skills</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {skillsCount}
          </h4>
        </div>
        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600">
          <Star className="w-5 h-5" />
        </div>
      </div>

      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">Available Slots</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {slotsCount}
          </h4>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
          <Clock className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}