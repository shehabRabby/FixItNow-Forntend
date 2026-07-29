import Link from 'next/link';

export default function AuthFooter() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 z-10">
      <div>
        <span className="font-semibold text-slate-700 dark:text-slate-300">FixItNow</span>
        <span> © 2026 Develop By Shehab | Premium Home Services. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Terms of Service
        </Link>
        <Link href="/partner" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Partner with Us
        </Link>
        <Link href="/help" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Help Center
        </Link>
      </div>
    </footer>
  );
}