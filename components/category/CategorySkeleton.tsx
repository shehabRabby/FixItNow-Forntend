export function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl h-64 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          </div>
          <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl w-full mt-4" />
        </div>
      ))}
    </div>
  );
}