import PageWrapper from "@/components/ui/PageWrapper";
import { FileText, CheckCircle2, AlertCircle, UserCheck } from "lucide-react";

export default function TermsOfService() {
  return (
    <PageWrapper title="Terms of Service">
      <div className="space-y-8">
        <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-6 rounded-2xl flex items-start gap-4">
          <FileText className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
            Please read these terms carefully before using the FixItNow platform. By accessing our services, you agree to comply with these conditions.
          </p>
        </div>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h2>1. Agreement to Terms</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            By accessing FixItNow, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use immediately.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <h2>2. User Responsibilities</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            You are entirely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your user profile.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h2>3. Service Limitations</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            While we carefully vet our professionals, FixItNow acts as a connector platform and is not directly liable for independent third-party damages beyond our coverage policies.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}