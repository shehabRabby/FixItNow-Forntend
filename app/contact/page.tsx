import { ContactHeader } from "@/components/contact/ContactHeader";
import { SpecialtyCards } from "@/components/contact/SpecialtyCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { Headquarters } from "@/components/contact/Headquarters";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { SocialCTA } from "@/components/contact/SocialCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | FixItNow",
  description:
    "Get in touch with FixItNow. Reach out for customer support, partner inquiries, or general questions about our home maintenance services.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 space-y-20">
      <div className="max-w-7xl mx-auto space-y-16">
        <ContactHeader />
        <SpecialtyCards />
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <ContactForm />
          <Headquarters />
        </div>

        <FaqAccordion />
      </div>

      <SocialCTA />
    </div>
  );
}