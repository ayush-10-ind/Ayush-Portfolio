# CINEMATIC_ARCHITECTURE.md — Engine Architecture

> Version 3.0.0 | The portfolio is an **animated film**, not sections-with-animations.

## 1. Core idea

One continuous 3D world (a corridor of chambers along −Z). Scrolling drives a **master
timeline `p ∈ [0,1]`**. `p` is fed to two synchronized consumers:

1. **Three.js / React Three Fiber** — a real perspective camera that dollies along a spline,
   through lit environments, physical transitions, particles and 3D typography.
2. **DOM overlays** — readable, accessible text/labels/links, each gated to an exclusive
   window of `p` and parallaxed against the same timeline.

Both read the *same* timeline, so the world and the words are one shot.

```
window scroll (Lenis smooths)
        │
        ▼
   runtime.progress  p ∈ [0,1]            ┌──▶ CameraRig (R3F useFrame)
        │ (shared mutable store)          │      spline(p) → damp → camera
        ├────────────────────────────────┼──▶ Scene groups (visibility gates, idle motion)
        │                                 │
        └────────────────────────────────┴──▶ DOM overlays (rAF, window gate + parallax)
```

## 2. Stack (minimal, chosen on purpose)

| Concern | Tool | Why |
|---------|------|-----|
| Framework | Next.js 16 App Router + React 19 + TypeScript | already present; server route for AI |
| Genuine 3D | `three` + `@react-three/fiber` + `@react-three/drei` | real perspective camera, lighting, depth |
| Scroll smoothing | `lenis` | inertia on input; exposes `scrollTo` for nav |
| DOM micro-motion | `framer-motion` | reveal variants for overlay content only |
| (deliberately NOT) GSAP ScrollTrigger | — | replaced by a single explicit timeline + spline; simpler and more predictable than many independent triggers |

## 3. File map (new architecture)

```
portfolio/
  app/
    page.tsx                        → renders <CinematicExperience/>
    layout.tsx                      → fonts + metadata (cleaned)
    globals.css                     → ink/paper/gold token system
  components/cinematic/
    CinematicExperience.tsx         → Lenis + scroll driver + store + composition
    store.tsx                       → React context exposing the runtime singleton
    world/
      CinematicCanvas.tsx           → dynamic(ssr:false) <Canvas> + lights + fog
      CameraRig.tsx                 → spline sampling + damping + FOV + idle drift
      WorldScene.tsx                → composes all chambers + transitions + dust
      chambers/                     → one file per environment (pure 3D)
      transitions/                  → gate, corridor, portal, core, dossier, horizon
      kit.tsx                       → RoomKit, Plaque, text-texture helpers, materials
    overlays/
      SceneOverlay.tsx              → window gate + parallax (rAF, no re-render)
      content/                      → per-scene readable content (reuses lib/data)
    navigation/
      SceneRail.tsx                 → 00–06 quiet rail + progress hairline
    archive/
      ArchivePanel.tsx              → restyled grounded AI terminal (reuses /api/assistant)
    debug/
      DebugHUD.tsx                  → dev-only: progress, scene, camera, FPS
  lib/cinematic/
    timeline.ts                     → SCENES windows, TRANSITIONS, heights  ★tuning
    cameraPath.ts                   → keyframes (desktop/tablet/mobile) + spline sampler ★tuning
    easing.ts                       → curves ★tuning
    damp.ts                         → exponential/spring smoothing ★tuning
    responsive.ts                   → variant detection (desktop/tablet/mobile)
    runtime.ts                      → mutable singleton + subscribe()
  lib/data/*                        → verified facts (unchanged source of truth)
  app/api/assistant/*               → grounded AI (unchanged, reused)
```

## 4. Runtime store (no per-frame React renders)

A mutable singleton (`lib/cinematic/runtime.ts`) holds `progress`, derived `sceneIndex`,
smoothed camera pose, `variant`, `reducedMotion`, `fps`. Consumers:

- **R3F** reads it inside `useFrame` (no React state churn).
- **DOM overlays** run their own `requestAnimationFrame` and write transforms straight to
  DOM nodes via refs (no re-render).
- **Nav rail / debug HUD** `subscribe()` and only re-render on *discrete* changes (scene
  index change, FPS sample).

This keeps the 60fps path free of React reconciliation.

## 5. Camera system

