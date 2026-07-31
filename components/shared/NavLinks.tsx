"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

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
