# REFERENCE_ANALYSIS.md — Motion & Cinematic Blueprint

> Version 3.0.0 | Authored for the "interactive animated film" rebuild.

## 0. Reference access — honest status

The provided reference (`instagram.com/reel/DbYRJL5y49v`) could **not** be watched from the
build sandbox: Instagram returns HTTP 403 on the page, its `oEmbed` API, and the embed
endpoint, and the shortcode does not resolve through search. The reference could not be
frame-analyzed directly.

Rather than block the build, the motion language below is derived from two authoritative
sources that were actually available:

1. The **client brief itself**, which specifies the reference's interaction principles in
   unusual detail (continuous camera travel, physical scene transitions, door/corridor/portal
   passages, foreground–midground–background parallax, inertia + subtle overshoot, "one
   continuous shot" continuity, zero overlapping scenes).
2. The repo's `docs/reference.md` and `docs/design.md` (editorial + cinematic + spatial +
   technical direction, warm-ink/warm-gold drafting palette).

**Re-tune hook:** every motion decision below is a *named constant* in
`portfolio/lib/cinematic/*` (camera keyframes, per-scene windows, easing curves, damping
λ, transition timings). When a viewable copy of the reel is shared, matching its actual
speed/easing is a one-file edit — the architecture does not need to change.

---

## 1. The interaction principle extracted from the brief

> The visitor does not scroll through sections. The visitor **travels** through a world.
> Scroll = a slider along a cinematic timeline. The camera is the narrator.

The reference's essence, as specified, is:

- **Scroll → timeline progress → camera**, never "scroll → next HTML section".
- The camera is a **real, physical camera**: it accelerates, decelerates, carries inertia,
  settles with a hint of overshoot, and never teleports.
- Scenes change through **physical traversal** (a door, a corridor, a portal, an object the
  camera passes through/into) — not opacity fades.
- **Only one shot is ever the primary focus** at any moment. Transitions are the mechanism
  that removes Shot A from readable space *before* Shot B owns the frame.

## 2. Shot breakdown (the film)

| # | Scene | Window (timeline) | Transition INTO it | Atmosphere |
|---|-------|-------------------|--------------------|------------|
| 00 | Arrival / Threshold | 0.000 – 0.070 | — (cold open) | Dark void, warm light, a gate ahead |
| 01 | The Study (identity) | 0.100 – 0.235 | **Door** — camera passes the gate | Warm, paper, desk-light |
| 02 | The Workshop (mindset + skills) | 0.270 – 0.400 | **Corridor** — walls narrow, light ahead | Workshop, tools, labeled artifacts |
| 03 | The Engine (AgniPress) | 0.435 – 0.545 | **Typography portal** — camera flies through the word "AGNIPRESS" | Machine/engine, amber instrumentation |
| 04 | The Observatory (XAI) | 0.580 – 0.685 | **Object-core zoom** — into the engine core → data constellation | Cool, analytical, star-map |
| 05 | The Ledger (experience/education) | 0.715 – 0.805 | **Dossier** — camera pulls into a document on a desk | Records room, warm |
| 06 | The Horizon (contact) | 0.840 – 1.000 | **Walls part** — environment opens to sky | Vast, open, final |

The gaps between windows (0.070–0.100, 0.235–0.270, …) are the **transition passages** —
moments where the previous scene has left the frame, the camera is *inside* the connective
tissue (door frame, corridor, portal), and **no readable content is shown**. This is the
guarantee against ghosting/overlap: content bands are exclusive and physically separated.

## 3. Camera choreography

- The camera travels one continuous path along world −Z through a corridor of chambers
  (a single long floor keeps the "one shot" continuity).
- **Position** is sampled from a Catmull-Rom spline of keyframes; **look-at** from a second
  spline; **FOV** eases slightly wider when the camera pushes through a tight passage
  (door, engine core) and returns — a subtle "breathing" through spaces.
- **Inertia:** Lenis smooths the scroll input (heavy exponential ease), then the camera rig
  applies a second **critically-damped exponential smoothing** layer. Two stacked damping
  layers = weight, no robotic linearity, no spring bounce jitter on position.
- **Subtle overshoot** is applied *only* to look-at heading (a light spring) and to DOM
  content settle, never to camera position — so framing feels "caught" without motion sickness.
- **Idle life:** a very small sinusoidal drift on position/heading so the shot is never
  frozen even when the visitor pauses.

