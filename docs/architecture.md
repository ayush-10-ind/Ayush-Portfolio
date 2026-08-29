# architecture.md — Technical Architecture
> Version: 2.2.0 | Last updated: 2026-08-29

---

## 1. ARCHITECTURE OVERVIEW

```text
┌─────────────────────────────────────────────────────────────┐
│                       PRESENTATION                          │
│  Hero • 3D Spatial Resume • Case Studies • Craft • Contact  │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
│     3D SPATIAL ENGINE       │ │   CONFIGURABLE AI ASSISTANT │
│ Three.js / Canvas / CSS3D   │ │ Route + Configurable Model  │
│ Camera Orbit & Spatial View │ │ (AI_MODEL_NAME via env)     │
└──────────────┬──────────────┘ └──────────────┬──────────────┘
               │                               │
┌──────────────▼───────────────────────────────▼──────────────┐
│                     DATA & SOURCE OF TRUTH                  │
│ knowledge.md • projects.ts • experience.ts • skills.ts      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. TECHNOLOGY STACK & PROJECT LIFECYCLE

- **Frontend Core**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
- **Styling**: Tailwind CSS v3 + CSS Custom Properties design token system
- **3D & Spatial Engine**: Three.js / Canvas & CSS 3D Matrix Transforms for ultra-crisp typography rendering and 60fps performance across desktop and mobile
- **Motion & Interaction**: GSAP 3 (ScrollTrigger) + Framer Motion
- **AI Intelligence**: Google Gemini API via `@google/generative-ai` SDK
  - **Configurable Model Name**: Controlled via `process.env.AI_MODEL_NAME` (defaults to `gemini-1.5-flash`)
  - **Safety Pipeline**: Query Normalization $\rightarrow$ Intent Detection $\rightarrow$ Knowledge Retrieval $\rightarrow$ Context Builder $\rightarrow$ Grounding Validation
- **Version Control & CI/CD**:
  - Incremental Git milestone strategy with conventional commits
  - Strict secret filtering (`.env.local` excluded)
  - Vercel automated deployment integration