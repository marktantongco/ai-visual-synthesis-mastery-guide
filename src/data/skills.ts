// AI Visual Synthesis Mastery Guide - Complete Skills Database
// Think Periodic Table, Not Textbook

export type Tier = 1 | 2 | 3 | 4 | 5 | 6;
export type MasteryLevel = 'beginner' | 'intermediate' | 'advanced' | 'architect';

export interface SubSkill {
  id: string;
  name: string;
  description: string;
  example?: string;
}

export interface TechnicalSpec {
  parameter: string;
  value: string;
  effect: string;
}

export interface PromptTemplate {
  name: string;
  template: string;
  physicsAnalysis?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  domain: string;
  tier: Tier;
  description: string;
  subSkills: SubSkill[];
  relatedSkills: string[];
  dependencies: string[];
  promptTemplates?: PromptTemplate[];
  technicalSpecs?: TechnicalSpec[];
  masteryLevel: MasteryLevel;
  color: string; // Domain color indicator
}

export interface Domain {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  skills: string[];
}

// Domain Definitions
export const domains: Domain[] = [
  {
    id: 'prompt-engineering',
    name: 'Technical Prompt Engineering',
    shortName: 'PROMPT',
    description: 'Constructing prompts as structured blueprints – the interface between human intent and machine execution.',
    color: '#FF3B00', // Brutal Orange
    skills: ['scaffold-method', 'universal-blueprint', 'front-loading', 'keyword-weighting', 'photographic-vocabulary', 'agent-prompting']
  },
  {
    id: 'optical-physics',
    name: 'Optical Physics & Depth Perception',
    shortName: 'OPTICS',
    description: 'The foundation of all visual engineering – understanding how focal length governs psychological perception.',
    color: '#00FF94', // Matrix Green
    skills: ['focal-length-mapping', 'cop-compensation', 'inverse-square-law', 'sensor-format']
  },
  {
    id: 'photographic-literacy',
    name: 'Advanced Photographic Literacy',
    shortName: 'PHOTO',
    description: 'Reconstructing real-world physics – the key to believable photorealism and tactile truth.',
    color: '#FF3B00',
    skills: ['lighting-patterns', 'lighting-ratios', 'color-temperature', 'aperture-control', 'lens-psychology']
  },
  {
    id: 'material-science',
    name: 'Strategic Negation & Material Science',
    shortName: 'MATERIAL',
    description: 'Telling the AI what not to include – overcoming the uncanny valley through material physics.',
    color: '#00FF94',
    skills: ['negative-prompting', 'skin-realism', 'subsurface-scattering', 'fresnel-reflectance', 'anisotropic-reflections']
  },
  {
    id: 'identity-consistency',
    name: 'Identity Preservation & Consistency',
    shortName: 'IDENTITY',
    description: 'Maintaining specific character or style across multiple generations – critical for storytelling.',
    color: '#FF3B00',
    skills: ['seed-locking', 'character-reference', 'style-reference', 'multi-reference']
  },
  {
    id: 'anamorphic-cinematic',
    name: 'Anamorphic Mastery & Cinematic Grammar',
    shortName: 'CINEMA',
    description: 'Engineering narrative scale and texture through cylindrical optics – the hallmark of visual architects.',
    color: '#00FF94',
    skills: ['squeeze-factor', 'anamorphic-artifacts', 'de-squeeze-workflow', 'lens-breathing']
  },
  {
    id: 'post-processing',
    name: 'Post-Processing & Hybrid Workflows',
    shortName: 'POST',
    description: 'Treating AI generation as the beginning, not the end – refining outputs into professional assets.',
    color: '#FF3B00',
    skills: ['inpainting', 'outpainting', 'color-grading', 'ai-enhancement', 'compositing']
  },
  {
    id: 'agent-orchestration',
    name: 'AI Agent Orchestration',
    shortName: 'AGENT',
    description: 'Designing and managing multi-step, autonomous workflows – the frontier of scalable AI creativity.',
    color: '#00FF94',
    skills: ['agent-architecture', 'router-patterns', 'role-based-teams', 'cross-agent-comm']
  }
];

