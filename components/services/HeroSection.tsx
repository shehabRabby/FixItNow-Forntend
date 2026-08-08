import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 pt-4 pb-12">
      {/* Hero Banner Box */}
      <div className="relative  overflow-hidden bg-slate-900 min-h-[460px] flex items-center shadow-xl">
        
        {/* Background Image with Clear & Visible Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=90"
            alt="Plumbing Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-75 dark:opacity-60 scale-105"
          />
          {/* Balanced gradient overlay for clear visibility and readable text */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-slate-950/95 dark:via-slate-950/60 dark:to-transparent" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50/90 dark:bg-blue-950/80 backdrop-blur-md border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            EXPERT PLUMBING SERVICES
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight drop-shadow-sm">
            Flow with confidence.
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed drop-shadow-sm">
            From minor leaks to major installations, our master plumbers deliver rapid, reliable solutions to keep your home&apos;s water systems perfect.
          </p>
        </div>
      </div>
    </div>
  );
}