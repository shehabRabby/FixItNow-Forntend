import { Search, UserCheck, CalendarCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Choose a Service",
      desc: "Select from dozens of services and get instant pricing or custom quotes for your home needs.",
    },
    {
      step: "02",
      icon: UserCheck,
      title: "Pick a Professional",
      desc: "Browse verified provider profiles, check ratings, customer reviews, and select your top choice.",
    },
    {
      step: "03",
      icon: CalendarCheck,
      title: "Book & Relax",
      desc: "Schedule a convenient time slot. Pay safely after the job is completed to your satisfaction.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-center space-y-12">
      {/* Section Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Simple Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          How FixItNow Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Get your home repairs and maintenance done smoothly in just 3 steps.
        </p>
      </div>

      {/* Steps Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-slate-200 dark:border-slate-800 -translate-y-6 -z-10" />

        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center space-y-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {/* Step Badge */}
              <span className="absolute top-4 right-4 text-xs font-bold text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors">
                STEP {item.step}
              </span>

              {/* Icon Box */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}