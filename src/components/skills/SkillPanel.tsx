'use client';

import { useSkillStore } from '@/store/skillStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, Bookmark, ArrowLeft, ArrowRight, Copy, Check,
  Lightbulb, Zap, Camera, Palette, Cpu, Film, Wand2, Bot
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { SkillCard } from './SkillCard';

const domainIcons: Record<string, React.ReactNode> = {
  'prompt-engineering': <Lightbulb className="w-4 h-4" />,
  'optical-physics': <Camera className="w-4 h-4" />,
  'photographic-literacy': <Palette className="w-4 h-4" />,
  'material-science': <Cpu className="w-4 h-4" />,
  'identity-consistency': <Zap className="w-4 h-4" />,
  'anamorphic-cinematic': <Film className="w-4 h-4" />,
  'post-processing': <Wand2 className="w-4 h-4" />,
  'agent-orchestration': <Bot className="w-4 h-4" />,
};

const tierLabels = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
const masteryLabels = {
  beginner: { label: 'BEGINNER', color: 'text-white/60' },
  intermediate: { label: 'INTERMEDIATE', color: 'text-yellow-400' },
  advanced: { label: 'ADVANCED', color: 'text-[#FF3B00]' },
  architect: { label: 'ARCHITECT', color: 'text-[#00FF94]' },
};

export function SkillPanel() {
  const { 
    selectedSkill, 
    isPanelOpen, 
    selectSkill,
    toggleBookmark,
    bookmarkedSkills,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    getSkillById,
    getDomainById
  } = useSkillStore();
  
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top when skill changes
  useEffect(() => {
    if (scrollContainerRef.current && selectedSkill) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedSkill?.id]);
  
  if (!isPanelOpen || !selectedSkill) return null;
  
  const isBookmarked = bookmarkedSkills.includes(selectedSkill.id);
  const domain = getDomainById(selectedSkill.domain);
  const relatedSkills = selectedSkill.relatedSkills
    .map(id => getSkillById(id))
    .filter(Boolean);
  const dependencies = selectedSkill.dependencies
    .map(id => getSkillById(id))
    .filter(Boolean);
  
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };
  
  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#0A0A0A] border-l-2 border-white/10 z-50 flex flex-col animate-slide-in">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b-2 border-white/10 bg-[#141414]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => selectSkill(null)}
            className="p-2 hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 text-white/60 hover:text-white" />
          </button>
          
          <div className="flex items-center gap-1">
            <button
              onClick={goBack}
              disabled={!canGoBack()}
              className={cn(
                "p-1.5 transition-colors",
                canGoBack() ? "hover:bg-white/5 text-white/60 hover:text-white" : "text-white/20"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goForward}
              disabled={!canGoForward()}
              className={cn(
                "p-1.5 transition-colors",
                canGoForward() ? "hover:bg-white/5 text-white/60 hover:text-white" : "text-white/20"
              )}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline"
            className="font-mono text-xs border-white/20 text-white/60 uppercase"
          >
            TIER {tierLabels[selectedSkill.tier]}
          </Badge>
          <Badge 
            variant="outline"
            className={cn(
              "font-mono text-xs uppercase",
              selectedSkill.color === '#FF3B00' ? "border-[#FF3B00]/50 text-[#FF3B00]" : "border-[#00FF94]/50 text-[#00FF94]"
            )}
          >
            {masteryLabels[selectedSkill.masteryLevel].label}
          </Badge>
        </div>
      </div>
      
      {/* Content - Scrollable */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="p-6 pb-12">
          {/* Domain Tag */}
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-6 h-6 flex items-center justify-center"
              style={{ color: selectedSkill.color }}
            >
              {domainIcons[selectedSkill.domain]}
            </div>
            <span 
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: selectedSkill.color }}
            >
              {domain?.name}
            </span>
          </div>
          
          {/* Title */}
          <h2 
            className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
          >
            {selectedSkill.name}
          </h2>
          
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(selectedSkill.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 mb-6 transition-colors",
              isBookmarked 
                ? "bg-[#FF3B00]/10 text-[#FF3B00]" 
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "#FF3B00" : "none"} />
            <span className="font-mono text-xs uppercase">
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </span>
          </button>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
              Overview
            </h3>
            <p className="text-white/80 leading-relaxed">
              {selectedSkill.description}
            </p>
          </div>
          
          <Separator className="bg-white/10 my-6" />
          
          {/* Sub-skills */}
          <div className="mb-6">
            <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
              Sub-skills ({selectedSkill.subSkills.length})
            </h3>
            <div className="space-y-3">
              {selectedSkill.subSkills.map((sub) => (
                <div key={sub.id} className="p-3 bg-[#141414] border border-white/5">
                  <h4 className="text-sm font-bold text-white uppercase mb-1">
                    {sub.name}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {sub.description}
                  </p>
                  {sub.example && (
                    <code className="mt-2 block text-xs text-[#00FF94] font-mono bg-black/30 p-2 break-all">
                      {sub.example}
                    </code>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Technical Specifications */}
          {selectedSkill.technicalSpecs && selectedSkill.technicalSpecs.length > 0 && (
            <>
              <Separator className="bg-white/10 my-6" />
              <div className="mb-6">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                  Technical Specifications
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-2 font-mono text-xs text-white/40 uppercase">Parameter</th>
                        <th className="text-left py-2 px-2 font-mono text-xs text-white/40 uppercase">Value</th>
                        <th className="text-left py-2 px-2 font-mono text-xs text-white/40 uppercase">Effect</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSkill.technicalSpecs.map((spec, i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-2 px-2 text-white/80 font-mono">{spec.parameter}</td>
                          <td className="py-2 px-2 text-[#FF3B00] font-mono">{spec.value}</td>
                          <td className="py-2 px-2 text-white/60">{spec.effect}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          
          {/* Prompt Templates */}
          {selectedSkill.promptTemplates && selectedSkill.promptTemplates.length > 0 && (
            <>
              <Separator className="bg-white/10 my-6" />
              <div className="mb-6">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                  Prompt Templates
                </h3>
                <div className="space-y-3">
                  {selectedSkill.promptTemplates.map((template, i) => (
                    <div key={i} className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-[#00FF94] uppercase">
                          {template.name}
                        </span>
                        <button
                          onClick={() => handleCopy(template.template, `template-${i}`)}
                          className="p-1 hover:bg-white/5 transition-colors"
                        >
                          {copiedTemplate === `template-${i}` ? (
                            <Check className="w-4 h-4 text-[#00FF94]" />
                          ) : (
                            <Copy className="w-4 h-4 text-white/40 hover:text-white" />
                          )}
                        </button>
                      </div>
                      <code className="block text-xs text-white/80 font-mono bg-[#141414] p-3 border border-white/5 leading-relaxed break-all">
                        {template.template}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Dependencies */}
          {dependencies.length > 0 && (
            <>
              <Separator className="bg-white/10 my-6" />
              <div className="mb-6">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                  Prerequisites
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {dependencies.map((skill) => skill && (
                    <SkillCard key={skill.id} skill={skill} compact />
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <>
              <Separator className="bg-white/10 my-6" />
              <div className="mb-6">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                  Related Skills
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {relatedSkills.map((skill) => skill && (
                    <SkillCard key={skill.id} skill={skill} compact />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
