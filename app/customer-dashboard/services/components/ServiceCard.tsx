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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
            {service.name}
          </h3>
          {service.category?.name && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 whitespace-nowrap">
              {service.category.name}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {service.description || "No description provided for this service."}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          {service.duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {service.duration}
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block">Starting from</span>
          <span className="text-base font-bold text-emerald-600">৳{service.price}</span>
        </div>

        <button
          type="button"
          onClick={() => onBookNow(service)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/20"
        >
          Book Now <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}