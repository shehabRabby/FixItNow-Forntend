"use client";

import { AvailabilitySlotsForm } from "../components/AvailabilitySlotsForm";



export default function AvailabilityPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Availability Slots</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Set or update your working time slots for booking.
        </p>
      </div>

      <AvailabilitySlotsForm />
    </div>
  );
}