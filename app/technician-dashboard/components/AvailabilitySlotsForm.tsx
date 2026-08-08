"use client";

import { useState, useEffect, FormEvent } from "react";
import { getTechnicianProfile, updateAvailabilitySlots } from "@/services/technician.service";
import { ITechnicianProfile } from "@/types";
import { Clock, Plus, Check } from "lucide-react";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-xs text-slate-400 font-medium animate-pulse">Loading slots...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Clock className="w-5 h-5 text-emerald-600" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Manage Availability Slots
        </h3>
      </div>

      {/* Predefined Slots */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
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
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shadow-sm"
                    : "bg-slate-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:border-emerald-500"
                }`}
              >
                <span>{slot}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Slot */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
          Add Custom Slot
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customSlot}
            onChange={(e) => setCustomSlot(e.target.value)}
            placeholder="e.g. 08:00 PM - 10:00 PM"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-all"
          />
          <button
            type="button"
            onClick={handleAddCustomSlot}
            className="px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0"
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected Slots List */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
          Selected Slots ({selectedSlots.length}):
        </label>
        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-700/80 min-h-[50px] flex flex-wrap gap-2 items-center">
          {selectedSlots.length > 0 ? (
            selectedSlots.map((slot, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-medium border border-emerald-200/80 dark:border-emerald-800/80"
              >
                <span>{slot}</span>
                <button
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className="text-emerald-500 hover:text-rose-600 font-bold ml-0.5 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 font-normal">
              No slots selected yet. Click above to add.
            </span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold disabled:opacity-50 transition-all shadow-sm cursor-pointer"
      >
        {saving ? "Saving Slots..." : "Save Availability Slots"}
      </button>
    </form>
  );
}