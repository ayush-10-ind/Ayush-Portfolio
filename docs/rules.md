# rules.md — Non-Negotiable Project Rules
> Version: 2.2.0 | Last updated: 2026-08-29

These rules override convenience. If any implementation decision conflicts with a rule, the rule wins.

---

## 1. TRUTH OVER HYPE
- Never fabricate jobs, internships, degrees, certifications, projects, metrics, or performance numbers not documented in `docs/knowledge.md`.
- Present engineering capabilities, challenges, and architecture with authentic precision.

## 2. STRICT SEPARATION OF TRUTH VS. PRODUCT FEATURES
- Ayush's verified personal background (NIET, AICTE internship, skills, AgniPress, Explainable AI, Flappy Bird) must remain strictly distinct from the creative frontend concepts (3D Spatial Resume, Architectural Studio, floating drafting sheets) developed for this new portfolio.

## 3. NO AI CLICHÉS
- Strictly NO robot emojis (🤖), glowing purple/blue neon blobs, particle network meshes, circuit-board graphics, or "AI POWERED" badge stickers.
- AI intelligence is communicated through reasoning quality, context retention, and strict grounding.

## 4. REAL INCREMENTAL GIT DEVELOPMENT
- The portfolio must be developed and pushed to the remote Git repository incrementally throughout the project lifecycle.
- After each completed milestone or phase:
  1. Verify the implementation across devices.
  2. Run the build and type-checking tests.
  3. Review the staged changes.
  4. Create an honest, conventional Git commit (`docs:`, `feat:`, `perf:`, `a11y:`, `fix:`, `refactor:`).
  5. Push the commit to the configured remote repository.
  6. Report the commit hash and its contents.
- Do NOT create fake historical commits, manipulate timestamps, or fabricate commit histories.

## 5. ZERO SECRETS IN VERSION CONTROL
- NEVER commit `.env`, `.env.local`, API keys, tokens, passwords, credentials, or private artifacts to version control.
- Ensure `.gitignore` is strictly enforced and verified before every single commit and push.

## 6. EXPERIENCE FIRST, AI SECOND
- The website must be a complete, visually stunning, and readable digital experience even if JavaScript or the AI assistant is disabled.

## 7. 3D WITH PURPOSE
- 3D spatial interactions must enhance spatial storytelling without degrading text readability, frame rate (60fps target), or mobile performance.

## 8. NO REFERENCE REPLICATION
- The 3D reference package is used solely as visual/spatial interaction inspiration; do not copy branding, names, illustrations, assets, or exact layouts.

## 9. CONFIGURABLE AI ARCHITECTURE
- The AI model name must be parameterized via `AI_MODEL_NAME` (server-side environment variable), never hardcoded.

## 10. MOBILE PARITY & ERGONOMICS
- Every feature must function seamlessly on mobile viewports (375px+) with zero horizontal overflow, touch-friendly targets ($\ge 44\text{px}$), and simplified spatial perspective.

## 11. ACCESSIBILITY & PERFORMANCE
- WCAG 2.1 AA compliance, visible focus states, full keyboard navigation, `prefers-reduced-motion` support, $\text{LCP} < 2.5\text{s}$, $\text{CLS} < 0.1$.