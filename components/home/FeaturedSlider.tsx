"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";

const featuredHighlights = [
  {
    title: "Emergency Electrical Troubleshooting",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    rating: "4.9",
    pros: "95+ Experts Available",
  },
  {
    title: "Advanced Pipe & Leakage Fixing",
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1542013936693-84d4964e5c8e?q=80&w=800&auto=format&fit=crop",
    rating: "5.0",
    pros: "120+ Experts Available",
  },
  {
    title: "Deep Home & Deep Sanitation Cleaning",
    category: "Cleaning & Maid",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    rating: "4.8",
    pros: "150+ Experts Available",
  },
  {
    title: "Smart AC Servicing & Gas Filling",
    category: "Appliance Repair",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
    rating: "4.9",
    pros: "110+ Experts Available",
  },
];

export default function FeaturedSlider() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-slate-950 text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Section Header overlay or side info */}
        <div className="absolute top-12 left-6 lg:left-16 z-20 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-800">
            Immersive Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Curated Masterpieces <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              For Your Living Space
            </span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-6 lg:pl-16 pt-24">
          {featuredHighlights.map((item, idx) => (
            <div
              key={idx}
              className="relative h-[450px] w-[320px] sm:w-[450px] flex-shrink-0 rounded-3xl overflow-hidden group border border-slate-800 bg-slate-900 shadow-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-xl shadow-md">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {item.rating}
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-blue-400 font-semibold">{item.pros}</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-bold bg-white text-slate-950 hover:bg-blue-600 hover:text-white px-5 py-3 rounded-xl transition-all duration-300 w-full justify-center group/btn shadow-lg"
                >
                  Explore Details 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}