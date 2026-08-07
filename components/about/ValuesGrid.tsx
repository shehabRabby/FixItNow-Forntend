"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Sparkles, Headphones, Zap } from "lucide-react";

const features = [
  {
    icon: <Award className="w-6 h-6 text-blue-600" />,
    title: "Master Artisans",
    description: "Every technician undergoes strict technical testing, background checks, and continuous quality audits.",
    size: "col-span-1 lg:col-span-2",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
    title: "Guaranteed Security",
    description: "Full insurance coverage and secure background screening ensure complete peace of mind.",
    size: "col-span-1",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-blue-600" />,
    title: "Immaculate Standard",
    description: "We leave every work zone spotless, treating your household items and property with absolute care.",
    size: "col-span-1",
  },
  {
    icon: <Clock className="w-6 h-6 text-indigo-600" />,
    title: "On-Demand Speed",
    description: "Book repairs in seconds via our platform with transparent upfront pricing and rapid dispatch times.",
    size: "col-span-1 lg:col-span-2",
  },
];

export default function ValuesGrid() {
  return (
    <section className="py-24 px-6 bg-slate-50/50 relative border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Service Quality & Trust</h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Why Homeowners Choose FixItNow</h3>
          <p className="text-muted-foreground text-base">Designed to provide luxury hospitality standards for essential household upkeep.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${item.size} p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-medium text-blue-600">
                <span>Learn more about our standards</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}