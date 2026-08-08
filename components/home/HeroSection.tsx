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
import { motion, useMotionValue, useSpring, animate, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Count-up stat — animates from 0 once it enters the viewport         */
/* ------------------------------------------------------------------ */
function CountUp({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(
          decimals > 0
            ? v.toFixed(decimals)
            : Math.round(v).toLocaleString("en-US"),
        );
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic wrapper — child follows the cursor slightly, snaps back    */
/* ------------------------------------------------------------------ */
function Magnetic({
  children,
  strength = 0.35,
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

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // entrance
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

      // scroll parallax — background grid drifts slower than content
      gsap.to(gridRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // scroll parallax — ticket card drifts opposite, adds depth
      gsap.to(ticketRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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

  const stats = [
    { icon: Star, value: 4.9, decimals: 1, suffix: "/5 average rating" },
    { icon: ShieldCheck, value: 100, decimals: 0, suffix: "% background checked" },
    { icon: CheckCircle2, value: 12400, decimals: 0, suffix: "+ tickets closed" },
  ];

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-background">
      {/* Faint structural grid — parallax layer */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.05] pointer-events-none will-change-transform"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Side Content */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
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
                <motion.path
                  d="M0,5 Q50,0 100,5 T200,5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
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

          {/* Trust stubs — now animated counters */}
          <div className="hero-title-anim flex flex-wrap items-center gap-3 pt-2">
            {stats.map(({ icon: Icon, value, decimals, suffix }) => (
              <div
                key={suffix}
                className="flex items-center gap-1.5 border border-border rounded-sm px-3 py-1.5 bg-card/50 transition-colors hover:border-blue-300 dark:hover:border-blue-800"
              >
                <Icon className="w-3.5 h-3.5 text-foreground shrink-0" />
                <span className="text-[11px] font-mono text-muted-foreground tracking-wide tabular-nums">
                  <CountUp value={value} decimals={decimals} suffix={suffix} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side — the Service Ticket */}
        <motion.div
          ref={ticketRef}
          initial={{ opacity: 0, y: 30, rotate: -3 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
            rotate: -1,
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.3, ease: "easeOut" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            rotate: { duration: 0.7, delay: 0.3, ease: "easeOut" },
          }}
          whileHover={{ rotate: 0, y: 0 }}
          className="lg:col-span-5 relative will-change-transform"
        >
          <div className="relative bg-card text-card-foreground rounded-lg border border-border shadow-2xl shadow-black/10">
            {/* Verified stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 9 }}
              animate={{ opacity: 1, scale: 1, rotate: 9 }}
              transition={{ duration: 0.5, delay: 1.1, ease: "backOut" }}
              className="absolute -top-5 -right-4 z-20 select-none"
            >
              <div className="border-2 border-blue-600 text-blue-700 rounded-sm px-3 py-1.5 bg-card">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase leading-none block">
                  Verified
                  <br />
                  Pro Match
                </span>
              </div>
            </motion.div>

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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
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

              <Magnetic strength={0.25} className="block">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white hover:opacity-90 active:scale-[0.98] font-mono font-bold text-xs tracking-[0.15em] uppercase py-3.5 rounded-md transition-all cursor-pointer mt-1 shadow-lg shadow-blue-600/25"
                >
                  Open Ticket &amp; Match Me
                </button>
              </Magnetic>
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