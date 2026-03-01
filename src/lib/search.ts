import Fuse from 'fuse.js';
import { SkillNode, skills } from '@/data/skills';
import { Domain, domains } from '@/data/domains';

// Skill search index
const skillSearchOptions: Fuse.IFuseOptions<SkillNode> = {
  keys: [
    { name: 'name', weight: 3 },
    { name: 'description', weight: 2 },
    { name: 'domain', weight: 1.5 },
    { name: 'subSkills.name', weight: 1.5 },
    { name: 'subSkills.description', weight: 1 },
    { name: 'keyConcepts', weight: 1.5 },
    { name: 'promptTemplates.name', weight: 1 },
    { name: 'promptTemplates.template', weight: 0.5 },
    { name: 'technicalSpecs.label', weight: 0.8 },
    { name: 'technicalSpecs.value', weight: 0.8 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
  findAllMatches: true,
};

export const skillSearchIndex = new Fuse(skills, skillSearchOptions);

// Domain search index
const domainSearchOptions: Fuse.IFuseOptions<Domain> = {
  keys: [
    { name: 'name', weight: 3 },
    { name: 'shortName', weight: 2.5 },
    { name: 'description', weight: 1.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
};

export const domainSearchIndex = new Fuse(domains, domainSearchOptions);

// Combined search result type
export interface SearchResult {
  type: 'skill' | 'domain';
  item: SkillNode | Domain;
  score?: number;
  matches?: readonly Fuse.FuseResultMatch[];
}

// Combined search function
export function searchAll(query: string, limit = 20): SearchResult[] {
  if (!query.trim()) return [];
  
  const skillResults = skillSearchIndex.search(query, { limit: Math.ceil(limit * 0.8) });
  const domainResults = domainSearchIndex.search(query, { limit: Math.ceil(limit * 0.2) });
  
  const results: SearchResult[] = [
    ...skillResults.map(r => ({
      type: 'skill' as const,
      item: r.item,
      score: r.score,
      matches: r.matches,
    })),
    ...domainResults.map(r => ({
      type: 'domain' as const,
      item: r.item,
      score: r.score,
      matches: r.matches,
    })),
  ];
  
  // Sort by score (lower is better)
  return results.sort((a, b) => (a.score || 0) - (b.score || 0)).slice(0, limit);
}

// Search skills only
export function searchSkills(query: string, limit = 30): Fuse.FuseResult<SkillNode>[] {
  if (!query.trim()) return [];
  return skillSearchIndex.search(query, { limit });
}

// Search domains only
export function searchDomains(query: string, limit = 10): Fuse.FuseResult<Domain>[] {
  if (!query.trim()) return [];
  return domainSearchIndex.search(query, { limit });
}

// Get search suggestions based on partial input
export function getSearchSuggestions(query: string, limit = 5): string[] {
  if (!query.trim() || query.length < 2) return [];
  
  const suggestions = new Set<string>();
  
  // Add matching skill names
  const skillResults = skillSearchIndex.search(query, { limit });
  skillResults.forEach(r => {
    suggestions.add(r.item.name);
    r.item.keyConcepts?.forEach(kc => {
      if (kc.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(kc);
      }
    });
  });
  
  // Add matching domain names
  const domainResults = domainSearchIndex.search(query, { limit: 3 });
  domainResults.forEach(r => {
    suggestions.add(r.item.name);
    suggestions.add(r.item.shortName);
  });
  
  return Array.from(suggestions).slice(0, limit);
}

// Highlight matches in text
export function highlightMatches(text: string, matches?: readonly Fuse.FuseResultMatch[]): string {
  if (!matches || matches.length === 0) return text;
  
  const relevantMatches = matches.filter(m => m.value?.includes(text));
  if (relevantMatches.length === 0) return text;
  
  const indices = relevantMatches
    .flatMap(m => m.indices || [])
    .sort((a, b) => a[0] - b[0]);
  
  if (indices.length === 0) return text;
  
  let result = '';
  let lastIndex = 0;
  
  for (const [start, end] of indices) {
    if (start > lastIndex) {
      result += text.slice(lastIndex, start);
    }
    result += `**${text.slice(start, end + 1)}**`;
    lastIndex = end + 1;
  }
  
  if (lastIndex < text.length) {
    result += text.slice(lastIndex);
  }
  
  return result;
}
