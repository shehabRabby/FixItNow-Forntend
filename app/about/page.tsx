import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutStandards } from "@/components/about/AboutStandards";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Us | FixItNow",
  description: "Redefining Home Maintenance with trust and craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <AboutHero />
      <AboutMission />
      <AboutStandards />
      <AboutStory />
      <AboutCTA />
    </div>
  );
}