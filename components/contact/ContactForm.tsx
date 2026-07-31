"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="lg:col-span-7 p-8 sm:p-10 text-center space-y-3 my-auto">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
        <h3 className="text-lg font-bold">Message Received!</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Thank you for contacting us. Our support representative will respond shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
            Subject
          </label>
          <select className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700 dark:text-slate-300">
            <option>Booking Inquiry</option>
            <option>Technical Issue</option>
            <option>Become a Partner</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
            Message
          </label>
          <textarea
            rows={4}
            required
            placeholder="How can we help you today?"
            className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center space-x-2 disabled:opacity-50"
        >
          <span>{loading ? "Sending..." : "Send Message"}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}