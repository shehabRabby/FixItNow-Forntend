import Link from "next/link";
import { 
  Wrench, 
  Zap, 
  Sparkles, 
  Paintbrush, 
  Tv, 
  Truck, 
  ShieldAlert, 
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    id: "plumbing",
    name: "Plumbing",
    count: "120+ Pros",
    icon: Wrench,
    bg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border-blue-100 dark:border-blue-900",
  },
  {
    id: "electrical",
    name: "Electrical",
    count: "95+ Pros",
    icon: Zap,
    bg: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-100 dark:border-amber-900",
  },
  {
    id: "cleaning",
    name: "Cleaning & Maid",
    count: "150+ Pros",
    icon: Sparkles,
    bg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border-emerald-100 dark:border-emerald-900",
  },
  {
    id: "painting",
    name: "Painting & Decor",
    count: "80+ Pros",
    icon: Paintbrush,
    bg: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-100 dark:border-rose-900",
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    count: "110+ Pros",
    icon: Tv,
    bg: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 border-purple-100 dark:border-purple-900",
  },
  {
    id: "shifting",
    name: "Home Shifting",
    count: "60+ Pros",
    icon: Truck,
    bg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border-indigo-100 dark:border-indigo-900",
  },
  {
    id: "pest-control",
    name: "Pest Control",
    count: "45+ Pros",
    icon: ShieldAlert,
    bg: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 border-teal-100 dark:border-teal-900",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Explore Popular Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Find certified experts for every home need.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline w-fit"
        >
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={`/services?category=${cat.id}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-blue-600 transition-colors">
                  {cat.count}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                  Book Service <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600" />
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}