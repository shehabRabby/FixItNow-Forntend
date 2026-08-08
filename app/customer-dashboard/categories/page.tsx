"use client";

import { useEffect, useState, useMemo } from "react";
import { categoryService } from "@/services/category.service";
import { Search, Layers, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export default function CustomerCategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await categoryService.getAllCategories();
        if (isMounted && res?.success) {
          setCategories(res.data || []);
        }
      } catch {
        if (isMounted) {
          toast.error("Failed to load categories!");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((cat) => cat.name.toLowerCase().includes(query));
  }, [categories, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen"
    >
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl shadow-inner">
              <Layers className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Service Categories
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pl-1">
            Browse through our available categories to find the service you need.
          </p>
        </div>
      </div>

      {/* Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search category by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 text-right">
          Total Found:{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {filteredCategories.length}
          </span>
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-inner">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No categories found</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            No categories found matching your search. Try searching with a different name.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCategories.map((cat, index) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
              >
                {/* Top Accent Gradient Border Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3.2rem]">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.description || "No description provided for this category."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 px-3 py-1 rounded-xl truncate max-w-[140px]">
                    /{cat.slug}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}