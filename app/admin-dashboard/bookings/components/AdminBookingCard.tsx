"use client";

import { Loader2, CheckCircle2, XCircle, Trash2, Clock, MapPin, Play, CheckCheck } from "lucide-react";
import { IBooking } from "@/types";

interface AdminBookingCardProps {
  booking: IBooking;
  onUpdateStatus: (id: string, status: string) => void;
  onDeleteBooking: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function AdminBookingCard({
  booking,
  onUpdateStatus,
  onDeleteBooking,
  isUpdating,
  isDeleting,
}: AdminBookingCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "REQUESTED":
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-100 dark:border-amber-900/50">Requested</span>;
      case "ACCEPTED":
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-100 dark:border-emerald-900/50">Accepted</span>;
      case "PAID":
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 border border-blue-100 dark:border-blue-900/50">Paid</span>;
      case "IN_PROGRESS":
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-600 border border-purple-100 dark:border-purple-900/50">In Progress</span>;
      case "COMPLETED":
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-950/60 text-green-700 border border-green-100 dark:border-green-900/50">Completed</span>;
      case "DECLINED":
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-100 dark:border-rose-900/50">Declined</span>;
      case "CANCELLED":
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700">Cancelled</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700">{status}</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <div className="space-y-3 w-full lg:w-auto">
        <div className="flex flex-wrap items-center gap-3">
          {getStatusBadge(booking.status)}
          <span className="text-xs text-slate-400 break-all">
            Client: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{booking.customer?.name || "N/A"}</strong> ({booking.customer?.email})
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {booking.service?.title || "Service Name Not Available"}
          </h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" /> {booking.timeSlot || "N/A"}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {booking.service?.location || "N/A"}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">৳{booking.service?.price || 0}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons based on Booking Status */}
      <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
        {/* REQUESTED state actions */}
        {booking.status === "REQUESTED" && (
          <>
            <button
              type="button"
              onClick={() => onUpdateStatus(booking.id, "ACCEPTED")}
              disabled={isUpdating || isDeleting}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
            >
              {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              Accept
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(booking.id, "DECLINED")}
              disabled={isUpdating || isDeleting}
              className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 border border-rose-100 dark:border-rose-900/50"
            >
              {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
              Decline
            </button>
          </>
        )}

        {/* PAID state actions */}
        {booking.status === "PAID" && (
          <button
            type="button"
            onClick={() => onUpdateStatus(booking.id, "IN_PROGRESS")}
            disabled={isUpdating || isDeleting}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
          >
            {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            Start Progress
          </button>
        )}

        {/* IN_PROGRESS state actions */}
        {booking.status === "IN_PROGRESS" && (
          <button
            type="button"
            onClick={() => onUpdateStatus(booking.id, "COMPLETED")}
            disabled={isUpdating || isDeleting}
            className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
          >
            {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCheck className="w-3.5 h-3.5" />}
            Mark Complete
          </button>
        )}

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onDeleteBooking(booking.id)}
          disabled={isUpdating || isDeleting}
          className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-600 rounded-2xl transition-all cursor-pointer disabled:opacity-50 border border-slate-200 dark:border-slate-700 ml-auto lg:ml-0"
          title="Delete Booking"
        >
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin text-rose-600" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}