- Keyframes: `{ t, pos:[x,y,z], look:[x,y,z], fov }` per variant.
- Sampling: Catmull-Rom for position and look-at; linear for FOV.
- Damping: `current += (target − current) * (1 − exp(−λ·dt))` with a heavy λ (≈ 3.2) for
  position and a lighter λ for heading + a tiny heading spring for the "settle" overshoot.
- Idle drift: sine wobble scaled by `reducedMotion ? 0 : 1`.
- Reduced motion: `λ` raises sharply (near-instant, no drift) so navigation stays usable but
  calm.

## 6. Transition system

Each chamber boundary owns a physical object the camera must pass **through/around**:

- Gate (door), Corridor (walls pinch), TypographyPortal (camera flies through a letterform
  counter), EngineCore (spatial zoom-in), DossierPage (foreground wipe across the lens),
  HorizonPartition (walls slide apart).

Transition objects are positioned in the world at the boundary Z. Their animation is driven
by the same `p` (local window eased), so timing is exactly in sync with the camera spline.
During a passage the previous chamber is behind the lens; the next is revealed as the camera
emerges — the "wipe" is the architecture itself, never opacity.

## 7. DOM/3D hybrid split

- **WebGL** owns: environments, camera, lighting, fog, particles, 3D typography, transitions.
- **DOM** owns: readable body text, links, buttons, the archive terminal, navigation, the
  debug HUD — everything that must be accessible, selectable, or crawlable.
- Overlay visibility: `local = clamp((p − win[0]) / (win[1] − win[0]))`; opacity eased in at
  the head and out at the tail of the window. Windows are exclusive → at most one overlay at
  any `p` → zero overlapping scenes, by construction.

## 8. Responsive camera (three real configs)

`lib/cinematic/cameraPath.ts` exports `desktop`, `tablet`, `mobile` keyframe sets with
different FOV, Z-travel, lateral drift, object offsets, and transition distances. On mobile:

- wider FOV (portrait needs vertical field),
- reduced lateral drift (objects stay inside the 9:16 frustum),
- re-framed focal objects (moved toward screen center),
- simplified geometry + fewer particles,
- overlay parallax multipliers reduced.

Variant is chosen on `matchMedia` and re-evaluated on resize/orientation change.

## 9. Performance strategy

- Visibility-gated chambers (only the current slab + neighbours render) → constant draw cost.
- Shared geometries/materials via a `kit.tsx` (no per-frame allocation).
- Canvas-texture typography generated once and cached (no DOM-in-WebGL).
- Particles: dust only in 2 chambers; counts reduced on mobile/tablet.
- `dpr` capped (≤ 2 desktop, ≤ 1.5 mobile), `powerPreference: high-performance`,
  `frameloop: always` (needed for the timeline), but scenes outside the frustum are skipped.
- Lenis + damp are pure math (no layout thrash); DOM overlay writes are transform/opacity
  only (compositor-friendly).
- No `React.useState` in the animation path.

## 10. Accessibility & reduced motion

- `prefers-reduced-motion`: camera damping → near-instant, idle drift → 0, overlay parallax
  → 0, transitions → simple straight dolly; all content/nav/links remain fully usable.
- Keyboard: ArrowDown/Up, PageDown/Up, Home/End jump between scenes; nav rail is focusable;
  visible focus rings; semantic `main`/`nav`/`section` landmarks; skip link retained.
- The site is fully readable even with JS disabled (overlay content is real DOM text).

## 11. Debug mode

`?debug=1` (or `NEXT_PUBLIC_DEBUG=1`) mounts `<DebugHUD/>`: scroll progress, scene index,
camera position/rotation/FOV, timeline window, FPS. Hidden in production.

## 12. Build order (from the brief, adapted)

1. ✅ Cinematic engine (timeline + camera + damp + store + Lenis driver)
2. ✅ Scene 01 (Threshold → Study) at reference quality
3. ✅ Transition system (all 6 physical passages)
4. ✅ Full world (remaining chambers)
5. ✅ Portfolio content (About/Skills/AgniPress/XAI/Experience/Contact from `lib/data`)
6. ✅ AI Archive (grounded terminal, reuses existing route)
7. ✅ Mobile portrait compositions
8. ✅ Performance passes
9. ✅ Accessibility (keyboard + reduced motion + semantics)
10. 🔄 QA against the reference once a viewable copy is available
