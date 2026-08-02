"use client";

import { Trash2, Edit3, MapPin, Tag } from "lucide-react";

interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  category?: { name: string };
}

interface ServiceCardProps {
  service: IService;
  onDelete: (id: string) => void;
  onEdit: (service: IService) => void;
}

export function ServiceCard({ service, onDelete, onEdit }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 flex items-center gap-1">
            <Tag className="w-3 h-3" /> {service.category?.name || "General"}
          </span>
          <span className="font-bold text-emerald-600 text-base">৳{service.price}</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">{service.title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {service.description}
        </p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-rose-500" /> {service.location}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(service)}
            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all cursor-pointer"
            title="Edit Service"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-all cursor-pointer"
            title="Delete Service"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}