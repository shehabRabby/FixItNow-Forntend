"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-anim",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out" },
      );
      gsap.fromTo(
        ".blueprint-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power2.inOut", delay: 0.2 },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchTerm.trim()) queryParams.append("search", searchTerm.trim());
    if (location.trim()) queryParams.append("location", location.trim());
    const queryString = queryParams.toString();
    router.push(queryString ? `/services?${queryString}` : "/services");
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-background">
      {/* Faint structural grid — built from foreground at low opacity, no custom hue */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 20%, transparent 0%, var(--background) 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Side Content */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Ticket status: open
            </span>
            <span className="blueprint-line hidden sm:block h-px flex-1 bg-border origin-left" />
          </div>

          <h1 className="hero-title-anim text-4xl sm:text-5xl lg:text-[4.5rem] font-black uppercase text-foreground tracking-tight leading-[0.95]">
            Every home job
            <br />
            starts with{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
              one ticket.
              <svg
                className="absolute -bottom-2 left-0 w-full text-blue-600"
                height="8"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 Q50,0 100,5 T200,5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="hero-title-anim text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed font-light">
            File the job, get matched with a verified pro nearby — plumbing,
            electrical, cleaning, and more. Transparent pricing, tracked from
            open to close.
          </p>

          {/* Quick nav */}
          <div className="hero-title-anim flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>browsing categories instead?</span>
            <Link
              href="/services"
              className="text-blue-600 hover:text-indigo-700 transition-colors font-semibold inline-flex items-center gap-1 group underline underline-offset-4 decoration-dotted"
            >
              view all services
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust stubs */}
          <div className="hero-title-anim flex flex-wrap items-center gap-3 pt-2">
            {[
              { icon: Star, label: "4.9/5 average rating" },
              { icon: ShieldCheck, label: "100% background checked" },
              { icon: CheckCircle2, label: "12,400+ tickets closed" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 border border-border rounded-sm px-3 py-1.5 bg-card/50"
              >
                <Icon className="w-3.5 h-3.5 text-foreground" />
                <span className="text-[11px] font-mono text-muted-foreground tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side — the Service Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          whileHover={{ rotate: 0 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative bg-card text-card-foreground rounded-lg border border-border shadow-2xl shadow-black/10">
            {/* Verified stamp */}
            <div className="absolute -top-5 -right-4 z-20 rotate-[9deg] select-none">
              <div className="border-2 border-blue-600 text-blue-700 rounded-sm px-3 py-1.5 bg-card">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase leading-none block">
                  Verified
                  <br />
                  Pro Match
                </span>
              </div>
            </div>

            {/* Job photo */}
            <div className="px-5 pt-4">
              <div className="relative w-full h-[220px] sm:h-[260px] rounded-md overflow-hidden border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
                  alt="Verified home service technician on the job"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover grayscale-[20%] contrast-[1.05]"
                  priority
                />
              </div>
            </div>

            {/* Form fields styled as ticket line-items */}
            <form onSubmit={handleSearch} className="px-5 pt-4 pb-3 space-y-3">
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-1">
                  Job
                </label>
                <div className="flex items-center gap-2 border-b border-border focus-within:border-blue-600 transition-colors">
                  <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="AC repair, leaky faucet, rewiring..."
                    className="w-full py-2 text-sm bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-1">
                  Address
                </label>
                <div className="flex items-center gap-2 border-b border-border focus-within:border-blue-600 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where's the job?"
                    className="w-full py-2 text-sm bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white hover:opacity-90 active:scale-[0.98] font-mono font-bold text-xs tracking-[0.15em] uppercase py-3.5 rounded-md transition-all cursor-pointer mt-1 shadow-lg shadow-blue-600/25"
              >
                Open Ticket &amp; Match Me
              </button>
            </form>

            {/* Perforated tear edge */}
            <div className="relative h-4 overflow-hidden">
              <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-border" />
              <div className="absolute inset-x-5 top-0 flex justify-between">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-background -translate-y-1/2"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
