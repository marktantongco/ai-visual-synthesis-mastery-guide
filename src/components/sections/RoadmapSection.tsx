"use client";

import { motion } from "framer-motion";
import { FadeIn, GlassCard, NeonTag } from "@/components/ui/primitives";
import { Check, X, Minus } from "lucide-react";

const tools = [
  "Midjourney",
  "DALL·E 3",
  "Stable Diff.",
  "Flux.1",
  "Runway",
  "Ideogram",
];

const rows = [
  { feature: "Photorealism", scores: [5, 4, 4, 5, 3, 3] },
  { feature: "Artistic styles", scores: [5, 4, 5, 4, 2, 3] },
  { feature: "Text rendering", scores: [2, 4, 2, 3, 1, 5] },
  { feature: "Video output", scores: [0, 0, 1, 0, 5, 0] },
  { feature: "Free to use", scores: [0, 2, 5, 5, 1, 4] },
  { feature: "Local/offline", scores: [0, 0, 5, 5, 0, 0] },
  { feature: "API access", scores: [4, 5, 5, 5, 5, 4] },
  { feature: "Ease of use", scores: [3, 5, 1, 3, 4, 5] },
  { feature: "Community/LoRA", scores: [4, 2, 5, 4, 2, 2] },
  { feature: "Speed", scores: [3, 4, 2, 4, 3, 4] },
];

function ScoreCell({ score }: { score: number }) {
  if (score === 0) {
    return (
      <div className="flex justify-center">
        <X className="w-4 h-4 text-theme-text/15" />
      </div>
    );
  }

  const bars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center justify-center gap-0.5">
      {bars.map((b) => (
        <div
          key={b}
          className={`h-4 w-2 rounded-none transition-all ${
            b <= score ? "bg-neon-cyan" : "bg-theme-surface"
          }`}
          style={b <= score ? { opacity: 0.4 + b * 0.12 } : {}}
        />
      ))}
    </div>
  );
}

const roadmapItems = [
  {
    quarter: "Now",
    title: "Prompt Mastery",
    items: [
      "Text-to-image basics",
      "Prompt anatomy",
      "Style references",
      "Aspect ratios",
    ],
    status: "current",
    color: "#00F5FF",
  },
  {
    quarter: "Week 2",
    title: "Advanced Generation",
    items: [
      "ControlNet fundamentals",
      "Inpainting workflow",
      "Upscaling techniques",
      "Batch generation",
    ],
    status: "next",
    color: "#BF00FF",
  },
  {
    quarter: "Week 3",
    title: "Fine-tuning & LoRA",
    items: [
      "Training LoRA models",
      "Style LoRA creation",
      "Character consistency",
      "Merging models",
    ],
    status: "future",
    color: "#FF006E",
  },
  {
    quarter: "Week 4+",
    title: "Video & Animation",
    items: [
      "Image-to-video",
      "Frame interpolation",
      "Consistent characters",
      "AI film workflow",
    ],
    status: "future",
    color: "#00FF87",
  },
];

