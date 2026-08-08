"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Wrench,
  Zap,
  Sparkles,
  Paintbrush,
  Tv,
  Truck,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const categories = [
  {
    id: "plumbing",
    name: "Plumbing",
    count: "120+ Pros",
    icon: Wrench,
    bg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border-blue-100 dark:border-blue-900",
    solid: "bg-blue-600",
    ring: "hover:border-blue-300 dark:hover:border-blue-800",
  },
  {
    id: "electrical",
    name: "Electrical",
    count: "95+ Pros",
    icon: Zap,
    bg: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-100 dark:border-amber-900",
    solid: "bg-amber-600",
    ring: "hover:border-amber-300 dark:hover:border-amber-800",
  },
  {
    id: "cleaning",
    name: "Cleaning & Maid",
    count: "150+ Pros",
    icon: Sparkles,
    bg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border-emerald-100 dark:border-emerald-900",
    solid: "bg-emerald-600",
    ring: "hover:border-emerald-300 dark:hover:border-emerald-800",
  },
  {
    id: "painting",
    name: "Painting & Decor",
    count: "80+ Pros",
    icon: Paintbrush,
    bg: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-100 dark:border-rose-900",
    solid: "bg-rose-600",
    ring: "hover:border-rose-300 dark:hover:border-rose-800",
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    count: "110+ Pros",
    icon: Tv,
    bg: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 border-purple-100 dark:border-purple-900",
    solid: "bg-purple-600",
    ring: "hover:border-purple-300 dark:hover:border-purple-800",
  },
  {
    id: "shifting",
    name: "Home Shifting",
    count: "60+ Pros",
    icon: Truck,
    bg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border-indigo-100 dark:border-indigo-900",
    solid: "bg-indigo-600",
    ring: "hover:border-indigo-300 dark:hover:border-indigo-800",
  },
  {
    id: "pest-control",
    name: "Pest Control",
    count: "45+ Pros",
    icon: ShieldAlert,
    bg: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 border-teal-100 dark:border-teal-900",
    solid: "bg-teal-600",
    ring: "hover:border-teal-300 dark:hover:border-teal-800",
  },
];

const layout = [
  "col-span-2 sm:col-span-3 lg:col-span-3 lg:row-span-2", // plumbing — featured
  "col-span-1 sm:col-span-3 lg:col-span-3 lg:row-span-1", // electrical
  "col-span-1 sm:col-span-3 lg:col-span-3 lg:row-span-1", // cleaning
  "col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-1", // painting
  "col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-1", // appliance
  "col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-1", // shifting
  "col-span-2 sm:col-span-3 lg:col-span-6 lg:row-span-1", // pest control — strip
];

/* ------------------------------------------------------------------ */
/* Tilt card — subtle 3D perspective tilt that follows the cursor      */
/* ------------------------------------------------------------------ */
function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * intensity);
    rx.set(-py * intensity);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CategoriesSection() {
  return (
    <section className="py-18 px-4 sm:px-6 lg:px-2 max-w-7xl mx-auto">
      {/* Header — set like a directory front page */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 pb-8 border-b-2 border-slate-900 dark:border-white">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-widest block"
          >
            SERVICE DIRECTORY — VOL. 01
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-4xl sm:text-6xl font-black text-slate-800 dark:text-white tracking-tighter leading-[0.95]"
          >
            Popular Home
            <br />
            Services
          </motion.h2>
        </div>
        <div className="flex items-end justify-between lg:justify-start gap-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[220px] leading-relaxed">
            Certified experts, verified reviews, instant booking. Browse the
            full catalog below.
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-white shrink-0 pb-1 border-b-2 border-slate-900 dark:border-white"
          >
            View All
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Directory grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:auto-rows-[128px] gap-3 sm:gap-4">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          const featured = index === 0;
          const strip = index === categories.length - 1;
          const tag = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={layout[index]}
            >
              <TiltCard
                intensity={featured ? 6 : 4}
                className="h-full w-full [transform-style:preserve-3d]"
              >
                <Link
                  href={`/services?category=${cat.id}`}
                  className={`group relative flex h-full w-full border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300 ${cat.ring} ${
                    strip
                      ? "flex-row items-center justify-between px-6 py-5"
                      : "flex-col justify-between p-5 sm:p-6"
                  }`}
                >
                  {/* index tag, catalog-style */}
                  <span className="absolute top-3 right-4 font-mono text-[10px] text-slate-300 dark:text-slate-700 group-hover:text-slate-400 dark:group-hover:text-slate-600 transition-colors">
                    {tag}
                  </span>

                  {strip ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center border ${cat.bg} shrink-0`}
                        >
                          <Icon className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {cat.name}
                          </h3>
                          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                            {cat.count}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </>
                  ) : (
                    <>
                      <div
                        className={`flex items-center justify-center rounded-xl border ${cat.bg} transition-transform duration-300 group-hover:-translate-y-0.5 ${
                          featured ? "w-16 h-16 sm:w-20 sm:h-20" : "w-11 h-11"
                        }`}
                        style={{ transform: "translateZ(30px)" }}
                      >
                        <Icon
                          className={featured ? "w-8 h-8 sm:w-9 sm:h-9" : "w-5 h-5"}
                          strokeWidth={1.75}
                        />
                      </div>

                      <div className="space-y-1.5" style={{ transform: "translateZ(20px)" }}>
                        {featured && (
                          <span className={`inline-block text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${cat.solid} mb-1`}>
                            Most Booked
                          </span>
                        )}
                        <h3
                          className={`font-bold text-slate-900 dark:text-white tracking-tight ${
                            featured ? "text-2xl sm:text-3xl" : "text-sm sm:text-base"
                          }`}
                        >
                          {cat.name}
                        </h3>
                        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 dark:text-slate-500">
                          <span>{cat.count}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* bottom accent, category's own color */}
                  <span
                    className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out ${cat.solid}`}
                  />
                </Link>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}