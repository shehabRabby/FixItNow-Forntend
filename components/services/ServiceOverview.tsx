import Image from "next/image";
import { Service } from "@/types/service";
import { MapPin, Star, Tag } from "lucide-react";

export default function ServiceOverview({ service }: { service: Service }) {
  return (
    <div className="space-y-6">
      {/* Banner Image */}
      <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-sm">
        <Image
          src={service.image || "/placeholder-service.jpg"}
          alt={service.title || "Service image"}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Info Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {service.category?.name && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800">
              <Tag className="w-3.5 h-3.5" />
              {service.category.name}
            </span>
          )}
          {/* Rating Badge */}
          <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            <Star className="w-4 h-4 fill-amber-500" />
            <span>{service.rating ?? "4.8"}</span>
            <span className="text-slate-400 font-normal">
              ({service.reviewsCount ?? 0} reviews)
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {service.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-sm">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{service.location}</span>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-800" />

        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Description
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}
