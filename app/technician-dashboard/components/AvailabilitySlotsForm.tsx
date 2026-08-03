"use client";

import { useState, useEffect, FormEvent } from "react";
import { getTechnicianProfile, updateAvailabilitySlots } from "@/services/technician.service";
import { ITechnicianProfile } from "@/types";


const PREDEFINED_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
];

export function AvailabilitySlotsForm() {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [customSlot, setCustomSlot] = useState("");

  useEffect(() => {
    getTechnicianProfile().then((data: ITechnicianProfile | null) => {
      if (data && data.availabilitySlots) {
        const slotsArray = Array.isArray(data.availabilitySlots)
          ? data.availabilitySlots
          : typeof data.availabilitySlots === "string"
          ? data.availabilitySlots.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
        setSelectedSlots(slotsArray);
      }
      setLoading(false);
    });
  }, []);

  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

 
  const handleAddCustomSlot = () => {
    if (customSlot.trim() && !selectedSlots.includes(customSlot.trim())) {
      setSelectedSlots([...selectedSlots, customSlot.trim()]);
      setCustomSlot("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAvailabilitySlots(selectedSlots);
      alert("Availability slots updated successfully!");
    } catch {
      alert("Failed to update availability slots");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Manage Availability Slots</h3>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
          Click to Select Time Slots:
        </label>
        <div className="flex flex-wrap gap-2">
          {PREDEFINED_SLOTS.map((slot) => {
            const isSelected = selectedSlots.includes(slot);
            return (
              <button
                type="button"
                key={slot}
                onClick={() => toggleSlot(slot)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500"
                }`}
              >
                {slot} {isSelected ? "✓" : "+"}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Add Custom Slot
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customSlot}
            onChange={(e) => setCustomSlot(e.target.value)}
            placeholder="e.g. 08:00 PM - 10:00 PM"
            className="w-full px-3 py-2 rounded-lg border text-sm bg-slate-50 dark:bg-slate-800"
          />
          <button
            type="button"
            onClick={handleAddCustomSlot}
            className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg text-xs font-semibold hover:bg-slate-900"
          >
            Add
          </button>
        </div>
      </div>

   
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Selected Slots ({selectedSlots.length}):
        </label>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 min-h-[45px] flex flex-wrap gap-1.5 items-center">
          {selectedSlots.length > 0 ? (
            selectedSlots.map((slot, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-md text-xs font-medium border border-emerald-200 dark:border-emerald-800"
              >
                {slot}
                <button
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className="text-emerald-500 hover:text-rose-600 ml-1 font-bold"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400">No slots selected yet. Click above to add.</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 transition-all"
      >
        {saving ? "Saving Slots..." : "Save Availability Slots"}
      </button>
    </form>
  );
}