### Easing vocabulary (deliberately not "ease-in-out on everything")
| Motion | Curve |
|--------|-------|
| Large camera movement | critically-damped exponential (heavy, slow settle) |
| Content reveal (DOM) | `cubic-bezier(0.16, 1, 0.3, 1)` (fast out, long tail) |
| Small UI / micro-labels | `cubic-bezier(0.4, 0, 0.2, 1)` (short, precise) |
| FOV breath | ease-in-out sine |
| Foreground parallax | moves *faster* than midground; background *slower* |

## 4. Depth & parallax

Depth is **genuine 3D perspective**, not CSS fake-3D:

- **Background** (far walls, horizon, sky) — slowest screen movement, deepest fog.
- **Midground** (room architecture, machines, desks) — the story's anchor.
- **Foreground** (door lintels, corridor edges, dust particles, dossier pages that pass the
  lens) — fastest screen movement; these are the objects that "wipe" the frame during
  transitions.
- DOM content is layered on top with a **parallax multiplier** (≠ 1) synced to the same
  timeline, and only ever visible inside its scene's exclusive window.

## 5. Attention direction

Each scene directs the eye with one dominant focal object, lit brighter than everything
else, with everything else held 1–2 stops dimmer:

- Arrival → the lit gate monolith
- Study → the name plaque + desk lamp
- Workshop → the labeled skill wall
- Engine → the amber pipeline core
- Observatory → the central model node with flowing attribution lines
- Ledger → the internship document on the desk
- Horizon → the low sun disc / contact monolith

**Anti-clutter rule:** at most one "hero" object + one supporting cluster per frame; the
fog and vignette desaturate the periphery so the eye is never competing for two anchors.

## 6. Transitions (how the camera physically gets there)

1. **Door** (Arrival→Study): camera approaches the gate; the two monoliths part/lift as the
   lens reaches the frame; the dark frame fills the screen (threshold); light blooms into
   the study. *The door frame IS the wipe.*
2. **Corridor** (Study→Workshop): side walls pinch in, the camera travels forward through a
   narrow dark passage, a warm opening grows at the far end.
3. **Typography portal** (Workshop→Engine): the word **AGNIPRESS** resolves on the far wall;
   the camera flies through the counter of the "A" into the engine room. *Type becomes
   architecture.*
4. **Object-core zoom** (Engine→Observatory): the camera pushes *into* the engine core; at
   the point of entry the machine dissolves into a cool data constellation.
5. **Dossier** (Observatory→Ledger): a document page sweeps across the lens (foreground
   wipe) and the camera settles on the records desk.
6. **Walls part** (Ledger→Horizon): side walls slide away laterally and the ceiling lifts;
   the world opens onto a horizon and sky. *The ending of the film.*

Every transition answers "the camera physically gets from A to B" — none are opacity fades.

## 7. Zero ghosting / zero overlap — enforcement

1. Content bands are **exclusive and separated by gaps** (see §2). At any progress value,
   at most one DOM overlay is visible.
2. 3D scene groups are **visibility-gated** to their slab ± a small margin; when the camera
   is in a corridor, the previous chamber is *behind the camera* (out of frustum) and the
   next is ahead through a framed opening.
3. Overlays use a **hard window gate** (opacity derived from a clamped local progress), not
   crossfades between neighbours — neighbours are never simultaneously readable.
4. Fog is near-black: distance literally falls into darkness, so nothing "floats behind".

## 8. Lighting & environmental transformation

- One low ambient fill + a warm directional key for the whole world.
- **Per-chamber** point/spot lights (warm desk lamps in Study/Workshop/Ledger; amber
  instrumentation in the Engine; cool blue-grey analysis light in the Observatory) — the
  camera passing from one pool of light into the next *is* the environmental transformation.
- Dark distance fog + a subtle vignette/grain overlay for filmic atmosphere.

## 9. Timing & rhythm

- Desktop: ~1400–1800vh of scroll for the full film (≈ 2–3 minutes of deliberate scrolling).
- Mobile: ~2400vh — portrait needs more scroll runway per beat because there is less
  horizontal room; timing is re-derived per scene rather than compressed.
- Breathing: each scene gives the visitor a "settle beat" before the next transition begins
  (content arrives, holds, then the passage starts). Nothing rushes.

## 10. What the reference is NOT (per the brief)

No generic navbar, no hero, no card grids, no glassmorphism, no neon, no random particles,
no dashboard aesthetic, no fake 3D cards, no fade transitions, no ghosting, no robot/space
cliché imagery.
