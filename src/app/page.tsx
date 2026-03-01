'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { domains, skills, masterClassTemplates, sixTiers, competencyMatrix, Tier } from '@/data/skills';
import { useSkillStore } from '@/store/skillStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  SearchBar } from '@/components/skills/SearchBar';
import { SkillPanel } from '@/components/skills/SkillPanel';
import { DomainCluster } from '@/components/skills/DomainCluster';
import { SkillCard } from '@/components/skills/SkillCard';
import {
  Menu, X, Layers, Grid3X3, List, Sparkles,
  Copy, Check, Bookmark, Info, XCircle,
  Lightbulb, Camera, Palette, Cpu, Zap, Film, Wand2, Bot, 
  FileText, LayoutGrid, Search, TrendingUp, Flame, ArrowUpRight, Terminal,
  ExternalLink, BookOpen, Users, ChevronLeft
} from 'lucide-react';

// Types
type MainView = 'discovery' | 'documents' | 'directory';
type DirectoryTab = 'all-time' | 'trending' | 'hot';

const domainIcons: Record<string, React.ReactNode> = {
  'prompt-engineering': <Lightbulb className="w-5 h-5" />,
  'optical-physics': <Camera className="w-5 h-5" />,
  'photographic-literacy': <Palette className="w-5 h-5" />,
  'material-science': <Cpu className="w-5 h-5" />,
  'identity-consistency': <Zap className="w-5 h-5" />,
  'anamorphic-cinematic': <Film className="w-5 h-5" />,
  'post-processing': <Wand2 className="w-5 h-5" />,
  'agent-orchestration': <Bot className="w-5 h-5" />,
};

const tierDescriptions: Record<number, { title: string; description: string; skills: string[]; color: string }> = {
  1: {
    title: 'Tier I: Foundational Physics',
    description: 'Master the fundamental physics that govern all visual synthesis. These are the non-negotiable building blocks - lighting ratios, Kelvin scale, and the Inverse Square Law.',
    skills: ['Lighting Ratios', 'Color Temperature', 'Inverse Square Law', 'Front-Loading'],
    color: '#FFFFFF'
  },
  2: {
    title: 'Tier II: Optical Systems',
    description: 'Reconstruct the optical path. Understanding focal length, aperture, and sensor format transforms you from someone who "prompts" to someone who "photographs".',
    skills: ['Focal Length Mapping', 'Aperture Control', 'Sensor Format', 'Keyword Weighting'],
    color: '#FF3B00'
  },
  3: {
    title: 'Tier III: Material Physics',
    description: 'Control matter at the microscopic level. Subsurface scattering (SSS), Fresnel reflectance, and surface roughness are the difference between plastic-looking AI art and tactile textures.',
    skills: ['Subsurface Scattering', 'Fresnel Reflectance', 'Skin Realism', 'COP Compensation'],
    color: '#00FF94'
  },
  4: {
    title: 'Tier IV: Platform Mastery',
    description: 'Map platform-specific vocabulary to your physics knowledge. Weighted syntax, parameter flags, and LoRA integration become second nature.',
    skills: ['Negative Prompting', 'Agent Prompting', 'Anamorphic Artifacts', 'Squeeze Factor'],
    color: '#FF3B00'
  },
  5: {
    title: 'Tier V: Ecosystem Integration',
    description: 'Categorize and leverage the full AI ecosystem. Platform selection becomes strategic, matching model strengths to production requirements.',
    skills: ['Character Reference', 'Style Reference', 'Seed Locking', 'De-Squeeze Workflow'],
    color: '#00FF94'
  },
  6: {
    title: 'Tier VI: Advanced Phenomena',
    description: 'Layer complex optical phenomena - caustics, diffraction spikes, lens breathing, rolling shutter. This is where visual engineering meets artistry.',
    skills: ['Lens Breathing', 'Cross-Agent Comm', 'Role-Based Teams', 'Anisotropic Reflections'],
    color: '#FF3B00'
  }
};

