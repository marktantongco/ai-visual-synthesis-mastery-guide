"use client";

import { ScrollProgress, ToastProvider } from "@/components/ui/primitives";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import SearchSection from "@/components/sections/SearchSection";
import SkillMapSection from "@/components/sections/SkillMapSection";
import AgentSkillsSection from "@/components/sections/AgentSkillsSection";
import ToolsSection from "@/components/sections/ToolsSection";
import TechniquesSection from "@/components/sections/TechniquesSection";
import PromptsSection from "@/components/sections/PromptsSection";
import GallerySection from "@/components/sections/GallerySection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import Footer from "@/components/sections/Footer";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import MasterSearch from "@/components/ui/MasterSearch";

export default function HomeClient() {
  return (
    <main>
      <ScrollProgress />
      <ToastProvider />
      <MasterSearch />
      <Navbar />
      <HeroSection />
      <SearchSection />
      <SkillMapSection />
      <AgentSkillsSection />
      <ToolsSection />
      <TechniquesSection />
      <PromptsSection />
      <GallerySection />
      <RoadmapSection />
      <Footer />
      <ThemeSwitcher />
    </main>
  );
}
