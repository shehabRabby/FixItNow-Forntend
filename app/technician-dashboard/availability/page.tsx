"use client";

import { AvailabilitySlotsForm } from "../components/AvailabilitySlotsForm";

export default function AvailabilityPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12 px-4 sm:px-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Availability Slots
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
          Set or update your working time slots for client bookings.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <AvailabilitySlotsForm />
      </div>
    </div>
  );
}