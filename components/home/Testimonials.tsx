"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const rowOne = [
  {
    name: "Ayesha R.",
    city: "Dhanmondi, Dhaka",
    service: "Plumbing",
    tag: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border-blue-100 dark:border-blue-900",
    review:
      "Filed the ticket at night, pro showed up next morning within the slot. Fixed the leak in 20 minutes — no upsell, no drama.",
  },
  {
    name: "Tanvir H.",
    city: "Gulshan, Dhaka",
    service: "Electrical",
    tag: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-100 dark:border-amber-900",
    review:
      "Rewired two rooms. The quote matched the final bill exactly, which is rare for electrical work here. Booking again for the kitchen.",
  },
  {
    name: "Nusrat J.",
    city: "Uttara, Dhaka",
    service: "Cleaning",
    tag: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border-emerald-100 dark:border-emerald-900",
    review:
      "Deep-cleaned the whole flat before Eid guests arrived. The team was on time and genuinely thorough, even the exhaust fans.",
  },
  {
    name: "Rafiul K.",
    city: "Banani, Dhaka",
    service: "Appliance Repair",
    tag: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 border-purple-100 dark:border-purple-900",
    review:
      "AC compressor issue diagnosed correctly on the first visit. Support kept me updated on ticket status the entire time.",
  },
];

const rowTwo = [
  {
    name: "Mim S.",
    city: "Mirpur, Dhaka",
    service: "Painting",
    tag: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-100 dark:border-rose-900",
    review:
      "Repainted the living room in a weekend. Clean edges, no mess left behind — genuinely felt like a professional finish.",
  },
  {
    name: "Imran A.",
    city: "Bashundhara, Dhaka",
    service: "Home Shifting",
    tag: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border-indigo-100 dark:border-indigo-900",
    review:
      "Moved a full 3-bed apartment with zero damage. The crew labeled every box themselves. Would book again without a second thought.",
  },
  {
    name: "Farzana T.",
    city: "Mohammadpur, Dhaka",
    service: "Pest Control",
    tag: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 border-teal-100 dark:border-teal-900",
    review:
      "Cockroach problem in the kitchen sorted in one visit, follow-up scheduled automatically. Transparent about the chemicals used too.",
  },
  {
    name: "Shovon D.",
    city: "Dhanmondi, Dhaka",
    service: "Plumbing",
    tag: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border-blue-100 dark:border-blue-900",
    review:
      "Bathroom fitting replacement, pro brought the right parts on the first trip. Small thing, but it's what makes a service reliable.",
  },
];

function ReviewCard({ item }: { item: (typeof rowOne)[number] }) {
  return (
    <div className="shrink-0 w-[300px] sm:w-[340px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
            {item.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {item.name}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">{item.city}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.tag}`}>
          {item.service}
        </span>
      </div>

      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        “{item.review}”
      </p>
    </div>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: typeof rowOne;
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  const animName = reverse ? "fitnow-marquee-rev" : "fitnow-marquee-fwd";

  return (
    <div className="group/marquee relative overflow-hidden">
      <style>{`
        @keyframes fitnow-marquee-fwd {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes fitnow-marquee-rev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div
        className="flex gap-5 w-max group-hover/marquee:[animation-play-state:paused]"
        style={{ animation: `${animName} ${duration}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <ReviewCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-3 px-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-widest inline-block"
        >
          CLOSED TICKETS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          What customers say after
        </motion.h2>
      </div>

      <div className="space-y-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeRow items={rowOne} duration={38} />
        <MarqueeRow items={rowTwo} duration={42} reverse />
      </div>
    </section>
  );
}