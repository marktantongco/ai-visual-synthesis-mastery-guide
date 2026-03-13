// ─────────────────────────────────────────────────────────────────────────────
// Unified search data — sourced from MASTER_REFERENCE.md (promptc)
// https://github.com/marktantongco/promptc/blob/master/MASTER_REFERENCE.md
// ─────────────────────────────────────────────────────────────────────────────

export type ItemType = "prompt" | "skill" | "mode" | "framework";

export interface SearchItem {
  id: string;
  type: ItemType;
  emoji: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
  category: string;
  color: string;
  keyPoints?: string[];
  usage?: string;
  section?: number;
}

// ─── 1. POWER PROMPTS (Task-Specific) ────────────────────────────────────────
const prompts: SearchItem[] = [
  {
    id: "prompt-master-system",
    type: "prompt",
    emoji: "🧠",
    title: "Master System Prompt",
    subtitle: "Paste into any AI's System Prompt field",
    body: `You are my expert AI assistant, business partner, and creative strategist.
Your job is to always act in MY best interest — not just answer questions,
but proactively identify what I actually need versus what I literally asked.

Rules you must always follow:
1. Be direct — no filler, no fluff, no unnecessary disclaimers.
2. When I ask for code, give WORKING code. Not pseudocode or examples.
3. When I ask for ideas, give me ranked, actionable options — not just lists.
4. Always tell me if there's a better or faster way to do what I'm asking.
5. Default to expert-level responses unless I say otherwise.
6. If my request is vague, make a smart assumption, state it, then proceed.
7. If something I want is risky or suboptimal, flag it, then do it anyway unless I say stop.
8. Remember context within this conversation — never ask me to repeat myself.
9. Format your replies for scanability: use headers, bullets, and bold for key points.
10. Always end complex answers with a "⚡ Recommended Next Step".`,
    tags: ["System Prompt", "Foundation", "Rules"],
    category: "Foundation",
    color: "#4DFFFF",
    keyPoints: [
      "Expert-level by default, direct output",
      "Ranked actionable ideas, not lists",
      "Flag risks, then proceed anyway",
      "Always end with ⚡ Next Step",
    ],
    usage: "Paste into User Rules / Custom Instructions in any AI tool",
    section: 1,
  },
  {
    id: "prompt-advocate-mode",
    type: "prompt",
    emoji: "🛡️",
    title: "Advocate Mode",
    subtitle: "AI that protects your long-term interests",
    body: `For this entire conversation, I want you to be my advocate, not just my assistant.
That means:
- If I'm about to make a mistake, warn me.
- If there's a better approach, tell me even if I didn't ask.
- Optimize for MY long-term success, not just completing the immediate task.
- If something I ask for could hurt my project, business, or goals, flag it.
- Prioritize quality over speed unless I say otherwise.
- I give you permission to push back on my ideas if you have a good reason.`,
    tags: ["Advocate", "Quality", "Strategic"],
    category: "Foundation",
    color: "#4DFFFF",
    keyPoints: [
      "Warn before mistakes happen",
      "Proactively surface better paths",
      "Long-term success over quick wins",
      "AI can push back with good reason",
    ],
    usage: "Add at the start of any high-stakes session",
    section: 2,
  },
  {
    id: "prompt-youtube-creator",
    type: "prompt",
    emoji: "🎬",
    title: "YouTube Content Creation",
    subtitle: "10-year growth strategist activation",
    body: `Act as a YouTube growth strategist with 10 years of experience.
When I give you a topic, automatically:
1. Identify the 3 best angles for that niche
2. Generate a scroll-stopping title using proven CTR patterns
3. Write a structured script with hook, body, and CTA
4. Suggest 5 SEO-optimized tags

Topic: [your topic here]`,
    tags: ["YouTube", "Content", "SEO", "Script"],
    category: "Task-Specific",
    color: "#FF4FD8",
    keyPoints: [
      "3 best angles per niche",
      "CTR-optimized title generation",
      "Hook → Body → CTA structure",
      "5 SEO tags included",
    ],
    usage: "Replace [your topic here] with your subject",
    section: 5,
  },
  {
    id: "prompt-coding-engineer",
    type: "prompt",
    emoji: "💻",
    title: "Coding / Engineering",
    subtitle: "Senior dev + architect activation",
    body: `You are a senior software engineer and architect.
When I describe a feature, always:
- Ask clarifying questions ONLY if something is truly ambiguous
- Write production-ready code, not demo code
- Add error handling automatically
- Explain the "why" behind any non-obvious decision in a single comment
- Flag performance or security concerns before I ask`,
    tags: ["Coding", "Engineering", "Production", "Architecture"],
    category: "Task-Specific",
    color: "#7B5CFF",
    keyPoints: [
      "Production-ready code only",
      "Auto error handling",
      "Comment non-obvious decisions",
      "Flag security concerns proactively",
    ],
    usage: "Set as system prompt before any coding session",
    section: 5,
  },
  {
    id: "prompt-business-strategy",
    type: "prompt",
    emoji: "📊",
    title: "Business / Strategy",
    subtitle: "COO + strategist activation",
    body: `Act as my COO and strategist. When I describe a problem or goal:
- Identify the fastest path to results (the 80/20 solution)
- Separate what I MUST do from what is optional
- Give me a prioritized action plan, not just advice
- Tell me what successful people in this space actually do, not just theory`,
    tags: ["Business", "Strategy", "80/20", "COO"],
    category: "Task-Specific",
    color: "#FFB000",
    keyPoints: [
      "80/20: fastest path to results",
      "Must-do vs optional separation",
      "Prioritized action plan",
      "Real-world examples, not theory",
    ],
    usage: "Use for business planning, product decisions, career moves",
    section: 5,
  },
  {
    id: "prompt-research-analysis",
    type: "prompt",
    emoji: "🔍",
    title: "Research / Summarizing",
    subtitle: "Extract insight, not just information",
    body: `You are a research assistant. When I give you content to analyze:
- Extract the 3-5 most actionable insights
- Identify what is missing or what I should also know
- Format as: Key Insight → Why It Matters → Action I Can Take`,
    tags: ["Research", "Analysis", "Summarizing", "Insights"],
    category: "Task-Specific",
    color: "#00FF87",
    keyPoints: [
      "3-5 actionable insights only",
      "Surfaces what's missing",
      "Insight → Relevance → Action format",
    ],
    usage: "Feed any article, report, or document to this prompt",
    section: 5,
  },
  {
    id: "prompt-skills-generator",
    type: "prompt",
    emoji: "✍️",
    title: "Skills.md Generator",
    subtitle: "Rate, improve, and refine any prompt",
    body: `Original prompt: "[your prompt here]"

Rate 1-10 on clarity/relevance.
Suggest 4 key improvements.
Refined1: Apply top suggestion.
Refined2: Apply best synergy suggestion.
Present Refined1 and Refined2 as separate copy-paste ready boxes.`,
    tags: ["Prompt Refinement", "Scoring", "Iteration"],
    category: "Meta",
    color: "#4DFFFF",
    keyPoints: [
      "1-10 clarity score",
      "4 improvement suggestions",
      "2 ready-to-use refined versions",
    ],
    usage: "Use on any underperforming prompt to upgrade it",
    section: 5,
  },
  {
    id: "prompt-web-app-beaver",
    type: "prompt",
    emoji: "🌐",
    title: "Web App — Beaver Mode",
    subtitle: "Full-stack + product design master prompt",
    body: `You are a senior full-stack developer and product designer.

ROLE: Senior full-stack developer + product designer
GOAL: [Describe your app in one sentence]

FUNCTIONAL REQUIREMENTS
- Dynamic UI components
- Mobile-first responsive layout
- Interactive sections with user feedback
- Modular, reusable component architecture

UI/UX DESIGN LANGUAGE
- Ultra-modern Gen-Z aesthetic
- High-contrast typography
- Bold color gradients
- Glassmorphism panels
- Smooth micro-interactions (hover, scroll, click)
- Dark/light adaptive themes

TECHNICAL STACK
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion or GSAP
- Components: shadcn/ui

AESTHETIC LOCK
dark-mode native | neon-accent sparse | typography-first | hierarchy clear`,
    tags: ["Next.js", "Tailwind", "Framer Motion", "Gen-Z", "UI"],
    category: "Web App",
    color: "#7B5CFF",
    keyPoints: [
      "Covers role, goal, requirements, stack, aesthetic",
      "8-layer architecture built in",
      "Mobile-first always",
      "WCAG AA + 60fps constraint",
    ],
    usage: "Replace [Describe your app] then generate full codebase",
    section: 10,
  },
  {
    id: "prompt-powerup-brand",
    type: "prompt",
    emoji: "⚡",
    title: "powerUP Brand System",
    subtitle: "Complete design token prompt for UI generation",
    body: `You are designing within the powerUP brand system.

Brand essence: Activated potential. Directed energy. Intelligent lift.

Color palette:
- Background: #0B0D10 (void black), #14161A (charcoal)
- Accents (use sparingly): cyan #4DFFFF, violet #7B5CFF, magenta #FF4FD8, amber #FFB000
- Text: #FFFFFF (primary), #A1A1AA (secondary), #6B7280 (muted)

Typography:
- Display: Inter, Space Grotesk
- Body: Inter
- Mono: JetBrains Mono
- Hero size: clamp(3rem, 6vw, 6rem)

Motion:
- Bias: always upward
- Easing: cubic-bezier(0.16, 1, 0.3, 1)
- Duration: micro 180ms, standard 320ms, hero 4200ms

Design rules:
- Typography-first — type does the work, effects support
- One accent color per screen maximum
- White space = intelligence, never fill it
- No gradients unless motion-driven`,
    tags: ["Brand", "Design Tokens", "Typography", "Motion"],
    category: "Design System",
    color: "#FFB000",
    keyPoints: [
      "#4DFFFF cyan, #7B5CFF violet, #FF4FD8 magenta, #FFB000 amber",
      "Inter + Space Grotesk display",
      "cubic-bezier(0.16, 1, 0.3, 1) easing",
      "One accent per screen rule",
    ],
    usage: "Prepend to any UI generation prompt for brand consistency",
    section: 11,
  },
];

