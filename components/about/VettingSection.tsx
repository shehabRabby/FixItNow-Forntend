"use client";

import { motion } from "framer-motion";
import { UserCheck, FileText, Award, ShieldCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Application & Screening",
    description: "We review professional histories, certifications, and background documentation rigorously.",
  },
  {
    step: "02",
    icon: <UserCheck className="w-6 h-6 text-indigo-600" />,
    title: "Skills Assessment",
    description: "Hands-on practical tests conducted by master technicians to verify technical competence.",
  },
  {
    step: "03",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "Background Verification",
    description: "Comprehensive police and identity background checks for absolute household safety.",
  },
  {
    step: "04",
    icon: <Award className="w-6 h-6 text-indigo-600" />,
    title: "Certified & Deployed",
    description: "Only the top 5% who pass all checkpoints are authorized to accept FixItNow bookings.",
  },
];

export default function VettingSection() {
  return (
    <section className="py-24 px-6 bg-background relative border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Uncompromising Safety</h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">How We Vet Our Professionals</h3>
          <p className="text-muted-foreground text-base">Your familys safety and home security are built into our four-stage verification filter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all relative group"
            >
              <div className="text-4xl font-black text-muted/30 absolute top-4 right-6 select-none">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}