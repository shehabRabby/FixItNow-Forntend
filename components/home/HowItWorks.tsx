"use client";

import { useEffect, useRef } from "react";
import { Search, UserCheck, CalendarCheck } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Choose a Service",
    desc: "Select from dozens of services and get instant pricing or custom quotes for your home needs.",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Pick a Professional",
    desc: "Browse verified provider profiles, check ratings, customer reviews, and select your top choice.",
  },
  {
    step: "03",
    icon: CalendarCheck,
    title: "Book & Relax",
    desc: "Schedule a convenient time slot. Pay safely after the job is completed to your satisfaction.",
  },
];

function TiltStepCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-4 max-w-7xl mx-auto text-center space-y-16 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl my-12 border border-slate-200/60 dark:border-slate-800/80"
    >
      {/* Section Header */}
      <div className="space-y-3 max-w-xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800"
        >
          Simple Process
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          How FixItNow Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          Get your home repairs and maintenance done smoothly in just 3 steps.
        </motion.p>
      </div>

      {/* Steps Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-6xl mx-auto px-4">
        {/* Desktop connecting line — draws in as you scroll */}
        <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-[2px] -translate-y-8 -z-10 bg-slate-200 dark:bg-slate-800">
          <div
            ref={lineRef}
            className="h-full w-full origin-left bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"
          />
        </div>

        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TiltStepCard>
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group h-full">
                  {/* Step Badge */}
                  <span className="absolute top-5 right-6 text-sm font-black text-slate-300 dark:text-slate-700 group-hover:text-blue-600 transition-colors">
                    STEP {item.step}
                  </span>

                  {/* Icon Box */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </TiltStepCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}