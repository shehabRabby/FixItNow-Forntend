"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.25 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbOneRef = useRef<HTMLDivElement>(null);
  const orbTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbOneRef.current, {
        y: -60,
        x: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(orbTwoRef.current, {
        y: 60,
        x: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-2 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 text-center text-white space-y-8 shadow-2xl shadow-blue-600/30 relative overflow-hidden"
      >
        {/* Background Decorative Blur — parallax on scroll */}
        <div
          ref={orbOneRef}
          className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none will-change-transform"
        />
        <div
          ref={orbTwoRef}
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none will-change-transform"
        />

        {/* faint animated ring, purely decorative */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-black tracking-tight leading-tight"
          >
            Need Expert Help at Your Home Today?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto leading-relaxed"
          >
            Book trusted plumbing, electrical, and cleaning professionals in
            under 2 minutes. Transparent pricing with 100% satisfaction
            guarantee.
          </motion.p>
        </div>

        {/* Meaningful Action Buttons — now magnetic */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Magnetic>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-extrabold text-sm rounded-2xl transition-colors shadow-xl shadow-black/10 active:scale-95"
            >
              Book a Service Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>

          <Magnetic>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-800/60 hover:bg-blue-800/80 text-white font-bold text-sm rounded-2xl border border-blue-400/30 transition-colors backdrop-blur-md active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-blue-200" />
              Contact Support
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}