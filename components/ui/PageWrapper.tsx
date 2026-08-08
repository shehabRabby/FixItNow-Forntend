import React from "react";

export default function PageWrapper({ 
  title, 
  children 
}: { 
  title: string, 
  children: React.ReactNode 
}) {
  return (
    <main className="relative bg-slate-50/50 dark:bg-slate-950 min-h-[70vh] py-16 lg:py-24 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight border-b border-slate-200/60 dark:border-slate-800 pb-6">
          {title}
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </main>
  );
}