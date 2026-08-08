"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Service } from "@/types/service";
import { ArrowLeft, Wrench,Star } from "lucide-react";

import ServiceOverview from "@/components/services/ServiceOverview";
import ServiceBookingCard from "@/components/services/ServiceBookingCard";
import ServiceDetailsSkeleton from "@/components/services/ServiceDetailsSkeleton";
import PopularServices from "@/components/services/PopularServices"; // আপনার পাথ অনুযায়ী ঠিক করে নিতে পারেন

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const serviceId = resolvedParams.id;
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/services/${serviceId}`);
        const data = await res.json();

        if (data.success) {
          setService(data.data);
        } else {
          setError(data.message || "Service not found");
        }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchServiceDetails();
  }, [serviceId]);

  const handleBookingAction = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      router.push(`/booking/${serviceId}`);
    }
  };

  if (loading) return <ServiceDetailsSkeleton />;

  if (error || !service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
          <Wrench className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          {error || "Service Details Not Available"}
        </h2>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const getClearBannerImage = (slug?: string) => {
    switch (slug) {
      case "cctv-and-security-installation":
        return "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=90";
      case "plumbing-pipe-leakage-tap-fixing":
      case "plumbing":
        return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=90";
      default:
        return "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=90";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-16">
      {/* Hero Banner Section with Clear Image & Smooth Animation */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-900 overflow-hidden shadow-md">
        <Image
          src={getClearBannerImage(service.category?.slug)}
          alt={service.title || "Service Banner"}
          fill
          priority
          className="object-cover opacity-85 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft gradient overlay so text remains clear but image looks vibrant */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-10 left-4 sm:left-12 max-w-5xl text-white space-y-3 z-20"
        >
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-lg text-white">
            {service.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <span className="flex items-center gap-1 text-amber-400 font-bold bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-700">
              <Star className="w-4 h-4 fill-amber-400" />{" "}
              {service.technicianProfile?.ratingAverage ?? "4.8"}
              <span className="text-slate-300 font-normal">
                (Verified Expert)
              </span>
            </span>
            <span className="font-bold text-white bg-blue-600/80 px-3 py-1 rounded-full backdrop-blur-sm">
              Starts from ৳{service.price}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content & Sidebar Grid with Fade-in Animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-8">
            <ServiceOverview service={service} />
          </div>
          <div>
            <ServiceBookingCard
              service={service}
              onBook={handleBookingAction}
            />
          </div>
        </motion.div>

        {/* Popular Services Component Added Here */}
        <div className="mt-16">
          <PopularServices />
        </div>
      </div>
    </div>
  );
}