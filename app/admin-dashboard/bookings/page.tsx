"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import { IBooking } from "@/types"; // গ্লোবাল টাইপ ইম্পোর্ট করা হলো
import { BookingFilter } from "./components/BookingFilter";
import { AdminBookingCard } from "./components/AdminBookingCard";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      try {
        const res = await axiosInstance.get("/admin/bookings");
        if (isMounted && res.data?.success) {
          setBookings(res.data.data || []);
        }
      } catch {
        if (isMounted) {
          toast.error("Failed to load all bookings!");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      setUpdatingId(id);
      const res = await axiosInstance.patch(`/admin/bookings/${id}/status`, { status });
      if (res.data?.success) {
        toast.success(`Booking ${status.toLowerCase()} successfully!`);
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: status as IBooking["status"] } : b))
        );
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update status!");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      setDeletingId(id);
      const res = await axiosInstance.delete(`/admin/bookings/${id}`);
      if (res.data?.success) {
        toast.success("Booking deleted successfully!");
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete booking!");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter bookings based on selected status
  const filteredBookings = selectedStatus === "ALL"
    ? bookings
    : bookings.filter((b) => b.status === selectedStatus);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Manage All Bookings
        </h1>
        <p className="text-sm text-slate-500">
          Review customer service requests and manage their statuses.
        </p>
      </div>

      {/* Filter Tabs */}
      <BookingFilter
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      {/* Bookings List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-500">No bookings found for this filter.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <AdminBookingCard
              key={booking.id}
              booking={booking}
              onUpdateStatus={handleUpdateStatus}
              onDeleteBooking={handleDeleteBooking}
              isUpdating={updatingId === booking.id}
              isDeleting={deletingId === booking.id}
            />
          ))
        )}
      </div>
    </div>
  );
}