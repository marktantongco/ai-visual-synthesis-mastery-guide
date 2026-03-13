"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles, Cpu, Image } from "lucide-react";
import { FadeIn, Marquee } from "@/components/ui/primitives";

const floatingTags = [
  { text: "Midjourney", color: "var(--theme-accent)", x: "10%", y: "25%" },
  { text: "DALL·E 3", color: "var(--theme-accent)", x: "78%", y: "20%" },
  { text: "Stable Diffusion", color: "var(--theme-text)", x: "65%", y: "70%" },
  { text: "Sora", color: "var(--theme-accent)", x: "8%", y: "75%" },
  { text: "Flux", color: "var(--theme-text)", x: "45%", y: "85%" },
];

const marqueeItems = [
  "AI Image Generation",
  "Prompt Engineering",
  "Visual Synthesis",
  "Generative Art",
  "Text-to-Image",
  "Style Transfer",
  "ControlNet",
  "LoRA Techniques",
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animated-bg grid-pattern"
      aria-label="Hero section"
    >
      {/* Orbs */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="orb w-[600px] h-[600px] bg-theme-accent/5 top-[-15%] left-[-10%]" />
        <div className="orb w-[500px] h-[500px] bg-theme-accent/5 bottom-[-10%] right-[-5%]" />
        <div className="orb w-[300px] h-[300px] opacity-10 top-[40%] left-[30%]" style={{boxShadow: '0 0 100px var(--theme-accent)'}} />
      </motion.div>

      {/* Floating tool tags */}
      {floatingTags.map((tag, i) => (
        <motion.div
          key={tag.text}
          className="absolute hidden lg:block"
          style={{ left: tag.x, top: tag.y, zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 200, damping: 10 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, tag.text.length % 2 === 0 ? 3 : -3, 0] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="px-4 py-2 border-4 border-theme-text font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_var(--theme-text)] bg-theme-bg"
            style={{ color: tag.color }}
          >
            {tag.text}
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <FadeIn>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 glass border border-[var(--pu-violet)]/30 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--pu-cyan)] animate-pulse" />
            <span className="text-xs font-semibold text-[var(--pu-cyan)] tracking-widest uppercase font-mono">
              AI Practitioner Framework · 2026 Edition
            </span>
          </motion.div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.1}>
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter mb-6 uppercase drop-shadow-[4px_4px_0_var(--theme-accent)]">
            <span className="block text-theme-text transition-colors duration-300">Master</span>
            <span className="block kinetic-text italic px-2">AI Visual</span>
            <span className="block text-theme-text transition-colors duration-300">Synthesis</span>
          </h1>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--pu-secondary)' }}>
            From foundational prompts to expert agent orchestration — the 2026 practitioner's complete
            interactive guide to every major AI image generation tool, style, and workflow.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <motion.a
              href="#tools"
              whileHover={{
                scale: 1.05,
                boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
              }}
              whileTap={{ scale: 0.95, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)", translate: "4px 4px" }}
              className="px-8 py-4 rounded-none bg-theme-accent text-dark-900 border-4 border-theme-text font-black text-xl md:text-2xl uppercase tracking-widest w-full sm:w-auto text-center transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Explore Guide
            </motion.a>
            <motion.a
              href="#prompts"
              whileHover={{ scale: 1.05, boxShadow: "8px 8px 0px 0px var(--theme-accent)" }}
              whileTap={{ scale: 0.95, boxShadow: "2px 2px 0px 0px var(--theme-accent)", translate: "4px 4px" }}
              className="px-8 py-4 rounded-none bg-theme-bg text-theme-text border-4 border-theme-text font-black text-xl md:text-2xl uppercase tracking-widest w-full sm:w-auto text-center transition-all shadow-[6px_6px_0px_0px_var(--theme-accent)]"
            >
              Prompt Lib →
            </motion.a>
          </div>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.45}>
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-center">
            {[
              { label: "AI Tools Covered", value: "12+" },
              { label: "Prompt Templates", value: "80+" },
              { label: "Skill Framework Nodes", value: "6" },
              { label: "Free Resources", value: "∞" },
            ].map((stat) => (
              <div key={stat.label} className="min-w-[80px]">
                <div className="text-2xl md:text-3xl font-display font-black" style={{ color: 'var(--theme-accent)' }}>
                  {stat.value}
                </div>
                <div className="text-xs mt-1 font-medium uppercase tracking-wider" style={{ color: 'var(--pu-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-theme-text/30 font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-neon-cyan/60" />
        </motion.div>
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
