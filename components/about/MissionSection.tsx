"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MissionSection() {
  return (
    <section id="mission" className="py-24 px-6 bg-slate-50/50 relative border-t border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Image Container (Now on the Left for Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative h-[400px] rounded-3xl overflow-hidden border border-border shadow-lg group bg-card order-2 md:order-1"
        >
          <Image
            src="https://images.unsplash.com/photo-1740657254989-42fe9c3b8cce?w=800&auto=format&fit=crop&q=80"
            alt="FixItNow Clean Workspace"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Text Content Container (Now on the Right for Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 md:order-2"
        >
          <h2 className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Our Core Mission</h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground">
            Elevating everyday spaces with absolute precision.
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            At FixItNow, we believe your living environment dictates your quality of life. We are replacing the friction of traditional home repairs with absolute transparency, verified professionals, and seamless digital execution.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <p className="text-3xl font-extrabold text-blue-600 mb-1">99.8%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">On-Time Arrival Rate</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-600 mb-1">50K+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Successful Bookings</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}