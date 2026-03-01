'use client';

import { Domain, getSkillsByDomain, SkillNode } from '@/data/skills';
import { useSkillStore } from '@/store/skillStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { SkillGridCard, SkillCard } from './SkillCard';
import { ChevronDown, ChevronRight, Lightbulb, Camera, Palette, Cpu, Zap, Film, Wand2, Bot } from 'lucide-react';
import { useState } from 'react';

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

interface DomainClusterProps {
  domain: Domain;
  initialExpanded?: boolean;
  variant?: 'grid' | 'list';
}

export function DomainCluster({ domain, initialExpanded = true, variant = 'grid' }: DomainClusterProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  
  const domainSkills = getSkillsByDomain(domain.id);
  const tierLabels = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
  
  return (
    <div className={cn(
      "border-2 transition-all duration-300",
      "border-white/10 hover:border-white/20"
    )}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-5 flex items-center justify-between bg-[#141414] group"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 flex items-center justify-center border-2"
            style={{ 
              borderColor: domain.color,
              color: domain.color 
            }}
          >
            {domainIcons[domain.id]}
          </div>
          <div className="text-left">
            <h2 
              className="text-lg md:text-xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
            >
              {domain.name}
            </h2>
            <p className="text-xs text-white/40 font-mono uppercase tracking-wider mt-0.5">
              {domainSkills.length} SKILLS
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Skill Tier Indicators */}
          <div className="hidden md:flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map(tier => {
              const count = domainSkills.filter(s => s.tier === tier).length;
              if (count === 0) return null;
              return (
                <Badge 
                  key={tier}
                  variant="outline"
                  className="font-mono text-[10px] px-1.5 py-0 border-white/10 text-white/40"
                >
                  T{tierLabels[tier]}:{count}
                </Badge>
              );
            })}
          </div>
          
          <div 
            className="p-2 transition-transform duration-200"
            style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </div>
        </div>
      </button>
      
      {/* Description */}
      <div className="px-4 md:px-5 py-3 bg-[#0A0A0A] border-t border-white/5">
        <p className="text-sm text-white/60 leading-relaxed">
          {domain.description}
        </p>
      </div>
      
      {/* Skills Grid/List */}
      <div 
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {variant === 'grid' ? (
          <div className="p-4 md:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-[#0A0A0A]">
            {domainSkills.map((skill) => (
              <SkillGridCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="p-4 md:p-5 space-y-3 bg-[#0A0A0A]">
            {domainSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Compact domain badge for navigation
interface DomainBadgeProps {
  domain: Domain;
  isActive?: boolean;
  onClick?: () => void;
}

export function DomainBadge({ domain, isActive, onClick }: DomainBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 transition-colors",
        isActive 
          ? "bg-white/10 border-b-2" 
          : "hover:bg-white/5"
      )}
      style={{ borderColor: isActive ? domain.color : 'transparent' }}
    >
      <div style={{ color: domain.color }}>
        {domainIcons[domain.id]}
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-white/60">
        {domain.shortName}
      </span>
    </button>
  );
}
