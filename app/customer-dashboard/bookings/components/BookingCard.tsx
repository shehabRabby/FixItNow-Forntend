"use client";

import { useState } from "react";
import {
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  Calendar,
  MapPin,
  CreditCard,
  Star,
  Sparkles,
} from "lucide-react";
import CheckoutModal from "./CheckoutModal";
import ReviewModal from "../../reviews/components/ReviewModal";

interface BookingCardProps {
  booking: {
    id: string;
    status: string;
    bookingDate?: string;
    date?: string;
    timeSlot?: string;
    address?: string;
    createdAt: string;
    service?: {
      id: string;
      title?: string;
      name?: string;
      description?: string;
      price?: number;
      location?: string;
    };
    price?: number;
  };
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

export function BookingCard({
  booking,
  onCancel,
  isCancelling,
}: BookingCardProps) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "REQUESTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:bg-amber-950/40 border border-amber-500/25 shrink-0">
            <Clock className="w-3.5 h-3.5" /> Requested
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:bg-blue-950/40 border border-blue-500/25 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
          </span>
        );
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/40 border border-emerald-500/25 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:bg-purple-950/40 border border-purple-500/25 shrink-0">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> In Progress
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-600 dark:bg-green-950/40 border border-green-500/25 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:bg-rose-950/40 border border-rose-500/25 shrink-0">
            <Ban className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case "DECLINED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:bg-red-950/40 border border-red-500/25 shrink-0">
            <XCircle className="w-3.5 h-3.5" /> Declined
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 shrink-0">
            {status}
          </span>
        );
    }
  };

  const serviceName =
    booking.service?.title ||
    booking.service?.name ||
    "Service Name Not Available";
  const rawDate = booking.bookingDate || booking.date || booking.createdAt;
  const timeSlot = booking.timeSlot || "N/A";
  const address =
    booking.address || booking.service?.location || "Location not provided";
  const price = booking.service?.price || booking.price || 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full justify-between space-y-6 group relative overflow-hidden">
      
      {/* Accent glow on top hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Service Request</span>
            </div>
            {/* Fixed height line-clamp area or consistent min-height for titles to maintain row alignment */}
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {serviceName}
            </h3>
            {booking.service?.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {booking.service.description}
              </p>
            )}
          </div>
          {getStatusBadge(booking.status)}
        </div>

        {/* Date & Time Slot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-xl shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Booking Date</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {rawDate ? new Date(rawDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 rounded-xl shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Time Slot</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {timeSlot}
              </p>
            </div>
          </div>
        </div>

        {/* Address / Location */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl">
          <div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 rounded-xl shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="w-full">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Service Location / Address
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200 break-words mt-0.5 line-clamp-1">
              {address}
            </p>
          </div>
        </div>

        {/* Price Box - pushed to the bottom of the content group */}
        <div className="mt-auto flex justify-between items-center bg-emerald-500/5 border border-emerald-500/10 px-4 py-3 rounded-2xl">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Total Amount:</span>
          <span className="font-black text-emerald-600 text-lg">৳{price.toLocaleString()}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-[11px] font-semibold text-slate-400">
          Requested on: {new Date(booking.createdAt).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end min-h-[36px]">
          {booking.status === "ACCEPTED" && (
            <button
              type="button"
              onClick={() => setIsPaymentOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Now</span>
            </button>
          )}

          {booking.status === "COMPLETED" && (
            <button
              type="button"
              onClick={() => setIsReviewOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/20 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Write Review</span>
            </button>
          )}

          {onCancel && booking.status === "REQUESTED" && (
            <button
              type="button"
              onClick={() => onCancel(booking.id)}
              disabled={isCancelling}
              className="w-full sm:w-auto px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-xs font-bold rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 border border-rose-100 dark:border-rose-900/50"
            >
              {isCancelling && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Cancel Booking</span>
            </button>
          )}
        </div>
      </div>

      {/* Stripe Modal */}
      <CheckoutModal
        isOpen={isPaymentOpen}
        bookingId={booking.id}
        amount={price}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={() => {
          setIsPaymentOpen(false);
          window.location.reload();
        }}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        bookingId={booking.id}
        onClose={() => setIsReviewOpen(false)}
        onSuccess={() => {
          setIsReviewOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
}