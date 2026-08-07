import SmoothScrollProvider from "@/components/about/SmoothScrollProvider";
import HeroSection from "@/components/about/HeroSection";
import MissionSection from "@/components/about/MissionSection";
import StorySection from "@/components/about/StorySection";
import ValuesGrid from "@/components/about/ValuesGrid";
import VettingSection from "@/components/about/VettingSection";
import ImpactSection from "@/components/about/ImpactSection";
import TeamSection from "@/components/about/TeamSection";

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />
        <MissionSection />
        <ImpactSection />
        <StorySection />
        <VettingSection />
        <ValuesGrid />
        <TeamSection />
      </main>
    </SmoothScrollProvider>
  );
}