export default function RoadmapSection() {
  return (
    <>
      {/* Comparison table */}
      <section className="section" aria-labelledby="comparison-heading">
        <FadeIn>
          <div className="text-center mb-12">
            <NeonTag color="yellow">Comparison</NeonTag>
            <h2
              id="comparison-heading"
              className="font-display font-black text-4xl sm:text-5xl mt-4 mb-4 tracking-tight"
            >
              Side-by-Side{" "}
              <span className="gradient-text-cyan">Comparison</span>
            </h2>
            <p className="text-theme-text/50 text-lg max-w-xl mx-auto">
              Every tool rated 1–5 across the metrics that actually matter.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-x-auto bg-theme-bg border-4 border-theme-text shadow-[8px_8px_0_var(--theme-accent)] transition-all">
            <table
              className="w-full min-w-[700px]"
              role="table"
              aria-label="AI tool comparison"
            >
              <thead>
                <tr className="border-b-4 border-theme-text bg-theme-surface">
                  <th className="text-left px-5 py-4 text-xs font-black text-theme-text uppercase tracking-wider w-36">
                    Feature
                  </th>
                  {tools.map((t) => (
                    <th
                      key={t}
                      className="px-3 py-4 text-center text-xs font-bold text-theme-text/60 uppercase tracking-wide"
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ri * 0.05 }}
                    className="border-b-2 border-theme-text/20 last:border-0 hover:bg-theme-surface transition-colors"
                  >
                    <td className="px-5 py-3.5 text-sm text-theme-text font-bold">
                      {row.feature}
                    </td>
                    {row.scores.map((score, si) => (
                      <td key={si} className="px-3 py-3.5">
                        <ScoreCell score={score} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* Learning roadmap */}
      <section
        id="roadmap"
        className="section pt-0"
        aria-labelledby="roadmap-heading"
      >
        <FadeIn>
          <div className="text-center mb-14">
            <NeonTag color="pink">Roadmap</NeonTag>
            <h2
              id="roadmap-heading"
              className="font-display font-black text-4xl sm:text-5xl mt-4 mb-4 tracking-tight"
            >
              Your 30-Day{" "}
              <span className="gradient-text-fire">Mastery Path</span>
            </h2>
            <p className="text-theme-text/50 text-lg max-w-xl mx-auto">
              A progressive learning roadmap from zero to professional AI visual
              artist.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-[calc(50%-4px)] top-0 bottom-0 w-2 bg-theme-text hidden sm:block z-0" />

          <div className="space-y-8">
            {roadmapItems.map((item, i) => (
              <FadeIn key={item.quarter} delay={i * 0.12}>
                <div
                  className={`flex gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline node */}
                  <div className="relative z-10 hidden sm:flex shrink-0 md:w-1/2 justify-end md:pr-10 items-center gap-4">
                    {i % 2 === 0 && (
                      <div className="text-right hidden md:block">
                        <div
                          className="font-display font-black text-sm uppercase tracking-widest"
                          style={{ color: item.color }}
                        >
                          {item.quarter}
                        </div>
                        <div className="text-theme-text font-bold text-xl">
                          {item.title}
                        </div>
                      </div>
                    )}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-8 h-8 flex items-center justify-center shrink-0 z-10"
                    >
                      <div 
                        className="w-4 h-4 rounded-none border-4 outline outline-4 outline-theme-bg"
                        style={{
                          borderColor: item.color,
                          background:
                            item.status === "current"
                              ? item.color
                              : "var(--theme-bg)",
                          boxShadow:
                            item.status === "current"
                              ? `4px 4px 0 ${item.color}80`
                              : "none",
                          transform: "rotate(45deg)"
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 md:w-1/2 md:pl-10 ${i % 2 === 1 ? "md:text-right md:pl-0 md:pr-10" : ""}`}
                  >
                    <GlassCard hover={false}>
                      <div className="p-6">
                        <div className="md:hidden mb-3">
                          <span
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: item.color }}
                          >
                            {item.quarter}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-theme-text mb-4">
                          {item.title}
                        </h3>
                        <ul
                          className={`space-y-2 ${i % 2 === 1 ? "md:items-end" : ""} flex flex-col`}
                        >
                          {item.items.map((it) => (
                            <li
                              key={it}
                              className={`flex items-center gap-2 text-sm text-theme-text/60 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: item.color }}
                              />
                              {it}
                            </li>
                          ))}
                        </ul>
                        {item.status === "current" && (
                          <div className="mt-4">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                              style={{
                                background: item.color + "20",
                                color: item.color,
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: item.color }}
                              />
                              Start Here
                            </span>
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  </div>

                  {/* Right side label (for even items on desktop) */}
                  <div className="hidden md:flex shrink-0 md:w-1/2 md:pl-10 items-center gap-4">
                    {i % 2 === 1 && (
                      <div>
                        <div
                          className="font-display font-black text-sm uppercase tracking-widest"
                          style={{ color: item.color }}
                        >
                          {item.quarter}
                        </div>
                        <div className="text-theme-text font-bold text-xl">
                          {item.title}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
