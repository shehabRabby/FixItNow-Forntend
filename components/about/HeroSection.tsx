"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";
import Image from "next/image";

const ServiceCanvas3D = dynamic(() => import("./ServiceCanvas3D"), { ssr: false });

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.1 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full flex items-center justify-center overflow-hidden bg-background text-foreground pt-24 pb-20 px-6">
      <ServiceCanvas3D />
      
      {/* Light Suble Background Gradients */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Content (Span 7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block w-fit px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-blue-50 border border-blue-200 rounded-full text-blue-600 shadow-sm"
          >
            Redefining Home Maintenance
          </motion.span>

          <h1 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
            Crafting Trust, <br />
            <span className="text-blue-600">
              One Home at a Time.
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-base sm:text-lg font-normal mb-8 leading-relaxed max-w-xl"
          >
            FixItNow bridges elite craftsmanship with effortless digital booking. Experience elite plumbing, electrical, and cleaning services engineered for modern living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#mission"
              className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md shadow-blue-500/20"
            >
              Explore Our Vision
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-all border border-border"
            >
              Our Quality Standards
            </a>
          </motion.div>
        </div>

        {/* Right Image Container (Span 5 cols) - Balanced Square/Compact Size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative aspect-square max-w-[450px] mx-auto w-full rounded-3xl overflow-hidden shadow-xl border border-border bg-card"
        >
          <Image
            src="https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?w=800&auto=format&fit=crop&q=80"
            alt="FixItNow Professional Services"
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </motion.div>

      </div>
    </section>
  );
}