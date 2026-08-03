"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Service } from "@/types/service";
import { ArrowLeft, Wrench } from "lucide-react";

import ServiceOverview from "@/components/services/ServiceOverview";
import ServiceBookingCard from "@/components/services/ServiceBookingCard";
import ServiceDetailsSkeleton from "@/components/services/ServiceDetailsSkeleton";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const serviceId = resolvedParams.id;

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

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ServiceOverview service={service} />
          </div>
          <div>
            <ServiceBookingCard service={service} />
          </div>
        </div>
      </div>
    </div>
  );
}