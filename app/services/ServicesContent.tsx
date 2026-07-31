"use client";

import ServiceFilters from "@/components/services/ServiceFilters";
import { useServices } from "@/hooks/useServices";
import ServiceGrid from "@/components/services/serviceGrid";

export default function ServicesContent() {
  const {
    services,
    categories,
    meta,
    loading,
    searchTerm,
    categoryId,
    location,
    page,
    setPage,
    selectedCategoryName,
    handleFilterChange,
    handleClearFilters,
    getSkeletonCount,
  } = useServices();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Available Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Find and book expert technicians directly from your locality.
          </p>
        </div>

        {/* Filter Section */}
        <ServiceFilters
          searchTerm={searchTerm}
          location={location}
          categoryId={categoryId}
          categories={categories}
          selectedCategoryName={selectedCategoryName}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Content Section */}
        <ServiceGrid
          loading={loading}
          services={services}
          meta={meta}
          page={page}
          setPage={setPage}
          skeletonCount={getSkeletonCount()}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}