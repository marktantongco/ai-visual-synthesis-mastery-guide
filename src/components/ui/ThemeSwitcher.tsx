"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Palette, X } from "lucide-react";

const themes = [
  { id: "neon",    label: "Neon",    dot: "#00F5FF" },
  { id: "minimal", label: "Violet",  dot: "#7B5CFF" },
  { id: "glass",   label: "Magenta", dot: "#FF4FD8" },
  { id: "amber",   label: "Amber",   dot: "#FFB000" },
] as const;

type ThemeId = typeof themes[number]["id"];
type ModeId = "dark" | "light";

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("neon");
  const [mode, setMode] = useState<ModeId>("dark");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", activeTheme);
    root.setAttribute("data-mode", mode);
  }, [activeTheme, mode]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" aria-label="Theme Controller">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="glass rounded-2xl border border-theme-border p-4 flex flex-col gap-4 shadow-2xl"
          >
            {/* Mode Toggle */}
            <div>
              <div className="text-[10px] font-mono text-theme-text/50 uppercase tracking-widest mb-2">Mode</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("dark")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                    mode === "dark" ? "bg-theme-accent text-dark-900 border-transparent shadow-[0_0_15px_rgba(var(--theme-accent-rgb),0.5)]" : "border-theme-border text-theme-text hover:bg-theme-surface"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Dark
                </button>
                <button
                  onClick={() => setMode("light")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                    mode === "light" ? "bg-theme-accent text-theme-text border-transparent shadow-[0_0_15px_rgba(var(--theme-accent-rgb),0.5)]" : "border-theme-border text-theme-text hover:bg-theme-surface"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Light
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-theme-border" />

            {/* Accent Colors */}
            <div>
              <div className="text-[10px] font-mono text-theme-text/50 uppercase tracking-widest mb-2">Accent</div>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((t) => (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTheme(t.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                      activeTheme === t.id ? "border-theme-accent bg-theme-surface text-theme-text shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.2)]" : "border-transparent text-theme-text/70 hover:bg-theme-surface hover:text-theme-text"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-inner"
                      style={{ background: t.dot }}
                    />
                    {t.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass border border-theme-border flex items-center justify-center text-theme-text shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.5)] transition-all"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Palette className="w-5 h-5 text-theme-accent" />}
      </motion.button>
    </div>
  );
}
