"use client";

import { Search, UserCheck, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Choose a Service",
      desc: "Select from dozens of services and get instant pricing or custom quotes for your home needs.",
    },
    {
      step: "02",
      icon: UserCheck,
      title: "Pick a Professional",
      desc: "Browse verified provider profiles, check ratings, customer reviews, and select your top choice.",
    },
    {
      step: "03",
      icon: CalendarCheck,
      title: "Book & Relax",
      desc: "Schedule a convenient time slot. Pay safely after the job is completed to your satisfaction.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-4 max-w-7xl mx-auto text-center space-y-16 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl my-12 border border-slate-200/60 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
          Simple Process
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How FixItNow Works
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Get your home repairs and maintenance done smoothly in just 3 steps.
        </p>
      </div>

      {/* Steps Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-6xl mx-auto px-4">
        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-[2px] border-t-2 border-dashed border-blue-300 dark:border-blue-800 -translate-y-8 -z-10" />

        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group"
            >
              {/* Step Badge */}
              <span className="absolute top-5 right-6 text-sm font-black text-slate-300 dark:text-slate-700 group-hover:text-blue-600 transition-colors">
                STEP {item.step}
              </span>

              {/* Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                <Icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}