"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IBooking } from "@/types";
import { TechnicianBookingCard } from "./components/TechnicianBookingCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function TechnicianBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL"); // ফিল্টারিং স্টেট যোগ করা হলো

  const fetchBookings = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: token },
      });
      setBookings(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/bookings`, {
          headers: { Authorization: token },
        });
        setBookings(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
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
      await fetchBookings();
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

  // ফিল্টার লজিক
  const filteredBookings = bookings.filter((booking) => {
    if (filter === "ALL") return true;
    return booking.status === filter;
  });

  const statuses = [
    "ALL",
    "REQUESTED",
    "ACCEPTED",
    "PAID",
    "IN_PROGRESS",
    "COMPLETED",
    "DECLINED",
    "CANCELLED",
  ];

  if (loading) {
    return <div className="text-center py-10 text-slate-500">Loading bookings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Assigned Bookings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review service requests assigned to you and update their statuses according to job progress.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === status
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {status.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <TechnicianBookingCard
              key={booking.id}
              booking={booking}
              onUpdateStatus={handleUpdateStatus}
              isUpdating={updatingId === booking.id}
            />
          ))
        ) : (
          <div className="p-8 text-center text-sm text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No bookings found for this status.
          </div>
        )}
      </div>
    </div>
  );
}