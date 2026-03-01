export interface Domain {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  icon: string;
  tierRange: [number, number];
  skillCount: number;
}

export const domains: Domain[] = [
  {
    id: 'technical-prompting',
    name: 'Technical Prompt Engineering',
    shortName: 'PROMPT',
    description: 'The foundational art and science of crafting precise instructions for AI visual systems. Master the language of machines.',
    color: '#FF3B00',
    icon: 'Code2',
    tierRange: [1, 4],
    skillCount: 12,
  },
  {
    id: 'optical-physics',
    name: 'Optical Physics & Depth Perception',
    shortName: 'OPTICS',
    description: 'Understanding light behavior, focal dynamics, and the physics that create convincing visual depth in synthetic imagery.',
    color: '#00FF94',
    icon: 'Aperture',
    tierRange: [2, 5],
    skillCount: 8,
  },
  {
    id: 'photographic-literacy',
    name: 'Advanced Photographic Literacy',
    shortName: 'PHOTO',
    description: 'Professional photography knowledge translated into AI prompt engineering. Light, composition, and cinematic grammar.',
    color: '#FFD700',
    icon: 'Camera',
    tierRange: [2, 5],
    skillCount: 14,
  },
  {
    id: 'strategic-negation',
    name: 'Strategic Negation & Material Science',
    shortName: 'NEGATE',
    description: 'The power of exclusion. Understanding what NOT to include and the physical properties that make materials believable.',
    color: '#8B5CF6',
    icon: 'MinusCircle',
    tierRange: [2, 4],
    skillCount: 10,
  },
  {
    id: 'identity-preservation',
    name: 'Identity Preservation & Consistency',
    shortName: 'IDENTITY',
    description: 'Maintaining character consistency across generations. The holy grail of professional AI visual production.',
    color: '#06B6D4',
    icon: 'UserCheck',
    tierRange: [3, 6],
    skillCount: 7,
  },
  {
    id: 'anamorphic-mastery',
    name: 'Anamorphic Mastery & Cinematic Grammar',
    shortName: 'ANAMORPH',
    description: 'The distinctive look of cinema. Lens characteristics, squeeze factors, and the visual language of film.',
    color: '#EC4899',
    icon: 'Film',
    tierRange: [3, 5],
    skillCount: 8,
  },
  {
    id: 'post-processing',
    name: 'Post-Processing & Hybrid Workflows',
    shortName: 'POST',
    description: 'Bridging AI generation with traditional post-production. Enhancement, compositing, and finishing techniques.',
    color: '#10B981',
    icon: 'Layers',
    tierRange: [3, 5],
    skillCount: 9,
  },
  {
    id: 'ai-agents',
    name: 'AI Agent Orchestration',
    shortName: 'AGENTS',
    description: 'Building intelligent systems that generate visuals autonomously. Architecture, routing, and multi-agent coordination.',
    color: '#F59E0B',
    icon: 'Bot',
    tierRange: [4, 6],
    skillCount: 8,
  },
];

export const domainColors: Record<string, string> = {
  'technical-prompting': '#FF3B00',
  'optical-physics': '#00FF94',
  'photographic-literacy': '#FFD700',
  'strategic-negation': '#8B5CF6',
  'identity-preservation': '#06B6D4',
  'anamorphic-mastery': '#EC4899',
  'post-processing': '#10B981',
  'ai-agents': '#F59E0B',
};

export const tierColors: Record<number, string> = {
  1: '#FF3B00',
  2: '#FF6B35',
  3: '#00FF94',
  4: '#00D4AA',
  5: '#FFFFFF',
  6: '#888888',
};

export const tierNames: Record<number, string> = {
  1: 'NOVICE',
  2: 'PRACTITIONER',
  3: 'SPECIALIST',
  4: 'EXPERT',
  5: 'MASTER',
  6: 'ARCHITECT',
};

export const masteryLevels = ['beginner', 'intermediate', 'advanced', 'architect'] as const;
export type MasteryLevel = typeof masteryLevels[number];
