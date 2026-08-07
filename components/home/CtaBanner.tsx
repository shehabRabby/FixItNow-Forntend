"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 text-center text-white space-y-8 shadow-2xl shadow-blue-600/30 relative overflow-hidden"
      >
        {/* Background Decorative Blur */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Need Expert Help at Your Home Today?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto leading-relaxed">
            Book trusted plumbing, electrical, and cleaning professionals in under 2 minutes. Transparent pricing with 100% satisfaction guarantee.
          </p>
        </div>

        {/* Meaningful Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-extrabold text-sm rounded-2xl transition-all shadow-xl shadow-black/10 hover:scale-105 active:scale-95"
          >
            Book a Service Now
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-800/60 hover:bg-blue-800/80 text-white font-bold text-sm rounded-2xl border border-blue-400/30 transition-all backdrop-blur-md hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-blue-200" />
            Contact Support
          </Link>
        </div>
      </motion.div>
    </section>
  );
}