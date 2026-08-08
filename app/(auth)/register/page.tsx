'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';
import RegisterForm from '@/components/modules/auth/RegisterForm';
import AuthHeader from '@/components/modules/auth/AuthHeader';


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      
      {/* Top Navbar */}
      <AuthHeader />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[460px]"
        >
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
            
            {/* Tab Header */}
            <div className="grid grid-cols-2 p-1.5 bg-slate-100/70 dark:bg-slate-900/60 m-3 rounded-xl">
              <Link
                href="/login"
                className="py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-center transition-all"
              >
                Login
              </Link>
              <button
                type="button"
                className="py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white shadow-sm transition-all"
              >
                Sign Up
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 pt-1 space-y-4">
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Create Account
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Join FixItNow to book trusted experts or provide services.
                </p>
              </div>

              {/*Register Form */}
              <RegisterForm />
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.9/5 Average Pro Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Professionals</span>
            </div>
          </div>
        </motion.div>
      </main>

    </div>
  );
}