"use client";

import { motion } from "framer-motion";
import { Headphones, ArrowRight } from "lucide-react";

export function TechnicianSupportBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-600/10 flex flex-col sm:flex-row items-center justify-between gap-6"
    >
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="space-y-2 text-center sm:text-left z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
          <Headphones className="w-3.5 h-3.5" /> 24/7 Assistance
        </span>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight">
          Need Help with a Booking or Payout?
        </h3>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
          Our support team is always ready to resolve your disputes or guide you through platform guidelines.
        </p>
      </div>
    </motion.div>
  );
}