// ─── 2. ANIMAL THINKING MODES ────────────────────────────────────────────────
const modes: SearchItem[] = [
  {
    id: "mode-rabbit",
    type: "mode",
    emoji: "🐇",
    title: "Rabbit Mode",
    subtitle: "Multiply Ideas — 10 variations instantly",
    body: `Take this idea and multiply it into 10 different variations.
For each variation: change the angle, change the audience, change the format.
Present the results as a list of distinct ideas.`,
    tags: ["Brainstorm", "Ideas", "Variations", "Creative"],
    category: "Animal Modes",
    color: "#FF4FD8",
    keyPoints: ["10 distinct variations", "Change angle + audience + format", "Best for: idea generation"],
    usage: 'Trigger: "Apply Rabbit Mode to [your idea]"',
    section: 4,
  },
  {
    id: "mode-owl",
    type: "mode",
    emoji: "🦉",
    title: "Owl Mode",
    subtitle: "Deep Analysis — surface what others miss",
    body: `Think like an owl — slow, observant and analytical.
Examine this problem from multiple perspectives and identify
the hidden factors most people overlook.`,
    tags: ["Analysis", "Deep Dive", "Perspectives"],
    category: "Animal Modes",
    color: "#7B5CFF",
    keyPoints: ["Multiple perspective analysis", "Surfaces hidden factors", "Best for: complex problems"],
    usage: 'Trigger: "Apply Owl Mode to [your problem]"',
    section: 4,
  },
  {
    id: "mode-ant",
    type: "mode",
    emoji: "🐜",
    title: "Ant Mode",
    subtitle: "Break Into Steps — smallest actionable units",
    body: `Think like an ant.
Break this goal into the smallest possible steps someone could realistically complete.`,
    tags: ["Planning", "Steps", "Execution", "Breakdown"],
    category: "Animal Modes",
    color: "#00FF87",
    keyPoints: ["Smallest possible steps", "Realistically completable", "Best for: execution planning"],
    usage: 'Trigger: "Apply Ant Mode to [your goal]"',
    section: 4,
  },
  {
    id: "mode-eagle",
    type: "mode",
    emoji: "🦅",
    title: "Eagle Mode",
    subtitle: "Big Picture Strategy — see how pieces connect",
    body: `Think like an eagle flying high above the landscape.
Explain the long-term strategy behind this idea and how the pieces connect.`,
    tags: ["Strategy", "Big Picture", "Long-term"],
    category: "Animal Modes",
    color: "#4DFFFF",
    keyPoints: ["Long-term vision", "Connects moving parts", "Best for: strategy + roadmapping"],
    usage: 'Trigger: "Apply Eagle Mode to [your strategy]"',
    section: 4,
  },
  {
    id: "mode-dolphin",
    type: "mode",
    emoji: "🐬",
    title: "Dolphin Mode",
    subtitle: "Creative Solutions — playful & inventive",
    body: `Think like a dolphin — curious, playful and inventive.
Generate creative solutions to this problem that most people wouldn't normally consider.`,
    tags: ["Creative", "Unconventional", "Solutions"],
    category: "Animal Modes",
    color: "#FF4FD8",
    keyPoints: ["Unexpected solutions", "Playful exploration", "Best for: innovation sprints"],
    usage: 'Trigger: "Apply Dolphin Mode to [your challenge]"',
    section: 4,
  },
  {
    id: "mode-beaver",
    type: "mode",
    emoji: "🦫",
    title: "Beaver Mode",
    subtitle: "Build Systems — practical step-by-step",
    body: `Think like a beaver building a dam.
Design a practical system that solves this problem step by step.`,
    tags: ["Systems", "Build", "Practical", "Engineering"],
    category: "Animal Modes",
    color: "#FFB000",
    keyPoints: ["System design focus", "Practical and buildable", "Best for: workflows + architecture"],
    usage: 'Trigger: "Apply Beaver Mode to [your system]"',
    section: 4,
  },
  {
    id: "mode-elephant",
    type: "mode",
    emoji: "🐘",
    title: "Elephant Mode",
    subtitle: "Cross-Field Connections — borrow from everywhere",
    body: `Think like an elephant with a powerful memory.
Connect this idea to insights from other fields such as
psychology, economics, science or history.`,
    tags: ["Cross-discipline", "Connections", "Memory", "History"],
    category: "Animal Modes",
    color: "#7B5CFF",
    keyPoints: [
      "Psychology, economics, science connections",
      "Pattern matching across fields",
      "Best for: unique angles + differentiation",
    ],
    usage: 'Trigger: "Apply Elephant Mode to [your concept]"',
    section: 4,
  },
];

