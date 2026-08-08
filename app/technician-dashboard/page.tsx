"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import { getTechnicianProfile } from "@/services/technician.service";
import { TechnicianOverviewCards } from "./components/TechnicianOverviewCards";
import { TechnicianScheduleAndRequests } from "./components/TechnicianScheduleAndRequests";
import { TechnicianPerformance } from "./components/TechnicianPerformance";

import { TechnicianSupportBanner } from "./components/TechnicianSupportBanner";
import { IBooking, ITechnicianProfile } from "@/types";
import { TechnicianActivityLog } from "./components/TechnicianActivityLogProps";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const fetchDashboardData = async (
  setProfile: (profile: ITechnicianProfile | null) => void,
  setBookings: (bookings: IBooking[]) => void,
  setLoading: (loading: boolean) => void
) => {
  const token = Cookies.get("token");
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const [profileData, bookingsRes] = await Promise.all([
      getTechnicianProfile(),
      axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: token },
      }),
    ]);

    setProfile(profileData);
    setBookings(bookingsRes.data?.data || []);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  } finally {
    setLoading(false);
  }
};

export default function TechnicianDashboardPage() {
  const [profile, setProfile] = useState<ITechnicianProfile | null>(null);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData(setProfile, setBookings, setLoading);
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    const token = Cookies.get("token");
    if (!token) return;

    setUpdatingId(id);
    try {
      await axios.patch(
        `${API_URL}/bookings/${id}/status`,
        { status },
        { headers: { Authorization: token } }
      );
      await fetchDashboardData(setProfile, setBookings, () => {});
    } catch (error: unknown) {
      console.error("Failed to update booking status", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to update booking status";
      alert(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 sm:space-y-8 pb-12 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome, {profile?.user?.name || "Technician"}!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Here is your professional overview and live job activities.
        </p>
      </div>

      {/* 1. Overview Metric Cards */}
      <TechnicianOverviewCards profile={profile} bookings={bookings} />

      {/* 2. Schedule & Incoming Requests */}
      <TechnicianScheduleAndRequests
        bookings={bookings}
        onUpdateStatus={handleUpdateStatus}
        updatingId={updatingId}
      />

      {/* 3. Grid for Performance & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechnicianPerformance bookings={bookings} />
        <TechnicianActivityLog bookings={bookings} />
      </div>

      {/* 4. Bio & Availability Slots */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          Bio & Availability Slots
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {profile?.bio || "No bio added yet. Update your profile to add a bio."}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {slotsArray.length > 0 ? (
            slotsArray.map((slot, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                {slot}
              </span>
            ))
          ) : (
            <p className="text-xs text-slate-400">No availability slots added.</p>
          )}
        </div>
      </div>

      {/* 5. Support Assistance Banner */}
      <TechnicianSupportBanner />

    </motion.div>
  );
}