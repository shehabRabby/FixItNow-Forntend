"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const items = [
  "Verified Professionals",
  "100% Secure Payment",
  "Instant Booking",
  "24/7 Customer Support",
  "Zero Hidden Charges",
  "Guaranteed Satisfaction",
];

export default function MarqueeTicker() {
  return (
    <div className="bg-blue-600 text-white py-4 overflow-hidden whitespace-hidden select-none border-y border-blue-500 shadow-lg">
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-8 text-sm sm:text-base font-extrabold uppercase tracking-widest shrink-0"
        >
          {[...items, ...items, ...items].map((text, i) => (
            <div key={i} className="flex items-center gap-8">
              <span>{text}</span>
              <Sparkles className="w-4 h-4 text-blue-200 fill-blue-200" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}