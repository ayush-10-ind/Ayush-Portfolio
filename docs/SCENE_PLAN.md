# SCENE_PLAN.md — The Seven Chambers (storyboard)

> Version 3.0.0 | Original world, original assets. Every fact comes from `lib/data/*`.

The film: **"SEVEN CHAMBERS"** — a continuous dolly through an engineer's world. The visitor
is the camera. Each chamber has the structure *enter → establish → main moment → transform →
exit*.

---

## 00 · ARRIVAL / THRESHOLD  —  p ∈ [0.000, 0.070]

- **Enter:** cold open on a dark void; a warm light shaft and a massive gate ahead.
- **Establish:** dust motes in the light; the gate monoliths read **AYUSH TRIVEDI** (3D
  type) with a small drafting index `00 · THRESHOLD`.
- **Main moment:** the name appears naturally *in* the environment; the camera drifts toward
  the gate; a quiet "SCROLL TO ENTER" cue (DOM).
- **Transform → exit:** camera reaches the gate. *(transition: DOOR)*

## 01 · THE STUDY (identity)  —  p ∈ [0.100, 0.235]

- **Enter:** through the door; a warm pool of desk-light blooms; paper and ink.
- **Establish:** a study/archive: desk + lamp, engraved wall plaques, slow dust.
- **Main moment:** identity as *engraved plaques*, not cards:
  - **Ayush Trivedi** — Computer Science & Engineering Student
  - **NIET, Greater Noida** · **8.4 CGPA** · **Expected 2028**
  - One-line mission: building systems + studying model interpretability.
- **Transform → exit:** the room narrows toward a dark doorway. *(transition: CORRIDOR)*

## 02 · THE WORKSHOP (mindset + skills)  —  p ∈ [0.270, 0.400]

- **Enter:** out of the corridor into a workshop; tools and labeled artifacts on a wall.
- **Main moment:** skills as **physical objects** on a pegboard/shelves — no skill bars,
  no invented percentages:
  - Languages: Java, Python, JavaScript
  - Frontend: React
  - Backend: Spring Boot, Spring Data JPA
  - Database: Oracle, SQL
  - Tools: Git, GitHub, VS Code
  - Core: Data Structures & Algorithms, LeetCode
- **Mindset line:** "Discipline over noise." (subtle Zoro-inspired engraving).
- **Transform → exit:** the word **AGNIPRESS** resolves on the far wall. *(transition:
  TYPOGRAPHY PORTAL)*

## 03 · THE ENGINE (AgniPress)  —  p ∈ [0.435, 0.545]

- **Enter:** the camera flies through the "A" of AGNIPRESS into a machine room.
- **Main moment:** AgniPress as a **serious engineering system** — an instrumented press:
  `SOURCES → SCHEDULER → API → DB → FEED` as a flowing amber pipeline.
  - Engraved plates: Java 21, Spring Boot 3, Spring Data JPA, Spring Security (OAuth2 /
    OIDC), WebClient, schedulers, Oracle/relational, REST APIs, Thymeleaf/HTML/CSS.
  - DOM carries the readable dossier: problem / solution / architecture.
- **Transform → exit:** camera pushes into the engine **core**. *(transition: OBJECT-CORE
  ZOOM)*

## 04 · THE OBSERVATORY (Explainable AI)  —  p ∈ [0.580, 0.685]

- **Enter:** the core dissolves into a cool data constellation — a completely different
  atmosphere.
- **Main moment:** the attribution chain animated as a star-map:
  `MODEL → PREDICTION → FEATURES → ATTRIBUTION → EXPLANATION`
  (nodes connected by flowing lines; not a dashboard).
  - DOM: problem (opaque black boxes), solution (interpretability), tech (Python, ML,
    feature attribution, data analysis/visualization).
- **Transform → exit:** a document page sweeps across the lens. *(transition: DOSSIER)*

## 05 · THE LEDGER (experience + education)  —  p ∈ [0.715, 0.805]

- **Enter:** the page becomes a dossier on a records desk.
- **Main moment:** the AICTE internship as part of the environment —
  - **Python Developer Intern — AICTE Code Technologies — June–July 2025** (plaque)
  - Modular Python, OOP, debugging (artifact labels).
  - Education ledger: **NIET** (B.Tech CSE, expected 2028, 8.4 CGPA) → **Kendriya Vidyalaya
    Raebareli** (12th, 2021–22).
- **Transform → exit:** walls begin to slide apart; light floods in. *(transition: HORIZON)*

## 06 · THE HORIZON (contact)  —  p ∈ [0.840, 1.000]

- **Enter:** the environment opens; the ceiling lifts; a horizon line and low sun.
- **Main moment:** the ending of the film — contact as engraved coordinates:
  - email `ayushtrivediayushtrivedi2@gmail.com`
  - phone `+91 8303155683` · GitHub · LinkedIn · Résumé PDF
- **Final beat:** a quiet etched line — **"NOTHING HAPPENED."** — the film's last frame.

---

## Transition → content mapping (exclusive windows)

| p range | What is readable | What is happening in 3D |
|---------|------------------|--------------------------|
| 0.000–0.070 | 00 Arrival | approach gate |
| 0.070–0.100 | *(nothing)* | **DOOR** — gate parts, dark threshold |
| 0.100–0.235 | 01 Study | study + desk |
| 0.235–0.270 | *(nothing)* | **CORRIDOR** — walls pinch, forward travel |
| 0.270–0.400 | 02 Workshop | skill wall |
| 0.400–0.435 | *(nothing)* | **TYPOGRAPHY PORTAL** — through the "A" |
| 0.435–0.545 | 03 Engine | press pipeline |
| 0.545–0.580 | *(nothing)* | **CORE ZOOM** — into the core |
| 0.580–0.685 | 04 Observatory | constellation |
| 0.685–0.715 | *(nothing)* | **DOSSIER** — page wipes the lens |
| 0.715–0.805 | 05 Ledger | records desk |
| 0.805–0.840 | *(nothing)* | **HORIZON** — walls part, sky |
| 0.840–1.000 | 06 Horizon | open sky, contact monolith |

At every `p`, **at most one** readable band exists — no two scenes are ever simultaneously
the visual focus. That is the anti-ghosting guarantee.

## Mobile (9:16) intent

- Same seven beats; wider FOV; focal objects recentered; reduced lateral drift; smaller
  particle counts; parallax muted; taller scroll runway (~2400vh).
- Transitions keep their physical logic (door still parts; the "A" still swallows the lens)
  but distances are shortened so the effect reads in portrait.
