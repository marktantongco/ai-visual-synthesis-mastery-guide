'use client';

import { SkillNode } from '@/data/skills';
import { useSkillStore } from '@/store/skillStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Eye, ChevronRight } from 'lucide-react';

interface SkillCardProps {
  skill: SkillNode;
  compact?: boolean;
}

export function SkillCard({ skill, compact = false }: SkillCardProps) {
  const { navigateToSkill, visitedSkills, bookmarkedSkills, toggleBookmark } = useSkillStore();
  
  const isVisited = visitedSkills.includes(skill.id);
  const isBookmarked = bookmarkedSkills.includes(skill.id);
  
  const tierLabels = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
  
  const handleClick = () => {
    navigateToSkill(skill.id);
  };
  
  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(skill.id);
  };
  
  if (compact) {
    return (
      <button
        onClick={handleClick}
        className="group relative w-full p-2 bg-[#141414] border-2 border-white/10 
                   hover:border-[#FF3B00] hover:bg-[#1a1a1a] transition-all duration-200
                   text-left"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-white/60 uppercase tracking-wider">
            T{tierLabels[skill.tier]}
          </span>
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-[#FF3B00] transition-colors" />
        </div>
        <h4 className="text-sm font-bold text-white mt-1 uppercase tracking-tight">
          {skill.name}
        </h4>
      </button>
    );
  }
  
  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative cursor-pointer",
        "bg-[#141414] border-2 border-white/10",
        "hover:border-[#FF3B00] hover:bg-[#1a1a1a]",
        "transition-all duration-200",
        "p-4 md:p-5",
        isVisited && "border-[#00FF94]/30"
      )}
    >
      {/* Tier Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline"
            className="font-mono text-[10px] px-2 py-0.5 border-white/20 text-white/60 uppercase tracking-wider"
          >
            TIER {tierLabels[skill.tier]}
          </Badge>
          {isVisited && (
            <Eye className="w-3 h-3 text-[#00FF94]" />
          )}
        </div>
        
        <button
          onClick={handleBookmark}
          className={cn(
            "transition-colors",
            isBookmarked ? "text-[#FF3B00]" : "text-white/20 hover:text-white/60"
          )}
        >
          <Bookmark className="w-4 h-4" fill={isBookmarked ? "#FF3B00" : "none"} />
        </button>
      </div>
      
      {/* Skill Name */}
      <h3 className="text-base md:text-lg font-extrabold text-white uppercase tracking-tight mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}>
        {skill.name}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4">
        {skill.description}
      </p>
      
      {/* Domain Indicator */}
      <div 
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: skill.color }}
      />
      
      {/* Stats Footer */}
      <div className="flex items-center gap-4 pt-3 border-t border-white/10">
        <span className="font-mono text-xs text-white/40">
          {skill.subSkills.length} SUB-SKILLS
        </span>
        <span className="font-mono text-xs text-white/40">
          {skill.relatedSkills.length} RELATED
        </span>
      </div>
      
      {/* Hover Arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-5 h-5 text-[#FF3B00]" />
      </div>
    </div>
  );
}

// Grid Card for Periodic Table View
export function SkillGridCard({ skill }: SkillCardProps) {
  const { navigateToSkill, visitedSkills } = useSkillStore();
  const isVisited = visitedSkills.includes(skill.id);
  
  const tierLabels = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
  
  return (
    <div
      onClick={() => navigateToSkill(skill.id)}
      className={cn(
        "group relative cursor-pointer aspect-square",
        "bg-[#141414] border-2",
        "hover:scale-105 hover:z-10",
        "transition-all duration-200",
        "flex flex-col justify-between p-3",
        isVisited ? "border-[#00FF94]/40" : "border-white/10",
        "hover:border-[#FF3B00]"
      )}
    >
      {/* Domain Color Strip */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: skill.color }}
      />
      
      {/* Tier Number */}
      <span className="font-mono text-[10px] text-white/40 uppercase">
        T{tierLabels[skill.tier]}
      </span>
      
      {/* Skill Name */}
      <h4 className="text-xs md:text-sm font-bold text-white uppercase leading-tight line-clamp-2"
          style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}>
        {skill.name}
      </h4>
      
      {/* Sub-skill Count */}
      <span className="font-mono text-[10px] text-white/30">
        {skill.subSkills.length}
      </span>
      
      {/* Visited Indicator */}
      {isVisited && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00FF94]" />
      )}
    </div>
  );
}
