"use client";

import { Search, MapPin, Grid, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ServiceFiltersProps {
  searchTerm: string;
  location: string;
  categoryId: string;
  categories: Category[];
  selectedCategoryName?: string;
  onFilterChange: (
    type: "search" | "category" | "location",
    val: string,
  ) => void;
  onClearFilters: () => void;
}

export default function ServiceFilters({
  searchTerm,
  location,
  categoryId,
  categories,
  selectedCategoryName,
  onFilterChange,
  onClearFilters,
}: ServiceFiltersProps) {
  const hasActiveFilters = Boolean(searchTerm || categoryId || location);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Search title or keyword..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative flex items-center">
          <Grid className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <select
            value={categoryId}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white appearance-none cursor-pointer transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location Input */}
        <div className="relative flex items-center">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={location}
            onChange={(e) => onFilterChange("location", e.target.value)}
            placeholder="Filter by location (e.g. Dhaka)"
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white transition-colors"
          />
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium">
              Active Filters:
            </span>

            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-900">
                Query: "{searchTerm}"
                <button onClick={() => onFilterChange("search", "")}>
                  <X className="w-3 h-3 hover:opacity-80" />
                </button>
              </span>
            )}

            {categoryId && (
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-900">
                Category: {selectedCategoryName || "Selected"}
                <button onClick={() => onFilterChange("category", "")}>
                  <X className="w-3 h-3 hover:opacity-80" />
                </button>
              </span>
            )}

            {location && (
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-900">
                Location: {location}
                <button onClick={() => onFilterChange("location", "")}>
                  <X className="w-3 h-3 hover:opacity-80" />
                </button>
              </span>
            )}
          </div>

          <button
            onClick={onClearFilters}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline shrink-0"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
