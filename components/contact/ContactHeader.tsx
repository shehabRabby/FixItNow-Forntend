export function ContactHeader() {
  return (
    <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
      <span className="inline-block px-3.5 py-1 text-[11px] font-bold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/80 rounded-full uppercase">
        CONTACT US
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Get in Touch
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        Whether you have a question about our services, need help with a booking,
        or want to join our network of pros, we&apos;re here to help you restore domestic
        tranquility.
      </p>
    </div>
  );
}