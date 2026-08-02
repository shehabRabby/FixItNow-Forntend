"use client";

import { Plus } from "lucide-react";

interface ServiceHeaderProps {
  onOpenModal: () => void;
}

export function ServiceHeader({ onOpenModal }: ServiceHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Manage My Services</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Create and manage your professional service offerings.
        </p>
      </div>
      <button
        onClick={onOpenModal}
        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" /> Add New Service
      </button>
    </div>
  );
}