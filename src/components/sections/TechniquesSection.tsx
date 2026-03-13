"use client";

import { motion } from "framer-motion";
import {
  FadeIn,
  GlassCard,
  NeonTag,
  AnimatedCounter,
} from "@/components/ui/primitives";
import { TrendingUp, Users, Star, Globe } from "lucide-react";

const techniques = [
  {
    number: "01",
    title: "Prompt Anatomy",
    description:
      "Every great AI image prompt follows a structure: Subject → Style → Lighting → Camera → Modifiers. Master this formula and your outputs transform immediately.",
    examples: [
      "Subject: 'cyberpunk woman'",
      "Style: 'photorealistic, 8K'",
      "Lighting: 'dramatic neon rim light'",
      "Camera: '85mm, f/1.4, bokeh'",
      "Modifiers: '--v 6 --ar 2:3'",
    ],
    color: "#00F5FF",
    icon: "🧬",
  },
  {
    number: "02",
    title: "Style Transfer",
    description:
      "Reference real-world artists, movements, and mediums to guide the aesthetic. Named artist references are powerful — combine 2-3 for unique hybrids.",
    examples: [
      "'in the style of Alphonse Mucha'",
      "'Greg Rutkowski fantasy art'",
      "'Wes Anderson cinematography'",
      "'Brutalist architecture'",
      "'Studio Ghibli color palette'",
    ],
    color: "#BF00FF",
    icon: "🎭",
  },
  {
    number: "03",
    title: "Negative Prompting",
    description:
      "Tell the AI what NOT to generate. This is one of the highest-leverage techniques, especially in Stable Diffusion. Remove deformities, bad quality, and unwanted elements.",
    examples: [
      "blurry, low quality, noise",
      "extra fingers, deformed hands",
      "watermark, signature, text",
      "ugly, worst quality, low res",
      "duplicate, cropped, mutated",
    ],
    color: "#FF006E",
    icon: "🚫",
  },
  {
    number: "04",
    title: "LoRA & Fine-tuning",
    description:
      "Low-Rank Adaptation models let you inject specific characters, styles, or concepts into any Stable Diffusion model. Stack multiple LoRAs for compound effects.",
    examples: [
      "Character LoRAs (specific people)",
      "Style LoRAs (art movements)",
      "Concept LoRAs (objects, clothes)",
      "Weight syntax: <lora:name:0.8>",
      "Combine up to 3 LoRAs safely",
    ],
    color: "#00FF87",
    icon: "🔧",
  },
  {
    number: "05",
    title: "ControlNet",
    description:
      "Gives you spatial control over AI outputs using source images. Use depth maps, pose skeletons, edge detection, or sketches to precisely control composition.",
    examples: [
      "OpenPose: Control body positions",
      "Canny: Control edges/outlines",
      "Depth: Control spatial layout",
      "Scribble: Sketch-to-image",
      "IP-Adapter: Style preservation",
    ],
    color: "#FFE500",
    icon: "🎛️",
  },
  {
    number: "06",
    title: "Inpainting & Outpainting",
    description:
      "Edit specific regions of an image without affecting the rest. Outpainting extends the canvas beyond the original borders — crucial for changing aspect ratios.",
    examples: [
      "Replace faces while keeping pose",
      "Change backgrounds seamlessly",
      "Extend landscape compositions",
      "Fix artifacts in specific areas",
      "Add/remove objects surgically",
    ],
    color: "#00F5FF",
    icon: "🖌️",
  },
];

const stats = [
  { label: "Global AI art creators", value: 50, suffix: "M+", icon: Users },
  { label: "Images generated daily", value: 34, suffix: "M+", icon: Star },
  { label: "Market size by 2030", value: 149, suffix: "B", icon: TrendingUp },
  { label: "Countries using AI art", value: 190, suffix: "+", icon: Globe },
];

export default function TechniquesSection() {
  return (
    <section
      id="techniques"
      className="relative"
      aria-labelledby="techniques-heading"
    >
      {/* Stats banner */}
      <div className="bg-theme-surface border-y-4 border-theme-text py-12 px-4 shadow-[0_4px_0_var(--theme-text)] mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="space-y-1">
                  <div className="font-display font-black text-3xl md:text-4xl text-neon-cyan">
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-theme-text font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="section">
        <FadeIn>
          <div className="text-center mb-16">
            <NeonTag color="green">Techniques</NeonTag>
            <h2
              id="techniques-heading"
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl mt-4 mb-4 tracking-tight"
            >
              Six Techniques That{" "}
              <span className="gradient-text-fire">Separate Pros</span>
              <br />
              From Beginners
            </h2>
            <p className="text-theme-text/50 text-lg max-w-2xl mx-auto leading-relaxed">
              These are the techniques that experienced AI artists use every day
              — and rarely teach for free.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techniques.map((tech, i) => (
            <FadeIn key={tech.number} delay={i * 0.08}>
              <GlassCard
                className="group h-full flex flex-col p-6"
              >
                {/* Number + icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="text-3xl w-12 h-12 bg-theme-bg border-2 border-theme-text rounded-none flex items-center justify-center shrink-0 drop-shadow-[2px_2px_0_var(--theme-text)]"
                    style={{ borderColor: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs font-black tracking-widest uppercase mb-0.5"
                      style={{ color: tech.color }}
                    >
                      Step {tech.number}
                    </div>
                    <h3 className="font-display font-black text-xl text-theme-text uppercase">
                      {tech.title}
                    </h3>
                  </div>
                </div>

                <p className="text-theme-text/80 text-sm leading-relaxed mb-5 flex-1 font-mono">
                  {tech.description}
                </p>

                {/* Example list */}
                <div className="bg-theme-surface rounded-none p-4 border-2 border-theme-border">
                  <div className="text-xs font-black text-theme-text uppercase tracking-wider mb-3">
                    Examples
                  </div>
                  <ul className="space-y-1.5">
                    {tech.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-center gap-2 text-xs text-theme-text/80 font-mono"
                      >
                        <span
                          className="w-2 h-2 rounded-none shrink-0"
                          style={{ background: tech.color }}
                        />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
