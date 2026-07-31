"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I change or cancel a booking?",
    answer:
      "You can modify or cancel your booking directly from your account dashboard up to 2 hours before the scheduled appointment time with no penalty.",
  },
  {
    question: "How are your service professionals vetted?",
    answer:
      "Every pro undergoes a strict multi-step vetting process including background checks, license verification, interview, and skill assessment.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes, all payments are encrypted and processed securely. Payment is held safely and only released once the job is completed to your satisfaction.",
  },
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-8 max-w-3xl mx-auto pt-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Frequently Asked Questions</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Find quick answers to common questions about our platform.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-6 py-4 text-left font-semibold text-xs sm:text-sm flex items-center justify-between gap-4 text-slate-800 dark:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                  openIdx === idx ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-4 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}