// Complete Skills Database
export const skills: SkillNode[] = [
  // DOMAIN 1: Technical Prompt Engineering
  {
    id: 'scaffold-method',
    name: 'The Scaffold Method',
    domain: 'prompt-engineering',
    tier: 1,
    description: 'Order elements for maximum control using the formula: [Subject] + [Action] + [Lighting] + [Lens] + [Style] + [Quality]',
    subSkills: [
      { id: 'scaffold-subject', name: 'Subject Definition', description: 'Define primary focus clearly', example: 'A woman walking in rain' },
      { id: 'scaffold-action', name: 'Action Specification', description: 'Describe what the subject is doing', example: 'walking confidently' },
      { id: 'scaffold-lighting', name: 'Lighting Setup', description: 'Specify light direction, quality, temperature' },
      { id: 'scaffold-lens', name: 'Lens Parameters', description: 'Define focal length, aperture, sensor' },
      { id: 'scaffold-style', name: 'Style Modifiers', description: 'Artistic direction and aesthetic' }
    ],
    relatedSkills: ['universal-blueprint', 'front-loading'],
    dependencies: [],
    promptTemplates: [
      {
        name: 'Basic Scaffold',
        template: 'A woman walking in rain + cinematic lighting + 85mm f/1.8 + photorealistic + 4K'
      }
    ],
    masteryLevel: 'beginner',
    color: '#FF3B00'
  },
  {
    id: 'universal-blueprint',
    name: 'Universal Blueprint',
    domain: 'prompt-engineering',
    tier: 1,
    description: 'Extended order for professional precision: [STYLE] + [SUBJECT] + [FEATURE] + [POSE] + [FRAMING] + [SETTING] + [LIGHTING] + [ANGLE] + [CAMERA] + [PHOTOGRAPHER]',
    subSkills: [
      { id: 'bp-style', name: 'Style Prefix', description: 'Establish artistic medium first' },
      { id: 'bp-subject', name: 'Subject Details', description: 'Physical characteristics and identity' },
      { id: 'bp-framing', name: 'Framing/Shot Type', description: 'MCU, Close-up, Wide, etc.' },
      { id: 'bp-setting', name: 'Environment Setting', description: 'Location and atmosphere' },
      { id: 'bp-camera', name: 'Camera Properties', description: 'Lens, aperture, sensor format' }
    ],
    relatedSkills: ['scaffold-method', 'front-loading', 'lighting-patterns'],
    dependencies: ['scaffold-method'],
    promptTemplates: [
      {
        name: 'Executive Portrait Blueprint',
        template: 'Editorial portrait + CEO + sharp jawline + looking at camera + medium close-up + mahogany office + Rembrandt lighting + eye level + 85mm f/1.8 + ARRI ALEXA 65'
      }
    ],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'front-loading',
    name: 'Front-Loading',
    domain: 'prompt-engineering',
    tier: 1,
    description: 'Place the most important concept at the beginning. Models process sequentially with maximum computational weight on first 75 tokens.',
    subSkills: [
      { id: 'fl-attention', name: 'Attention Window', description: 'First 75 tokens receive maximum weight' },
      { id: 'fl-drift', name: 'Semantic Drift', description: 'Omit contradictory terms to prevent logical failures' },
      { id: 'fl-priority', name: 'Token Priority', description: 'Critical physics parameters must lead' }
    ],
    relatedSkills: ['scaffold-method', 'universal-blueprint'],
    dependencies: [],
    masteryLevel: 'beginner',
    color: '#FF3B00'
  },
  {
    id: 'keyword-weighting',
    name: 'Keyword Weighting',
    domain: 'prompt-engineering',
    tier: 2,
    description: 'Use syntax (keyword:weight) to prioritize semantic tokens. Weights typically range 1.1-1.5.',
    subSkills: [
      { id: 'kw-syntax', name: 'Weight Syntax', description: 'Use (keyword:1.4) format' },
      { id: 'kw-anatomical', name: 'Anatomical Weights', description: '(fused fingers:1.4), (extra limbs:1.4)' },
      { id: 'kw-material', name: 'Material Weights', description: '(plastic skin:1.4), (airbrushed:1.3)' }
    ],
    relatedSkills: ['negative-prompting', 'skin-realism'],
    dependencies: ['front-loading'],
    promptTemplates: [
      {
        name: 'Common Weight Patterns',
        template: '(Rembrandt lighting:1.2), (visible pores:1.3), (fused fingers:1.4)'
      }
    ],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'photographic-vocabulary',
    name: 'Photographic Vocabulary',
    domain: 'prompt-engineering',
    tier: 2,
    description: 'Use precise technical terms instead of vague buzzwords. Prefer "85mm lens, f/2.8" over "hyperrealistic cinematic".',
    subSkills: [
      { id: 'pv-lens', name: 'Lens Language', description: 'Focal length + aperture combination' },
      { id: 'pv-lighting', name: 'Lighting Terminology', description: 'Kelvin, ratios, patterns' },
      { id: 'pv-avoid', name: 'Terms to Avoid', description: '"hyperrealistic", "4K", "cinematic" cause wax-figure look' }
    ],
    relatedSkills: ['focal-length-mapping', 'lighting-patterns'],
    dependencies: ['front-loading'],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'agent-prompting',
    name: 'Agent Prompting Patterns',
    domain: 'prompt-engineering',
    tier: 4,
    description: 'Design prompts for AI agents using zero-shot, few-shot, chain-of-thought, and role-based approaches.',
    subSkills: [
      { id: 'ap-zero', name: 'Zero-Shot', description: 'Direct instruction without examples' },
      { id: 'ap-few', name: 'Few-Shot', description: 'Provide examples before task' },
      { id: 'ap-cot', name: 'Chain-of-Thought', description: 'Step-by-step reasoning' },
      { id: 'ap-role', name: 'Role-Based', description: 'Assign persona and expertise' }
    ],
    relatedSkills: ['agent-architecture', 'router-patterns'],
    dependencies: ['scaffold-method'],
    promptTemplates: [
      {
        name: 'Role-Based Agent Prompt',
        template: 'You are a professional cinematographer. First, analyze the lighting requirements. Then specify the optical path.'
      }
    ],
    masteryLevel: 'advanced',
    color: '#FF3B00'
  },

  // DOMAIN 2: Optical Physics & Depth Perception
  {
    id: 'focal-length-mapping',
    name: 'Focal Length Mapping',
    domain: 'optical-physics',
    tier: 2,
    description: 'Use specific focal lengths to control subject physiognomy and psychological impact.',
    subSkills: [
      { id: 'fl-16mm', name: '16mm Ultra-Wide', description: 'Features "stretched", subject feels smarter but less approachable' },
      { id: 'fl-22mm', name: '22mm Wide', description: 'Wide-angle distortion; immersive environmental storytelling' },
      { id: 'fl-45mm', name: '45mm Natural', description: 'Human perspective; most faithful 3D layout' },
      { id: 'fl-85mm', name: '85-135mm Portrait', description: 'Intimate portraiture; compression, bokeh' },
      { id: 'fl-216mm', name: '216mm Telephoto', description: 'Extreme compression; high fWHR signals dominance' }
    ],
    relatedSkills: ['aperture-control', 'cop-compensation', 'lens-psychology'],
    dependencies: [],
    technicalSpecs: [
      { parameter: '24mm', value: 'Environmental Scale', effect: 'Captures surroundings; architectural grandeur' },
      { parameter: '50mm', value: 'Natural Rule', effect: 'Approximates human vision; least distortion' },
      { parameter: '85mm', value: 'Executive Authority', effect: 'Flattens features; makes subjects look smarter' },
      { parameter: '105mm+', value: 'Telephoto Compression', effect: 'Extreme separation; prestigious look' }
    ],
    masteryLevel: 'intermediate',
    color: '#00FF94'
  },
  {
    id: 'cop-compensation',
    name: 'Center of Projection (COP)',
    domain: 'optical-physics',
    tier: 3,
    description: 'Adjust focal length based on viewing distance and display size to prevent perceptual distortion.',
    subSkills: [
      { id: 'cop-mobile', name: 'Mobile Compensation', description: 'Viewers often further from COP; use 85mm+ or crop 50mm content' },
      { id: 'cop-print', name: 'Large Print Rule', description: 'Follow 45-50mm rule (36° diagonal FOV)' }
    ],
    relatedSkills: ['focal-length-mapping', 'sensor-format'],
    dependencies: ['focal-length-mapping'],
    masteryLevel: 'advanced',
    color: '#00FF94'
  },
  {
    id: 'inverse-square-law',
    name: 'Inverse Square Law',
    domain: 'optical-physics',
    tier: 1,
    description: 'Define light falloff and environmental depth mathematically. Light intensity decreases with square of distance.',
    subSkills: [
      { id: 'isl-formula', name: 'Physics Formula', description: 'Intensity ∝ 1/distance²' },
      { id: 'isl-application', name: 'Practical Application', description: 'key light at 6ft, fill at 8ft, background at 12ft' },
      { id: 'isl-falloff', name: 'Falloff Control', description: 'Background 2 stops under = natural depth' }
    ],
    relatedSkills: ['lighting-ratios', 'color-temperature'],
    dependencies: [],
    promptTemplates: [
      {
        name: 'Inverse Square Application',
        template: 'key light 45° camera-left 5600K softbox at 6ft, background at 12ft showing 2-stop underexposure'
      }
    ],
    masteryLevel: 'intermediate',
    color: '#00FF94'
  },
  {
    id: 'sensor-format',
    name: 'Sensor Format Impact',
    domain: 'optical-physics',
    tier: 2,
    description: 'Account for crop factors when specifying lenses. Full-frame vs APS-C vs Medium format affect effective focal length.',
    subSkills: [
      { id: 'sf-fullframe', name: 'Full-Frame (35mm)', description: 'Standard reference; no crop factor' },
      { id: 'sf-apsc', name: 'APS-C (1.5x crop)', description: '50mm becomes 75mm equivalent' },
      { id: 'sf-medium', name: 'Medium Format', description: 'Larger sensor; shallower depth of field' }
    ],
    relatedSkills: ['focal-length-mapping', 'aperture-control'],
    dependencies: ['focal-length-mapping'],
    masteryLevel: 'intermediate',
    color: '#00FF94'
  },

  // DOMAIN 3: Advanced Photographic Literacy
  {
    id: 'lighting-patterns',
    name: 'Lighting Pattern Mastery',
    domain: 'photographic-literacy',
    tier: 1,
    description: 'Use classic studio setups to sculpt form, mood, and psychological impact.',
    subSkills: [
      { id: 'lp-rembrandt', name: 'Rembrandt', description: '45° key, triangle on cheek; signals gravitas and intellect' },
      { id: 'lp-butterfly', name: 'Butterfly', description: 'Above and centered; glamour and beauty' },
      { id: 'lp-rim', name: 'Rim', description: 'Backlight at 135°; premium editorial separation' },
      { id: 'lp-split', name: 'Split', description: '90° side; drama and mystery' },
      { id: 'lp-loop', name: 'Loop', description: 'Small nose shadow at 30-45°; natural and approachable' }
    ],
    relatedSkills: ['lighting-ratios', 'color-temperature'],
    dependencies: [],
    technicalSpecs: [
      { parameter: 'Rembrandt', value: 'Key 45° high, triangle on cheek, 4:1 ratio', effect: 'Intellect, gravitas' },
      { parameter: 'Loop', value: 'Key 30-45°, small nose shadow, 3:1 ratio', effect: 'Approachability, honesty' },
      { parameter: 'Butterfly', value: 'Key above/centered, 2:1 ratio', effect: 'Beauty, confidence' },
      { parameter: 'Split', value: 'Key 90° side, 8:1 ratio', effect: 'Intensity, power' },
      { parameter: 'Rim', value: 'Backlight at 135°, 1 stop over key', effect: 'Premium production' }
    ],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'lighting-ratios',
    name: 'Lighting Ratios',
    domain: 'photographic-literacy',
    tier: 1,
    description: 'Define contrast ratios mathematically. The relationship between key and fill lights.',
    subSkills: [
      { id: 'lr-2-1', name: '2:1 Ratio', description: 'Flat, even lighting; beauty and corporate' },
      { id: 'lr-3-1', name: '3:1 Ratio', description: 'Natural modeling; standard portraiture' },
      { id: 'lr-4-1', name: '4:1 Ratio', description: 'Dramatic; editorial and leadership' },
      { id: 'lr-8-1', name: '8:1 Ratio', description: 'Noir; extreme contrast and mystery' }
    ],
    relatedSkills: ['lighting-patterns', 'inverse-square-law'],
    dependencies: [],
    technicalSpecs: [
      { parameter: '2:1', value: '1 stop difference', effect: 'Flat, even; beauty/corporate' },
      { parameter: '3:1', value: '1.5 stops', effect: 'Natural modeling; standard portrait' },
      { parameter: '4:1', value: '2 stops', effect: 'Dramatic; editorial/leadership' },
      { parameter: '8:1', value: '3 stops', effect: 'Noir; extreme contrast' }
    ],
    masteryLevel: 'beginner',
    color: '#FF3B00'
  },
  {
    id: 'color-temperature',
    name: 'Color Temperature Control',
    domain: 'photographic-literacy',
    tier: 1,
    description: 'Specify light warmth/coolness via Kelvin scale. Critical for mood and color grading.',
    subSkills: [
      { id: 'ct-warm', name: '2700-3200K Warm', description: 'Tungsten, candlelight; intimate, cozy' },
      { id: 'ct-neutral', name: '4500-5000K Neutral', description: 'Daylight fluorescent; natural' },
      { id: 'ct-cool', name: '5500-6500K Cool', description: 'Overcast, shade; clinical, dramatic' },
      { id: 'ct-twilight', name: '7500K+ Twilight', description: 'Blue hour; ethereal' }
    ],
    relatedSkills: ['lighting-patterns', 'color-grading'],
    dependencies: [],
    technicalSpecs: [
      { parameter: '2000-2700K', value: 'Candlelight, sunrise/sunset', effect: 'Intimate, warm' },
      { parameter: '3200-4500K', value: 'Tungsten, golden hour', effect: 'Flattering, warm' },
      { parameter: '5000-5500K', value: 'Noon daylight, flash', effect: 'Balanced, true' },
      { parameter: '5500-6500K', value: 'Overcast, shade', effect: 'Cool, clinical' },
      { parameter: '6500-7500K', value: 'Blue sky, twilight', effect: 'Cold, dramatic' }
    ],
    masteryLevel: 'beginner',
    color: '#FF3B00'
  },
  {
    id: 'aperture-control',
    name: 'Aperture Control',
    domain: 'photographic-literacy',
    tier: 2,
    description: 'Use f-stop to control depth of field. Shallow for subject isolation, deep for environmental storytelling.',
    subSkills: [
      { id: 'ac-shallow', name: 'f/1.4 - f/5.6 Shallow', description: 'Creamy bokeh; hides background artifacts' },
      { id: 'ac-deep', name: 'f/8 - f/32 Deep', description: 'Full scene sharp; landscapes and architecture' },
      { id: 'ac-bokeh', name: 'Bokeh Engineering', description: 'Oval for anamorphic, circular for spherical' }
    ],
    relatedSkills: ['focal-length-mapping', 'squeeze-factor'],
    dependencies: ['focal-length-mapping'],
    technicalSpecs: [
      { parameter: 'f/1.4 - f/5.6', value: 'Shallow DoF', effect: 'Subject isolation; hide artifacts' },
      { parameter: 'f/8 - f/32', value: 'Deep DoF', effect: 'Full scene sharp; landscapes' }
    ],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'lens-psychology',
    name: 'Lens Selection Psychology',
    domain: 'photographic-literacy',
    tier: 2,
    description: 'Choose focal length based on desired emotional response. Lenses have psychological signatures.',
    subSkills: [
      { id: 'lsp-intimate', name: '85-135mm Intimate', description: 'Trustworthy, attractive, close' },
      { id: 'lsp-honest', name: '35-50mm Honest', description: 'Documentary, authentic, natural' },
      { id: 'lsp-dramatic', name: '18-24mm Dramatic', description: 'Immersive, environmental, grand' }
    ],
    relatedSkills: ['focal-length-mapping', 'cop-compensation'],
    dependencies: ['focal-length-mapping'],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },

  // DOMAIN 4: Strategic Negation & Material Science
  {
    id: 'negative-prompting',
    name: 'Negative Prompting with Weights',
    domain: 'material-science',
    tier: 2,
    description: 'Actively exclude unwanted elements using weighted terms (1.1-1.5). The art of saying NO.',
    subSkills: [
      { id: 'np-syntax', name: 'Weight Syntax', description: 'Use (term:1.4) format for exclusion' },
      { id: 'np-anatomical', name: 'Anatomical Purge', description: '(fused fingers:1.4), (extra limbs:1.4), (double iris:1.4)' },
      { id: 'np-material', name: 'Material Purge', description: '(plastic skin:1.4), (airbrushed:1.3), (doll-like:1.4)' },
      { id: 'np-structural', name: 'Structural Purge', description: '(cartoon:1.3), (3d render:1.3), (illustration:1.3)' }
    ],
    relatedSkills: ['keyword-weighting', 'skin-realism'],
    dependencies: ['keyword-weighting'],
    promptTemplates: [
      {
        name: 'Ultimate Realism Negative Prompt',
        template: '(worst quality, low quality:1.4), (low resolution, blurry, blur:1.2), jpeg artifacts, (cartoon, anime, illustration, painting, drawing, sketch:1.3), 3d render, cgi, digital art, unrealistic, artificial, plastic skin, waxy skin, poreless, airbrushed, (bad anatomy, deformed hands, extra fingers, wrong number of fingers:1.4), text, watermark, logo, uncanny valley, (overexposed, underexposed:1.2), (dead eyes, lifeless eyes:1.3), (smooth skin, beauty filter:1.2)'
      }
    ],
    masteryLevel: 'intermediate',
    color: '#00FF94'
  },
  {
    id: 'skin-realism',
    name: 'Skin Realism Management',
    domain: 'material-science',
    tier: 3,
    description: 'Simultaneously prompt for natural textures and negate synthetic ones. The 94% SSS rule.',
    subSkills: [
      { id: 'sr-prompt', name: 'Positive Skin Tokens', description: 'visible pores, fine vellus hair, subsurface scattering' },
      { id: 'sr-negate', name: 'Negative Skin Tokens', description: 'plastic skin, airbrushed, doll-like, poreless' },
      { id: 'sr-94rule', name: 'The 94% Rule', description: 'Only 6% of skin reflectance is direct; 94% is SSS' }
    ],
    relatedSkills: ['subsurface-scattering', 'negative-prompting'],
    dependencies: ['negative-prompting', 'subsurface-scattering'],
    masteryLevel: 'advanced',
    color: '#00FF94'
  },
  {
    id: 'subsurface-scattering',
    name: 'Subsurface Scattering (SSS)',
    domain: 'material-science',
    tier: 3,
    description: 'Specify light penetration depth for organic materials. Without SSS, skin looks like opaque plastic.',
    subSkills: [
      { id: 'sss-skin-white', name: 'Caucasian Skin', description: '1.0-2.5mm depth; Pink/Orange scattering' },
      { id: 'sss-skin-asian', name: 'Asian Skin', description: '1.0-2.0mm depth; Yellow/Orange scattering' },
      { id: 'sss-skin-dark', name: 'African Skin', description: '1.5-3.0mm depth; Red/Orange scattering' },
      { id: 'sss-other', name: 'Other Materials', description: 'Wax 0.5-1.0mm, Marble 5.0-10.0mm' }
    ],
    relatedSkills: ['skin-realism', 'fresnel-reflectance'],
    dependencies: [],
    technicalSpecs: [
      { parameter: 'Skin (Caucasian)', value: '1.0-2.5mm', effect: 'Pink/Orange scattering' },
      { parameter: 'Skin (Asian)', value: '1.0-2.0mm', effect: 'Yellow/Orange scattering' },
      { parameter: 'Skin (African)', value: '1.5-3.0mm', effect: 'Red/Orange scattering' },
      { parameter: 'Wax', value: '0.5-1.0mm', effect: 'Yellow/White scattering' },
      { parameter: 'Marble', value: '5.0-10.0mm', effect: 'White/Gray scattering' }
    ],
    promptTemplates: [
      {
        name: 'SSS Specification',
        template: 'SSS 1.2mm skin translucency with warm scattering'
      }
    ],
    masteryLevel: 'advanced',
    color: '#00FF94'
  },
  {
    id: 'fresnel-reflectance',
    name: 'Fresnel Reflectance',
    domain: 'material-science',
    tier: 3,
    description: 'Define glancing-angle reflectivity. Reflectivity increases at glancing angles.',
    subSkills: [
      { id: 'fr-dry', name: 'Dry Skin', description: 'Fresnel 0.028 base reflectance' },
      { id: 'fr-wet', name: 'Wet/Moisturized Skin', description: 'Fresnel 0.03 base reflectance' },
      { id: 'fr-glass', name: 'Glass/Plastic', description: 'Fresnel 0.04 base reflectance' },
      { id: 'fr-diamond', name: 'Diamond', description: 'IOR 2.42; Fresnel 0.17' }
    ],
    relatedSkills: ['subsurface-scattering', 'anisotropic-reflections'],
    dependencies: ['subsurface-scattering'],
    technicalSpecs: [
      { parameter: 'Skin (dry)', value: 'IOR 1.38', effect: 'Fresnel 0.028' },
      { parameter: 'Skin (wet)', value: 'IOR 1.40', effect: 'Fresnel 0.03' },
      { parameter: 'Glass/Plastic', value: 'IOR 1.52', effect: 'Fresnel 0.04' },
      { parameter: 'Diamond', value: 'IOR 2.42', effect: 'Fresnel 0.17' }
    ],
    masteryLevel: 'advanced',
    color: '#00FF94'
  },
  {
    id: 'anisotropic-reflections',
    name: 'Anisotropic Reflections',
    domain: 'material-science',
    tier: 4,
    description: 'Directional reflectivity for brushed surfaces. Follow brush direction for realistic specular response.',
    subSkills: [
      { id: 'ar-hair', name: 'Hair Anisotropy', description: 'Follow hair strand direction' },
      { id: 'ar-metal', name: 'Brushed Metal', description: 'Follow brush/grain direction' },
      { id: 'ar-fabric', name: 'Fabric Weave', description: 'Follow weave pattern' }
    ],
    relatedSkills: ['fresnel-reflectance'],
    dependencies: ['fresnel-reflectance'],
    masteryLevel: 'architect',
    color: '#00FF94'
  },

  // DOMAIN 5: Identity Preservation & Consistency
  {
    id: 'seed-locking',
    name: 'Seed Locking',
    domain: 'identity-consistency',
    tier: 2,
    description: 'Fix the initial noise pattern using --seed parameter. Critical for A/B testing single variable changes.',
    subSkills: [
      { id: 'sl-range', name: 'Seed Range', description: '0-4294967295' },
      { id: 'sl-ab', name: 'A/B Testing', description: 'Lock seed, change one parameter, compare' },
      { id: 'sl-reproducibility', name: 'Reproducibility', description: 'Same seed + same prompt = same image' }
    ],
    relatedSkills: ['character-reference', 'style-reference'],
    dependencies: [],
    promptTemplates: [
      {
        name: 'Seed Parameter',
        template: '--seed 12345'
      }
    ],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'character-reference',
    name: 'Character Reference (--cref)',
    domain: 'identity-consistency',
    tier: 3,
    description: 'Reference image for facial identity preservation across multiple generations.',
    subSkills: [
      { id: 'cr-usage', name: 'Usage', description: '--cref character.jpg (Midjourney)' },
      { id: 'cr-weight', name: 'Character Weight', description: '--cw 100 (full) or --cw 0 (face only)' },
      { id: 'cr-multi', name: 'Multi-Reference', description: 'Up to 4 reference images per generation' }
    ],
    relatedSkills: ['seed-locking', 'style-reference', 'multi-reference'],
    dependencies: ['seed-locking'],
    promptTemplates: [
      {
        name: 'Character Reference',
        template: '--cref character.jpg --cw 100'
      }
    ],
    masteryLevel: 'advanced',
    color: '#FF3B00'
  },
  {
    id: 'style-reference',
    name: 'Style Reference (--sref)',
    domain: 'identity-consistency',
    tier: 3,
    description: 'Reference image for aesthetic and palette preservation across generations.',
    subSkills: [
      { id: 'sr-usage', name: 'Usage', description: '--sref style.jpg (Midjourney)' },
      { id: 'sr-weight', name: 'Style Weight', description: '--sw 100 (default) to --sw 0' },
      { id: 'sr-combine', name: 'Combined with CREF', description: 'Use both for full identity control' }
    ],
    relatedSkills: ['character-reference', 'multi-reference'],
    dependencies: ['character-reference'],
    promptTemplates: [
      {
        name: 'Style Reference',
        template: '--sref style.jpg --sw 100'
      }
    ],
    masteryLevel: 'advanced',
    color: '#FF3B00'
  },
  {
    id: 'multi-reference',
    name: 'Multi-Reference Consistency',
    domain: 'identity-consistency',
    tier: 4,
    description: 'Use up to four reference images per generation. Combine character, background, and prop references.',
    subSkills: [
      { id: 'mr-character', name: 'Character Reference', description: 'Primary subject identity' },
      { id: 'mr-background', name: 'Background Reference', description: 'Environment and setting' },
      { id: 'mr-prop', name: 'Prop Reference', description: 'Specific objects or elements' },
      { id: 'mr-style', name: 'Style Reference', description: 'Overall aesthetic direction' }
    ],
    relatedSkills: ['character-reference', 'style-reference'],
    dependencies: ['character-reference', 'style-reference'],
    masteryLevel: 'advanced',
    color: '#FF3B00'
  },

  // DOMAIN 6: Anamorphic Mastery & Cinematic Grammar
  {
    id: 'squeeze-factor',
    name: 'Squeeze Factor Selection',
    domain: 'anamorphic-cinematic',
    tier: 4,
    description: 'Choose appropriate anamorphic squeeze. The squeeze factor dictates aspect ratio and artifact intensity.',
    subSkills: [
      { id: 'sf-133', name: '1.33x Squeeze', description: 'Delivers 2.39:1 on 16:9 sensors directly' },
      { id: 'sf-15', name: '1.5x Squeeze', description: 'Moderate balance of oval distortion and width' },
      { id: 'sf-18', name: '1.8x Squeeze', description: 'Significant anamorphic character (Vazen)' },
      { id: 'sf-20', name: '2x Squeeze', description: 'Historical "Scope" standard; requires 4:3 sensor' }
    ],
    relatedSkills: ['anamorphic-artifacts', 'de-squeeze-workflow'],
    dependencies: [],
    technicalSpecs: [
      { parameter: '1.33x', value: '2.39:1 on 16:9', effect: 'Minimal vertical cropping' },
      { parameter: '1.5x', value: 'Moderate', effect: 'Balanced distortion and width' },
      { parameter: '1.8x', value: 'Vazen standard', effect: 'Significant character' },
      { parameter: '2x', value: 'Historical Scope', effect: 'Classic cinema look' }
    ],
    masteryLevel: 'advanced',
    color: '#00FF94'
  },
  {
    id: 'anamorphic-artifacts',
    name: 'Anamorphic Artifact Engineering',
    domain: 'anamorphic-cinematic',
    tier: 4,
    description: 'Deliberately control signature characteristics: horizontal flares, oval bokeh, compressed depth.',
    subSkills: [
      { id: 'aa-flares', name: 'Horizontal Lens Flares', description: 'Tiffen 2026 Nano blue streak emulation' },
      { id: 'aa-bokeh', name: 'Oval Bokeh', description: 'Vertically stretched highlights' },
      { id: 'aa-dof', name: 'Compressed Depth of Field', description: 'Anamorphic depth compression' },
      { id: 'aa-falloff', name: 'Focus Fall-off', description: 'Organic edge-of-frame softness' }
    ],
    relatedSkills: ['squeeze-factor', 'aperture-control'],
    dependencies: ['squeeze-factor'],
    promptTemplates: [
      {
        name: 'Anamorphic Specification',
        template: 'anamorphic 1.33x squeeze, oval bokeh, horizontal blue streak flares'
      }
    ],
    masteryLevel: 'advanced',
    color: '#00FF94'
  },
  {
    id: 'de-squeeze-workflow',
    name: 'De-Squeeze Workflow',
    domain: 'anamorphic-cinematic',
    tier: 5,
    description: 'Properly restore correct proportions in post-production using DaVinci Resolve 19.1.',
    subSkills: [
      { id: 'ds-identify', name: 'Identify Squeeze', description: 'Correlate with prompt (1.33x, 1.5x, 1.8x, 2.0x)' },
      { id: 'ds-apply', name: 'Apply Multiplier', description: 'Horizontal stretch (e.g., 2.0x for 2:1 scope)' },
      { id: 'ds-crop', name: 'Crop for Scope', description: 'Final crop to 2.39:1 "Scope" ratio' }
    ],
    relatedSkills: ['squeeze-factor', 'color-grading'],
    dependencies: ['squeeze-factor'],
    masteryLevel: 'architect',
    color: '#00FF94'
  },
  {
    id: 'lens-breathing',
    name: 'Lens Breathing Control',
    domain: 'anamorphic-cinematic',
    tier: 5,
    description: 'Specify whether focus breathing should be visible. Adds organic feel to video sequences.',
    subSkills: [
      { id: 'lb-visible', name: 'Visible Breathing', description: 'Subtle focal length shift during rack focus' },
      { id: 'lb-suppressed', name: 'Suppressed Breathing', description: 'Modern cinema lenses minimize effect' }
    ],
    relatedSkills: ['squeeze-factor', 'anamorphic-artifacts'],
    dependencies: ['squeeze-factor'],
    promptTemplates: [
      {
        name: 'Lens Breathing',
        template: 'subtle lens breathing for organic feel'
      }
    ],
    masteryLevel: 'architect',
    color: '#00FF94'
  },

  // DOMAIN 7: Post-Processing & Hybrid Workflows
  {
    id: 'inpainting',
    name: 'Inpainting',
    domain: 'post-processing',
    tier: 3,
    description: 'Surgical correction of problematic areas without altering overall composition.',
    subSkills: [
      { id: 'ip-vary', name: 'Vary Region', description: 'Midjourney selective regeneration' },
      { id: 'ip-genfill', name: 'Generative Fill', description: 'Photoshop AI-powered fill' },
      { id: 'ip-adetailer', name: 'aDetailer', description: 'Automatic face/hand correction' }
    ],
    relatedSkills: ['outpainting', 'ai-enhancement'],
    dependencies: [],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'outpainting',
    name: 'Outpainting',
    domain: 'post-processing',
    tier: 3,
    description: 'Expand canvas beyond original boundaries. Useful for aspect ratio adjustments.',
    subSkills: [
      { id: 'op-expand', name: 'Generative Expand', description: 'Photoshop AI canvas extension' },
      { id: 'op-directional', name: 'Directional Expansion', description: 'Expand specific edges' }
    ],
    relatedSkills: ['inpainting', 'compositing'],
    dependencies: ['inpainting'],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'color-grading',
    name: 'Color Grading',
    domain: 'post-processing',
    tier: 3,
    description: 'Professional color timing to create mood harmony and visual consistency.',
    subSkills: [
      { id: 'cg-lightroom', name: 'Adobe Lightroom', description: 'Standard photo editing workflow' },
      { id: 'cg-resolve', name: 'DaVinci Resolve', description: 'Professional video color grading' },
      { id: 'cg-luts', name: 'LUT Application', description: 'Lookup tables for consistent looks' }
    ],
    relatedSkills: ['color-temperature', 'de-squeeze-workflow'],
    dependencies: ['color-temperature'],
    masteryLevel: 'intermediate',
    color: '#FF3B00'
  },
  {
    id: 'ai-enhancement',
    name: 'External AI Enhancement',
    domain: 'post-processing',
    tier: 3,
    description: 'Upscaling, denoising, and face recovery using specialized AI tools.',
    subSkills: [
      { id: 'ae-topaz', name: 'Topaz Photo AI', description: 'Upscaling and noise reduction' },
      { id: 'ae-magnific', name: 'Magnific AI', description: 'Detail enhancement and upscaling' },
      { id: 'ae-codeformer', name: 'CodeFormer', description: 'Face restoration' }
    ],
    relatedSkills: ['inpainting', 'skin-realism'],
    dependencies: [],
    masteryLevel: 'advanced',
    color: '#FF3B00'
  },
  {
    id: 'compositing',
    name: 'Cross-Domain Compositing',
    domain: 'post-processing',
    tier: 4,
    description: 'Combine elements from different sources into cohesive final images.',
    subSkills: [
      { id: 'comp-layers', name: 'Layer Blending', description: 'Photoshop layer techniques' },
      { id: 'comp-mask', name: 'Masking', description: 'Selective element isolation' },
      { id: 'comp-match', name: 'Color Matching', description: 'Harmonize elements from different sources' }
    ],
    relatedSkills: ['inpainting', 'color-grading'],
    dependencies: ['inpainting', 'color-grading'],
    masteryLevel: 'advanced',
    color: '#FF3B00'
  },

  // DOMAIN 8: AI Agent Orchestration
  {
    id: 'agent-architecture',
    name: 'Agent Architecture Design',
    domain: 'agent-orchestration',
    tier: 5,
    description: 'Understand how LLMs call tools, plan steps, and maintain memory for autonomous workflows.',
    subSkills: [
      { id: 'aa-tools', name: 'Tool Integration', description: 'Define callable functions for agents' },
      { id: 'aa-planning', name: 'Step Planning', description: 'Multi-step task decomposition' },
      { id: 'aa-memory', name: 'Memory Systems', description: 'Short-term and long-term context retention' }
    ],
    relatedSkills: ['router-patterns', 'role-based-teams'],
    dependencies: ['agent-prompting'],
    masteryLevel: 'architect',
    color: '#00FF94'
  },
  {
    id: 'router-patterns',
    name: 'Router Pattern Implementation',
    domain: 'agent-orchestration',
    tier: 5,
    description: 'Direct queries to appropriate specialized agents using semantic routing.',
    subSkills: [
      { id: 'rp-semantic', name: 'Semantic Routing', description: 'Match queries to agent capabilities' },
      { id: 'rp-fallback', name: 'Fallback Handling', description: 'Default agent for unmatched queries' },
      { id: 'rp-load', name: 'Load Balancing', description: 'Distribute work across agents' }
    ],
    relatedSkills: ['agent-architecture', 'cross-agent-comm'],
    dependencies: ['agent-architecture'],
    masteryLevel: 'architect',
    color: '#00FF94'
  },
  {
    id: 'role-based-teams',
    name: 'Role-Based Agent Teams',
    domain: 'agent-orchestration',
    tier: 6,
    description: 'Create specialized agents with distinct responsibilities for complex workflows.',
    subSkills: [
      { id: 'rbt-scripter', name: 'ScripterAgent', description: 'Handles narrative and dialogue' },
      { id: 'rbt-director', name: 'DirectorAgent', description: 'Coordinates creative direction' },
      { id: 'rbt-photo', name: 'PhotographyAgent', description: 'Handles visual specifications' },
      { id: 'rbt-reviewer', name: 'ReviewerAgent', description: 'Quality control and validation' }
    ],
    relatedSkills: ['agent-architecture', 'cross-agent-comm'],
    dependencies: ['agent-architecture', 'cross-agent-comm'],
    masteryLevel: 'architect',
    color: '#00FF94'
  },
  {
    id: 'cross-agent-comm',
    name: 'Cross-Agent Communication',
    domain: 'agent-orchestration',
    tier: 6,
    description: 'Design protocols where agents coordinate and share context effectively.',
    subSkills: [
      { id: 'cac-memory', name: 'Shared Memory', description: 'Common knowledge store' },
      { id: 'cac-bus', name: 'Message Bus', description: 'Inter-agent messaging system' },
      { id: 'cac-context', name: 'Context Passing', description: 'State transfer between agents' }
    ],
    relatedSkills: ['agent-architecture', 'role-based-teams'],
    dependencies: ['agent-architecture'],
    masteryLevel: 'architect',
    color: '#00FF94'
  }
];

