import Link from "next/link";
import { Headphones, Handshake, Info, Mail, Phone, Globe } from "lucide-react";

const cardsData = [
  {
    icon: Headphones,
    iconBg: "bg-blue-50 dark:bg-blue-950/80 text-blue-600",
    title: "Customer Support",
    description: "Need help with a current booking or have a service issue?",
    email: "support@fixitnow.com",
    extra: { icon: Phone, text: "1-800-FIX-HELP" },
  },
  {
    icon: Handshake,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600",
    title: "Partner with Us",
    description: "Are you a professional contractor looking to grow your business?",
    email: "partners@fixitnow.com",
    extraLink: { href: "/pro", text: "Pro Network Portal" },
  },
  {
    icon: Info,
    iconBg: "bg-amber-50 dark:bg-amber-950/80 text-amber-600",
    title: "General Inquiries",
    description: "For everything else including press, careers, and media assets.",
    email: "hello@fixitnow.com",
    extraLink: { href: "#", text: "Media Relations" },
  },
];

export function SpecialtyCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardsData.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base">{card.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {card.description}
              </p>
            </div>
            <div className="pt-2 space-y-1.5 text-xs">
              <a
                href={`mailto:${card.email}`}
                className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                {card.email}
              </a>

              {card.extra && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <card.extra.icon className="w-3.5 h-3.5" />
                  {card.extra.text}
                </div>
              )}

              {card.extraLink && (
                <Link
                  href={card.extraLink.href}
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {card.extraLink.text}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}