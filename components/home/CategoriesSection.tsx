"use client";

import Link from "next/link";
import { 
  Wrench, 
  Zap, 
  Sparkles, 
  Paintbrush, 
  Tv, 
  Truck, 
  ShieldAlert, 
  ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "plumbing",
    name: "Plumbing",
    count: "120+ Pros",
    icon: Wrench,
    bg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border-blue-100 dark:border-blue-900",
  },
  {
    id: "electrical",
    name: "Electrical",
    count: "95+ Pros",
    icon: Zap,
    bg: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-100 dark:border-amber-900",
  },
  {
    id: "cleaning",
    name: "Cleaning & Maid",
    count: "150+ Pros",
    icon: Sparkles,
    bg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border-emerald-100 dark:border-emerald-900",
  },
  {
    id: "painting",
    name: "Painting & Decor",
    count: "80+ Pros",
    icon: Paintbrush,
    bg: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-100 dark:border-rose-900",
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    count: "110+ Pros",
    icon: Tv,
    bg: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 border-purple-100 dark:border-purple-900",
  },
  {
    id: "shifting",
    name: "Home Shifting",
    count: "60+ Pros",
    icon: Truck,
    bg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border-indigo-100 dark:border-indigo-900",
  },
  {
    id: "pest-control",
    name: "Pest Control",
    count: "45+ Pros",
    icon: ShieldAlert,
    bg: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 border-teal-100 dark:border-teal-900",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
            Explore Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Home Services
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Find certified experts for every home need with instant booking.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-900 transition-all w-fit group"
        >
          View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/services?category=${cat.id}`}
                className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 block h-full"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${cat.bg} group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {cat.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 font-medium">
                    Book Service <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600" />
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}