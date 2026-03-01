# AI Visual Synthesis Mastery Guide

A comprehensive, interactive web application for AI practitioners seeking production-grade consistency through objective parameter control. Navigate skill domains, discover relationships, and master the technical vocabulary of visual synthesis.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🎯 Three Main Views
- **Discovery** - Interactive periodic table-style skill visualization with 8 domains and 37 skills across 6 tiers
- **Documents** - Complete skills.md documentation with installation guide and table of contents
- **Directory** - skills.sh-style directory with leaderboard, search, and agent carousel

### 🎨 Design System
- **Void Black (#0A0A0A)** - Primary background
- **Brutal Orange (#FF3B00)** - Primary actions and accents
- **Matrix Green (#00FF94)** - Success states and code highlights
- **0px border-radius** - Brutalist aesthetic throughout
- **High-contrast hover states** - Invert on interaction

### 🔧 Technical Features
- **Semantic Search** - Fuse.js-powered client-side search
- **State Management** - Zustand for bookmarks and navigation
- **Responsive Design** - Mobile-first approach
- **Keyboard Shortcuts** - "/" for search focus

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main application with 3 views
│   ├── globals.css       # Brutalist design system
│   └── layout.tsx        # Root layout with metadata
├── components/
│   ├── skills/           # Skill-related components
│   │   ├── DomainCluster.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SkillCard.tsx
│   │   ├── SkillPanel.tsx
│   │   └── SkillGraph.tsx
│   └── ui/               # shadcn/ui components
├── data/
│   ├── skills.ts         # Complete skills database
│   └── domains.ts        # Domain definitions
├── store/
│   └── skillStore.ts     # Zustand state management
└── lib/
    ├── search.ts         # Search utilities
    └── utils.ts          # Helper functions
```

## 📊 Skill Domains

1. **Technical Prompt Engineering** - Constructing prompts as structured blueprints
2. **Optical Physics & Depth Perception** - Foundation of visual engineering
3. **Advanced Photographic Literacy** - Reconstructing real-world physics
4. **Strategic Negation & Material Science** - Overcoming uncanny valley
5. **Identity Preservation & Consistency** - Character and style consistency
6. **Anamorphic Mastery & Cinematic Grammar** - Engineering narrative scale
7. **Post-Processing & Hybrid Workflows** - Refining and integrating outputs
8. **AI Agent Orchestration** - Managing multi-step autonomous workflows

## 🎯 Six Tiers of Visual Synthesis

| Tier | Focus |
|------|-------|
| I | Master Foundational Physics |
| II | Reconstruct Optical Systems |
| III | Control Material & Surface Physics |
| IV | Map Platform-Specific Vocabulary |
| V | Categorize Ecosystem Capabilities |
| VI | Layer Advanced Phenomena |

## 🚀 Deployment

### Deploy to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: AI Visual Synthesis Mastery Guide"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/ai-visual-synthesis-mastery-guide.git

# Push to GitHub
git push -u origin master
```

### Deploy to Vercel

1. **Via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

2. **Via Vercel CLI**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel

   # Follow the prompts to link and deploy
   ```

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Search**: Fuse.js
- **State**: Zustand
- **Animations**: Framer Motion

## 📝 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for AI practitioners. Physics-First Visual Engineering.
