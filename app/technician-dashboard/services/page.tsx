"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ServiceHeader } from "./components/ServiceHeader";
import { ServiceList } from "./components/ServiceList";
import { CreateServiceModal } from "./components/CreateServiceModal";
import { UpdateServiceModal } from "./components/UpdateServiceModal";
import { envConfig } from "@/config/env";

const API_URL = envConfig.baseUrl;
// process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  category?: { name: string };
  technicianProfile?: {
    userId: string;
  };
}

interface ICategory {
  id: string;
  name: string;
}

export default function TechnicianServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const fetchServices = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(`${API_URL}/services`);
      const allServices: IService[] = res.data?.data || [];

      if (token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const decodedUser = JSON.parse(jsonPayload);
          const currentUserId = decodedUser.id || decodedUser.userId;

          const myServices = allServices.filter(
            (srv) => srv.technicianProfile?.userId === currentUserId
          );
          setServices(myServices);
        } catch {
          setServices([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([fetchServices(), fetchCategories()]);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const token = Cookies.get("token");
    if (!token) return;

    try {
      await axios.delete(`${API_URL}/services/${id}`, {
        headers: { Authorization: token },
      });
    
      await fetchServices();
    } catch (error: unknown) {
      let errorMessage = "Failed to delete service";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      alert(errorMessage);
    }
  };

  const handleOpenEditModal = (service: IService) => {
    setSelectedService(service);
    setIsUpdateModalOpen(true);
  };

  if (loading) {
    return <div className="text-center py-10 text-slate-500">Loading services...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <ServiceHeader onOpenModal={() => setIsCreateModalOpen(true)} />

      <ServiceList
        services={services}
        onDelete={handleDeleteService}
        onEdit={handleOpenEditModal}
      />

      <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchServices}
        categories={categories}
      />

      <UpdateServiceModal
        key={selectedService?.id || "update-modal"}
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedService(null);
        }}
        onSuccess={fetchServices}
        service={selectedService}
        categories={categories}
      />
    </div>
  );
}