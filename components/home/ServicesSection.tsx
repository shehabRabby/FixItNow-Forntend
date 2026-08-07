"use client";

import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { getAllServices } from "@/services/service.service";

import ServiceCard from "@/components/ui/ServiceCard";
import { Loader2, Search, SlidersHorizontal, Sparkles } from "lucide-react";
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
      try {
        const res = await categoryService.getAllCategories();
        if (res && res.data) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Services when filters change
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await getAllServices({
          categoryId: selectedCategory || undefined,
          searchTerm: searchTerm || undefined,
          limit: 8,
        });

        if (res && res.success && res.data) {
          setServices(res.data);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchServices();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, searchTerm]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Featured Offerings
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore Popular Services
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Find the right expert for your household and tech repairs.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all shadow-sm ${
            selectedCategory === ""
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
              : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all shadow-sm ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-28">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50">
          <SlidersHorizontal className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            No services found
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try searching for something else or clear the filters.
          </p>
        </div>
      )}
    </section>
  );
}