import { HelpCircle, ExternalLink, Clock, ChevronRight } from "lucide-react";

export function HelpAndSupport() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <HelpCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Help & Support</h3>
        </div>
        <p className="text-xs text-slate-400">Have questions regarding your transactions?</p>
      </div>

      <div className="space-y-2">
        <a href="#support" className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors group">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Contact Billing Support</span>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </a>

        <a href="#faqs" className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors group">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">View Payment FAQs</span>
          <ExternalLink className="w-4 h-4 text-slate-400" />
        </a>
      </div>

      <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex items-center gap-3">
        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Average response time for billing queries is <strong>2-4 hours</strong>.
        </span>
      </div>
    </div>
  );
}