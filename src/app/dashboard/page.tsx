import { Metadata } from "next";
import { AgentFleetModule, TelemetryModule, AssessorModule } from "@/components/sections/DashboardModules";

export const metadata: Metadata = {
  title: "Dashboard - AI Visual Synthesis",
  description: "Manage your AI skills, active agents, and mastery roadmap.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-12">
        <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter mb-4 text-theme-text">
          Command Center
        </h1>
        <p className="text-xl text-theme-text/60 font-medium max-w-2xl">
          System telemetry, agent deployment status, and skill mastery tracking.
          Select a module to configure parameters and initialize Mastra services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <AgentFleetModule />
        <TelemetryModule />
        <AssessorModule />
      </div>
    </main>
  );
}
