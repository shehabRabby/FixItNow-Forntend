"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, ShieldCheck, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  // Handle actual search navigation
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchTerm.trim()) queryParams.append("search", searchTerm.trim());
    if (location.trim()) queryParams.append("location", location.trim());

    const queryString = queryParams.toString();
    router.push(queryString ? `/services?${queryString}` : "/services");
  };

  return (
    <div className="bg-slate-50/60 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Expert Home Services, <br />
            <span className="text-blue-600">at Your Fingertips</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
            Connect with verified professionals for plumbing, electrical, cleaning, and more. Reliable service, transparent pricing, and guaranteed satisfaction.
          </p>

          {/* Functional Search & Location Form */}
          <form
            onSubmit={handleSearch}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative w-full sm:w-1/2 flex items-center">
              <Search className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services (e.g. AC Repair)..."
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <div className="hidden sm:block w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />

            <div className="relative w-full sm:w-1/2 flex items-center">
              <MapPin className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your Location..."
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all whitespace-nowrap shadow-md shadow-blue-500/20"
            >
              Search Services
            </button>
          </form>

          {/* Quick Direct Navigation Link */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Want to browse all categories?</span>
            <Link
              href="/services"
              className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
            >
              Explore All Services <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Trust Ratings */}
          <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>100% Background Checked</span>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800">
          <Image
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
            alt="Home Service Professional"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-blue-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">10k+</h3>
            <p className="text-xs text-blue-100 font-medium">Services Completed</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">5k+</h3>
            <p className="text-xs text-blue-100 font-medium">Verified Pros</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">45min</h3>
            <p className="text-xs text-blue-100 font-medium">Avg. Arrival Time</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">24/7</h3>
            <p className="text-xs text-blue-100 font-medium">Active Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}