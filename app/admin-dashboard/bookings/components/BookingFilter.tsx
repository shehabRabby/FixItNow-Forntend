"use client";

interface BookingFilterProps {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
}

export function BookingFilter({ selectedStatus, onSelectStatus }: BookingFilterProps) {
  const statuses = [
    "ALL",
    "REQUESTED",
    "ACCEPTED",
    "PAID",
    "IN_PROGRESS",
    "COMPLETED",
    "DECLINED",
    "CANCELLED",
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 pb-2">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onSelectStatus(status)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedStatus === status
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          {status.replace("_", " ")}
        </button>
      ))}
    </div>
  );
}