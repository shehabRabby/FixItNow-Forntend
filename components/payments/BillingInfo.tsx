import { FileText} from "lucide-react";

export function BillingInfo() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <FileText className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Billing Info</h3>
        </div>
        <p className="text-xs text-slate-400">Invoices & Tax Summaries</p>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
        Invoices are automatically generated upon job completion and sent to your registered email address.
      </p>

      <div className="space-y-3">
      
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-400 font-bold">
          <span>CURRENCY: BDT (৳)</span>
          <span className="text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">VERIFIED</span>
        </div>
      </div>
    </div>
  );
}