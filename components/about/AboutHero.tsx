import Image from "next/image";
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Redefining Home <br />
            <span className="text-blue-600 dark:text-blue-500">
              Maintenance
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
            FixItNow bridges the gap between homeowners and elite
            craftsmanship. We bring transparency, reliability, and master-level
            skill to every corner of your home.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/services"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20"
            >
              Explore Services
            </Link>
            <a
              href="#our-story"
              className="px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-all"
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="relative h-[380px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
            alt="Technician maintaining HVAC"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}