// Master Class Prompt Templates
export const masterClassTemplates: PromptTemplate[] = [
  {
    name: 'Executive Portrait',
    template: 'Studio portrait, male executive 50s, sharp jawline, bespoke charcoal wool suit with matte finish, key light 45° camera-left 5600K softbox 2x3ft at 6ft, 4:1 ratio to white bounce fill, background light 3200K 2 stops under, 85mm f/1.4 lens, full-frame sensor, circular bokeh, SSS 1.2mm skin translucency with warm scattering, Fresnel 0.04 base reflectance, specular catchlights showing window geometry, subtle chromatic aberration, visible pores and vellus hair, ARRI ALEXA 65 color science, --style raw --seed 12345',
    physicsAnalysis: '4:1 ratio creates professional drama without crossing into noir territory. 85mm lens ensures flattering facial compression appropriate for executive presence. Fresnel 0.04 provides accurate dry skin reflectance. SSS 1.2mm matches Caucasian/Asian male skin translucency profile.'
  },
  {
    name: 'Beauty Shot',
    template: 'Female model with natural skin texture, butterfly lighting with large octabox 5600K at 4ft, 2:1 ratio to white fill below, 105mm f/2.8 lens, full-frame sensor, SSS 1.0mm with warm undertones, Fresnel 0.03, catchlights showing octabox geometry, --style raw --seed 54321',
    physicsAnalysis: 'Butterfly pattern provides glamour through centered shadow under nose. 2:1 ratio soft fill ensures beauty standards without harsh shadows. Fresnel 0.03 accounts for "wet/moisturized" skin common in beauty photography. 105mm provides slightly more compression than 85mm for refined features.'
  },
  {
    name: 'Cinematic Anamorphic',
    template: 'Detective in raincoat on wet street, anamorphic 1.33x squeeze, oval bokeh, horizontal blue streak flares, key light 3200K streetlamp, fill 5600K storefront, 8:1 ratio, 50mm anamorphic at f/2.8, veiling glare, 4K',
    physicsAnalysis: '8:1 ratio creates noir atmosphere with extreme contrast. 1.33x squeeze delivers 2.39:1 scope directly on 16:9 sensors. Anamorphic lens geometry dictates oval bokeh and specific flare artifacts. Veiling glare from 3200K key simulates practical street lighting conditions.'
  },
  {
    name: 'Product Photography',
    template: 'Luxury wristwatch on black velvet, macro photography, 90mm tilt-shift lens, f/11 for full sharpness, ring light 5600K with soft diffusion, 1:1 ratio for even illumination, visible brushed metal texture, Fresnel 0.04 for steel, anisotropic reflections following grain direction, 8K',
    physicsAnalysis: 'Tilt-shift lens provides perspective control for flat-lay accuracy. f/11 aperture ensures entire product in critical focus. Ring light eliminates shadows for clean commercial look. Anisotropic reflections prove brushed metal surface authenticity.'
  },
  {
    name: 'Environmental Portrait',
    template: 'Architect in modern glass building atrium, 24mm wide-angle, f/5.6, natural daylight 5000K from skylights, subtle fill bounce from concrete floor, 3:1 ratio, architectural scale visible, slight barrel distortion accepted, SSS 1.5mm, roughness 0.6 for linen shirt, --style raw',
    physicsAnalysis: '24mm wide-angle captures environmental context and scale. f/5.6 balances subject sharpness with readable background. 3:1 ratio natural for documentary-style authenticity. Barrel distortion accepted as characteristic of wide focal length.'
  }
];

