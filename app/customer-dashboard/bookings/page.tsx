"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { bookingService } from "@/services/booking.service";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { BookingHeader } from "./components/BookingHeader";
import { BookingFilter } from "./components/BookingFilter";
import { BookingCard } from "./components/BookingCard";


interface IService {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  location?: string;
}

interface IBooking {
  id: string;
  status: string;
  bookingDate?: string;
  date?: string;
  timeSlot?: string;
  slot?: string;
  address?: string;
  location?: string;
  createdAt: string;
  service?: IService;
  serviceName?: string;
  price?: number;
}

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await bookingService.getAllBookings();
      if (res?.success) {
        setBookings(res.data || []);
      }
    } catch (error: unknown) {
      const errMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load bookings!";
      toast.error(errMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const res = await bookingService.getAllBookings();
        if (isMounted && res?.success) {
          setBookings(res.data || []);
        }
      } catch (error: unknown) {
        if (isMounted) {
          const errMessage =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Failed to load bookings!";
          toast.error(errMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCancelBooking = async (id: string) => {
    try {
      setCancellingId(id);
      const res = await bookingService.cancelBooking(id);
      if (res?.success) {
        toast.success("Booking cancelled successfully!");
        fetchBookings();
      }
    } catch (error: unknown) {
      const errMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to cancel booking!";
      toast.error(errMessage);
    } finally {
      setCancellingId(null);
    }
  };

  const filteredBookings = useMemo(() => {
    if (filterStatus === "ALL") return bookings;
    return bookings.filter((b) => b.status === filterStatus);
  }, [bookings, filterStatus]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      <BookingHeader />
      <BookingFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            No bookings found for the selected status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancelBooking}
              isCancelling={cancellingId === booking.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}