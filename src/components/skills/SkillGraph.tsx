'use client';

import { memo, useMemo } from 'react';
import { skills, SkillNode } from '@/data/skills';
import { domains, Domain, domainColors, tierColors } from '@/data/domains';
import { useSkillStore } from '@/store/skillStore';
import { SkillCard } from './SkillCard';
import { DomainHeader } from './DomainCluster';
import { cn } from '@/lib/utils';

interface SkillGraphProps {
  searchQuery: string;
}

export const SkillGraph = memo(function SkillGraph({ searchQuery }: SkillGraphProps) {
  const { 
    activeDomain, 
    activeTier, 
    selectSkill, 
    setActiveDomain,
    selectedSkillId 
  } = useSkillStore();
  
  // Filter skills based on active filters and search
  const filteredSkills = useMemo(() => {
    let result = skills;
    
    if (activeDomain) {
      result = result.filter(s => s.domain === activeDomain);
    }
    
    if (activeTier) {
      result = result.filter(s => s.tier === activeTier);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.subSkills.some(ss => ss.name.toLowerCase().includes(query)) ||
        s.keyConcepts?.some(kc => kc.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [activeDomain, activeTier, searchQuery]);
  
  // Group skills by domain
  const skillsByDomain = useMemo(() => {
    const grouped: Record<string, SkillNode[]> = {};
    domains.forEach(d => {
      grouped[d.id] = filteredSkills
        .filter(s => s.domain === d.id)
        .sort((a, b) => a.tier - b.tier);
    });
    return grouped;
  }, [filteredSkills]);
  
  // Group skills by tier
  const skillsByTier = useMemo(() => {
    const grouped: Record<number, SkillNode[]> = {};
    for (let i = 1; i <= 6; i++) {
      grouped[i] = filteredSkills
        .filter(s => s.tier === i)
        .sort((a, b) => a.name.localeCompare(b.name));
    }
    return grouped;
  }, [filteredSkills]);
  
  return (
    <div className="w-full">
      {/* Domain Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-brutal">
          <button
            onClick={() => setActiveDomain(null)}
            className={cn(
              'px-4 py-2 border-2 font-tech text-xs uppercase tracking-wider transition-all whitespace-nowrap',
              !activeDomain 
                ? 'bg-white text-black border-white' 
                : 'border-white/30 hover:border-white'
            )}
          >
            All Domains
          </button>
          {domains.map(domain => (
            <button
              key={domain.id}
              onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}
              className={cn(
                'px-4 py-2 border-2 font-tech text-xs uppercase tracking-wider transition-all whitespace-nowrap',
                activeDomain === domain.id 
                  ? 'text-black border-white' 
                  : 'border-white/30 hover:border-white'
              )}
              style={{ 
                backgroundColor: activeDomain === domain.id ? domainColors[domain.id] : 'transparent',
                borderColor: activeDomain === domain.id ? domainColors[domain.id] : 'rgba(255,255,255,0.3)',
                color: activeDomain === domain.id ? '#000' : domainColors[domain.id]
              }}
            >
              {domain.shortName}
            </button>
          ))}
        </div>
      </div>
      
      {/* Skills Grid - Periodic Table Style */}
      {activeDomain ? (
        // Single domain view
        <div className="space-y-4">
          {domains.filter(d => d.id === activeDomain).map(domain => (
            <div key={domain.id}>
              <div 
                className="mb-4 pb-2 border-b-2"
                style={{ borderColor: domainColors[domain.id] }}
              >
                <h2 
                  className="font-display font-extrabold text-2xl uppercase tracking-tight"
                  style={{ color: domainColors[domain.id] }}
                >
                  {domain.name}
                </h2>
                <p className="text-sm text-white/60 mt-1">{domain.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsByDomain[domain.id]?.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // All domains view - Periodic Table Layout
        <div className="space-y-8">
          {/* Tier Legend */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-tech text-xs text-white/40 uppercase">Tier Legend:</span>
            {[1, 2, 3, 4, 5, 6].map(tier => (
              <button
                key={tier}
                onClick={() => useSkillStore.getState().setActiveTier(activeTier === tier ? null : tier)}
                className={cn(
                  'px-2 py-1 font-tech text-[10px] uppercase tracking-wider transition-all',
                  activeTier === tier && 'bg-white text-black'
                )}
                style={{ 
                  color: activeTier === tier ? '#000' : tierColors[tier],
                  border: `1px solid ${tierColors[tier]}`
                }}
              >
                T{tier}
              </button>
            ))}
          </div>
          
          {/* Grid by Tier */}
          {activeTier ? (
            <div>
              <div 
                className="mb-4 pb-2 border-b-2"
                style={{ borderColor: tierColors[activeTier] }}
              >
                <h2 
                  className="font-display font-extrabold text-2xl uppercase tracking-tight"
                  style={{ color: tierColors[activeTier] }}
                >
                  Tier {activeTier}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skillsByTier[activeTier]?.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ) : (
            // Full periodic table view
            domains.map(domain => {
              const domainSkills = skillsByDomain[domain.id];
              if (!domainSkills || domainSkills.length === 0) return null;
              
              return (
                <div key={domain.id} className="space-y-3">
                  {/* Domain Header */}
                  <div 
                    className="border-b-2 pb-2"
                    style={{ borderColor: `${domainColors[domain.id]}50` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-tech text-[10px] px-2 py-1 uppercase tracking-wider"
                          style={{ 
                            color: domainColors[domain.id],
                            border: `1px solid ${domainColors[domain.id]}`,
                            backgroundColor: `${domainColors[domain.id]}15`
                          }}
                        >
                          {domain.shortName}
                        </span>
                        <h3 
                          className="font-display font-bold uppercase text-lg"
                          style={{ color: domainColors[domain.id] }}
                        >
                          {domain.name}
                        </h3>
                      </div>
                      <span className="font-tech text-xs text-white/40">
                        {domainSkills.length} skills
                      </span>
                    </div>
                  </div>
                  
                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {domainSkills.map(skill => (
                      <SkillCard key={skill.id} skill={skill} compact />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      
      {/* No Results */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="font-display text-xl uppercase text-white/40 mb-2">No Skills Found</p>
          <p className="text-sm text-white/30">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
});
