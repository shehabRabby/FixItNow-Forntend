"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "Satisfaction Guarantee", desc: "If you're not happy, we re-service for free." },
  { value: "45 Mins", label: "Average Response Time", desc: "Rapid dispatch for urgent household breakdowns." },
  { value: "4.9/5", label: "Customer Rating", desc: "Averaged across 50,000+ completed home tasks." },
  { value: "1,200+", label: "Verified Experts", desc: "Skilled artisans ready across your neighborhood." },
];

export default function ImpactSection() {
  return (
    <section className="py-20 px-6 bg-slate-50/50 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">{stat.value}</p>
              <h4 className="text-base font-semibold text-foreground mb-1">{stat.label}</h4>
              <p className="text-xs text-muted-foreground">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}