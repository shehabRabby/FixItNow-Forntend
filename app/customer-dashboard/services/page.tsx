"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllServices } from "@/services/service.service";
import { Loader2, AlertCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ServiceHeader } from "./components/ServiceHeader";
import { ServiceCard } from "./components/ServiceCard";

interface IService {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  price: number;
  duration?: string;
  category?: {
    name: string;
  };
}

export default function CustomerServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        setIsLoading(true);
        const res = await getAllServices();
        if (isMounted && res?.success) {
          setServices(res.data || []);
        }
      } catch (error: unknown) {
        if (isMounted) {
          const errMessage =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Failed to load services!";
          toast.error(errMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return services;
    return services.filter((s) => {
      const serviceName = s.name || s.title || "";
      const serviceDesc = s.description || "";
      return (
        serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serviceDesc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [services, searchTerm]);

  const handleBookNow = (service: IService) => {
    const serviceId = service.id;
    router.push(`/customer-dashboard/bookings/create?serviceId=${serviceId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      <ServiceHeader />

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search services by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            No services found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={{
                ...service,
                name: service.name || service.title || "Untitled Service",
                description: service.description || "",
              }}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      )}
    </div>
  );
}