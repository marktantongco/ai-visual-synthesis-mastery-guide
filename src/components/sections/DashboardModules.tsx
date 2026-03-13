"use client";

import { useState } from "react";
import { Play, Activity, Target, Terminal, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/primitives";

export function AgentFleetModule() {
  const [status, setStatus] = useState<"offline" | "initializing" | "active">("offline");

  const handleInitialize = () => {
    setStatus("initializing");
    toast({
      title: "SYSTEM INITIALIZATION",
      description: "Booting Mastra engine and loading agent fleet...",
    });
    
    setTimeout(() => {
      setStatus("active");
      toast({
        title: "FLEET ONLINE",
        description: "All agents reporting green. Command link established.",
      });
    }, 2000);
  };

  return (
    <div className="bg-theme-bg border-4 border-theme-text p-6 shadow-[8px_8px_0_var(--theme-accent)] transition-transform hover:-translate-y-1 hover:-translate-x-1 group h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-neon-cyan/20 border-2 border-theme-text flex items-center justify-center shadow-[2px_2px_0_var(--theme-text)]">
          <span className="text-xl">🤖</span>
        </div>
        <span className={`text-[10px] font-black tracking-widest uppercase border-2 border-theme-text px-2 py-1 ${
          status === "active" ? "bg-neon-green/20" : status === "initializing" ? "bg-neon-yellow/20 animate-pulse" : "bg-theme-surface"
        } text-theme-text`}>
          {status}
        </span>
      </div>
      <h3 className="font-display font-black text-2xl uppercase mb-2 text-theme-text flex items-center gap-2">
        Agent Fleet {status === "active" && <Terminal className="w-5 h-5 text-neon-cyan" />}
      </h3>
      <p className="font-mono text-sm text-theme-text/70 mb-8 flex-grow">
        {status === "active" 
          ? "Fleet is operational. Assessor Agent is listening for evaluation requests."
          : "Manage deployed Mastra agents, review interaction logs, and assign new tasks."}
      </p>
      
      {status === "offline" ? (
        <button 
          onClick={handleInitialize}
          className="w-full py-3 bg-theme-text text-theme-bg font-black uppercase tracking-widest text-sm hover:bg-theme-surface transition-colors border-2 border-theme-text hover:text-theme-text group-hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" /> Initialize Fleet
        </button>
      ) : (
        <div className="flex gap-2">
           <button 
            className="flex-1 py-3 bg-theme-bg text-theme-text border-2 border-theme-text font-black uppercase tracking-widest text-[10px] hover:bg-theme-surface transition-colors"
            onClick={() => {
              navigator.clipboard.writeText("npx mastra dev");
              toast({ title: "CLI COMMAND COPIED", description: "Run 'npx mastra dev' to see local logs." });
            }}
          >
            Copy Dev Cmd
          </button>
          <button 
            className="flex-1 py-3 bg-neon-cyan text-dark-900 border-2 border-theme-text font-black uppercase tracking-widest text-[10px] hover:bg-white transition-colors"
          >
            Configure
          </button>
        </div>
      )}
    </div>
  );
}

export function TelemetryModule() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-theme-bg border-4 border-theme-text p-6 shadow-[8px_8px_0_var(--theme-text)] transition-transform hover:-translate-y-1 hover:-translate-x-1 group h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-neon-purple/20 border-2 border-theme-text flex items-center justify-center shadow-[2px_2px_0_var(--theme-text)]">
          <Activity className="w-6 h-6 text-theme-text" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-black tracking-widest uppercase border-2 border-theme-text px-2 py-1 bg-neon-green/20 text-theme-text">Active</span>
          <span className="text-[9px] font-mono text-theme-text/40">Uptime: 99.9%</span>
        </div>
      </div>
      <h3 className="font-display font-black text-2xl uppercase mb-2 text-theme-text">
        Telemetry
      </h3>
      <div className="space-y-3 mb-8 flex-grow">
        <div className="w-full bg-theme-surface border-2 border-theme-text h-6 relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            className="h-full bg-neon-purple shadow-[2px_0_0_var(--theme-text)]"
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase mix-blend-difference text-white">CPU LOAD: 65%</span>
        </div>
        <div className="w-full bg-theme-surface border-2 border-theme-text h-6 relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "42%" }}
            className="h-full bg-neon-cyan shadow-[2px_0_0_var(--theme-text)]"
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase mix-blend-difference text-white">MEMORY: 4.2GB</span>
        </div>
      </div>
      <button 
        onClick={() => {
           setCopied(true);
           setTimeout(() => setCopied(false), 2000);
           toast({ title: "LOGS EXPORTED", description: "Telemetry report saved to local session." });
        }}
        className="w-full py-3 bg-theme-bg text-theme-text font-black uppercase tracking-widest text-sm hover:bg-theme-surface transition-colors border-2 border-theme-text group-hover:scale-[1.02] flex items-center justify-center gap-2"
      >
        {copied ? <Check className="w-4 h-4" /> : <Terminal className="w-4 h-4" />} Export Logs
      </button>
    </div>
  );
}

export function AssessorModule() {
  const [testActive, setTestActive] = useState(false);

  return (
    <div className="bg-theme-bg border-4 border-theme-text p-6 shadow-[8px_8px_0_var(--theme-text)] transition-transform hover:-translate-y-1 hover:-translate-x-1 group h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-neon-pink/20 border-2 border-theme-text flex items-center justify-center shadow-[2px_2px_0_var(--theme-text)]">
          <Target className="w-6 h-6 text-theme-text" />
        </div>
        <span className="text-[10px] font-black tracking-widest uppercase border-2 border-theme-text px-2 py-1 bg-theme-surface text-theme-text">
          {testActive ? "In Progress" : "Standby"}
        </span>
      </div>
      <h3 className="font-display font-black text-2xl uppercase mb-2 text-theme-text">
        Skill Assessor
      </h3>
      <p className="font-mono text-sm text-theme-text/70 mb-8 flex-grow">
        {testActive 
          ? "Analyzing baseline competencies... Please wait for agent prompt."
          : "Take baseline tests to evaluate your prompt engineering and Gen-Z UI skills."}
      </p>
      
      <button 
        onClick={() => {
          setTestActive(!testActive);
          if(!testActive) {
            toast({
              title: "ASSESSMENT STARTED",
              description: "Assessor Agent is preparing evaluation sequence.",
            });
          }
        }}
        className={`w-full py-3 font-black uppercase tracking-widest text-sm transition-all border-2 border-theme-text group-hover:scale-[1.02] flex items-center justify-center gap-2 ${
          testActive ? "bg-neon-pink text-dark-900" : "bg-theme-bg text-theme-text hover:bg-theme-surface"
        }`}
      >
         {testActive ? "Cancel Test" : "Start Test"}
      </button>
    </div>
  );
}
