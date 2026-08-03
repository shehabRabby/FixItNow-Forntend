import { Clock } from "lucide-react";

const PRESET_TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

interface TimeSlotPickerProps {
  selectedSlot: string;
  onChange: (slot: string) => void;
}

export default function TimeSlotPicker({ selectedSlot, onChange }: TimeSlotPickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-blue-600" /> Time Slot
      </label>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PRESET_TIME_SLOTS.map((slot) => {
          const isSelected = selectedSlot === slot;
          return (
            <button
              type="button"
              key={slot}
              onClick={() => onChange(slot)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400"
              }`}
            >
              <span>{slot}</span>
              {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Or type custom time (e.g., 03:30 PM - 05:00 PM)"
          value={selectedSlot}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
        />
      </div>
    </div>
  );
}