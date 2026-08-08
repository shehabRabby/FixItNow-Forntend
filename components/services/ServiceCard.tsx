import Link from "next/link";
import Image from "next/image";
import { MapPin, User, ArrowRight, Tag, Star, ShieldCheck } from "lucide-react";
import { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
  priority?: boolean;
}

export default function ServiceCard({ service, priority = false }: ServiceCardProps) {
  const getCardImage = (slug?: string, title?: string) => {
    const s = (slug || "").toLowerCase();
    const t = (title || "").toLowerCase();

    if (s.includes("cctv") || t.includes("cctv")) {
      return "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80";
    }
    if (s.includes("ac") || t.includes("ac")) {
      return "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80";
    }
    if (s.includes("plumbing") || t.includes("plumbing") || t.includes("tap") || t.includes("pipe")) {
      return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80";
    }
    if (s.includes("electrical") || t.includes("db") || t.includes("smart home") || t.includes("wiring")) {
      return "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80";
    }
    if (s.includes("refrigerator") || t.includes("fridge") || t.includes("cooling")) {
      return "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80";
    }
    if (s.includes("washing") || t.includes("machine")) {
      return "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80";
    }
    if (s.includes("pest") || t.includes("control")) {
      return "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80";
    }
    if (s.includes("clean") || t.includes("cleaning")) {
      return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80";
    }

    return "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80";
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Image Banner */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={getCardImage(service.category?.slug, service.title)}
          alt={service.title || "Service image"}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Category & Rating */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded-full shadow-sm border border-white/20 truncate max-w-[70%]">
            <Tag className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{service.category?.name || "General"}</span>
          </span>

          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-500 text-white text-[11px] font-bold rounded-full shadow-sm shrink-0">
            <Star className="w-2.5 h-2.5 fill-white" />
            {service.technicianProfile?.ratingAverage ?? "4.8"}
          </span>
        </div>

        {/* Location & Verified */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-medium z-10">
          <span className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-slate-700/50 truncate max-w-[65%]">
            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="truncate">{service.location}</span>
          </span>
          <span className="flex items-center gap-0.5 bg-emerald-600/80 backdrop-blur-md px-2 py-0.5 rounded-full shrink-0">
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {service.technicianProfile?.user?.name && (
          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
            <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-[9px] shrink-0">
              <User className="w-3 h-3" />
            </div>
            <span className="truncate">
              Pro:{" "}
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                {service.technicianProfile.user.name}
              </strong>
            </span>
          </div>
        )}
      </div>

      {/* Pricing & Action Footer */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col">
          <span className="text-base font-black text-blue-600 dark:text-blue-400 whitespace-nowrap">
            ৳{service.price}
          </span>
        </div>

        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-95 shrink-0"
        >
          Details
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}