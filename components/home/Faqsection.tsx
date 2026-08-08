"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How fast can a pro reach my home?",
    a: "Most tickets get matched with a nearby verified pro within 30 minutes, and same-day slots are available for most categories in covered cities.",
  },
  {
    q: "What if I'm not happy with the work?",
    a: "Every job carries a 100% satisfaction guarantee. If the work doesn't meet the agreed scope, we send someone back or refund the ticket — no back and forth.",
  },
  {
    q: "How is pricing decided?",
    a: "You see an estimate before confirming the booking. For jobs that need an on-site look, the pro shares a fixed quote first — you approve it before any work starts.",
  },
  {
    q: "Are the professionals background checked?",
    a: "Yes. Every pro on FixItNow passes an identity and background verification, plus a skills check for their category, before their first ticket.",
  },
  {
    q: "Can I reschedule or cancel a booking?",
    a: "You can reschedule or cancel free of charge up to 2 hours before the slot, directly from your ticket — no need to call support for it.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-2 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left rail */}
        <div className="lg:col-span-4 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-widest block"
          >
            OPEN QUESTIONS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
          >
            Before you file a ticket
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs"
          >
            Still have a question? Reach out and it gets treated like any
            other ticket — tracked to close.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white pb-1 border-b-2 border-slate-900 dark:border-white group"
            >
              Contact support
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-8 divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-slate-300 dark:text-slate-700 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                        isOpen
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${
                      isOpen
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pl-[calc(1.7rem+1rem)] pb-6 pr-10 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}