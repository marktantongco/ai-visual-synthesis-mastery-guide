'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { skills, SkillNode } from '@/data/skills';
import { useSkillStore } from '@/store/skillStore';
import { cn } from '@/lib/utils';
import { Search, X, Command, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'subSkills.name', weight: 0.15 },
    { name: 'subSkills.description', weight: 0.1 },
    { name: 'domain', weight: 0.05 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

// Create Fuse instance
const fuse = new Fuse(skills, fuseOptions);

export function SearchBar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    navigateToSkill,
    visitedSkills
  } = useSkillStore();
  
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Compute results based on search query using useMemo
  const results = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return fuse.search(searchQuery)
      .slice(0, 8)
      .map(r => ({ item: r.item, score: r.score }));
  }, [searchQuery]);
  
  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setSearchQuery('');
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setSearchQuery]);
  
  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Recent skills
  const recentSkills = useMemo(() => {
    return visitedSkills
      .slice(-5)
      .reverse()
      .map(id => skills.find(s => s.id === id))
      .filter(Boolean) as SkillNode[];
  }, [visitedSkills]);
  
  const tierLabels = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
  
  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Search Input */}
      <div 
        className={cn(
          "relative flex items-center bg-[#141414] border-2 transition-colors",
          isFocused ? "border-[#FF3B00]" : "border-white/10 hover:border-white/20"
        )}
      >
        <Search className="absolute left-4 w-4 h-4 text-white/40" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search skills, concepts, techniques..."
          className="w-full bg-transparent py-3 pl-11 pr-20 text-white placeholder-white/40 
                     text-sm font-mono focus:outline-none"
        />
        <div className="absolute right-3 flex items-center gap-1">
          <kbd className="hidden md:flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10">
            <Command className="w-3 h-3 text-white/40" />
            <span className="text-xs text-white/40 font-mono">K</span>
          </kbd>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-white/5"
            >
              <X className="w-4 h-4 text-white/40" />
            </button>
          )}
        </div>
      </div>
      
      {/* Dropdown Results */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#141414] border-2 border-white/10 z-50 max-h-[400px] overflow-y-auto">
          {searchQuery.length >= 2 ? (
            results.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 border-b border-white/5">
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    Results ({results.length})
                  </span>
                </div>
                {results.map(({ item }) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigateToSkill(item.id);
                      setSearchQuery('');
                      setIsFocused(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="text-sm text-white font-bold uppercase">
                          {item.name}
                        </span>
                        <p className="text-xs text-white/40 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className="font-mono text-[10px] px-2 py-0.5 border-white/20 text-white/40"
                    >
                      T{tierLabels[item.tier]}
                    </Badge>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-white/40 font-mono text-sm">No results found</p>
                <p className="text-white/20 text-xs mt-1">Try different keywords</p>
              </div>
            )
          ) : (
            <div className="py-2">
              {/* Recent Searches */}
              {recentSkills.length > 0 && (
                <div className="px-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3 h-3 text-white/40" />
                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                      Recent
                    </span>
                  </div>
                  <div className="space-y-1">
                    {recentSkills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => {
                          navigateToSkill(skill.id);
                          setIsFocused(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-2"
                      >
                        <div 
                          className="w-2 h-2"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span className="text-sm text-white/80">{skill.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quick Filters */}
              <div className="px-4 py-2 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3 h-3 text-white/40" />
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    Quick Access
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Lighting', 'Lens', 'Material', 'Cinematic'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSearchQuery(filter.toLowerCase())}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-white/60 
                                 hover:text-white hover:border-white/20 transition-colors font-mono uppercase"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
