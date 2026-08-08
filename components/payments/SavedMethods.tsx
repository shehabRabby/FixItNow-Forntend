import { CreditCard, Smartphone, Plus, ShieldCheck } from "lucide-react";

export function SavedMethods() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <CreditCard className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Saved Methods</h3>
        </div>
        <p className="text-xs text-slate-400">Manage your preferred payment options securely.</p>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Visa •••• 4242</span>
                <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full">PRIMARY</span>
              </div>
              <span className="text-[11px] text-slate-400">Expires 12/28</span>
            </div>
          </div>
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-500 text-white rounded-xl">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">bKash Wallet</span>
              <span className="block text-[11px] text-slate-400">+880 17********</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}