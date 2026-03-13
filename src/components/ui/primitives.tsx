"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Fade-in-up on scroll
───────────────────────────────────────────── */
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Glassmorphism card
───────────────────────────────────────────── */
export function GlassCard({
  children,
  className = "",
  hover = true,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "pink" | "green";
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, x: -4, boxShadow: "8px 8px 0 var(--theme-accent)" } : {}}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "bg-theme-bg border-4 border-theme-text rounded-none brutalist-shadow transition-all",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Neon badge / tag pill
───────────────────────────────────────────── */
export function NeonTag({
  children,
  color = "cyan",
  className = "",
}: {
  children: React.ReactNode;
  color?: "cyan" | "purple" | "pink" | "green" | "yellow";
  className?: string;
}) {
  const colorMap = {
    cyan: "text-neon-cyan border-neon-cyan bg-neon-cyan/10 drop-shadow-[2px_2px_0_var(--theme-text)]",
    purple: "text-neon-purple border-neon-purple bg-neon-purple/10 drop-shadow-[2px_2px_0_var(--theme-text)]",
    pink: "text-neon-pink border-neon-pink bg-neon-pink/10 drop-shadow-[2px_2px_0_var(--theme-text)]",
    green: "text-neon-green border-neon-green bg-neon-green/10 drop-shadow-[2px_2px_0_var(--theme-text)]",
    yellow: "text-neon-yellow border-neon-yellow bg-neon-yellow/10 drop-shadow-[2px_2px_0_var(--theme-text)]",
  };

  return (
    <span
      className={cn(
        "inline-flex border-2 font-bold tracking-widest uppercase px-3 py-1 text-[10px] rounded-none",
        colorMap[color],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  duration = 2,
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(from);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - start) / (duration * 1000);
      if (elapsed >= 1) {
        setCount(to);
        clearInterval(timer);
      } else {
        const ease = 1 - Math.pow(1 - elapsed, 3);
        setCount(Math.round(from + (to - from) * ease));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, from, to, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Scroll progress bar
───────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink origin-left z-50"
    />
  );
}

/* ─────────────────────────────────────────────
   Marquee ticker
───────────────────────────────────────────── */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="w-full overflow-hidden py-3 border-y border-white/5">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium text-theme-text/30 tracking-widest uppercase shrink-0"
          >
            {item} <span className="text-neon-cyan/50 mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Toast Notification System
───────────────────────────────────────────── */
interface ToastEventDetail {
  title?: string;
  description?: string;
  message?: string;
  type?: "info" | "success" | "error";
}

export function toast(payload: string | ToastEventDetail, type: "info" | "success" | "error" = "info") {
  if (typeof window !== "undefined") {
    const detail = typeof payload === "string" ? { message: payload, type } : { ...payload, type: payload.type || type };
    const event = new CustomEvent<ToastEventDetail>("app-toast", { detail });
    window.dispatchEvent(event);
  }
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<(ToastEventDetail & { id: string })[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastEventDetail>;
      const newToast = { ...customEvent.detail, id: Math.random().toString(36).substr(2, 9) };
      setToasts((prev) => [...prev, newToast]);
      
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3000);
    };

    window.addEventListener("app-toast", handleToast);
    return () => window.removeEventListener("app-toast", handleToast);
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-theme-bg border-4 border-theme-text text-theme-text px-6 py-3 shadow-[4px_4px_0_var(--theme-accent)] flex flex-col min-w-[300px]"
          >
            <div className="flex items-center justify-between mb-1">
               <span className="font-mono font-bold uppercase tracking-widest text-[10px]">
                {t.title || t.message || "NOTICE"}
              </span>
              {t.type === "success" && <span className="text-theme-accent ml-3">✦</span>}
            </div>
            {t.description && (
              <span className="font-mono text-[9px] text-theme-text/60 leading-tight">
                {t.description}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
