import Link from "next/link";
import { MapPin, Tag, ArrowRight } from "lucide-react";
import { IService } from "@/types";

interface ServiceCardProps {
  service: IService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-3">
        {/* Category & Location Badge */}
        <div className="flex items-center justify-between text-xs gap-2">
          {service.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Tag className="w-3 h-3" />
              {service.category.name}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            {service.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Technician Info (if available) */}
        {service.technicianProfile?.user?.name && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            By:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {service.technicianProfile.user.name}
            </span>
          </p>
        )}
      </div>

      {/* Footer / Price & Action */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">
            Starting From
          </span>
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-500">
            ৳{service.price}
          </span>
        </div>

        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
