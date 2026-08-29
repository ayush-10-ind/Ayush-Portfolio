# architecture.md — Technical Architecture
> Version: 2.3.0 | Last updated: 2026-08-29

---

## 1. ARCHITECTURE OVERVIEW

```text
┌─────────────────────────────────────────────────────────────┐
│                       PRESENTATION                          │
│  Hero • 3D Spatial Resume • 2 Case Studies • Craft • Contact│
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

## 2. FEATURED PROJECT DATA SCOPE
`lib/data/projects.ts` provides typed data exclusively for:
1. `agnipress`: Full-stack news engine (Java 21, Spring Boot 3, JPA, Security, WebClient).
2. `explainable-ai-research`: ML interpretability research (Python, XAI, attribution analytics).