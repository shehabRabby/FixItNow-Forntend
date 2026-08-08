"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

interface NavLinksProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function NavLinks({ isMobile = false, onItemClick }: NavLinksProps) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2 py-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onItemClick}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
              isActive
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}