// Six Tiers of Visual Synthesis
export const sixTiers = [
  { tier: 1, focus: 'Master Foundational Physics', requirements: 'Lighting ratios, Kelvin scale, Inverse Square Law' },
  { tier: 2, focus: 'Reconstruct Optical Systems', requirements: 'Focal length, aperture, sensor format, lens aberrations' },
  { tier: 3, focus: 'Control Material & Surface Physics', requirements: 'Subsurface scattering (SSS), Fresnel, roughness, anisotropic reflections' },
  { tier: 4, focus: 'Map Platform-Specific Vocabulary', requirements: 'Weighted syntax, parameter flags, LoRA integration' },
  { tier: 5, focus: 'Categorize Ecosystem Capabilities', requirements: 'Platform selection matrix, strategic matching' },
  { tier: 6, focus: 'Layer Advanced Phenomena', requirements: 'Caustics, diffraction spikes, lens breathing, rolling shutter, coating flare' }
];

// Competency Matrix
export const competencyMatrix = [
  { domain: 'Lighting', beginner: '"Cinematic"', intermediate: 'Patterns (Rembrandt, Butterfly)', advanced: 'Ratios, Kelvin, Position', architect: 'Caustics, Diffraction, Atmospheric scattering' },
  { domain: 'Lens', beginner: '"85mm"', intermediate: 'Focal lengths, Basic aperture', advanced: 'Aperture, Sensor format, COP', architect: 'Lens breathing, Aberration engineering' },
  { domain: 'Material', beginner: '"Realistic"', intermediate: 'Basic Negation', advanced: 'SSS, Fresnel, IOR', architect: 'Anisotropic reflections, Sub-wavelength scattering' },
  { domain: 'Consistency', beginner: 'Repetition', intermediate: 'Seed Locking', advanced: 'CREF, SREF, CW', architect: 'Optical system synthesis, Temporal coherence' },
  { domain: 'Platform', beginner: 'Single tool', intermediate: '2-3 platforms', advanced: 'Full ecosystem', architect: 'Custom deployment, Agent orchestration' },
  { domain: 'Post-Process', beginner: 'None', intermediate: 'Basic crop/adjust', advanced: 'Inpainting, Color grading', architect: 'Pipeline automation, Quality validation' }
];

