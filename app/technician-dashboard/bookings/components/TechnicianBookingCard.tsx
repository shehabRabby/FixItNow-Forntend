"use client";

import { Loader2, CheckCircle2, XCircle, Clock, MapPin, User, ArrowRight } from "lucide-react";
import { IBooking } from "@/types";

interface TechnicianBookingCardProps {
  booking: IBooking;
  onUpdateStatus: (id: string, status: string) => void;
  isUpdating: boolean;
}

export function TechnicianBookingCard({
  booking,
  onUpdateStatus,
  isUpdating,
}: TechnicianBookingCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "REQUESTED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">Requested</span>;
      case "ACCEPTED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">Accepted (Awaiting Payment)</span>;
      case "PAID":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">Paid (Ready to Start)</span>;
      case "IN_PROGRESS":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">In Progress</span>;
      case "DECLINED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600">Declined</span>;
      case "COMPLETED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">Completed</span>;
      case "CANCELLED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{status}</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-all">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {getStatusBadge(booking.status)}
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            Client: <strong className="text-slate-700 dark:text-slate-300">{booking.customer?.name || "N/A"}</strong>
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {booking.service?.title || "Service Name Not Available"}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {booking.timeSlot || "N/A"}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-500" /> {booking.service?.location || "N/A"}</span>
            <span className="font-semibold text-emerald-600">৳{booking.service?.price || 0}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons for Technician aligned with Backend State Machine */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {booking.status === "REQUESTED" && (
          <>
            <button
              type="button"
              onClick={() => onUpdateStatus(booking.id, "ACCEPTED")}
              disabled={isUpdating}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              Accept
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(booking.id, "DECLINED")}
              disabled={isUpdating}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
              Decline
            </button>
          </>
        )}

        {booking.status === "ACCEPTED" && (
          <span className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl font-medium">
            Waiting for client payment
          </span>
        )}

        {booking.status === "PAID" && (
          <button
            type="button"
            onClick={() => onUpdateStatus(booking.id, "IN_PROGRESS")}
            disabled={isUpdating}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
          >
            {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
            Start Service (In Progress)
          </button>
        )}

        {booking.status === "IN_PROGRESS" && (
          <button
            type="button"
            onClick={() => onUpdateStatus(booking.id, "COMPLETED")}
            disabled={isUpdating}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
          >
            {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
}