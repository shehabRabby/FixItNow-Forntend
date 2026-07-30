"use client";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/category.service";
import { getAllServices } from "@/services/service.service";

import ServiceCard from "@/components/ui/ServiceCard";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import { ICategory, IService } from "@/types";

export default function ServicesSection() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch Categories once
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success && res.data) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Services when filters change
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const res = await getAllServices({
        categoryId: selectedCategory || undefined,
        searchTerm: searchTerm || undefined,
        limit: 8, // Home page-এ প্রথম ৮টি সার্ভিস দেখাবে
      });

      if (res.success && res.data) {
        setServices(res.data);
      } else {
        setServices([]);
      }
      setLoading(false);
    };

    // Small debounce for search input
    const delayDebounceFn = setTimeout(() => {
      fetchServices();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, searchTerm]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore Popular Services
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Find the right expert for your household and tech repairs.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            selectedCategory === ""
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <SlidersHorizontal className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No services found
          </p>
          <p className="text-xs text-slate-500">
            Try searching for something else or clear the filters.
          </p>
        </div>
      )}
    </section>
  );
}
