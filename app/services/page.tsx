"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";
import ServiceFilters from "@/components/services/ServiceFilters";
import ServicePagination from "@/components/services/ServicePagination";
import { Service, Meta } from "@/types/service";
import { Loader2, SlidersHorizontal } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

interface Category {
  id: string;
  name: string;
}

function ServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 8,
    total: 0,
    totalPage: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("searchTerm") || "",
  );
  const [categoryId, setCategoryId] = useState<string>(
    searchParams.get("categoryId") || "",
  );
  const [location, setLocation] = useState<string>(
    searchParams.get("location") || "",
  );
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const debouncedLocation = useDebounce(location, 400);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.success) setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Sync URL safely without triggering loops
  const updateQueryParams = useCallback(
    (newParams: Record<string, string | number | null>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      let hasChanged = false;

      Object.entries(newParams).forEach(([key, value]) => {
        const currentValue = currentParams.get(key);
        if (value) {
          if (currentValue !== String(value)) {
            currentParams.set(key, String(value));
            hasChanged = true;
          }
        } else if (currentValue !== null) {
          currentParams.delete(key);
          hasChanged = true;
        }
      });

      if (hasChanged) {
        router.push(`${pathname}?${currentParams.toString()}`, {
          scroll: false,
        });
      }
    },
    [pathname, router, searchParams],
  );

  // Fetch Services Function
  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (debouncedSearchTerm) query.append("searchTerm", debouncedSearchTerm);
      if (categoryId) query.append("categoryId", categoryId);
      if (debouncedLocation) query.append("location", debouncedLocation);
      query.append("page", page.toString());
      query.append("limit", "8");

      const res = await fetch(`${API_BASE_URL}/services?${query.toString()}`);
      const data = await res.json();

      if (data.success) {
        setServices(data.data || []);
        if (data.meta) setMeta(data.meta);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, categoryId, debouncedLocation, page]);

  // Fetch Data in Effect safely
  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
    };

    loadServices();
  }, [fetchServices]);

  // Keep URL in sync when filter values change
  useEffect(() => {
    updateQueryParams({
      searchTerm: debouncedSearchTerm,
      categoryId,
      location: debouncedLocation,
      page,
    });
  }, [
    debouncedSearchTerm,
    categoryId,
    debouncedLocation,
    page,
    updateQueryParams,
  ]);

  const handleFilterChange = (
    type: "search" | "category" | "location",
    val: string,
  ) => {
    setPage(1);
    if (type === "search") setSearchTerm(val);
    if (type === "category") setCategoryId(val);
    if (type === "location") setLocation(val);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryId("");
    setLocation("");
    setPage(1);
  };

  const selectedCategoryName = categories.find(
    (c) => c.id === categoryId,
  )?.name;

  // Dynamic Skeleton Calculation
  const getSkeletonCount = () => {
    const limit = meta.limit || 8;
    const total = meta.total || 0;

    // প্রথমবার লোড হওয়া অবস্থায় বা মোট ডাটা জানা না থাকলে ডিফল্ট লিমিট (8)
    if (!total) return limit;

    // বর্তমান পেজের জন্য কতগুলো আইটেম অবশিষ্টাংশ আছে তার হিসাব
    const remainingItems = total - (page - 1) * limit;
    return remainingItems > 0 ? Math.min(remainingItems, limit) : limit;
  };

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

        {/* Content Section - With Dynamic Skeleton Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: getSkeletonCount() }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        ) : services.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Pagination */}
            <ServicePagination meta={meta} page={page} setPage={setPage} />
          </>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <SlidersHorizontal className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No services found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              There are no services matching your selected filters or search
              query.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-2 text-xs text-blue-600 hover:underline font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex items-center justify-center text-slate-400 space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-xs font-medium">Loading page...</span>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
