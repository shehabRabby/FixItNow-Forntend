import Link from 'next/link';
import { Wrench, HelpCircle } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function AuthHeader() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-500">
        <div className="p-1.5 bg-blue-600 text-white rounded-lg">
          <Wrench className="w-5 h-5" />
        </div>
        <span>FixItNow</span>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span>Support</span>
        </button>
      </div>
    </header>
  );
}