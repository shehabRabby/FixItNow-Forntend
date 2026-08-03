"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Service, Meta } from "@/types/service";

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

export interface Category {
  id: string;
  name: string;
}

export function useServices() {
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
        if (data.success) {
          const categoriesArray = Array.isArray(data.data)
            ? data.data
            : data.data?.data || [];
          setCategories(categoriesArray);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Sync URL
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
        // ব্যাকএন্ডের নেস্টেড স্ট্রাকচার অথবা সরাসরি অ্যারে হ্যান্ডেল করার জন্য
        const servicesArray = Array.isArray(data.data)
          ? data.data
          : data.data?.data || [];

        const metaData = data.data?.meta || data.meta;

        setServices(servicesArray);
        if (metaData) setMeta(metaData);
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

  useEffect(() => {
    updateQueryParams({
      searchTerm: debouncedSearchTerm,
      categoryId,
      location: debouncedLocation,
      page,
    });

    let isSubscribed = true;
    const fetchData = async () => {
      if (isSubscribed) {
        await fetchServices();
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [
    debouncedSearchTerm,
    categoryId,
    debouncedLocation,
    page,
    updateQueryParams,
    fetchServices,
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

  const getSkeletonCount = () => {
    const limit = meta.limit || 8;
    const total = meta.total || 0;
    if (!total) return limit;
    const remainingItems = total - (page - 1) * limit;
    return remainingItems > 0 ? Math.min(remainingItems, limit) : limit;
  };

  return {
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
  };
}
