"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search, X, Copy, Check, ExternalLink,
  Hash, ChevronRight, Zap, BookOpen, ArrowUpRight,
} from "lucide-react";
import { FadeIn, NeonTag } from "@/components/ui/primitives";
import {
  searchItems, allSearchItems, CATEGORIES,
  powerCombos, type SearchItem, type ItemType,
} from "@/lib/searchData";
import { cn } from "@/lib/utils";

// ─── Easing ────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Copy hook ─────────────────────────────────────────────────────────────
function useCopy(text: string) {
  const [done, setDone] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }, [text]);
  return { done, copy };
}

// ─── Color accent map ──────────────────────────────────────────────────────
const TYPE_META: Record<ItemType, { label: string; emoji: string; glow: string }> = {
  prompt: { label: "PROMPT", emoji: "📝", glow: "#4DFFFF" },
  mode: { label: "MODE", emoji: "🐾", glow: "#FF4FD8" },
  framework: { label: "FRAMEWORK", emoji: "🏛️", glow: "#7B5CFF" },
  skill: { label: "SKILL", emoji: "🧠", glow: "#FFB000" },
};

// ─── Quick Copy pill ───────────────────────────────────────────────────────
function CopyPill({ text, label }: { text: string; label?: string }) {
  const { done, copy } = useCopy(text);
  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); copy(); }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors"
      style={{
        background: done ? "rgba(0,255,135,0.08)" : "rgba(255,255,255,0.04)",
        borderColor: done ? "#00FF87" : "rgba(255,255,255,0.1)",
        color: done ? "#00FF87" : "rgba(255,255,255,0.55)",
      }}
    >
      {done
        ? <><Check className="w-3 h-3" />Copied!</>
        : <><Copy className="w-3 h-3" />{label ?? "Copy"}</>}
    </motion.button>
  );
}

