"use client";

import { useState, FormEvent } from "react";
import { HelpCircle, Mail, MessageSquare, Send } from "lucide-react";

export default function TechnicianSupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      // এখানে সাপোর্টের API কল বা সাবমিশন লজিক যুক্ত করা যাবে
      await new Promise((resolve) => setTimeout(resolve, 1000)); // সিমুলেটেড ডিলে
      setSuccess(true);
      setSubject("");
      setMessage("");
    } catch {
      alert("Failed to submit support request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Help & Support</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Having trouble with bookings or your account? Reach out to our support team.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Email Support</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">support@fixitnow.com</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Live Helpline</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">+880 9600-000000</p>
          </div>
        </div>
      </div>

      {/* Support Ticket Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Submit a Support Ticket</h3>
        </div>

        {success && (
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            Your support request has been submitted successfully! We will get back to you soon.
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Issue with payment or booking"
            required
            className="w-full px-3 py-2 rounded-lg border text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Message</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue in detail..."
            required
            className="w-full px-3 py-2 rounded-lg border text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {submitting ? "Submitting..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}