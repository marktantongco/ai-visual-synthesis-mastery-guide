"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Star,
  Zap,
  Image,
  Video,
  Brain,
  Layers,
  ChevronDown,
} from "lucide-react";
import { FadeIn, GlassCard, NeonTag } from "@/components/ui/primitives";

const tools = [
  {
    id: "midjourney",
    name: "Midjourney",
    tagline: "The King of Aesthetic AI Art",
    description:
      "The gold standard for photorealistic and painterly AI imagery. Known for cinematic quality, rich textures, and unparalleled aesthetic coherence. Best for commercial creative work.",
    tags: ["Photorealistic", "Artistic", "Premium"],
    tagColor: "cyan" as const,
    rating: 4.9,
    icon: "🎨",
    color: "#00F5FF",
    strengths: [
      "Cinematic lighting",
      "Painterly styles",
      "Consistent aesthetics",
      "High resolution",
    ],
    bestFor: "Artists, designers, commercial projects",
    pricing: "From $10/mo",
    href: "https://midjourney.com",
    difficulty: "Intermediate",
    diffPercent: 60,
  },
  {
    id: "dalle",
    name: "DALL·E 3",
    tagline: "Prompt-Accurate & Versatile",
    description:
      "OpenAI's flagship model excels at following complex prompts with precision. Integrated into ChatGPT, making it the most accessible AI image tool for non-technical users.",
    tags: ["Accurate", "Text-in-image", "ChatGPT"],
    tagColor: "green" as const,
    rating: 4.7,
    icon: "⚡",
    color: "#00FF87",
    strengths: [
      "Text rendering",
      "Prompt accuracy",
      "Safe outputs",
      "ChatGPT integration",
    ],
    bestFor: "Marketers, content creators, beginners",
    pricing: "ChatGPT Plus ($20/mo)",
    href: "https://openai.com/dall-e-3",
    difficulty: "Beginner",
    diffPercent: 25,
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    tagline: "Open-Source Powerhouse",
    description:
      "The fully open-source model that powers thousands of custom fine-tunes, LoRAs, and tools. Complete creative control with infinite customization possibilities.",
    tags: ["Open Source", "LoRA", "Local"],
    tagColor: "purple" as const,
    rating: 4.8,
    icon: "⚙️",
    color: "#BF00FF",
    strengths: [
      "Full control",
      "LoRA support",
      "Local deployment",
      "No censorship",
    ],
    bestFor: "Developers, advanced artists, researchers",
    pricing: "Free (self-hosted)",
    href: "https://stability.ai",
    difficulty: "Advanced",
    diffPercent: 90,
  },
  {
    id: "flux",
    name: "Flux.1",
    tagline: "The New Challenger",
    description:
      "Black Forest Labs' breakthrough model achieving photorealism that rivals Midjourney with stunning human anatomy accuracy and natural lighting — at open-source prices.",
    tags: ["Photorealism", "Free", "2024"],
    tagColor: "yellow" as const,
    rating: 4.8,
    icon: "🌊",
    color: "#FFE500",
    strengths: ["Human anatomy", "Natural lighting", "Open weights", "Speed"],
    bestFor: "Photographers, portrait artists",
    pricing: "Free / API pricing",
    href: "https://blackforestlabs.ai",
    difficulty: "Intermediate",
    diffPercent: 55,
  },
  {
    id: "runway",
    name: "Runway ML",
    tagline: "Image-to-Video Leader",
    description:
      "The premier tool for AI video generation and image animation. Gen-2 and Gen-3 Alpha produce cinema-quality video from still images or text prompts.",
    tags: ["Video", "Animation", "Professional"],
    tagColor: "pink" as const,
    rating: 4.6,
    icon: "🎬",
    color: "#FF006E",
    strengths: [
      "Video generation",
      "Frame interpolation",
      "Inpainting",
      "Professional grade",
    ],
    bestFor: "Filmmakers, motion designers, agencies",
    pricing: "From $15/mo",
    href: "https://runwayml.com",
    difficulty: "Intermediate",
    diffPercent: 50,
  },
  {
    id: "ideogram",
    name: "Ideogram",
    tagline: "Best Text-in-Image AI",
    description:
      "Solves the hardest problem in AI image gen: accurate text rendering. Create logos, posters, and typography-heavy designs with near-perfect lettering.",
    tags: ["Typography", "Logos", "Text"],
    tagColor: "green" as const,
    rating: 4.5,
    icon: "🔤",
    color: "#00FF87",
    strengths: ["Text accuracy", "Logo design", "Poster art", "Brand assets"],
    bestFor: "Graphic designers, brand teams",
    pricing: "Free tier / $8/mo",
    href: "https://ideogram.ai",
    difficulty: "Beginner",
    diffPercent: 20,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? "fill-neon-yellow text-neon-yellow" : "text-theme-text/20"}`}
        />
      ))}
      <span className="text-sm font-bold text-theme-text/70 ml-1">{rating}</span>
    </div>
  );
}

function ToolCard({
  tool,
  isExpanded,
  onToggle,
}: {
  tool: (typeof tools)[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article itemScope itemType="https://schema.org/SoftwareApplication">
      <meta itemProp="name" content={tool.name} />
      <meta itemProp="description" content={tool.description} />
      <meta itemProp="applicationCategory" content="MultimediaApplication" />
      <meta itemProp="operatingSystem" content="All" />
      <meta itemProp="url" content={tool.href} />
      
      <GlassCard className="cursor-pointer" hover={!isExpanded}>
      <div
        className="p-6"
        onClick={onToggle}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className="text-3xl w-14 h-14 bg-theme-bg flex items-center justify-center shrink-0 border-2 border-theme-text rounded-none shadow-[2px_2px_0_var(--theme-text)]"
              style={{ borderColor: tool.color }}
            >
              {tool.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-xl text-theme-text">
                  {tool.name}
                </h3>
                <NeonTag color={tool.tagColor}>{tool.difficulty}</NeonTag>
              </div>
              <p
                className="text-sm font-medium mt-0.5"
                style={{ color: tool.color }}
              >
                {tool.tagline}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-theme-text/40" />
          </motion.div>
        </div>

        {/* Rating + tags */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <StarRating rating={tool.rating} />
          <div className="flex gap-2 flex-wrap">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-theme-surface text-theme-text/50 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-theme-text/30 mb-1.5">
            <span>Difficulty</span>
            <span>{tool.diffPercent}%</span>
          </div>
          <div className="h-3 bg-theme-surface rounded-none overflow-hidden outline outline-2 outline-theme-text max-w-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isExpanded ? `${tool.diffPercent}%` : 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="h-full rounded-none border-r-2 border-theme-text"
              style={{
                background: tool.color,
              }}
            />
          </div>
        </div>
      </div>

      {/* Expanded content (Kept in DOM for SEO) */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
        aria-hidden={!isExpanded}
      >
        <div className="px-6 pb-6 border-t-4 border-theme-text pt-5 space-y-5 bg-theme-surface">
          <p className="text-theme-text/80 text-sm leading-relaxed font-mono">
            {tool.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div>
              <h4 className="text-xs font-bold text-theme-text/40 uppercase tracking-wider mb-3">
                Key Strengths
              </h4>
              <ul className="space-y-2">
                {tool.strengths.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 text-sm text-theme-text/70"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: tool.color }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta */}
            <div className="space-y-3">
              <div>
                <div className="text-xs font-bold text-theme-text/40 uppercase tracking-wider mb-1">
                  Best For
                </div>
                <div className="text-sm text-theme-text/70">{tool.bestFor}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-theme-text/40 uppercase tracking-wider mb-1">
                  Pricing
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: tool.color }}
                >
                  {tool.pricing}
                </div>
              </div>
            </div>
          </div>

          <a
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-none text-sm font-black text-theme-bg uppercase tracking-wide transition-all outline outline-2 outline-theme-text hover:-translate-y-1 hover:-translate-x-1"
            style={{ 
              background: tool.color,
              boxShadow: "4px 4px 0 var(--theme-text)" 
            }}
          >
            Try {tool.name}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </GlassCard>
    </article>
  );
}

export default function ToolsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": tool.pricing.includes("Free") ? "0" : "10",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating,
          "bestRating": "5",
          "ratingCount": "100"
        }
      }
    }))
  };

  return (
    <section id="tools" className="section" aria-labelledby="tools-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }}
      />
      {/* Section header */}
      <FadeIn>
        <div className="text-center mb-16">
          <NeonTag color="cyan">AI Tools</NeonTag>
          <h2
            id="tools-heading"
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl mt-4 mb-4 tracking-tight"
          >
            Every Major <span className="gradient-text-cyan">AI Tool</span>
            <br />
            Compared
          </h2>
          <p className="text-theme-text/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Honest, in-depth breakdowns of every significant AI image generation
            tool. Click any card to expand the full analysis.
          </p>
        </div>
      </FadeIn>

      {/* Tool grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, i) => (
          <FadeIn key={tool.id} delay={i * 0.08}>
            <ToolCard
              tool={tool}
              isExpanded={expanded === tool.id}
              onToggle={() =>
                setExpanded(expanded === tool.id ? null : tool.id)
              }
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
