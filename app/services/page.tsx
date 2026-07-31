import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Available Services | FixItNow",
  description:
    "Explore our full range of expert home services. Find and book verified plumbers, electricians, and technicians near you.",
};

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex items-center justify-center text-slate-400 space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-xs font-medium">Loading page...</span>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}