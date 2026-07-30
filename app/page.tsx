import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <HowItWorks />
      <CtaBanner />
    </main>
  );
}