"use client";

import { ServiceCard } from "./ServiceCard";

interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  category?: { name: string };
  technicianProfile?: { userId: string };
}

interface ServiceListProps {
  services: IService[];
  onDelete: (id: string) => void;
  onEdit: (service: IService) => void;
}

export function ServiceList({ services, onDelete, onEdit }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.length > 0 ? (
        services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <div className="col-span-2 p-8 text-center text-sm text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          No services found. Create your first service!
        </div>
      )}
    </div>
  );
}