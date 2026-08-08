
import ServicesContent from "./ServicesContent"; 
import SpecializedServices from "@/components/services/SpecializedServices";
import FeaturedProfessionals from "@/components/services/FeaturedProfessionals";
import HeroSection from "@/components/services/HeroSection";

export default function ServicesPageMain() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* 1. Hero Section */}
      <HeroSection />
      <ServicesContent />
      <SpecializedServices />
      <FeaturedProfessionals />
    </div>
  );
}