import Link from "next/link";
import { MapPin, User, ArrowRight, Tag } from "lucide-react";
import { Service } from "@/types/service";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-3">
        {/* Category & Location Badge */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
            <Tag className="w-3 h-3" />
            {service.category?.name || "General"}
          </span>

          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            {service.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors pt-1">
          {service.title}
        </h3>

        {/* Description Snippet */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Technician Info */}
        {service.technicianProfile?.user?.name && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Provided by{" "}
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                {service.technicianProfile.user.name}
              </strong>
            </span>
          </div>
        )}
      </div>

      {/* Pricing & Action */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
            Price
          </span>
          <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
            ৳{service.price}
          </span>
        </div>

        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center gap-1 px-3.5 py-2 bg-slate-900 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-all"
        >
          Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
