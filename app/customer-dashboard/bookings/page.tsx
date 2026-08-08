"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { bookingService } from "@/services/booking.service";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen"
    >
      <BookingHeader />
      
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2">
          Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredBookings.length}</span> bookings
        </div>
        <BookingFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>

      {filteredBookings.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No bookings found</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            No bookings found for the selected status. Try switching filters or create a new request.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <BookingCard
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={cancellingId === booking.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}