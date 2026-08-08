import PageWrapper from "@/components/ui/PageWrapper";
import { ShieldCheck, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <PageWrapper title="Privacy Policy">
      <div className="space-y-8">
        <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-6 rounded-2xl flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
            <strong>Last updated:</strong> August 8, 2026. At FixItNow, we take your data privacy seriously. This policy outlines how we collect, use, and protect your personal information.
          </p>
        </div>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Database className="w-5 h-5 text-blue-600" />
            <h2>1. Information Collection</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            FixItNow collects information you provide directly to us, such as when you create an account, request a home maintenance service, or contact our support team.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2>2. How We Use Your Data</h2>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 pl-0 list-none">
            {[
              "To provide, maintain, and improve our platform services.",
              "To process your service requests and manage professional bookings.",
              "To communicate with you about updates, security alerts, and support messages."
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Lock className="w-5 h-5 text-blue-600" />
            <h2>3. Data Security</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            We implement industry-standard encryption and security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}