// Sample skills for directory leaderboard
const directorySkills = [
  { id: 'visual-synthesis', name: 'AI Visual Synthesis', owner: 'ai-mastery', repo: 'visual-synthesis', installs: 142847, trending: 12500, hot: 890, category: 'Image Generation' },
  { id: 'prompt-architect', name: 'Prompt Architect', owner: 'prompt-labs', repo: 'prompt-architect', installs: 98523, trending: 8200, hot: 654, category: 'Prompt Engineering' },
  { id: 'cinema-lens', name: 'Cinematic Lens Engine', owner: 'film-studio', repo: 'cinema-lens', installs: 76234, trending: 6800, hot: 523, category: 'Video Generation' },
  { id: 'material-physics', name: 'Material Physics Lab', owner: 'render-labs', repo: 'material-physics', installs: 65128, trending: 5400, hot: 412, category: '3D Rendering' },
  { id: 'identity-lock', name: 'Identity Consistency', owner: 'portrait-ai', repo: 'identity-lock', installs: 54231, trending: 4200, hot: 387, category: 'Image Generation' },
  { id: 'lighting-rig', name: 'Lighting Studio Pro', owner: 'photo-pro', repo: 'lighting-rig', installs: 48923, trending: 3800, hot: 321, category: 'Photography' },
  { id: 'anamorphic-x', name: 'Anamorphic Effects', owner: 'cinema-tools', repo: 'anamorphic-x', installs: 42156, trending: 3100, hot: 298, category: 'Video Generation' },
  { id: 'skin-realism', name: 'Skin Realism Engine', owner: 'portrait-labs', repo: 'skin-realism', installs: 38742, trending: 2900, hot: 256, category: 'Image Generation' },
  { id: 'agent-flow', name: 'Agent Orchestration', owner: 'auto-ai', repo: 'agent-flow', installs: 35129, trending: 2700, hot: 234, category: 'Agents' },
  { id: 'color-science', name: 'Color Science Lab', owner: 'color-pro', repo: 'color-science', installs: 32145, trending: 2400, hot: 198, category: 'Color Grading' },
  { id: 'negative-lab', name: 'Negative Prompt Lab', owner: 'prompt-tools', repo: 'negative-lab', installs: 29876, trending: 2100, hot: 176, category: 'Prompt Engineering' },
  { id: 'seed-control', name: 'Seed Management', owner: 'consistency-ai', repo: 'seed-control', installs: 27654, trending: 1900, hot: 154, category: 'Image Generation' },
  { id: 'upscale-pro', name: 'Upscale Professional', owner: 'enhance-ai', repo: 'upscale-pro', installs: 25432, trending: 1700, hot: 143, category: 'Post-Processing' },
  { id: 'face-restore', name: 'Face Restoration', owner: 'portrait-fix', repo: 'face-restore', installs: 23156, trending: 1500, hot: 128, category: 'Post-Processing' },
  { id: 'style-transfer', name: 'Style Reference Kit', owner: 'style-labs', repo: 'style-transfer', installs: 21453, trending: 1400, hot: 112, category: 'Image Generation' },
];

// Supported agents for carousel
const supportedAgents = [
  { name: 'Claude', icon: 'C', color: '#FF6B35' },
  { name: 'GPT-4', icon: 'G', color: '#10A37F' },
  { name: 'Gemini', icon: 'G', color: '#4285F4' },
  { name: 'Llama', icon: 'L', color: '#6366F1' },
  { name: 'Mistral', icon: 'M', color: '#FF7000' },
  { name: 'Qwen', icon: 'Q', color: '#6B48FF' },
  { name: 'Cohere', icon: 'C', color: '#39594D' },
  { name: 'Perplexity', icon: 'P', color: '#20808D' },
  { name: 'Groq', icon: 'G', color: '#F55036' },
  { name: 'DeepSeek', icon: 'D', color: '#4D6BFE' },
];

