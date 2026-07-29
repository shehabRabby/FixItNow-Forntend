import { UserCheck, Wrench } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: "CUSTOMER" | "TECHNICIAN";
  onSelect: (role: "CUSTOMER" | "TECHNICIAN") => void;
}

export default function RoleSelector({
  selectedRole,
  onSelect,
}: RoleSelectorProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
        I want to join as
      </label>
      <div className="grid grid-cols-2 gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => onSelect("CUSTOMER")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
            selectedRole === "CUSTOMER"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
              : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Customer</span>
        </button>

        <button
          type="button"
          onClick={() => onSelect("TECHNICIAN")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
            selectedRole === "TECHNICIAN"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
              : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Technician</span>
        </button>
      </div>
    </div>
  );
}
