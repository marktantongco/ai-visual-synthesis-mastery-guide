"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, BookOpen, Layers, Terminal as TerminalIcon } from "lucide-react";
import { prompts } from "@/data/imagePrompts";
import { skillNodes } from "@/data/skillMap";
import { agentSkills } from "@/data/agentSkills";
import { toast } from "@/components/ui/primitives";

export default function MasterSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Handle Command+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Aggregated Search Data
  const allPrompts = Object.values(prompts).flat().map(p => ({ ...p, type: "prompt" as const }));
  const allSkills = skillNodes.map(s => ({ ...s, type: "skill" as const }));
  const allAgents = agentSkills.map(a => ({ title: a.name, description: a.description, contentSnippet: a.contentSnippet, type: "agent" as const, id: a.id }));
  
  const searchResults = [...allPrompts, ...allSkills, ...allAgents].filter((item) => {
    const q = query.toLowerCase();
    const searchable = `${item.title} ${(item as any).description || ""} ${(item as any).contentSnippet || ""} ${(item as any).tags?.join(" ") || ""}`.toLowerCase();
    return searchable.includes(q);
  });

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        className="fixed bottom-6 right-6 md:bottom-auto md:top-6 md:right-6 z-[60] flex items-center gap-2 px-4 py-3 bg-theme-bg border-4 border-theme-text text-theme-text brutalist-shadow transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_var(--theme-accent)]"
        onClick={() => setIsOpen(true)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Search className="w-5 h-5 text-theme-accent" />
        <span className="font-bold uppercase tracking-wider hidden sm:inline-block">Search OS</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-xs opacity-50">
          <Command className="w-3 h-3" />K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-theme-bg/90 backdrop-blur-sm"
            />

            {/* Modal - Bottom Sheet on Mobile, Centered on Desktop */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full md:w-[600px] h-[80vh] md:h-[70vh] flex flex-col bg-theme-bg border-4 border-theme-text brutalist-shadow-lg overflow-hidden"
              style={{
                boxShadow: "16px 16px 0 0 var(--theme-accent)"
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 p-4 border-b-4 border-theme-text bg-theme-surface">
                <Search className="w-6 h-6 text-theme-accent shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="SEARCH PROMPTS, SKILLS, MODES..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-display font-black uppercase text-xl text-theme-text placeholder:text-theme-text/30"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-theme-bg border-2 border-transparent hover:border-theme-text transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Results List */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {query.length > 0 && searchResults.length === 0 ? (
                  <div className="p-8 text-center text-theme-text/50 font-mono font-bold uppercase">
                    NO MATCHING DATA FRAGMENTS FOUND.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {query.length === 0 ? (
                      <div className="p-4 text-theme-text/40 font-mono text-xs uppercase tracking-widest text-center border-2 border-dashed border-theme-border">
                        Enter query to sift through {allPrompts.length + allSkills.length + allAgents.length} data nodes.
                      </div>
                    ) : null}

                    {searchResults.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="group flex flex-col p-4 border-2 border-theme-border hover:border-theme-accent bg-theme-bg hover:bg-theme-surface transition-colors cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          const target = item.type === "prompt" ? "#prompts" : "#skillmap";
                          window.location.hash = target;
                          setIsOpen(false);
                          toast(`NAVIGATING TO /${target.replace('#', '')}`, "success");
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {item.type === "prompt" ? (
                            <TerminalIcon className="w-4 h-4 text-neon-cyan" />
                          ) : item.type === "agent" ? (
                            <BookOpen className="w-4 h-4 text-theme-accent" />
                          ) : (
                            <Layers className="w-4 h-4 text-neon-purple" />
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-widest text-theme-text/80">
                            {item.type === "prompt" ? ((item as any).tool || "PROMPT") : 
                             item.type === "agent" ? "SKILL PAYLOAD" : 
                             ((item as any).level || "SKILL MAP")}
                          </span>
                        </div>
                        <h4 className="font-display font-black text-lg uppercase text-theme-text leading-tight mb-2 group-hover:text-theme-accent transition-colors">
                          {item.title}
                        </h4>
                        {item.type === "prompt" && (
                          <p className="font-mono text-xs text-theme-text/50 line-clamp-2">{(item as any).prompt}</p>
                        )}
                        {(item.type === "skill" || item.type === "agent") && (
                          <p className="font-mono text-xs text-theme-text/50 line-clamp-2">{(item as any).description}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-2 border-t-2 border-theme-border flex items-center justify-between text-[10px] uppercase font-bold font-mono text-theme-text/40 bg-theme-bg">
                <span>Navigate: <kbd className="border border-theme-border px-1 ml-1">TAB</kbd> / <kbd className="border border-theme-border px-1">↓</kbd></span>
                <span>Select: <kbd className="border border-theme-border px-1 ml-1">⏎</kbd></span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