// ─── 3. FRAMEWORKS & PROTOCOLS ───────────────────────────────────────────────
const frameworks: SearchItem[] = [
  {
    id: "fw-8-layer-architecture",
    type: "framework",
    emoji: "🏛️",
    title: "8-Layer Prompt Architecture",
    subtitle: "Universal structure for production-quality output",
    body: `ROLE → CONTEXT → OBJECTIVE → CONSTRAINTS → AESTHETIC → PLANNING → OUTPUT → REFINEMENT

| Layer       | Purpose                     | Missing It Causes                |
|-------------|-----------------------------|----------------------------------|
| ROLE        | Who the AI acts as          | Generic, shallow responses       |
| CONTEXT     | Product, audience, platform | Misaligned output                |
| OBJECTIVE   | What success looks like     | Aimless generation               |
| CONSTRAINTS | Quality guardrails          | Mediocre, unconstrained output   |
| AESTHETIC   | Design language / tone      | Visually dull or off-brand       |
| PLANNING    | Reason before generating    | Structural mistakes              |
| OUTPUT      | Exact format to deliver     | Incomplete or disorganized files |
| REFINEMENT  | Self-critique before final  | First-draft quality only         |`,
    tags: ["Architecture", "Framework", "Structure", "Production"],
    category: "Frameworks",
    color: "#4DFFFF",
    keyPoints: [
      "ROLE — prevents generic responses",
      "CONSTRAINTS — prevents mediocre output",
      "PLANNING — prevents structural mistakes",
      "REFINEMENT — upgrades from draft to final",
    ],
    usage: "Use all 8 layers for any complex generation task",
    section: 6,
  },
  {
    id: "fw-self-refinement",
    type: "framework",
    emoji: "🔄",
    title: "Self-Refinement Loop",
    subtitle: "Draft → Critique → Refine × 2 → Final",
    body: `Generate draft →
Critique on: sophistication, uniqueness, performance, platform alignment →
Refine once for structure →
Refine once for polish and consistency →
Output final result only.

> Two refinement iterations max. Three absolute maximum. Never re-generate from scratch.`,
    tags: ["Refinement", "Quality", "Iteration", "Protocol"],
    category: "Enhancement Protocols",
    color: "#7B5CFF",
    keyPoints: [
      "Draft → Critique → 2x Refine → Final",
      "Max 3 iterations — never restart",
      "Critique: sophistication, uniqueness, performance",
    ],
    usage: "Append to any generation prompt to unlock higher quality",
    section: 8,
  },
  {
    id: "fw-chain-of-thought",
    type: "framework",
    emoji: "💭",
    title: "Chain-of-Thought (CoT)",
    subtitle: "Trigger deep reasoning with 5 words",
    body: `Let's think step by step.

Best for: multi-step flows, system design, checkout flows, onboarding journeys.`,
    tags: ["CoT", "Reasoning", "Step-by-step"],
    category: "Enhancement Protocols",
    color: "#00FF87",
    keyPoints: [
      "Append: 'Let's think step by step.'",
      "Forces sequential reasoning",
      "Best for: complex multi-step tasks",
    ],
    usage: "Append 5 words to any complex prompt",
    section: 8,
  },
  {
    id: "fw-self-consistency",
    type: "framework",
    emoji: "⚖️",
    title: "Self-Consistency",
    subtitle: "Generate 6-12 variants → merge the best",
    body: `Generate [6-12] layout/approach variants.
Identify the strongest structural patterns across all variants.
Merge the best attributes into one final output.

Prevents average-output drift when you need genuinely creative results.`,
    tags: ["Variants", "Creative", "Validation"],
    category: "Enhancement Protocols",
    color: "#FF4FD8",
    keyPoints: [
      "6-12 variants generated",
      "Pattern extraction from best",
      "Prevents average-output drift",
    ],
    usage: "Use when creative quality matters more than speed",
    section: 8,
  },
  {
    id: "fw-tweak-protocol",
    type: "framework",
    emoji: "🎛️",
    title: "Tweak Protocol",
    subtitle: "Change one variable at a time — precision wins",
    body: `Refine [specific element] with [specific change].
Lock aesthetic. Preserve hierarchy. Maintain code quality.
Do not change anything else.

Change one variable at a time. Precision beats full regeneration every time.`,
    tags: ["Iteration", "Precision", "Refinement"],
    category: "Enhancement Protocols",
    color: "#FFB000",
    keyPoints: [
      "One variable changed per iteration",
      "Lock everything else",
      "Precision > full regeneration",
    ],
    usage: "Use when a specific element needs fine-tuning",
    section: 8,
  },
  {
    id: "fw-prompt-lint",
    type: "framework",
    emoji: "🔬",
    title: "Prompt Lint Rules",
    subtitle: "6 checks every prompt must pass",
    body: `| Rule ID              | Check                                         | Autofix?          |
|----------------------|-----------------------------------------------|-------------------|
| missing-role         | Does it define who the AI should act as?      | ✅ Add role       |
| missing-constraints  | Does it define explicit limits?               | ✅ Add limits     |
| missing-objective    | Does it state a clear success condition?      | ❌ User-defined   |
| vague-language       | Uses: nice, cool, awesome?                    | ✅ Replace words  |
| missing-output-format| Does it specify what format to generate?     | ❌ User-defined   |
| missing-planning     | For UI prompts, is there a planning phase?    | ❌ User-defined   |

Replace vague words:
- "nice" → "clear and intentional"
- "cool" → "high-contrast and dynamic"
- "modern" → "[specific aesthetic keyword]"
- "awesome" → "visually striking and purposeful"`,
    tags: ["Linting", "Quality", "Checklist", "Rules"],
    category: "Frameworks",
    color: "#4DFFFF",
    keyPoints: [
      "6 lint rules to check every prompt",
      "3 auto-fixable, 3 must be user-defined",
      "Vague word replacement list",
    ],
    usage: "Run on any prompt before generating to prevent quality issues",
    section: 13,
  },
  {
    id: "fw-secret-sauce",
    type: "framework",
    emoji: "🧪",
    title: "Secret Sauce Modifiers",
    subtitle: "10 phrases that instantly boost output quality",
    body: `Append any of these to any prompt:

"act as an expert in [field]" → Forces deep, authoritative responses
"give me the version a senior dev would write" → Skips beginner output
"don't explain, just do it" → Removes verbose preambles
"think step by step before answering" → Triggers reasoning chain
"what would you do if this was your own business?" → Honest, opinionated advice
"what am I missing or not asking that I should be?" → Surfaces blind spots
"give me the 80/20 version" → Highest impact, minimum complexity
"assume I'm an expert, skip the basics" → Removes redundant context
"be brutally honest" → Removes diplomatic softening
"rank these by impact" → Forces prioritization, not listing`,
    tags: ["Modifiers", "Quality", "Boosters", "Quick Wins"],
    category: "Frameworks",
    color: "#FF4FD8",
    keyPoints: [
      "10 plug-and-play quality boosters",
      "Works on any existing prompt",
      "Instantly shifts AI behavior",
    ],
    usage: "Append any modifier to your existing prompt",
    section: 3,
  },
  {
    id: "fw-design-vocab",
    type: "framework",
    emoji: "🎨",
    title: "Design Vocabulary Reference",
    subtitle: "15 terms that steer visual AI output precisely",
    body: `Use these exact words in any UI/UX prompt:

glassmorphism → Frosted glass panels, translucent blurred backdrop
brutalist UI → Raw, oversized, high-contrast, intentionally rough
neumorphism → Soft 3D shadows on matching-color backgrounds
kinetic typography → Text that animates, morphs or reacts to scroll
bento grid → Mosaic card layout — Apple-style asymmetric grid
micro-interactions → Tiny animations on hover, click, scroll, focus
scroll-jacking → Custom scroll speed and animation control
neon accent → Single bright color pop against dark background
liquid gradient → Smooth, animated, shifting background color blends
frosted overlay → Semi-transparent blur layer over content
dark-mode native → Designed for dark backgrounds first
editorial layout → Magazine-style, large typography, asymmetric grid
skeleton loading → Placeholder shimmer before real content appears
progressive disclosure → Reveal complexity only when user needs it
ambient motion → Subtle, looping background animation`,
    tags: ["Design", "Vocabulary", "UI", "Aesthetics", "CSS"],
    category: "Design System",
    color: "#7B5CFF",
    keyPoints: [
      "15 precision design terms",
      "Each word steers a specific visual output",
      "Use in any AI image or UI generation prompt",
    ],
    usage: "Pick 2-3 terms and append to any UI/image generation prompt",
    section: 12,
  },
];

