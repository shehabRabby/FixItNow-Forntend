"use client";

import { useRef } from "react";
import { ShieldCheck, Clock, Wallet, Headset } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    desc: "Every pro passes a background check and skill verification before they ever get a ticket assigned.",
    bg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border-blue-100 dark:border-blue-900",
    solid: "bg-blue-600",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "See the estimate before you book — no hidden call-out fees, no surprise line items on the invoice.",
    bg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border-emerald-100 dark:border-emerald-900",
    solid: "bg-emerald-600",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    desc: "Your pro arrives in the booked slot or we credit your account — tracked from open to close.",
    bg: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-100 dark:border-amber-900",
    solid: "bg-amber-600",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    desc: "A real ticket, a real person. Support stays with your job until it's marked resolved.",
    bg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border-indigo-100 dark:border-indigo-900",
    solid: "bg-indigo-600",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
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

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-2 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-widest"
        >
          WHY FIXITNOW
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          Built to close every ticket right
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map((r, index) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <TiltCard>
                <div className="group relative h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  {/* corner stamp, matches the hero ticket motif */}
                  <span className="absolute top-4 right-4 font-mono text-[10px] text-slate-300 dark:text-slate-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center border ${r.bg} group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {r.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>

                  <span
                    className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out ${r.solid}`}
                  />
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}