// ─── Node card — skills.sh style ──────────────────────────────────────────
function NodeCard({
  item, isActive, onSelect, index,
}: {
  item: SearchItem; isActive: boolean; onSelect: (id: string) => void; index: number;
}) {
  const meta = TYPE_META[item.type];
  const reduced = useReducedMotion();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: reduced ? 0 : -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: reduced ? 0 : -12 }}
      transition={{ duration: 0.22, delay: index * 0.03, ease: EASE }}
      onClick={() => onSelect(item.id)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(item.id)}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`Open ${item.title}`}
      className={cn(
        "group relative rounded-xl border cursor-pointer outline-none",
        "transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
        isActive ? "border-opacity-60" : "border-white/[0.07] hover:border-white/[0.18]"
      )}
      style={{
        background: isActive
          ? `linear-gradient(120deg, ${item.color}12 0%, ${item.color}06 100%)`
          : "rgba(255,255,255,0.02)",
        borderColor: isActive ? item.color + "50" : undefined,
        boxShadow: isActive ? `0 0 32px ${item.color}14` : undefined,
        // @ts-ignore
        "--tw-ring-color": item.color,
      }}
    >
      {/* Connector node — vertical line sits in the parent */}
      <div
        className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-[#0B0D10] z-10 transition-all duration-300"
        style={{
          background: isActive ? item.color : item.color + "55",
          boxShadow: isActive ? `0 0 10px ${item.color}` : "none",
        }}
      />

      <div className="p-3.5 sm:p-4">
        <div className="flex items-start gap-3">
          {/* Emoji icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5"
            style={{ background: item.color + "18" }}
          >
            {item.emoji}
          </div>

          <div className="flex-1 min-w-0">
            {/* Type + category badges */}
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span
                className="text-[9px] font-black uppercase tracking-[0.14em] font-mono"
                style={{ color: item.color + "99" }}
              >
                {meta.label}
              </span>
              {item.section !== undefined && (
                <>
                  <span className="text-[9px] text-theme-text/15">·</span>
                  <span className="text-[9px] text-theme-text/30 font-mono">§{item.section}</span>
                </>
              )}
              <span className="text-[9px] text-theme-text/15">·</span>
              <span className="text-[9px] text-theme-text/35 uppercase tracking-wide font-medium">
                {item.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-[13px] sm:text-sm text-theme-text leading-snug">
              {item.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[11px] text-theme-text/38 mt-0.5 leading-relaxed line-clamp-1">
              {item.subtitle}
            </p>
          </div>

          {/* Arrow - desktop only detail */}
          <ChevronRight
            className={cn(
              "w-4 h-4 shrink-0 mt-2 transition-all duration-200",
              isActive ? "rotate-90" : "group-hover:translate-x-0.5"
            )}
            style={{ color: isActive ? item.color : "rgba(255,255,255,0.2)" }}
          />
        </div>

        {/* Tag row */}
        <div className="flex flex-wrap gap-1 mt-2.5 ml-12">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide"
              style={{ background: item.color + "14", color: item.color + "bb" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expanded body preview — inline on mobile */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="lg:hidden overflow-hidden"
            >
              <div
                className="mt-3 ml-12 rounded-xl p-3.5 font-mono text-xs leading-relaxed border whitespace-pre-wrap"
                style={{
                  background: item.color + "08",
                  borderColor: item.color + "20",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {item.body}
              </div>
              {item.keyPoints && (
                <ul className="mt-2.5 ml-12 space-y-1.5">
                  {item.keyPoints.map((k) => (
                    <li key={k} className="flex items-center gap-2 text-xs text-theme-text/55">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                      {k}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 ml-12 flex gap-2 flex-wrap">
                <CopyPill text={item.body} label="Copy Prompt" />
                <CopyPill
                  text={`${typeof window !== "undefined" ? window.location.origin : ""}/?view=${item.id}`}
                  label="Share Link"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── Wiki detail panel (desktop slide + mobile bottom sheet) ───────────────
function WikiPanel({ item, onClose }: { item: SearchItem; onClose: () => void }) {
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?view=${item.id}`
    : `/?view=${item.id}`;
  const { done: urlCopied, copy: copyUrl } = useCopy(shareUrl);

  // Lock body scroll on mobile when open
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const panelContent = (
    <>
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b shrink-0"
        style={{ borderColor: item.color + "20", background: item.color + "08" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg shrink-0">{item.emoji}</span>
          <div className="min-w-0">
            <div
              className="text-[9px] font-black uppercase tracking-[0.15em] font-mono"
              style={{ color: item.color }}
            >
              {TYPE_META[item.type].label} · {item.category}
              {item.section !== undefined && ` · §${item.section}`}
            </div>
            <div className="font-display font-bold text-sm text-theme-text truncate leading-tight">
              {item.title}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <button
            onClick={copyUrl}
            className="flex items-center gap-1 text-[10px] font-mono text-theme-text/30 hover:text-theme-text/70 transition-colors"
            title="Copy shareable link"
          >
            {urlCopied
              ? <><Check className="w-3 h-3 text-neon-green" />Copied</>
              : <><ArrowUpRight className="w-3 h-3" />Share</>}
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-theme-text/30 hover:text-theme-text hover:bg-white/6 transition-all"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
        {/* Subtitle */}
        <p className="text-sm text-theme-text/45 leading-relaxed">{item.subtitle}</p>

        {/* Usage hint */}
        {item.usage && (
          <div
            className="flex items-start gap-2 text-xs rounded-xl px-4 py-3 border"
            style={{ background: item.color + "0a", borderColor: item.color + "20", color: item.color + "cc" }}
          >
            <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{item.usage}</span>
          </div>
        )}

        {/* Full body — monospace wiki block */}
        <div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-theme-text/22 mb-2 font-mono">
            {item.type === "prompt" ? "Full Prompt" : item.type === "framework" ? "Reference" : "Activation"}
          </div>
          <div
            className="rounded-xl p-4 text-[11px] sm:text-xs font-mono leading-relaxed border overflow-x-auto"
            style={{
              background: item.color + "07",
              borderColor: item.color + "22",
              color: "rgba(255,255,255,0.75)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {item.body}
          </div>
        </div>

        {/* Key points */}
        {item.keyPoints && item.keyPoints.length > 0 && (
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-theme-text/22 mb-2.5 font-mono">
              Key Points
            </div>
            <ul className="space-y-2">
              {item.keyPoints.map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-sm text-theme-text/60">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                    style={{ background: item.color }}
                  />
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide"
              style={{ background: item.color + "15", color: item.color }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <CopyPill text={item.body} label="Copy Prompt" />
          <CopyPill text={shareUrl} label="Copy Link" />
        </div>

        {/* Permalink */}
        <div className="pt-3 border-t border-white/[0.06]">
          <div className="text-[9px] font-mono text-theme-text/18 mb-1 uppercase tracking-widest">Permalink</div>
          <button
            onClick={copyUrl}
            className="text-[10px] font-mono text-theme-text/28 hover:text-theme-text/55 transition-colors text-left"
          >
            ?view={item.id}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop: slide from right ── */}
      <motion.aside
        key={`desktop-${item.id}`}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="hidden lg:flex lg:flex-col sticky top-24 rounded-2xl border overflow-hidden max-h-[calc(100vh-120px)]"
        style={{
          background: `linear-gradient(160deg, ${item.color}0e, rgba(5,5,8,0.98) 55%)`,
          borderColor: item.color + "32",
        }}
        aria-label={`Wiki: ${item.title}`}
      >
        {panelContent}
      </motion.aside>

      {/* ── Mobile: bottom sheet ── */}
      <motion.div
        key={`sheet-${item.id}`}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.38, ease: EASE }}
        className="lg:hidden fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border-t border-x overflow-hidden"
        style={{
          background: `linear-gradient(175deg, ${item.color}12, #0B0D10 45%)`,
          borderColor: item.color + "35",
          maxHeight: "82vh",
        }}
        aria-label={`Wiki sheet: ${item.title}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>
        {panelContent}
      </motion.div>

      {/* Mobile backdrop */}
      <motion.div
        key={`backdrop-${item.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        aria-hidden
      />
    </>
  );
}

// ─── Power Combos row ──────────────────────────────────────────────────────
function PowerCombosBar({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <div className="mb-6">
      <div className="text-[9px] font-mono text-theme-text/22 uppercase tracking-widest mb-2.5 flex items-center gap-2">
        <Zap className="w-3 h-3" />
        Power Combos — click to try
      </div>
      <div className="flex flex-wrap gap-2">
        {powerCombos.map((combo) => (
          <button
            key={combo.goal}
            onClick={() => onSearch(combo.goal.split(" ").slice(-1)[0])}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.07] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-left"
          >
            <span className="text-[10px] text-theme-text/50 group-hover:text-theme-text/80 transition-colors leading-tight">
              {combo.goal}
            </span>
            <span className="text-[10px] font-mono text-theme-text/25 shrink-0">{combo.chain}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Quick-jump tags ───────────────────────────────────────────────────────
const HOT_TAGS = [
  "Master Prompt", "Advocate", "Beaver Mode", "Eagle Mode",
  "8-Layer", "CoT", "Modifiers", "Brand System",
  "80/20", "Refinement", "Coding", "Strategy",
];

// ─── Main export ───────────────────────────────────────────────────────────
export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ItemType | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Deep-link via ?view=
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("view");
    if (v && allSearchItems.some((i) => i.id === v)) setActiveId(v);
  }, []);

  // Sync URL
  const handleSelect = useCallback((id: string) => {
    setActiveId((prev) => {
      const next = prev === id ? null : id;
      const url = new URL(window.location.href);
      next ? url.searchParams.set("view", next) : url.searchParams.delete("view");
      window.history.replaceState({}, "", url.toString());
      return next;
    });
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    inputRef.current?.focus();
  };

  const results = searchItems(query, filter);
  const active = activeId ? allSearchItems.find((i) => i.id === activeId) ?? null : null;

  const counts = {
    all: searchItems(query).length,
    prompt: searchItems(query, "prompt").length,
    mode: searchItems(query, "mode").length,
    framework: searchItems(query, "framework").length,
  };

  return (
    <section id="search" className="section" aria-labelledby="search-heading">
      {/* ── Header ── */}
      <FadeIn>
        <div className="text-center mb-10">
          <NeonTag color="cyan">Prompt Knowledge Base</NeonTag>
          <h2
            id="search-heading"
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl mt-4 mb-4 tracking-tight"
          >
            Search{" "}
            <span className="gradient-text-powerup">Prompts, Modes & Frameworks</span>
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "var(--pu-secondary)" }}>
            {allSearchItems.length} entries from{" "}
            <a
              href="https://github.com/marktantongco/promptc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-neon-cyan transition-colors"
            >
              MASTER_REFERENCE.md
            </a>
            {" "}— click any entry to open the full wiki view.
          </p>
        </div>
      </FadeIn>

      {/* ── Search bar ── */}
      <FadeIn delay={0.07}>
        <div className="relative max-w-2xl mx-auto mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-theme-text/25 pointer-events-none" />
          <input
            ref={inputRef}
            id="kb-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts, modes, frameworks, tags…"
            className="w-full pl-11 pr-10 py-3.5 sm:py-4 rounded-2xl glass border border-white/[0.09] text-theme-text placeholder:text-theme-text/22 text-sm sm:text-base focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_0_3px_rgba(77,255,255,0.07)] transition-all"
            autoComplete="off"
            aria-label="Search knowledge base"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-text/25 hover:text-theme-text transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </FadeIn>

      {/* ── Hot tags ── */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {HOT_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(query === tag ? "" : tag)}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all hover:scale-105",
                query === tag
                  ? "bg-neon-cyan text-[#050508] border-neon-cyan"
                  : "glass border-white/[0.08] text-theme-text/38 hover:text-theme-text hover:border-white/22"
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* ── Filter tabs — pill style ── */}
      <FadeIn delay={0.12}>
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {CATEGORIES.map((cat) => {
            const count = cat.id === "all" ? counts.all : counts[cat.id as keyof typeof counts] ?? 0;
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as typeof filter)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all",
                  isActive
                    ? "bg-neon-cyan text-[#050508] border-neon-cyan shadow-[0_0_20px_rgba(77,255,255,0.3)]"
                    : "glass border-white/[0.08] text-theme-text/42 hover:text-theme-text hover:border-white/20"
                )}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-md",
                    isActive ? "bg-[#050508]/30 text-[#050508]/70" : "bg-white/[0.06] text-theme-text/30"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* ── Power Combos ── */}
      <FadeIn delay={0.15}>
        <PowerCombosBar onSearch={handleSearch} />
      </FadeIn>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-6 items-start">
        {/* Left: node list with skills.sh vertical line */}
        <div className="pl-5 border-l border-white/[0.06] relative">
          {results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-14 text-theme-text/25"
            >
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-semibold">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-sm mt-1 text-theme-text/15">Try a different keyword or tag</p>
            </motion.div>
          ) : (
            <>
              <p className="text-[10px] text-theme-text/22 font-mono mb-4 uppercase tracking-widest">
                {results.length} {results.length === 1 ? "entry" : "entries"}
                {query ? ` ·  "${query}"` : ""}
              </p>
              <motion.div layout className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {results.map((item, i) => (
                    <NodeCard
                      key={item.id}
                      item={item}
                      isActive={activeId === item.id}
                      onSelect={handleSelect}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>

        {/* Right: wiki panel (hidden on mobile — becomes bottom sheet) */}
        <AnimatePresence mode="wait">
          {active ? (
            <WikiPanel key={active.id} item={active} onClose={() => handleSelect(active.id)} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="hidden lg:flex flex-col items-center justify-center sticky top-24 rounded-2xl border border-dashed border-white/[0.07] p-10 text-center min-h-64"
            >
              <BookOpen className="w-8 h-8 text-theme-text/15 mb-3" />
              <p className="text-sm text-theme-text/28 font-medium">
                Select any entry to open the wiki view
              </p>
              <p className="text-xs text-theme-text/15 mt-2">
                Deep-linkable · Shareable · Copyable
              </p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-theme-text/15">
                <Hash className="w-3 h-3" />
                <span>{allSearchItems.length} entries · prompts · modes · frameworks</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile bottom sheet lives in AnimatePresence outside the grid */}
      <AnimatePresence>
        {active && (
          <WikiPanel key={`mobile-${active.id}`} item={active} onClose={() => handleSelect(active.id)} />
        )}
      </AnimatePresence>
    </section>
  );
}
