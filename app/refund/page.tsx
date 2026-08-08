import PageWrapper from "@/components/ui/PageWrapper";
import { RefreshCw, CheckCircle, Clock } from "lucide-react";

export default function RefundPolicy() {
  return (
    <PageWrapper title="Refund Policy">
      <div className="space-y-8">
        <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-6 rounded-2xl flex items-start gap-4">
          <RefreshCw className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
            We prioritize your satisfaction. If our verified professionals fail to meet expected quality standards, our refund policy has you covered.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Eligibility for Refund</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              "The requested service was not provided as described or agreed upon.",
              "Verifiable property damage caused directly by the technician during service hours.",
              "Service appointments canceled at least 24 hours prior to the scheduled time."
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2>Claim Process</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Please reach out to our dedicated support team within <strong>48 hours</strong> of service completion with relevant photo proofs or booking references to initiate your claim.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}