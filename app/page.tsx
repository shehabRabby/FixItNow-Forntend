import HeroSection from "@/components/home/HeroSection";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <HeroSection />
      {/* <MarqueeTicker /> */}
      <CategoriesSection />
      {/* <FeaturedSlider /> */}
      {/* <ServicesSection /> */}
      <HowItWorks />
      <CtaBanner />
    </main>
  );
}
