import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillNode, Domain, skills, domains } from '@/data/skills';

interface ViewState {
  id: string;
  name: string;
  skillIds: string[];
  createdAt: number;
}

interface SkillStore {
  // Current selection
  selectedSkill: SkillNode | null;
  selectedDomain: Domain | null;
  
  // Navigation history
  history: string[];
  historyIndex: number;
  
  // User interactions
  visitedSkills: string[];
  bookmarkedSkills: string[];
  
  // Saved views (skill constellations)
  savedViews: ViewState[];
  
  // UI state
  searchQuery: string;
  isSearchOpen: boolean;
  isPanelOpen: boolean;
  activeTier: number | null;
  activeDomain: string | null;
  
  // Actions
  selectSkill: (skill: SkillNode | null) => void;
  selectDomain: (domain: Domain | null) => void;
  navigateToSkill: (skillId: string) => void;
  goBack: () => void;
  goForward: () => void;
  toggleBookmark: (skillId: string) => void;
  markVisited: (skillId: string) => void;
  saveView: (name: string, skillIds: string[]) => void;
  deleteView: (viewId: string) => void;
  setSearchQuery: (query: string) => void;
  toggleSearch: () => void;
  togglePanel: () => void;
  setActiveTier: (tier: number | null) => void;
  setActiveDomain: (domain: string | null) => void;
  
  // Computed getters
  getSkillById: (id: string) => SkillNode | undefined;
  getDomainById: (id: string) => Domain | undefined;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
}

export const useSkillStore = create<SkillStore>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedSkill: null,
      selectedDomain: null,
      history: [],
      historyIndex: -1,
      visitedSkills: [],
      bookmarkedSkills: [],
      savedViews: [],
      searchQuery: '',
      isSearchOpen: false,
      isPanelOpen: false,
      activeTier: null,
      activeDomain: null,
      
      // Actions
      selectSkill: (skill) => set({ selectedSkill: skill, isPanelOpen: skill !== null }),
      
      selectDomain: (domain) => set({ selectedDomain: domain }),
      
      navigateToSkill: (skillId) => {
        const { history, historyIndex } = get();
        const skill = skills.find(s => s.id === skillId);
        if (!skill) return;
        
        // Add to history
        const newHistory = [...history.slice(0, historyIndex + 1), skillId];
        set({
          selectedSkill: skill,
          history: newHistory,
          historyIndex: newHistory.length - 1,
          isPanelOpen: true,
        });
        
        // Mark as visited
        get().markVisited(skillId);
      },
      
      goBack: () => {
        const { history, historyIndex } = get();
        if (historyIndex <= 0) return;
        
        const newIndex = historyIndex - 1;
        const skillId = history[newIndex];
        const skill = skills.find(s => s.id === skillId);
        
        set({
          selectedSkill: skill || null,
          historyIndex: newIndex,
        });
      },
      
      goForward: () => {
        const { history, historyIndex } = get();
        if (historyIndex >= history.length - 1) return;
        
        const newIndex = historyIndex + 1;
        const skillId = history[newIndex];
        const skill = skills.find(s => s.id === skillId);
        
        set({
          selectedSkill: skill || null,
          historyIndex: newIndex,
        });
      },
      
      toggleBookmark: (skillId) => {
        const { bookmarkedSkills } = get();
        const isBookmarked = bookmarkedSkills.includes(skillId);
        
        set({
          bookmarkedSkills: isBookmarked
            ? bookmarkedSkills.filter(id => id !== skillId)
            : [...bookmarkedSkills, skillId],
        });
      },
      
      markVisited: (skillId) => {
        const { visitedSkills } = get();
        if (!visitedSkills.includes(skillId)) {
          set({ visitedSkills: [...visitedSkills, skillId] });
        }
      },
      
      saveView: (name, skillIds) => {
        const newView: ViewState = {
          id: `view-${Date.now()}`,
          name,
          skillIds,
          createdAt: Date.now(),
        };
        set({ savedViews: [...get().savedViews, newView] });
      },
      
      deleteView: (viewId) => {
        set({ savedViews: get().savedViews.filter(v => v.id !== viewId) });
      },
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),
      
      togglePanel: () => set({ isPanelOpen: !get().isPanelOpen }),
      
      setActiveTier: (tier) => set({ activeTier: tier }),
      
      setActiveDomain: (domain) => set({ activeDomain: domain }),
      
      // Getters
      getSkillById: (id) => skills.find(s => s.id === id),
      getDomainById: (id) => domains.find(d => d.id === id),
      canGoBack: () => get().historyIndex > 0,
      canGoForward: () => get().historyIndex < get().history.length - 1,
    }),
    {
      name: 'ai-visual-synthesis-skills',
      partialize: (state) => ({
        visitedSkills: state.visitedSkills,
        bookmarkedSkills: state.bookmarkedSkills,
        savedViews: state.savedViews,
      }),
    }
  )
);
