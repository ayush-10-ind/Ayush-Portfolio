# prd.md — Product Requirements Document
> Version: 2.3.0 | Last updated: 2026-08-29

---

## 1. PRODUCT VISION
Design and build a premium, highly interactive, responsive personal developer portfolio for **Ayush Trivedi** (Computer Science & Engineering Student at NIET Greater Noida, Java & Python Developer, XAI Researcher).

The website integrates an editorial engineering showcase, deep-dive featured case studies, an interactive 3D spatial resume studio, and a grounded AI assistant.

---

## 2. PROJECT HIERARCHY & CASE STUDIES SCOPE

The featured **Projects / Case Studies** section showcases **EXCLUSIVELY two flagship engineering works**:

1. **01 — AgniPress** (Full-Stack Publishing Engine / Web Systems / Java 21, Spring Boot 3, JPA, Spring Security)
2. **02 — Explainable AI Research Project** (Machine Learning / Python / Model Interpretability)

*Note: Other historical works (e.g. Flappy Bird Game, Personal Portfolio Website) remain in the background knowledge base for conversational grounding but are excluded from the main featured Case Studies UI.*

---

## 3. USER PERSONAS & GOALS

### Persona 1: Tech Recruiter / Talent Lead
- **Need**: Fast validation of university credentials, GPA (8.4 CGPA), core skills (Java, Python, React, Oracle), AICTE internship, and contact links.
- **Goal**: Confirm qualifications within 45 seconds; access resume and email in 1 click.

### Persona 2: Engineering Hiring Manager / Lead Architect
- **Need**: Concrete evidence of technical thinking, full-stack architecture (AgniPress), and machine learning interpretability (Explainable AI).
- **Goal**: Deep-dive into technical case studies with clear problem, architecture, decision tradeoffs, and challenges.

### Persona 3: Creative Technologist / Frontend Evaluator
- **Need**: Experience an original 3D spatial web experience that runs at 60fps with zero layout bugs.
- **Goal**: Explore the 3D spatial resume across desktop and mobile.

---

## 4. FUNCTIONAL REQUIREMENTS

- **FR-01: Hero & Identity**: Impactful editorial typography, student & developer status, Greater Noida location.
- **FR-02: 3D Spatial Resume Studio**: Interactive spatial drafting studio displaying verified resume sections in 3D perspective with touch-first mobile fallback.
- **FR-03: Featured Case Studies (2 Flagships)**: Deep-dive breakdowns for **AgniPress** and **Explainable AI Research Project**.
- **FR-04: Grounded AI Assistant**: Configurable LLM-powered natural language assistant (`AI_MODEL_NAME`), strictly grounded in `knowledge.md` with zero hallucinations.
- **FR-05: Skills & Craft**: Grouped typographic list (Languages, Frontend, Databases, Tools) without arbitrary percentage bars.
- **FR-06: Experience & Credentials**: AICTE Python Developer internship details and Infosys/AICTE certifications.
- **FR-07: Contact Channels**: Direct email (`ayushtrivediayushtrivedi2@gmail.com`), phone (+91 8303155683), GitHub, LinkedIn.
- **FR-08: Incremental Git Workflow**: Every phase completed with verified conventional commits pushed to the remote repository.
- **FR-09: Responsive & Accessibility**: 100% functional from 375px mobile to 1600px desktop, WCAG 2.1 AA compliant.