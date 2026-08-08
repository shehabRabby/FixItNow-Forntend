"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllServices } from "@/services/service.service";
import { Loader2, AlertCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen"
    >
      <ServiceHeader />

      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </div>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 text-right">
          Total: <span className="text-blue-600 dark:text-blue-400">{filteredServices.length}</span> services
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No services found</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            No services found matching your criteria. Try searching with different keywords.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <ServiceCard
                  service={{
                    ...service,
                    name: service.name || service.title || "Untitled Service",
                    description: service.description || "",
                  }}
                  onBookNow={handleBookNow}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}