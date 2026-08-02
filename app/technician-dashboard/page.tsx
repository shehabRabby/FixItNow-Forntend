"use client";

import { useEffect, useState } from "react";
import { getTechnicianProfile } from "@/services/technician.service";
import { TechnicianOverviewCards } from "./components/TechnicianOverviewCards";
import { ITechnicianProfile } from "@/types";

export default function TechnicianDashboardPage() {
  const [profile, setProfile] = useState<ITechnicianProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getTechnicianProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // সেফলি স্লটগুলোকে অ্যারেতে কনভার্ট করা (যেহেতু ব্যাকএন্ড এখন অ্যারে পাঠাচ্ছে)
  const slotsArray = Array.isArray(profile?.availabilitySlots)
    ? profile.availabilitySlots
    : typeof profile?.availabilitySlots === "string"
      ? profile.availabilitySlots
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-slate-500 text-sm font-semibold animate-pulse">
          Loading technician dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome, {profile?.user?.name || "Technician"}!
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Here is your professional overview and activity summary.
        </p>
      </div>

      {/* Overview Cards */}
      <TechnicianOverviewCards profile={profile} />

      {/* Additional Profile Info Preview */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Bio & Skills Overview
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {profile?.bio ||
            "No bio added yet. Update your profile to add a bio."}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {slotsArray.length > 0 ? (
            slotsArray.map((slot, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
              >
                {slot}
              </span>
            ))
          ) : (
            <p className="text-xs text-slate-400">
              No availability slots added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
