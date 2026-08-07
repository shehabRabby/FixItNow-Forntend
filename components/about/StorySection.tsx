"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-3">Our Origin Story</h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Built out of frustration. Perfected for reliability.</h3>
          <p className="text-muted-foreground text-base">
            FixItNow started when finding a trustworthy plumber or electrician felt like a gamble. We set out to build the infrastructure we wished existed for our own homes.
          </p>
        </motion.div>

        <div className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-border shadow-xl">
          <motion.div style={{ y: imageY }} className="absolute inset-[-20%] w-[140%] h-[140%]">
            <Image
              src="https://images.unsplash.com/photo-1642505172378-a6f5e5b15580?w=1200&auto=format&fit=crop&q=80"
              alt="FixItNow professional service delivery"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <div className="max-w-xl text-white">
              <span className="text-xs font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">The Turning Point</span>
              <p className="text-xl md:text-3xl font-bold mt-4 leading-snug">
                &ldquo;We didn&apos;t just build an app; we built an uncompromising standard for home care.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}