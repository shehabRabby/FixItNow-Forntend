import ServicesContent from "./ServicesContent"; 
import SpecializedServices from "@/components/services/SpecializedServices";
import FeaturedProfessionals from "@/components/services/FeaturedProfessionals";
import HeroSection from "@/components/services/HeroSection";

export const dynamic = "force-dynamic";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Services Content Grid */}
      <ServicesContent />
      
      {/* 3. Specialized Services */}
      <SpecializedServices />
      
      {/* 4. Featured Professionals */}
      <FeaturedProfessionals />
    </div>
  );
}