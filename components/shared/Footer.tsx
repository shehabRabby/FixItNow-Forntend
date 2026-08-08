"use client";

import Link from "next/link";
import { Wrench, Phone, MapPin } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.24 4.32 15.36 4.25 14.33 4.25c-2.15 0-3.62 1.31-3.62 3.72V10.5H8.19v3h2.52V21h2.79Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3h3.3l-7.2 8.2L23.4 21h-6.6l-5.2-6.8L5.6 21H2.3l7.7-8.8L1.9 3h6.8l4.7 6.2L18.9 3Zm-1.2 16.2h1.8L7.4 4.7H5.5l12.2 14.5Z" />
    </svg>
  );
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 21h-3.37v-6.05c0-1.44-.03-3.3-2.01-3.3-2.02 0-2.33 1.58-2.33 3.2V21H9.36V8.5h3.24v1.71h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.19V21Z" />
    </svg>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categoryLinks = [
  { name: "Plumbing", href: "/services?category=plumbing" },
  { name: "Electrical", href: "/services?category=electrical" },
  { name: "Cleaning", href: "/services?category=cleaning" },
  { name: "Appliance", href: "/services?category=appliance" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Careers", href: "/careers" },
  { name: "FAQ", href: "/#faq" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Refund Policy", href: "/refund" },
];

const socials = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden border-t border-slate-800">
      {/* Lightweight ambient glow */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
                <Wrench className="w-4 h-4 text-white" />
              </span>
              <span className="text-base font-black text-white tracking-tight">
                FixItNow
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Verified professionals, transparent pricing, and dependable home maintenance services tailored for your convenience.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <a href="tel:+8801000000000" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                +880 1000-000000
              </a>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                Dhaka, Bangladesh
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (3/4 items) */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">
              Categories
            </h4>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company (Without Become a Pro) */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FixItNow. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-slate-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}