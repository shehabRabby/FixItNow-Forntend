"use client";

interface UserFilterProps {
  selectedRole: string;
  onSelectRole: (role: string) => void;
}

export function UserFilter({ selectedRole, onSelectRole }: UserFilterProps) {
  const filters = [
    { label: "All Users", value: "ALL" },
    { label: "Customers", value: "CUSTOMER" },
    { label: "Technicians", value: "TECHNICIAN" },
    { label: "Admins", value: "ADMIN" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onSelectRole(filter.value)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedRole === filter.value
              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}