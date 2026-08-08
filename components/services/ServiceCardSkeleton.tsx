import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between animate-pulse">
      
      {/* Top Image Banner Skeleton */}
      <div className="relative h-36 w-full bg-slate-200 dark:bg-slate-800">
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>

      {/* Card Body Skeleton */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-3 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-2/3 rounded-md" />
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-3 w-32 rounded-md" />
        </div>
      </div>

      {/* Pricing & Action Footer Skeleton */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="space-y-1">
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
    </div>
  );
}