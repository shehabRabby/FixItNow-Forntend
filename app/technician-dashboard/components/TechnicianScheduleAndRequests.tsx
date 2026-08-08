"use client";

import { Clock, MapPin, ArrowRight, User, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { IBooking } from "@/types";

interface TechnicianScheduleAndRequestsProps {
  bookings: IBooking[];
  onUpdateStatus: (id: string, status: string) => void;
  updatingId: string | null;
}

export function TechnicianScheduleAndRequests({
  bookings,
  onUpdateStatus,
  updatingId,
}: TechnicianScheduleAndRequestsProps) {
  // Filter active / in-progress or accepted bookings for schedule
  const activeBookings = bookings.filter(
    (b) => b.status === "IN_PROGRESS" || b.status === "PAID" || b.status === "ACCEPTED"
  );

  // Filter pending new requests
  const requestedBookings = bookings.filter((b) => b.status === "REQUESTED");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Active Schedule Timeline */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Active Schedule & Jobs
          </h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
            {activeBookings.length} Active
          </span>
        </div>

        {activeBookings.length > 0 ? (
          <div className="space-y-4">
            {activeBookings.map((item) => (
              <div
                key={item.id}
                className={`bg-white dark:bg-slate-900 p-5 rounded-3xl border transition-all shadow-sm ${
                  item.status === "IN_PROGRESS"
                    ? "border-blue-600/60 ring-4 ring-blue-500/5"
                    : "border-slate-200/80 dark:border-slate-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.status.replace("_", " ")}
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight mt-2">
                      {item.service?.title || "Service Name"}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> Client: {item.customer?.name || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-600">৳{item.service?.price || 0}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> {item.timeSlot || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> {item.service?.location || "N/A"}
                  </span>
                </div>

                {item.status === "PAID" && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => onUpdateStatus(item.id, "IN_PROGRESS")}
                      disabled={updatingId === item.id}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-1 disabled:opacity-50"
                    >
                      {updatingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      Start Service
                    </button>
                  </div>
                )}

                {item.status === "IN_PROGRESS" && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => onUpdateStatus(item.id, "COMPLETED")}
                      disabled={updatingId === item.id}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-1 disabled:opacity-50"
                    >
                      {updatingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            No active schedules running right now.
          </div>
        )}
      </div>

      {/* Incoming Requests Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Incoming Requests
          </h3>
          <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center">
            {requestedBookings.length}
          </span>
        </div>

        {requestedBookings.length > 0 ? (
          <div className="space-y-4">
            {requestedBookings.map((req) => (
              <div key={req.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-amber-500/40 shadow-sm">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                      New Request
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight mt-1">
                      {req.service?.title || "Service"}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {req.customer?.name || "Client"} • <strong className="text-emerald-600">৳{req.service?.price || 0}</strong>
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{req.timeSlot || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{req.service?.location || "N/A"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button
                    onClick={() => onUpdateStatus(req.id, "DECLINED")}
                    disabled={updatingId === req.id}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    {updatingId === req.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                    Decline
                  </button>
                  <button
                    onClick={() => onUpdateStatus(req.id, "ACCEPTED")}
                    disabled={updatingId === req.id}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    {updatingId === req.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            No new pending requests.
          </div>
        )}
      </div>
    </div>
  );
}