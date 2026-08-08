import PageWrapper from "@/components/ui/PageWrapper";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function Careers() {
  return (
    <PageWrapper title="Careers at FixItNow">
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-500/10 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> We are hiring
          </span>
          <h2 className="text-2xl sm:text-3xl font-black m-0">Build the future of home services with us.</h2>
          <p className="text-blue-100 text-sm max-w-xl m-0">
            Join a fast-growing team of innovators, engineers, and problem solvers dedicated to making home maintenance effortless.
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Open Positions</h3>
          
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500/50 transition-all">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Engineering</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white m-0">Senior Frontend Developer</h4>
              <p className="text-xs text-slate-500 m-0">Remote / Dhaka, Bangladesh • Full-time</p>
            </div>
            
            <a
              href="mailto:hr@fixitnow.com"
              className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              Apply Now <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}