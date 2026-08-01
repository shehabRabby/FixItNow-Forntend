"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getAllServices } from "@/services/service.service";
import { Loader2, Calendar, MapPin, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";

// কম্পোনেন্টগুলো ইম্পোর্ট করা হলো
import ServiceSelect, { IService } from "./components/ServiceSelect";
import TimeSlotPicker from "./components/TimeSlotPicker";

function CreateBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  const [services, setServices] = useState<IService[]>([]);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [bookingData, setBookingData] = useState({
    serviceId: serviceId || "",
    bookingDate: "",
    slot: "",
    address: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const res = await getAllServices();
        if (res?.success) {
          const list: IService[] = res.data || [];
          setServices(list);

          if (serviceId) {
            const found = list.find((s) => s.id === serviceId);
            if (found) {
              setSelectedService(found);
              setBookingData((prev) => ({ ...prev, serviceId: found.id }));
            }
          }
        }
      } catch {
        toast.error("Failed to load service details!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [serviceId]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setBookingData((prev) => ({ ...prev, serviceId: id }));
    const found = services.find((s) => s.id === id);
    setSelectedService(found || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !bookingData.serviceId ||
      !bookingData.bookingDate ||
      !bookingData.slot ||
      !bookingData.address
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }
    try {
      setIsSubmitting(true);

      const payload = {
        serviceId: bookingData.serviceId,
        timeSlot: bookingData.slot,
      };

      const res = await axiosInstance.post("/bookings/create-booking", payload);

      if (res?.data?.success) {
        toast.success("Booking requested successfully!");
        router.push("/customer-dashboard/bookings");
      }
    } catch (error: unknown) {
      const errMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create booking!";
      toast.error(errMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Complete Your Booking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Provide your preferred schedule and location for the service.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ServiceSelect
            services={services}
            selectedServiceId={bookingData.serviceId}
            selectedService={selectedService}
            onServiceChange={handleServiceChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" /> Booking Date
              </label>
              <input
                type="date"
                value={bookingData.bookingDate}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    bookingDate: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <TimeSlotPicker
              selectedSlot={bookingData.slot}
              onChange={(slot) => setBookingData({ ...bookingData, slot })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" /> Service Address
            </label>
            <textarea
              rows={3}
              placeholder="Enter your full address (e.g., House 12, Road 5, Mirpur-1, Dhaka)"
              value={bookingData.address}
              onChange={(e) =>
                setBookingData({ ...bookingData, address: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-500/20 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CreateBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[70vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <CreateBookingForm />
    </Suspense>
  );
}
