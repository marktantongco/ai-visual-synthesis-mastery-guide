"use client";

import { motion } from "framer-motion";
import { Terminal, Database, BookOpen } from "lucide-react";
import { FadeIn, toast } from "@/components/ui/primitives";
import { agentSkills } from "@/data/agentSkills";

export default function AgentSkillsSection() {
  return (
    <section id="agentskills" className="relative z-10">
      <FadeIn>
        <div className="mb-12 border-b-4 border-theme-text pb-6">
          <div className="flex items-center gap-4 mb-4">
            <Database className="w-12 h-12 text-theme-accent" />
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-theme-text">
              Agent OS <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-theme-text brutal-shadow">Payloads</span>
            </h2>
          </div>
          <p className="font-mono text-theme-text/70 uppercase tracking-widest max-w-2xl text-sm border-l-4 border-theme-accent pl-4">
            Locally synced AI skill frameworks extracted from ~/.agents/skills.
            Deploy these workflows to augment context and capabilities.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentSkills.map((skill, index) => (
          <FadeIn key={skill.id} delay={index * 0.05}>
            <motion.div
              whileHover={{ y: -4, x: -4 }}
              className="h-full group flex flex-col p-6 bg-theme-bg border-4 border-theme-text brutal-shadow transition-all relative overflow-hidden"
              style={{
                boxShadow: "8px 8px 0 0 var(--theme-accent)",
              }}
            >
              {/* Background Accent Grid */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--theme-text)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between border-b-2 border-theme-text pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-theme-accent" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-theme-text/80 bg-theme-surface px-2 py-1 border border-theme-text">
                      SKILL_V1
                    </span>
                  </div>
                  <Terminal className="w-5 h-5 text-theme-text/30" />
                </div>

                <h3 className="font-display font-black text-2xl uppercase leading-tight mb-4 text-theme-text group-hover:text-theme-accent transition-colors">
                  {skill.name}
                </h3>

                <p className="font-mono text-sm text-theme-text/70 flex-grow mb-6 leading-relaxed line-clamp-4">
                  {skill.description || "NO DESCRIPTION FRAGMENT FOUND. RAW DATA INJECTED."}
                </p>

                <div className="mt-auto border-t-2 border-dashed border-theme-border pt-4 flex items-center justify-between">
                  <p className="font-mono text-[10px] text-theme-text/40 truncate">
                    ID: {skill.id.toUpperCase()}
                  </p>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`npx @mastra/cli deploy ${skill.id}`);
                      toast(`DEPLOY COMMAND COPIED`, "success");
                    }}
                    className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-theme-bg bg-theme-text px-3 py-1.5 hover:bg-theme-accent transition-colors"
                  >
                    Deploy <Terminal className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
