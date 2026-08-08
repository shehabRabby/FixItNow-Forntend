import { Clock, ArrowRight } from "lucide-react";

interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  category?: {
    name: string;
  };
}

interface ServiceCardProps {
  service: IService;
  onBookNow: (service: IService) => void;
}

export function ServiceCard({ service, onBookNow }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
      
      {/* Top Accent Gradient Border Effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="space-y-4">
        {/* Category Badge */}
        {service.category?.name && (
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:bg-blue-950/40 border border-blue-500/20 truncate max-w-full">
              {service.category.name}
            </span>
          </div>
        )}

        {/* Service Title - Fixed to max 2 lines for equal height */}
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3.2rem]">
          {service.name}
        </h3>

        {/* Description - Fixed to max 2 lines */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {service.description || "No description provided for this service."}
        </p>

        {/* Duration */}
        {service.duration && (
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 px-3 py-2 rounded-xl w-fit">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="font-bold">{service.duration}</span>
          </div>
        )}
      </div>

      {/* Bottom Section: Price & Button */}
      <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Price</span>
          <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            ৳{service.price.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onBookNow(service)}
          className="px-4 py-2.5 bg-slate-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-slate-900 text-xs font-black rounded-2xl transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 group/btn shrink-0"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}