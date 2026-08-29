# phases.md — Implementation Roadmap
> Version: 2.2.0 | Last updated: 2026-08-29

Every phase has explicit verification steps and an **Incremental Git Commit & Push** exit criterion.

---

## Phase 0 — Foundation & Verified Knowledge Base (COMPLETE)
- **Objective**: Establish documentation source of truth, Next.js 16 setup, design tokens, verified factual data (including AgniPress), and clean build.
- **Git Milestone**: `docs: establish portfolio source of truth with verified resume and agnipress`
- **Exit Criteria**: All 6 docs verified, `next build` passes with 0 errors, git repository initialized with clean `.gitignore`.

---

## Phase 1 — Design System & Editorial Shell
- **Objective**: Build the visual foundation, typography scale, header, section landmarks, mobile overlay navigation, and scroll progress.
- **Scope**: `components/sections/Navigation.tsx`, `Hero.tsx`, layout grids, token application, responsive checks (375px to 1600px).
- **Git Milestone**: `feat: implement editorial design system and responsive navigation`
- **Exit Criteria**: Zero horizontal overflow on 375px, keyboard accessible navigation, verified build, git commit & push.

---

## Phase 2 — Core Portfolio Experience & Case Studies
- **Objective**: Implement deep-dive engineering case studies (AgniPress, Explainable AI, Flappy Bird, Personal Portfolio), About section, AICTE Experience timeline, Craft grid, and Contact section.
- **Scope**: `components/sections/Projects.tsx`, `ProjectCaseStudy.tsx`, `About.tsx`, `Experience.tsx`, `Skills.tsx`, `Contact.tsx`.
- **Git Milestone**: `feat: add engineering case studies including agnipress and verified experience`
- **Exit Criteria**: Authentic case studies with clear architecture/decision breakdowns, type-check passes, git commit & push.

---

## Phase 3 — Motion System & Interactive Transitions
- **Objective**: Implement purposeful scroll-driven reveals, line masking, tactile magnetic buttons, and `prefers-reduced-motion` support.
- **Scope**: `components/animations/`, GSAP ScrollTrigger integrations.
- **Git Milestone**: `feat: implement motion system and scroll-driven transitions`
- **Exit Criteria**: 60fps smooth scrolling, CLS < 0.1, reduced motion disabled states verified, git commit & push.

---

## Phase 4 — 3D Spatial Resume Studio
- **Objective**: Build the signature interactive 3D spatial studio for desktop and the high-performance perspective card stack for mobile.
- **Scope**: `components/resume/SpatialResumeStudio.tsx`, 3D camera controls, spatial drafting planes, mobile touch gestures.
- **Git Milestone**: `feat: build 3d spatial resume studio with mobile perspective fallback`
- **Exit Criteria**: Smooth 3D camera navigation on desktop, 60fps touch-first mobile perspective, git commit & push.

---

## Phase 5 — Grounded AI Assistant
- **Objective**: Integrate the configurable conversational assistant with Gemini API, intent detection, knowledge loader, conversation memory, and anti-hallucination checks.
- **Scope**: `app/api/assistant/route.ts`, `components/assistant/`, streaming responses, rate limiting.
- **Git Milestone**: `feat: integrate grounded ai assistant with configurable model`
- **Exit Criteria**: Zero hallucination on test prompts, <3s response, rate limiting active, git commit & push.

---

## Phase 6 — Performance, Accessibility & Production Launch
- **Objective**: Full audit across Chrome, Safari, Firefox, Edge, mobile browsers, axe DevTools WCAG 2.1 AA, Lighthouse optimization ($\ge 90$).
- **Scope**: Bundle optimization, image formats, metadata / OG tags, final verification.
- **Git Milestone**: `perf: optimize spatial rendering and complete production qa`
- **Exit Criteria**: Lighthouse $\ge 90$, 0 a11y violations, live deployment verified, final git push.