import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-6 w-32 rounded-md" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="w-full h-64 sm:h-96 rounded-2xl" />
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="w-full h-80 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}