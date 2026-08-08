import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-16">
      {/* Hero Banner Skeleton matching the updated details page hero */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-200 dark:bg-slate-900 overflow-hidden">
        <div className="absolute bottom-10 left-4 sm:left-12 max-w-5xl space-y-3 z-20">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-10 w-3/4 max-w-xl rounded-lg" />
          <div className="flex items-center gap-4 pt-1">
            <Skeleton className="h-7 w-36 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Overview Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 animate-pulse">
              <div className="space-y-3">
                <Skeleton className="h-7 w-1/3 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Skeleton className="h-5 w-1/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            </div>
          </div>

          {/* Right Column Booking Card Skeleton */}
          <div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 animate-pulse sticky top-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16 rounded-md" />
                  <Skeleton className="h-7 w-28 rounded-md" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>

              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}