// ─── Power Combos ─────────────────────────────────────────────────────────────
export const powerCombos = [
  { goal: "Build an AI content system", chain: "🦅 Eagle → 🦫 Beaver → 🐜 Ant" },
  { goal: "Solve a complex problem", chain: "🦉 Owl → 🐬 Dolphin → 🐘 Elephant" },
  { goal: "Brainstorm a channel / product", chain: "🐇 Rabbit → 🦅 Eagle → 🐜 Ant" },
  { goal: "Design a workflow / automation", chain: "🦫 Beaver → 🐜 Ant → 🦉 Owl" },
  { goal: "Validate a business idea", chain: "🦉 Owl → 🐘 Elephant → 🦅 Eagle" },
  { goal: "Generate viral content angles", chain: "🐇 Rabbit → 🐬 Dolphin → 🦅 Eagle" },
];

// ─── Unified export ───────────────────────────────────────────────────────────
export const allSearchItems: SearchItem[] = [...prompts, ...modes, ...frameworks];

// ─── Fuzzy search ─────────────────────────────────────────────────────────────
export function searchItems(query: string, type?: ItemType | "all"): SearchItem[] {
  const q = query.toLowerCase().trim();
  let pool = type && type !== "all" ? allSearchItems.filter((i) => i.type === type) : allSearchItems;
  if (!q) return pool;
  return pool.filter((item) =>
    item.title.toLowerCase().includes(q) ||
    item.subtitle.toLowerCase().includes(q) ||
    item.body.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q)) ||
    (item.keyPoints?.some((k) => k.toLowerCase().includes(q)) ?? false) ||
    (item.usage?.toLowerCase().includes(q) ?? false)
  );
}

// Category map for filtering
export const CATEGORIES = [
  { id: "all", label: "All", emoji: "✦" },
  { id: "prompt", label: "Prompts", emoji: "📝" },
  { id: "mode", label: "Modes", emoji: "🐾" },
  { id: "framework", label: "Frameworks", emoji: "🏛️" },
] as const;
