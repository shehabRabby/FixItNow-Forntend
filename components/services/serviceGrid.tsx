"use client";

import { Dispatch, SetStateAction } from "react";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";
import ServicePagination from "@/components/services/ServicePagination";
import { Service, Meta } from "@/types/service";
import { SlidersHorizontal } from "lucide-react";

interface ServiceGridProps {
  loading: boolean;
  services: Service[];
  meta: Meta;
  page: number;
  setPage: Dispatch<SetStateAction<number>>; 
  skeletonCount: number;
  onClearFilters: () => void;
}

export default function ServiceGrid({
  loading,
  services,
  meta,
  page,
  setPage,
  skeletonCount,
  onClearFilters,
}: ServiceGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
        <SlidersHorizontal className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          No services found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          There are no services matching your selected filters or search query.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-2 text-xs text-blue-600 hover:underline font-semibold"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <ServicePagination meta={meta} page={page} setPage={setPage} />
    </>
  );
}