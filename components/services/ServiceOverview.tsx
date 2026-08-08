import { Service } from "@/types/service";
import { ShieldCheck, Clock, Award, CheckCircle2, UserCheck } from "lucide-react";

export default function ServiceOverview({ service }: { service: Service }) {
  return (
    <div className="space-y-8">
      {/* Service Overview & Description Box */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Service Overview
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {service.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Expert Technician</h4>
              <p className="text-xs text-slate-500">Provided by verified and skilled professionals.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Location Based Service</h4>
              <p className="text-xs text-slate-500">Available at {service.location}</p>
            </div>
          </div>
        </div>

        {/* Technician Profile Details */}
        {service.technicianProfile && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-600" /> Technician Profile & Schedule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Skills & Experience</span>
                <span className="text-slate-500">{service.technicianProfile.skills || "General Maintenance"} ({service.technicianProfile.experienceYears ?? 3} Years Exp)</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Available Slots</span>
                <span className="text-slate-500">{service.technicianProfile.availabilitySlots || "09:00 AM - 05:00 PM"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust Badges (3 Color Cards like reference image) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Licensed Pros</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">All technicians are background-checked and certified.</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Quality Guarantee</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">We stand by our work with full service support.</p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Clear Pricing</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">No hidden fees or surprise upcharges on your bill.</p>
        </div>
      </div>

      {/* Seamless Experience (3 Steps) */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <h3 className="text-center text-sm font-bold tracking-wider uppercase text-slate-400">
          Seamless Experience
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Book Online</h4>
            <p className="text-xs text-slate-500">Select your preferred date and time in under 60 seconds.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Relax</h4>
            <p className="text-xs text-slate-500">Our pro arrives on time with everything needed for the job.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Secure Pay</h4>
            <p className="text-xs text-slate-500">Only pay after the service is complete and you&apos;re satisfied.</p>
          </div>
        </div>
      </div>
    </div>
  );
}