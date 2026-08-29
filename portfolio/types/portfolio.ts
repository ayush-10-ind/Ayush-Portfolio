// types/portfolio.ts — Portfolio Data Type Definitions
// All data consumed by section components must conform to these types.

// ── Projects ───────────────────────────────────────────────────────────────

export interface TechnicalDecision {
  question: string;
  answer: string;
  alternativesConsidered?: string;
}

export interface ProjectLink {
  github?: string;
  live?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  type: string; // "Web App" | "API" | "CLI" | "Mobile" | etc.
  status: "complete" | "in-progress" | "archived";
  period: string; // e.g. "Jan 2024 – Mar 2024"
  problem: string;
  solution: string;
  architecture: string;
  decisions: TechnicalDecision[];
  challenges: string[];
  outcome: string;
  technologies: string[];
  links: ProjectLink;
  featured: boolean;
  order: number;
}

// ── Experience ─────────────────────────────────────────────────────────────

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: "full-time" | "internship" | "contract" | "freelance";
  period: {
    start: string; // e.g. "Jan 2023"
    end: string;   // e.g. "Dec 2023" or "Present"
  };
  location: string; // e.g. "Remote" or "Mumbai, India"
  responsibilities: string[];
  technologies: string[];
  highlights: string[];
  order: number;
}

// ── Skills ─────────────────────────────────────────────────────────────────

export type SkillLevel = "primary" | "proficient" | "familiar" | "academic";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  domain: string; // e.g. "Languages", "Frontend", "Backend", "Infrastructure"
  skills: Skill[];
}

// ── Profile ────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Profile {
  name: string;
  preferredName: string;
  title: string;
  location: string;
  availability: string;
  email: string;
  socials: SocialLink[];
  bio: string; // Short 1–2 sentence authentic description
  tagline: string; // Single impactful line
}
