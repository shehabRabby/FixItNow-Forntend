import { Star, Sparkles } from "lucide-react";

export function ReviewHeader() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
      
      <div className="space-y-2 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl shadow-inner">
            <Star className="w-6 h-6 fill-blue-500/20" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Reviews & Feedback
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          See the feedback and ratings you have given for completed services, helping us maintain top-notch quality.
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0 shadow-sm">
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>Verified Customer Feedback</span>
      </div>
    </div>
  );
}