// Documents content - Table of Contents
const documentTOC = [
  { id: 'introduction', title: 'Introduction', level: 1 },
  { id: 'core-philosophy', title: 'Core Philosophy', level: 1 },
  { id: 'generative-ecosystem', title: 'The Generative Ecosystem', level: 1 },
  { id: 'skill-domains', title: 'Core Skill Domains', level: 1 },
  { id: 'six-tiers', title: 'The Six Tiers', level: 1 },
  { id: 'workflow', title: 'Professional Workflow', level: 1 },
  { id: 'cinematic', title: 'Cinematic Protocol', level: 1 },
  { id: 'executive', title: 'Executive Portraiture', level: 1 },
  { id: 'mastery', title: 'Mastery Checklist', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
];

// ASCII Art SKILLS logo
const asciiSkillsLogo = `
███████╗██╗  ██╗███████╗██╗     ██╗     
██╔════╝██║  ██║██╔════╝██║     ██║     
███████╗███████║█████╗  ██║     ██║     
╚════██║██╔══██║██╔══╝  ██║     ██║     
███████║██║  ██║███████╗███████╗███████╗
╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
`;

// Main Navigation Component
function MainNavigation({ 
  mainView, 
  setMainView, 
  isMenuOpen, 
  setIsMenuOpen 
}: { 
  mainView: MainView; 
  setMainView: (view: MainView) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm border-b-2 border-white/10">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Title */}
          <button 
            onClick={() => setMainView('discovery')}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#FF3B00] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <h1 
                className="text-lg font-extrabold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
              >
                AI Visual Synthesis
              </h1>
              <p className="text-xs text-white/40 font-mono uppercase tracking-wider">
                Mastery Guide 2026
              </p>
            </div>
          </button>
          
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1 bg-white/5 p-1">
            <button
              onClick={() => setMainView('discovery')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                mainView === 'discovery' 
                  ? "bg-[#FF3B00] text-white" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Discovery</span>
            </button>
            <button
              onClick={() => setMainView('documents')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                mainView === 'documents' 
                  ? "bg-[#FF3B00] text-white" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </button>
            <button
              onClick={() => setMainView('directory')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                mainView === 'directory' 
                  ? "bg-[#FF3B00] text-white" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Directory</span>
            </button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/5"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

// Discovery View Component
function DiscoveryView({
  viewMode,
  setViewMode,
  copiedId,
  setCopiedId,
  selectedTier,
  setSelectedTier,
  selectedDomainInfo,
  setSelectedDomainInfo,
}: {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  copiedId: string | null;
  setCopiedId: (id: string | null) => void;
  selectedTier: number | null;
  setSelectedTier: (tier: number | null) => void;
  selectedDomainInfo: string | null;
  setSelectedDomainInfo: (id: string | null) => void;
}) {
  const { bookmarkedSkills, getSkillById, navigateToSkill } = useSkillStore();
  const tierLabels = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
  
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const bookmarkedSkillsList = bookmarkedSkills
    .map(id => getSkillById(id))
    .filter(Boolean);
  
  const getSkillsByTier = (tier: Tier) => {
    return skills.filter(skill => skill.tier === tier);
  };

  return (
    <main className="pt-20 md:pt-24 pb-12">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
        
        {/* Hero Section */}
        <section className="mb-12 md:mb-16">
          <div className="border-2 border-white/10 bg-[#141414] p-6 md:p-10">
            <div className="max-w-4xl">
              <Badge 
                variant="outline"
                className="font-mono text-xs border-[#FF3B00]/50 text-[#FF3B00] uppercase tracking-wider mb-4"
              >
                Think Periodic Table, Not Textbook
              </Badge>
              <h2 
                className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
              >
                Physics-First Visual Engineering
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                A comprehensive knowledge base for AI practitioners seeking production-grade 
                consistency through objective parameter control. Navigate skill domains, 
                discover relationships, and master the technical vocabulary of visual synthesis.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-[#FF3B00] text-white font-mono text-xs uppercase px-3 py-1">
                  8 DOMAINS
                </Badge>
                <Badge className="bg-[#00FF94] text-black font-mono text-xs uppercase px-3 py-1">
                  {skills.length} SKILLS
                </Badge>
                <Badge className="bg-white/10 text-white font-mono text-xs uppercase px-3 py-1">
                  6 TIERS
                </Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Navigation - Tiers */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-white/40" />
            <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider">
              Tiers of Visual Synthesis
            </h3>
            <span className="text-xs text-white/20 ml-2">- Click for details</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {sixTiers.map((tier) => (
              <button
                key={tier.tier}
                onClick={() => setSelectedTier(selectedTier === tier.tier ? null : tier.tier)}
                className={cn(
                  "p-3 bg-[#141414] border-2 transition-all text-left",
                  selectedTier === tier.tier 
                    ? "border-[#FF3B00] bg-[#FF3B00]/5" 
                    : "border-white/10 hover:border-white/30"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-white/40 uppercase">TIER {tierLabels[tier.tier]}</span>
                  {selectedTier === tier.tier && (
                    <Info className="w-3 h-3 text-[#FF3B00]" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white uppercase mt-1 line-clamp-1">
                  {tier.focus.split(' ').slice(0, 2).join(' ')}
                </h4>
              </button>
            ))}
          </div>
          
          {/* Tier Info Panel */}
          {selectedTier && (
            <div className="mt-4 border-2 border-[#FF3B00]/30 bg-[#141414] p-6 animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <h3 
                  className="text-xl font-extrabold uppercase tracking-tight"
                  style={{ color: tierDescriptions[selectedTier].color }}
                >
                  {tierDescriptions[selectedTier].title}
                </h3>
                <button
                  onClick={() => setSelectedTier(null)}
                  className="p-1 hover:bg-white/5 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-white/40 hover:text-white" />
                </button>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">
                {tierDescriptions[selectedTier].description}
              </p>
              <div className="mb-4">
                <h4 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                  Key Skills in This Tier
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getSkillsByTier(selectedTier as Tier).map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => navigateToSkill(skill.id)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-white/70 
                                 hover:text-white hover:border-white/30 transition-colors font-mono uppercase"
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className="font-mono uppercase">Requirement:</span>
                <span>{sixTiers[selectedTier - 1].requirements}</span>
              </div>
            </div>
          )}
        </section>
        
        {/* Domain Quick Nav with Info */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
              Quick Domain Access
            </span>
            <span className="text-xs text-white/20 ml-2">- Click for details</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomainInfo(selectedDomainInfo === domain.id ? null : domain.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 border-2 transition-all",
                  selectedDomainInfo === domain.id 
                    ? "border-white/30 bg-white/5" 
                    : "border-white/10 hover:border-white/20 bg-[#141414]"
                )}
              >
                <div style={{ color: domain.color }}>
                  {domainIcons[domain.id]}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                  {domain.shortName}
                </span>
              </button>
            ))}
          </div>
          
          {/* Domain Info Panel */}
          {selectedDomainInfo && (
            <div className="mt-4 border-2 border-white/20 bg-[#141414] p-6 animate-fade-in">
              {(() => {
                const domain = domains.find(d => d.id === selectedDomainInfo);
                if (!domain) return null;
                const domainSkills = skills.filter(s => s.domain === selectedDomainInfo);
                
                return (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 flex items-center justify-center border-2"
                          style={{ borderColor: domain.color, color: domain.color }}
                        >
                          {domainIcons[domain.id]}
                        </div>
                        <div>
                          <h3 
                            className="text-xl font-extrabold uppercase tracking-tight"
                            style={{ color: domain.color }}
                          >
                            {domain.name}
                          </h3>
                          <span className="font-mono text-xs text-white/40">
                            {domainSkills.length} SKILLS
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedDomainInfo(null)}
                        className="p-1 hover:bg-white/5 transition-colors"
                      >
                        <XCircle className="w-5 h-5 text-white/40 hover:text-white" />
                      </button>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed mb-4">
                      {domain.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                        Skills in This Domain
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {domainSkills.map((skill) => (
                          <button
                            key={skill.id}
                            onClick={() => navigateToSkill(skill.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 
                                       hover:border-white/30 transition-colors text-left"
                          >
                            <div 
                              className="w-1 h-6 flex-shrink-0"
                              style={{ backgroundColor: domain.color }}
                            />
                            <span className="text-xs text-white/80 font-bold uppercase truncate">
                              {skill.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tier Distribution */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-white/40 uppercase">Tier Distribution:</span>
                      {[1, 2, 3, 4, 5, 6].map(tier => {
                        const count = domainSkills.filter(s => s.tier === tier).length;
                        if (count === 0) return null;
                        return (
                          <Badge 
                            key={tier}
                            variant="outline"
                            className="font-mono text-[10px] border-white/20 text-white/60"
                          >
                            T{tierLabels[tier]}: {count}
                          </Badge>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </section>
        
        <Separator className="bg-white/10 my-8" />
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="domains" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-transparent border-b-2 border-white/10 rounded-none p-0 h-auto">
              <TabsTrigger 
                value="domains"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF3B00] data-[state=active]:bg-transparent font-mono text-xs uppercase tracking-wider px-4 py-3"
              >
                DOMAINS
              </TabsTrigger>
              <TabsTrigger 
                value="templates"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF3B00] data-[state=active]:bg-transparent font-mono text-xs uppercase tracking-wider px-4 py-3"
              >
                TEMPLATES
              </TabsTrigger>
              <TabsTrigger 
                value="matrix"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF3B00] data-[state=active]:bg-transparent font-mono text-xs uppercase tracking-wider px-4 py-3"
              >
                COMPETENCY
              </TabsTrigger>
              <TabsTrigger 
                value="bookmarks"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00FF94] data-[state=active]:bg-transparent font-mono text-xs uppercase tracking-wider px-4 py-3"
              >
                BOOKMARKS ({bookmarkedSkills.length})
              </TabsTrigger>
            </TabsList>
            
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === 'grid' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === 'list' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Domains Tab */}
          <TabsContent value="domains" className="mt-0">
            <div className="space-y-4">
              {domains.map((domain) => (
                <DomainCluster 
                  key={domain.id} 
                  domain={domain} 
                  variant={viewMode}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Templates Tab */}
          <TabsContent value="templates" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {masterClassTemplates.map((template, i) => (
                <div key={i} className="border-2 border-white/10 bg-[#141414]">
                  <div className="p-4 md:p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 
                        className="text-lg font-extrabold text-white uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
                      >
                        {template.name}
                      </h3>
                      <button
                        onClick={() => handleCopy(template.template, `template-${i}`)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#FF3B00] transition-colors"
                      >
                        {copiedId === `template-${i}` ? (
                          <>
                            <Check className="w-4 h-4 text-[#00FF94]" />
                            <span className="font-mono text-xs text-[#00FF94] uppercase">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-white/40" />
                            <span className="font-mono text-xs text-white/60 uppercase">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 bg-[#0A0A0A]">
                    <code className="block text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap break-all">
                      {template.template}
                    </code>
                  </div>
                  {template.physicsAnalysis && (
                    <div className="p-4 md:p-6 border-t border-white/10 bg-[#141414]/50">
                      <h4 className="font-mono text-xs text-[#00FF94] uppercase tracking-wider mb-2">
                        Physics Analysis
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {template.physicsAnalysis}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Competency Matrix Tab */}
          <TabsContent value="matrix" className="mt-0">
            <div className="border-2 border-white/10 bg-[#141414] overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-white/10">
                    <th className="text-left py-4 px-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="text-left py-4 px-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                      Beginner
                    </th>
                    <th className="text-left py-4 px-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                      Intermediate
                    </th>
                    <th className="text-left py-4 px-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                      Advanced
                    </th>
                    <th className="text-left py-4 px-4 font-mono text-xs text-[#00FF94] uppercase tracking-wider">
                      Architect
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competencyMatrix.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4 font-bold text-white uppercase">
                        {row.domain}
                      </td>
                      <td className="py-4 px-4 text-white/60">
                        {row.beginner}
                      </td>
                      <td className="py-4 px-4 text-white/60">
                        {row.intermediate}
                      </td>
                      <td className="py-4 px-4 text-white/60">
                        {row.advanced}
                      </td>
                      <td className="py-4 px-4 text-[#00FF94]">
                        {row.architect}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="mt-0">
            {bookmarkedSkillsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedSkillsList.map((skill) => skill && (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="border-2 border-white/10 bg-[#141414] p-12 text-center">
                <Bookmark className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white/60 uppercase mb-2">
                  No Bookmarks Yet
                </h3>
                <p className="text-sm text-white/40">
                  Bookmark skills to save them for quick access
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Footer Quote */}
        <section className="mt-16 border-2 border-white/10 bg-[#141414] p-6 md:p-8">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-4">
              "The amateur hopes for a pleasing result; the professional dictates the calculation of light."
            </p>
            <footer className="font-mono text-xs text-white/40 uppercase tracking-wider">
              — Physics-First Visual Engineering
            </footer>
          </blockquote>
        </section>
      </div>
    </main>
  );
}

// Documents View Component
function DocumentsView({
  activeSection,
  setActiveSection,
  copiedId,
  setCopiedId,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
  copiedId: string | null;
  setCopiedId: (id: string | null) => void;
}) {
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="pt-20 md:pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <div className="border-2 border-white/10 bg-[#141414] p-4">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {documentTOC.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm transition-colors font-mono",
                        activeSection === item.id
                          ? "text-[#FF3B00] bg-white/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-4 border-2 border-white/10 bg-[#141414] p-4">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCopy(window.location.href, 'share-link')}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/30 transition-colors"
                  >
                    {copiedId === 'share-link' ? (
                      <>
                        <Check className="w-4 h-4 text-[#00FF94]" />
                        <span className="font-mono text-xs text-[#00FF94]">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-mono text-xs">Share Document</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="font-mono text-xs">Print / PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="border-2 border-white/10 bg-[#141414]">
              {/* Document Header */}
              <div className="p-6 md:p-8 border-b border-white/10">
                <Badge className="bg-[#FF3B00] text-white font-mono text-xs uppercase mb-4">
                  Official Documentation
                </Badge>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-2">
                  Professional AI Creator Skills
                </h1>
                <p className="text-white/60">
                  The Complete Guide to Physics-First Visual Synthesis
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-white/40 font-mono">
                  <span>Version 2026</span>
                  <span>•</span>
                  <span>Last Updated: January 2025</span>
                </div>
              </div>
              
              {/* Document Body */}
              <div className="p-6 md:p-8 prose prose-invert max-w-none">
                {/* Introduction Section */}
                <section id="introduction" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#FF3B00]" />
                    Introduction: The Evolution of Generative Literacy
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    The era of "clickbait prompt engineering" has concluded. In high-stakes creative environments—where 
                    consistency and physical accuracy are the benchmarks for commercial viability—the reliance on aesthetic 
                    adjectives has been replaced by a rigorous reconstruction of real-world physics.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    This document serves as a strategic roadmap for transitioning from a casual user to a 
                    <strong className="text-white"> Technical Director of AI-generated assets</strong>, capable of 
                    engineering high-fidelity visual synthesis with surgical precision.
                  </p>
                </section>
                
                {/* Core Philosophy Section */}
                <section id="core-philosophy" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#FF3B00]" />
                    Core Philosophy
                  </h2>
                  
                  <h3 className="text-lg font-bold text-white mt-6 mb-3">From Rendering to Photographing</h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    The strategic transition from <strong className="text-white">"rendering a scene"</strong> to 
                    <strong className="text-white">"photographing one"</strong> is the defining threshold between 
                    amateur AI generation and high-stakes Visual Engineering.
                  </p>
                  
                  <h3 className="text-lg font-bold text-white mt-6 mb-3">The Physics-First Mindset</h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    Central to this transition is the <strong className="text-white">"Physics-First"</strong> mindset. 
                    While amateur approaches rely on subjective trial-and-error using terms like "cinematic" or 
                    "hyperrealistic," the professional Architect treats the AI as a physics simulator.
                  </p>
                  
                  <h3 className="text-lg font-bold text-white mt-6 mb-3">Quiet Luxury: Engineering Status</h3>
                  <p className="text-white/70 leading-relaxed">
                    This framework is anchored in the concept of <strong className="text-white">"Quiet Luxury"</strong>: 
                    the engineering of elite executive presence and high-trust headshots.
                  </p>
                </section>
                
                {/* Generative Ecosystem Section */}
                <section id="generative-ecosystem" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#FF3B00]" />
                    The Generative Ecosystem
                  </h2>
                  
                  <h3 className="text-lg font-bold text-white mt-6 mb-3">Foundation Platforms</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-white/10">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left py-3 px-4 font-mono text-xs text-white/40 uppercase">Platform</th>
                          <th className="text-left py-3 px-4 font-mono text-xs text-white/40 uppercase">Key Strengths</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-bold">Midjourney v6.1/v7</td>
                          <td className="py-3 px-4 text-white/70">Gold standard for cinematic output</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-bold">Stable Diffusion / SDXL</td>
                          <td className="py-3 px-4 text-white/70">Technical leader for open-source control</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-bold">DALL-E 3</td>
                          <td className="py-3 px-4 text-white/70">Most intuitive semantic model</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                
                {/* Skill Domains Section */}
                <section id="skill-domains" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#FF3B00]" />
                    Core Skill Domains
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {domains.map((domain) => (
                      <div key={domain.id} className="border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div style={{ color: domain.color }}>{domainIcons[domain.id]}</div>
                          <h3 className="font-bold text-white">{domain.name}</h3>
                        </div>
                        <p className="text-sm text-white/60">{domain.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Six Tiers Section */}
                <section id="six-tiers" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#FF3B00]" />
                    The Six Tiers of Visual Synthesis
                  </h2>
                  
                  <div className="space-y-3">
                    {sixTiers.map((tier, index) => (
                      <div key={tier.tier} className="border border-white/10 bg-white/5 p-4 flex items-start gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#FF3B00] text-white font-bold font-mono">
                          {['I', 'II', 'III', 'IV', 'V', 'VI'][index]}
                        </div>
                        <div>
                          <h3 className="font-bold text-white mb-1">{tier.focus}</h3>
                          <p className="text-sm text-white/60">{tier.requirements}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Workflow Section */}
                <section id="workflow" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#FF3B00]" />
                    Professional Execution Workflow
                  </h2>
                  
                  <div className="space-y-4">
                    {['Pre-Production', 'Physics Specification', 'Platform Selection', 'Prompt Construction', 'Iterative Refinement'].map((phase, i) => (
                      <div key={phase} className="border border-white/10 bg-white/5 p-4">
                        <h3 className="font-bold text-white mb-2">Phase {i + 1}: {phase}</h3>
                        <p className="text-sm text-white/60">
                          {i === 0 && 'Define the physical scenario with precision: environment, atmospheric density, subject placement.'}
                          {i === 1 && 'Determine the technical "Optical Path": lighting ratios, Kelvin temperatures, lens selection.'}
                          {i === 2 && 'Choose the model tier based on control requirements.'}
                          {i === 3 && 'Apply the Scaffold Method or Universal Blueprint, integrating all specifications.'}
                          {i === 4 && 'Adjust specific physics parameters rather than adding adjectives.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Cinematic Section */}
                <section id="cinematic" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Film className="w-5 h-5 text-[#FF3B00]" />
                    Cinematic Anamorphic & Lighting Protocol
                  </h2>
                  
                  <h3 className="text-lg font-bold text-white mt-6 mb-3">The Three Core Pillars</h3>
                  <div className="space-y-2">
                    {['Optical Accuracy - Emulating physical behavior of light through specialized glass', 
                      'Lighting Intent - Utilizing classical lighting profiles for emotional resonance',
                      'Prompt Precision - Moving from buzzwords to machine-readable technical properties'
                    ].map((pillar, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 flex items-center justify-center bg-[#FF3B00] text-white font-bold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-white/70">{pillar}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Executive Section */}
                <section id="executive" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#FF3B00]" />
                    Executive Portraiture & Status Signaling
                  </h2>
                  
                  <h3 className="text-lg font-bold text-white mt-6 mb-3">Lighting Architectures for Authority</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-white/10">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left py-3 px-4 font-mono text-xs text-white/40 uppercase">Pattern</th>
                          <th className="text-left py-3 px-4 font-mono text-xs text-white/40 uppercase">Signal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-bold">Rembrandt</td>
                          <td className="py-3 px-4 text-white/70">Intellect, gravitas</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-bold">Loop</td>
                          <td className="py-3 px-4 text-white/70">Approachability, honesty</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-bold">Butterfly</td>
                          <td className="py-3 px-4 text-white/70">Beauty, confidence</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-bold">Split</td>
                          <td className="py-3 px-4 text-white/70">Intensity, power</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                
                {/* Mastery Section */}
                <section id="mastery" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#00FF94]" />
                    The Mastery Checklist
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Optical Consistency', 'Tactile Truth', 'Lighting Geometry', 'Anatomical Correctness', 'Editorial Framing', 'Technical Specifications'].map((category) => (
                      <div key={category} className="border border-white/10 bg-white/5 p-4">
                        <h3 className="font-bold text-white mb-2">{category}</h3>
                        <ul className="text-sm text-white/60 space-y-1">
                          <li className="flex items-center gap-2">
                            <div className="w-4 h-4 border border-white/20" />
                            <span>Review specifications</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-4 h-4 border border-white/20" />
                            <span>Validate output</span>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Installation Section */}
                <section id="installation" className="mb-12">
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#FF3B00]" />
                    Installation
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Quick Start</h3>
                      <p className="text-white/70 mb-4">
                        This skill is designed to be used with AI agents that support the skills ecosystem. 
                        Install it directly to your agent's skill directory.
                      </p>
                      
                      {/* Code Block */}
                      <div className="relative border-2 border-white/10 bg-[#0A0A0A]">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                          <span className="font-mono text-xs text-white/40">terminal</span>
                          <button
                            onClick={() => handleCopy('npx skills add ai-mastery/visual-synthesis', 'install-cmd')}
                            className="flex items-center gap-1 px-2 py-1 hover:bg-white/5 transition-colors"
                          >
                            {copiedId === 'install-cmd' ? (
                              <Check className="w-4 h-4 text-[#00FF94]" />
                            ) : (
                              <Copy className="w-4 h-4 text-white/40" />
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-sm font-mono text-[#00FF94] overflow-x-auto">
                          <code>$ npx skills add ai-mastery/visual-synthesis</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Manual Installation</h3>
                      <p className="text-white/70 mb-4">
                        You can also manually add this skill to your project:
                      </p>
                      
                      <div className="relative border-2 border-white/10 bg-[#0A0A0A]">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                          <span className="font-mono text-xs text-white/40">terminal</span>
                          <button
                            onClick={() => handleCopy(`mkdir -p .skills
curl -o .skills/visual-synthesis.md https://skills.sh/ai-mastery/visual-synthesis/raw`, 'manual-cmd')}
                            className="flex items-center gap-1 px-2 py-1 hover:bg-white/5 transition-colors"
                          >
                            {copiedId === 'manual-cmd' ? (
                              <Check className="w-4 h-4 text-[#00FF94]" />
                            ) : (
                              <Copy className="w-4 h-4 text-white/40" />
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-sm font-mono text-[#00FF94] overflow-x-auto">
                          <code>{`$ mkdir -p .skills
$ curl -o .skills/visual-synthesis.md https://skills.sh/ai-mastery/visual-synthesis/raw`}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Usage with Agents</h3>
                      <p className="text-white/70 mb-4">
                        Once installed, your AI agent will automatically have access to the knowledge base:
                      </p>
                      
                      <div className="relative border-2 border-white/10 bg-[#0A0A0A]">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                          <span className="font-mono text-xs text-white/40">example prompt</span>
                        </div>
                        <pre className="p-4 text-sm font-mono text-white/80 overflow-x-auto">
                          <code>{`"Generate a professional executive portrait using Rembrandt lighting 
with 4:1 ratio, 85mm lens at f/1.4, with subsurface scattering 
for realistic skin texture."`}</code>
                        </pre>
                      </div>
                    </div>
                    
                    {/* Requirements */}
                    <div className="border-2 border-white/10 bg-white/5 p-4">
                      <h3 className="text-lg font-bold text-white mb-3">Requirements</h3>
                      <ul className="text-sm text-white/70 space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#00FF94]" />
                          <span>Node.js 18+ (for npx skills)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#00FF94]" />
                          <span>Compatible AI agent (Claude, GPT-4, etc.)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#00FF94]" />
                          <span>Image generation platform access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Directory View Component (skills.sh-style)
function DirectoryView({
  directoryTab,
  setDirectoryTab,
  directorySearch,
  setDirectorySearch,
  searchFocused,
  setSearchFocused,
  copiedId,
  setCopiedId,
  carouselRef,
}: {
  directoryTab: DirectoryTab;
  setDirectoryTab: (tab: DirectoryTab) => void;
  directorySearch: string;
  setDirectorySearch: (search: string) => void;
  searchFocused: boolean;
  setSearchFocused: (focused: boolean) => void;
  copiedId: string | null;
  setCopiedId: (id: string | null) => void;
  carouselRef: React.RefObject<HTMLDivElement | null>;
}) {
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  // Filter skills for directory based on search and tab
  const filteredDirectorySkills = useMemo(() => {
    let filtered = directorySkills;
    
    if (directorySearch) {
      const query = directorySearch.toLowerCase();
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(query) ||
        skill.owner.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query)
      );
    }
    
    // Sort based on tab
    if (directoryTab === 'all-time') {
      filtered = [...filtered].sort((a, b) => b.installs - a.installs);
    } else if (directoryTab === 'trending') {
      filtered = [...filtered].sort((a, b) => b.trending - a.trending);
    } else if (directoryTab === 'hot') {
      filtered = [...filtered].sort((a, b) => b.hot - a.hot);
    }
    
    return filtered;
  }, [directorySearch, directoryTab]);
  
  // Scroll carousel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="pt-20 md:pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="border-2 border-white/10 bg-[#141414] p-8 md:p-12 text-center">
            {/* ASCII Logo */}
            <pre className="text-[#00FF94] text-xs md:text-sm font-mono mb-4 leading-tight overflow-x-auto">
              {asciiSkillsLogo}
            </pre>
            
            {/* Blinking Cursor */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-[#00FF94] font-mono">_</span>
              <span className="w-2 h-5 bg-[#00FF94] animate-pulse" />
            </div>
            
            {/* Tagline */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
              The Open Agent Skills Ecosystem
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
              Discover, install, and share AI agent skills. Build powerful agent workflows with 
              community-curated knowledge packages.
            </p>
            
            {/* Try it now command */}
            <div className="max-w-lg mx-auto">
              <div className="relative border-2 border-white/20 bg-[#0A0A0A]">
                <div className="flex items-center px-4 py-3">
                  <span className="text-white/40 font-mono text-sm mr-2">$</span>
                  <code className="flex-1 text-[#00FF94] font-mono text-sm">
                    npx skills add {'<owner/repo>'}
                  </code>
                  <button
                    onClick={() => handleCopy('npx skills add <owner/repo>', 'hero-cmd')}
                    className="ml-2 p-2 hover:bg-white/5 transition-colors"
                  >
                    {copiedId === 'hero-cmd' ? (
                      <Check className="w-5 h-5 text-[#00FF94]" />
                    ) : (
                      <Copy className="w-5 h-5 text-white/40" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Supported Agents Carousel */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono text-xs text-white/40 uppercase tracking-wider">
              Supported Agents
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollCarousel('left')}
                className="p-1 border border-white/10 hover:border-white/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white/60" />
              </button>
              <button 
                onClick={() => scrollCarousel('right')}
                className="p-1 border border-white/10 hover:border-white/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white/60 rotate-180" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            
            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto py-2 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {supportedAgents.map((agent) => (
                <div 
                  key={agent.name}
                  className="flex-shrink-0 w-28 border-2 border-white/10 bg-[#141414] p-4 hover:border-white/30 transition-all"
                >
                  <div 
                    className="w-10 h-10 mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.icon}
                  </div>
                  <p className="text-center text-xs text-white/70 font-mono truncate">
                    {agent.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Skills Leaderboard */}
        <section>
          <div className="border-2 border-white/10 bg-[#141414]">
            {/* Leaderboard Header */}
            <div className="p-4 md:p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                  Skills Leaderboard
                </h2>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    id="directory-search"
                    type="text"
                    placeholder="Search skills... (press /)"
                    value={directorySearch}
                    onChange={(e) => setDirectorySearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-[#0A0A0A] border border-white/10 text-white text-sm font-mono
                               focus:border-[#FF3B00] focus:outline-none transition-colors"
                  />
                  <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-1.5 py-0.5 bg-white/10 text-white/40 text-xs font-mono">
                    /
                  </kbd>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-1 mt-4">
                {[
                  { id: 'all-time', label: 'All Time', icon: <TrendingUp className="w-4 h-4" /> },
                  { id: 'trending', label: 'Trending (24h)', icon: <ArrowUpRight className="w-4 h-4" /> },
                  { id: 'hot', label: 'Hot', icon: <Flame className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDirectoryTab(tab.id as DirectoryTab)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                      directoryTab === tab.id
                        ? "bg-[#FF3B00] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left py-3 px-4 font-mono text-xs text-white/40 uppercase tracking-wider w-16">
                      Rank
                    </th>
                    <th className="text-left py-3 px-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                      Skill
                    </th>
                    <th className="text-left py-3 px-4 font-mono text-xs text-white/40 uppercase tracking-wider hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-right py-3 px-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                      {directoryTab === 'all-time' && 'Installs'}
                      {directoryTab === 'trending' && '24h Growth'}
                      {directoryTab === 'hot' && 'Score'}
                    </th>
                    <th className="text-center py-3 px-4 font-mono text-xs text-white/40 uppercase tracking-wider w-24">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDirectorySkills.map((skill, index) => (
                    <tr 
                      key={skill.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className={cn(
                          "w-8 h-8 flex items-center justify-center font-bold font-mono text-sm",
                          index === 0 && "bg-[#FFD700] text-black",
                          index === 1 && "bg-[#C0C0C0] text-black",
                          index === 2 && "bg-[#CD7F32] text-black",
                          index > 2 && "bg-white/10 text-white/60"
                        )}>
                          #{index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-bold text-white">{skill.name}</div>
                          <div className="text-xs text-white/40 font-mono">
                            {skill.owner}/{skill.repo}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <Badge variant="outline" className="font-mono text-xs border-white/20 text-white/60">
                          {skill.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-sm">
                        {directoryTab === 'all-time' && (
                          <span className="text-white">
                            {skill.installs.toLocaleString()}
                          </span>
                        )}
                        {directoryTab === 'trending' && (
                          <span className="text-[#00FF94]">
                            +{skill.trending.toLocaleString()}
                          </span>
                        )}
                        {directoryTab === 'hot' && (
                          <span className="text-[#FF3B00]">
                            {skill.hot}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleCopy(`npx skills add ${skill.owner}/${skill.repo}`, `skill-${skill.id}`)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FF3B00] text-white font-mono text-xs uppercase hover:bg-[#FF3B00]/80 transition-colors"
                        >
                          {copiedId === `skill-${skill.id}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Empty State */}
            {filteredDirectorySkills.length === 0 && (
              <div className="p-12 text-center">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white/60 uppercase mb-2">
                  No Skills Found
                </h3>
                <p className="text-sm text-white/40">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Footer CTA */}
        <section className="mt-12">
          <div className="border-2 border-[#FF3B00]/30 bg-[#FF3B00]/5 p-8 text-center">
            <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight mb-4">
              Create Your Own Skill
            </h3>
            <p className="text-white/60 max-w-xl mx-auto mb-6">
              Package your AI workflows and share them with the community. Skills are just 
              structured markdown files that encode knowledge for AI agents.
            </p>
            <button
              onClick={() => handleCopy('npx skills create my-skill', 'create-skill')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF3B00] text-white font-mono text-sm uppercase hover:bg-[#FF3B00]/80 transition-colors"
            >
              {copiedId === 'create-skill' ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Command Copied!</span>
                </>
              ) : (
                <>
                  <Terminal className="w-5 h-5" />
                  <span>Get Started</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Home() {
  // Main view state
  const [mainView, setMainView] = useState<MainView>('discovery');
  
  // Discovery view states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedDomainInfo, setSelectedDomainInfo] = useState<string | null>(null);
  
  // Documents view states
  const [activeSection, setActiveSection] = useState('introduction');
  
  // Directory view states
  const [directoryTab, setDirectoryTab] = useState<DirectoryTab>('all-time');
  const [directorySearch, setDirectorySearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Keyboard shortcut for directory search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mainView === 'directory' && e.key === '/' && !searchFocused) {
        e.preventDefault();
        document.getElementById('directory-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mainView, searchFocused]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Main Navigation */}
      <MainNavigation 
        mainView={mainView} 
        setMainView={setMainView} 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      {/* View Router */}
      {mainView === 'discovery' && (
        <DiscoveryView
          viewMode={viewMode}
          setViewMode={setViewMode}
          copiedId={copiedId}
          setCopiedId={setCopiedId}
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
          selectedDomainInfo={selectedDomainInfo}
          setSelectedDomainInfo={setSelectedDomainInfo}
        />
      )}
      {mainView === 'documents' && (
        <DocumentsView
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          copiedId={copiedId}
          setCopiedId={setCopiedId}
        />
      )}
      {mainView === 'directory' && (
        <DirectoryView
          directoryTab={directoryTab}
          setDirectoryTab={setDirectoryTab}
          directorySearch={directorySearch}
          setDirectorySearch={setDirectorySearch}
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
          copiedId={copiedId}
          setCopiedId={setCopiedId}
          carouselRef={carouselRef}
        />
      )}
      
      {/* Skill Panel (Side Panel) */}
      <SkillPanel />
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A] md:hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="font-bold text-white uppercase">Navigation</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[calc(100vh-60px)] overflow-y-auto">
            <div className="p-4 space-y-4">
              {domains.map((domain) => (
                <DomainCluster 
                  key={domain.id} 
                  domain={domain} 
                  initialExpanded={false}
                  variant="list"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
