"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#tools", label: "Tools" },
  { href: "/#techniques", label: "Techniques" },
  { href: "/#prompts", label: "Prompts" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-theme-surface border-b-4 border-theme-text py-3"
            : "bg-theme-bg border-b-4 border-theme-text py-5",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
          >
            <div className="w-8 h-8 bg-theme-text flex items-center justify-center transition-transform hover:-translate-y-1 hover:-translate-x-1 outline outline-2 outline-theme-bg shadow-[2px_2px_0_var(--theme-accent)]">
              <Zap className="w-4 h-4 text-theme-bg" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
              AI<span className="text-neon-cyan">Synth</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  active === link.href
                    ? "text-neon-cyan"
                    : "text-theme-text/60 hover:text-theme-text",
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-theme-surface"
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#prompts"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 rounded-xl bg-neon-cyan text-dark-900 font-semibold text-sm transition-all hover:bg-white focus-visible:outline-none"
            >
              Start Learning
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 bg-theme-bg border-2 border-theme-text text-theme-text rounded-none drop-shadow-[2px_2px_0_var(--theme-text)]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-4 right-4 z-30 glass rounded-2xl border border-theme-border p-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-theme-text/70 hover:text-theme-text hover:bg-theme-surface rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#prompts"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 text-sm font-semibold text-center rounded-xl bg-neon-cyan text-dark-900"
              >
                Start Learning
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
