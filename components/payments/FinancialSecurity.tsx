import { Shield, ArrowRight } from "lucide-react";

export function FinancialSecurity() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl shadow-blue-500/20 relative overflow-hidden flex flex-col justify-between space-y-6">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

      <div className="space-y-3 relative z-10">
        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl w-fit">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-black tracking-tight">Financial Security</h3>
        <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
          Your transactions are protected with 256-bit encryption. Never share your OTP or password with anyone.
        </p>
      </div>

      <div className="relative z-10">
        <button className="px-5 py-2.5 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer">
          <span>Security Settings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}