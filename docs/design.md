# design.md — Visual Design & 3D Spatial Experience System
> Version: 2.1.0 | Last updated: 2026-08-29

---

## 1. DESIGN PHILOSOPHY & CONCEPT SEPARATION

The visual identity for this new digital portfolio is **Editorial + Cinematic + 3D Spatial Studio + Technical + Human**.

### Separation of Factual Background vs. Product Concept:
- **Ayush Trivedi (Factual)**: Computer Science & Engineering student at NIET Gr. Noida (8.4 CGPA), Python & Java developer, Explainable AI researcher.
- **Portfolio Experience (Product Design Concept)**: An interactive spatial digital studio where visitors can explore Ayush's verified work through editorial typography, interactive 3D spatial perspective, and a grounded AI assistant.

The 3D spatial studio, camera travel, and floating sheets are **creative frontend interaction design concepts for this new portfolio**, not past achievements or past projects of Ayush.

---

## 2. 3D REFERENCE INSPIRATION BOUNDARIES

The provided reference package demonstrates interaction and spatial principles:
- **What to take as inspiration**: Spatial storytelling, camera travel, depth and perspective, physical document metaphors, uncluttered interface chrome.
- **What NOT to copy**:
  - Do NOT copy any person's name, branding, or identity.
  - Do NOT copy exact typography, colors, room illustrations, or textures.
  - Do NOT copy any proprietary visual assets or copy.
  - The portfolio must possess its own bespoke visual language tailored to Ayush Trivedi.

---

## 3. COLOR SYSTEM & ATMOSPHERE

### Primary Palette (Warm Studio Dark Mode)

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#0C0C0C` | Deep ink background |
| `--color-surface` | `#141414` | Architectural studio surfaces |
| `--color-surface-elev` | `#1C1C1C` | Elevated document planes & panels |
| `--color-border` | `#2A2A2A` | Clean drafting / divider lines |
| `--color-text-primary` | `#F0EDE8` | Warm chalk primary typography |
| `--color-text-secondary`| `#8A8680` | Muted editorial secondary text |
| `--color-text-tertiary` | `#4A4845` | Drafting annotations and mono metadata |
| `--color-accent` | `#D4A853` | Architectural warm gold accent |
| `--color-accent-muted` | `#8A6D35` | Subtle gold tint |
| `--color-accent-subtle`| `#2A2118` | Warm ambient ground tint |

### Anti-Cliché AI Design Rule:
- Strictly NO purple/blue glowing neon blobs.
- Strictly NO robot emojis (🤖), glowing orbs, or particle network meshes.
- Strictly NO floating decorative dot fields.
- AI intelligence is communicated through conversational quality and grounding, not visual clichés.

---

## 4. TYPOGRAPHY SYSTEM

- **Display & Headings**: `Playfair Display` (editorial serif) / high-contrast bold titles.
- **Interface & Reading Body**: `Inter` (high legibility, neutral, optimized line heights).
- **Technical & Annotations**: `JetBrains Mono` (drafting labels, code blocks, technical stats).

### Typographic Scale
- `Display Hero`: `clamp(64px, 10vw, 150px)`
- `Section Markers`: `clamp(48px, 8vw, 110px)`
- `Heading Large`: `clamp(28px, 4vw, 48px)`
- `Heading Medium`: `clamp(20px, 2.5vw, 32px)`
- `Body Lead`: `clamp(16px, 1.4vw, 20px)`
- `Body Text`: `15px – 16px` (line height 1.7)
- `Mono Small`: `12px – 13px`

---

## 5. 3D SPATIAL RESUME EXPERIENCE (CREATIVE PRODUCT FEATURE)

- **Desktop (Interactive Spatial Studio)**:
  - Presents Ayush's verified resume sections (Education, AICTE Internship, Projects, Skills, Certifications) as **layered spatial drafting sheets floating in 3D perspective**.
  - Smooth camera movements glide naturally between sections upon scroll or direct selection.
  - Active sheets elevate for optimal reading contrast.
- **Mobile (Touch-First Layered Perspective)**:
  - Touch-optimized card-stacking perspective flow with smooth swipe and elevation gestures.
  - 100% accessible, high performance (60fps), zero tiny controls, and zero horizontal overflow.

---

## 6. MOTION & ACCESSIBILITY

- **Semantic Animation**: Every movement guides the eye through the story (Hero $\rightarrow$ 3D Spatial Resume $\rightarrow$ Case Studies $\rightarrow$ Craft $\rightarrow$ Assistant $\rightarrow$ Contact).
- **Reduced Motion**: When `prefers-reduced-motion: reduce` is active, all 3D camera travel and parallax disable automatically into clean static layouts.