// Platform Taxonomy
export const platforms = {
  foundation: [
    { name: 'Midjourney (v6.1/v7)', strengths: 'Gold standard for high-end artistic and cinematic output', bestFor: 'Artistic vision, cinematic aesthetics' },
    { name: 'Stable Diffusion / SDXL', strengths: 'Technical leader for open-source control', bestFor: 'Technical control, custom pipelines' },
    { name: 'DALL-E 3', strengths: 'Most intuitive semantic model', bestFor: 'Rapid prototyping, conversational generation' }
  ],
  proTier: [
    { name: 'Flux (Kontext Pro / 2 Pro)', strengths: 'High-performance, superior prompt adherence' },
    { name: 'Ideogram', strengths: 'Industry leader in typography and graphic design' },
    { name: 'Recraft', strengths: 'Professional design and vector-style outputs' },
    { name: 'Imagen & Photon', strengths: 'Enterprise-grade generators' }
  ],
  video: [
    { name: 'Wan 2.6', strengths: 'Leader in high-fidelity temporal consistency' },
    { name: 'Vidu & Reve', strengths: 'Fluid motion and cinematic realism' },
    { name: 'Veo 3 / 3.1', strengths: 'High-definition sequences with motion control' }
  ]
};

// Helper functions
export function getSkillsByDomain(domainId: string): SkillNode[] {
  return skills.filter(skill => skill.domain === domainId);
}

export function getSkillsByTier(tier: Tier): SkillNode[] {
  return skills.filter(skill => skill.tier === tier);
}

export function getSkillById(id: string): SkillNode | undefined {
  return skills.find(skill => skill.id === id);
}

export function getRelatedSkills(skillId: string): SkillNode[] {
  const skill = getSkillById(skillId);
  if (!skill) return [];
  return skill.relatedSkills.map(id => getSkillById(id)).filter(Boolean) as SkillNode[];
}

export function searchSkills(query: string): SkillNode[] {
  const lowerQuery = query.toLowerCase();
  return skills.filter(skill => 
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.description.toLowerCase().includes(lowerQuery) ||
    skill.subSkills.some(sub => sub.name.toLowerCase().includes(lowerQuery) || sub.description.toLowerCase().includes(lowerQuery))
  );
}
