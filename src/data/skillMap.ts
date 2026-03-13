import { Eye, Layers, Cpu, Film, Shield, Zap, Camera, SlidersHorizontal, type LucideIcon } from "lucide-react";

export type Skill = {
  name: string;
  description: string;
};

export type SkillNode = {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  level: string;
  icon: LucideIcon;
  color: string;
  description: string;
  skills: Skill[];
  platforms: string[];
  connects: number[];
};

export const LAYER_COLORS: Record<string, string> = {
  "Foundation":          "#4DFFFF",
  "Optical Layer":       "#7B5CFF",
  "Material Layer":      "#FF4FD8",
  "Consistency Layer":   "#FFB000",
  "Cinematic Layer":     "#00FF87",
  "Refinement Layer":    "#FF6B35",
  "Orchestration Layer": "#FF006E",
};

export const skillNodes: SkillNode[] = [
  {
    id: 1,
    category: "01",
    title: "Technical Prompt Engineering",
    subtitle: "6 SKILLS",
    level: "Foundation",
    icon: Cpu,
    color: "#4DFFFF",
    description:
      "Constructing prompts as structured blueprints — the interface between human intent and machine execution. Think periodic table, not textbook: objective parameters that produce predictable results.",
    skills: [
      {
        name: "The Scaffold Method",
        description: "Subject → Style → Technical → Mood → Negative — structured prompt layers for reproducible output.",
      },
      {
        name: "Universal Blueprint",
        description: "A subject [action/pose], [environment], [lighting], [camera], [style], [mood], [negative] template that works across all platforms.",
      },
      {
        name: "Front-Loading",
        description: "CLIP and T5 attention weights front tokens highest — always lead with your most critical descriptors.",
      },
      {
        name: "Keyword Weighting",
        description: "Use (keyword:1.3) for emphasis, [keyword:0.7] for de-emphasis. Stack modifiers to control semantic drift.",
      },
      {
        name: "Photographic Vocabulary",
        description: "500+ curated style tokens mapped to real optical outcomes. Replace vague adjectives with measurable parameters.",
      },
      {
        name: "Agent Prompting Patterns",
        description: "Meta-prompts, chain-of-thought injection, and role-based system prompts for LLM-driven generation pipelines.",
      },
    ],
    platforms: ["Midjourney", "SDXL", "FLUX.1", "DALL·E 3"],
    connects: [2, 3],
  },
  {
    id: 2,
    category: "02",
    title: "Optical Physics & Depth Perception",
    subtitle: "4 SKILLS",
    level: "Optical Layer",
    icon: Camera,
    color: "#7B5CFF",
    description:
      "The foundation of all visual engineering — understanding how focal length governs psychological perception. Every focal length is a philosophical statement about the distance between the viewer and the subject.",
    skills: [
      {
        name: "Focal Length Mapping",
        description: "14mm–800mm semantic map: 14mm exaggerates environment, 85mm flatters portraiture, 400mm compresses backgrounds. Each focal length is a visual argument.",
      },
      {
        name: "Center of Projection (COP)",
        description: "The mathematical origin of perspective — how COP distance determines whether subjects feel intimate, heroic, or detached.",
      },
      {
        name: "Inverse Square Law",
        description: "Light intensity falls off at 1/d². Understanding this is the difference between flat and dimensional lighting.",
      },
      {
        name: "Sensor Format Impact",
        description: "Full frame vs. crop vs. medium format: how sensor size affects depth of field, compression, and tonal rendering.",
      },
    ],
    platforms: ["Midjourney", "SDXL", "Flux.1", "ComfyUI"],
    connects: [1, 3, 4],
  },
  {
    id: 3,
    category: "03",
    title: "Advanced Photographic Literacy",
    subtitle: "5 SKILLS",
    level: "Optical Layer",
    icon: Eye,
    color: "#9B7FFF",
    description:
      "Reconstructing real-world physics — the key to believable photorealism and tactile truth. The amateur applies labels; the professional calculates light.",
    skills: [
      {
        name: "Lighting Pattern Mastery",
        description: "Rembrandt, butterfly, loop, split, broad, short — each pattern creates a specific shadow map that communicates psychological intent.",
      },
      {
        name: "Lighting Ratios",
        description: "Key-to-fill ratios (1:1 flat → 8:1 dramatic) mapped to emotional register. The ratio is the mood.",
      },
      {
        name: "Color Temperature Control",
        description: "2700K (candlelight) → 10000K (overcast shade) — precise Kelvin values as prompt tokens for scientifically accurate color casts.",
      },
      {
        name: "Aperture Control",
        description: "f/1.2 isolates, f/22 maximizes depth. Bokeh quality (circular vs. cat-eye) engineered through specific lens descriptors.",
      },
      {
        name: "Lens Selection Psychology",
        description: "Each optical design (spherical, anamorphic, tilt-shift) creates a distinct relationship between subject, environment, and viewer.",
      },
    ],
    platforms: ["Midjourney", "SDXL", "Flux.1"],
    connects: [2, 4],
  },
  {
    id: 4,
    category: "04",
    title: "Strategic Negation & Material Science",
    subtitle: "5 SKILLS",
    level: "Material Layer",
    icon: Shield,
    color: "#FF4FD8",
    description:
      "Telling the AI what not to include — overcoming the uncanny valley through material physics. Strategic exclusion is as important as inclusion.",
    skills: [
      {
        name: "Negative Prompting with Weights",
        description: "Compound exclusion at weight ≥1.2: (blurry, deformed, plastic skin:1.4). Target artifacts specifically rather than generically.",
      },
      {
        name: "Skin Realism Management",
        description: "Subsurface scattering vocabulary, pore-level texture tokens, and specular highlight control for defeating the plastic-skin artifact.",
      },
      {
        name: "Subsurface Scattering (SSS)",
        description: "Light penetrates skin 2–3mm and exits at a different point. SSS prompts simulate this biological reality for tactile believability.",
      },
      {
        name: "Fresnel Reflectance",
        description: "Surfaces reflect more at grazing angles. Fresnel-aware prompts create physically accurate specularity on skin, glass, and wet surfaces.",
      },
      {
        name: "Anisotropic Reflections",
        description: "Directional micro-surface structure (hair, brushed metal, silk) creates stretched rather than circular highlights — critical for material convincingness.",
      },
    ],
    platforms: ["SDXL", "ComfyUI", "Flux.1", "A1111"],
    connects: [3, 5],
  },
  {
    id: 5,
    category: "05",
    title: "Identity Preservation & Consistency",
    subtitle: "4 SKILLS",
    level: "Consistency Layer",
    icon: Layers,
    color: "#FFB000",
    description:
      "Maintaining specific character or style across multiple generations — critical for storytelling, brand work, and production pipelines.",
    skills: [
      {
        name: "Seed Locking",
        description: "Fix the noise seed to maintain compositional consistency across iterations. Combine with cfg_scale variation for controlled exploration.",
      },
      {
        name: "Character Reference (--cref)",
        description: "Midjourney's --cref flag with --cw weight control: inject a reference image's identity into new generations at controlled strength.",
      },
      {
        name: "Style Reference (--sref)",
        description: "Separate style from content — apply an aesthetic reference without forcing the subject. --sref + --cref simultaneously for full control.",
      },
      {
        name: "Multi-Reference Consistency",
        description: "IP-Adapter + ControlNet + LoRA stacking in ComfyUI for cross-platform character consistency. Character sheets as reference anchors.",
      },
    ],
    platforms: ["Midjourney --cref", "SD / ComfyUI", "Flux.1", "IP-Adapter"],
    connects: [4, 6],
  },
  {
    id: 6,
    category: "06",
    title: "Anamorphic Mastery & Cinematic Grammar",
    subtitle: "4 SKILLS",
    level: "Cinematic Layer",
    icon: Film,
    color: "#00FF87",
    description:
      "Engineering narrative scale and texture through cylindrical optics — the hallmark of visual architects. Anamorphic is not an aesthetic choice; it is a physics decision.",
    skills: [
      {
        name: "Squeeze Factor Selection",
        description: "1.33x (gentle widescreen) vs. 2.0x (extreme cinematic). Squeeze ratio determines oval bokeh geometry and horizontal flare character.",
      },
      {
        name: "Anamorphic Artifact Engineering",
        description: "Intentional horizontal lens flares (blue/amber), oval bokeh, and focus breathing — the physical signatures of cylindrical optics.",
      },
      {
        name: "De-Squeeze Workflow",
        description: "Generating in squeezed format then de-squeezing in post for authentic anamorphic results rather than simulated ones.",
      },
      {
        name: "Lens Breathing Control",
        description: "The focus-distance relationship unique to anamorphic designs — background scale shifts as focus changes, adding organic life.",
      },
    ],
    platforms: ["Midjourney", "SDXL", "ComfyUI", "DaVinci Resolve"],
    connects: [5, 7],
  },
  {
    id: 7,
    category: "07",
    title: "Post-Processing & Hybrid Workflows",
    subtitle: "5 SKILLS",
    level: "Refinement Layer",
    icon: SlidersHorizontal,
    color: "#FF6B35",
    description:
      "Treating AI generation as the beginning, not the end — refining outputs into professional assets through hybrid AI + traditional workflows.",
    skills: [
      {
        name: "Inpainting",
        description: "Mask-based regional regeneration: fix hands, correct faces, replace backgrounds — surgical precision on specific areas without touching the rest.",
      },
      {
        name: "Outpainting",
        description: "Extend images beyond their original canvas. Used for aspect ratio changes, scene expansion, and contextual addition.",
      },
      {
        name: "Color Grading",
        description: "LUT application, Lightroom AI masking, and curves adjustment to unify AI-generated assets into a coherent visual language.",
      },
      {
        name: "External AI Enhancement",
        description: "Topaz Gigapixel (4x upscaling), ESRGAN (texture recovery), and Neat Video (noise reduction) — AI-to-AI refinement chains.",
      },
      {
        name: "Cross-Domain Compositing",
        description: "Combining AI-generated elements with photography, 3D renders, and motion graphics. Matching light, color, and perspective for seamless integration.",
      },
    ],
    platforms: ["ComfyUI", "A1111", "Topaz", "Lightroom", "Photoshop"],
    connects: [6, 8],
  },
  {
    id: 8,
    category: "08",
    title: "AI Agent Orchestration",
    subtitle: "4 SKILLS",
    level: "Orchestration Layer",
    icon: Zap,
    color: "#FF006E",
    description:
      "Designing and managing multi-step, autonomous workflows — the frontier of scalable AI creativity. From single prompts to production pipelines.",
    skills: [
      {
        name: "Agent Architecture Design",
        description: "Planner → Researcher → Generator → Reviewer → Critic chains. Each role has a defined scope, tool access, and handoff protocol.",
      },
      {
        name: "Router Pattern Implementation",
        description: "Conditional logic that routes tasks to specialized sub-agents based on content type, complexity score, or output format required.",
      },
      {
        name: "Role-Based Agent Teams",
        description: "Art Director, Prompt Engineer, Quality Reviewer, and Style Consistency agents operating in parallel with a shared memory context.",
      },
      {
        name: "Cross-Agent Communication",
        description: "Structured message passing, shared vector memory, and validation gates between agents. Fallback protocols for degraded outputs.",
      },
    ],
    platforms: ["Mastra", "LangChain", "AutoGen", "CrewAI"],
    connects: [7],
  },
];
