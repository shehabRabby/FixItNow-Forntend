import { ShieldCheck, Award, CircleDollarSign, Headphones } from "lucide-react";

const standards = [
  {
    icon: ShieldCheck,
    title: "Vetted Professionals",
    desc: "Background checks, license verification, and rigorous skill assessments.",
  },
  {
    icon: Award,
    title: "90-Day Guarantee",
    desc: "We stand by our work. If something isn't right, we'll fix it at no cost.",
  },
  {
    icon: CircleDollarSign,
    title: "Transparent Pricing",
    desc: "No hidden fees or surprise surcharges. You see full price before booking.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our concierge team is always available to assist with home service needs.",
  },
];

export function AboutStandards() {
  return (
    <section className="py-16 bg-blue-50/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold">The FixItNow Standard</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Experience home maintenance as it should be: simple, transparent,
            and superior.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3"
              >
                <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}