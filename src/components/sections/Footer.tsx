"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/primitives";
import { Github, Twitter, Youtube, Zap, Heart } from "lucide-react";

const footerLinks = [
  {
    heading: "Learn",
    links: [
      { label: "Tools Overview", href: "#tools" },
      { label: "Techniques Guide", href: "#techniques" },
      { label: "Prompt Library", href: "#prompts" },
      { label: "Gallery", href: "#gallery" },
      { label: "Learning Roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Midjourney Docs", href: "https://docs.midjourney.com" },
      {
        label: "Stable Diffusion Wiki",
        href: "https://github.com/AUTOMATIC1111",
      },
      { label: "Flux.1 GitHub", href: "https://github.com/black-forest-labs" },
      { label: "PromptHero", href: "https://prompthero.com" },
      { label: "Civitai Models", href: "https://civitai.com" },
    ],
  },
  {
    heading: "Community",
    links: [
      {
        label: "r/StableDiffusion",
        href: "https://reddit.com/r/StableDiffusion",
      },
      { label: "Midjourney Discord", href: "https://discord.gg/midjourney" },
      {
        label: "AI Art Twitter",
        href: "https://twitter.com/search?q=%23aiart",
      },
      { label: "Lexica.art", href: "https://lexica.art" },
      { label: "OpenArt.ai", href: "https://openart.ai" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-800" role="contentinfo">
      {/* CTA banner */}
      <FadeIn>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-neon-purple/5 to-neon-pink/5" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 glass border border-neon-cyan/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs font-semibold text-neon-cyan tracking-widest uppercase">
                Free — No signup required
              </span>
            </motion.div>

            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6">
              Start Creating
              <br />
              <span className="shimmer-text">AI Art Today</span>
            </h2>

            <p className="text-theme-text/50 text-lg max-w-xl mx-auto mb-10">
              You now have everything you need. Pick a tool, copy a prompt, and
              start generating. The only thing left is to begin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#tools"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(0,245,255,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl bg-neon-cyan text-dark-900 font-bold text-lg"
              >
                Explore Tools ↗
              </motion.a>
              <motion.a
                href="#prompts"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl glass border border-theme-border text-theme-text font-semibold text-lg hover:border-white/30"
              >
                Browse Prompts
              </motion.a>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <Zap className="w-4 h-4 text-dark-900" />
              </div>
              <span className="font-display font-bold text-lg">
                AI<span className="text-neon-cyan">Synth</span>
              </span>
            </div>
            <p className="text-sm text-theme-text/40 leading-relaxed mb-6">
              The complete interactive guide to AI visual synthesis, prompt
              engineering, and creative AI tools.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: Youtube,
                  href: "https://youtube.com",
                  label: "YouTube",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-theme-text/40 hover:text-neon-cyan hover:border-neon-cyan/30 border border-white/5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-bold text-theme-text/30 uppercase tracking-widest mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-theme-text/50 hover:text-neon-cyan transition-colors"
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-theme-text/25">
          <div>
            © 2025 AISynth. Made with{" "}
            <Heart className="w-3 h-3 inline text-neon-pink" /> for creators.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-theme-text/50 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-theme-text/50 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-theme-text/50 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
