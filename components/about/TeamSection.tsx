"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Tanvir Ahmed",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    bio: "Ex-Operations Lead passionate about bringing transparency to unorganized blue-collar services.",
  },
  {
    name: "Nusrat Jahan",
    role: "Head of Customer Experience",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    bio: "Dedicated to ensuring every household interaction exceeds luxury hospitality standards.",
  },
  {
    name: "Rahim Chowdhury",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    bio: "Architecting seamless real-time dispatch systems and lightning-fast user experiences.",
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-3">The Minds Behind FixItNow</h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Leadership & Vision</h3>
          <p className="text-muted-foreground text-base">A passionate team dedicated to redefining how urban homes are maintained.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-1">{member.name}</h4>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}