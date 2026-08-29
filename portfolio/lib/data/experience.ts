// lib/data/experience.ts — 100% factual experience & education from resume
import type { Experience } from "@/types/portfolio";

export const experiences: Experience[] = [
  {
    id: "aicte-intern",
    company: "AICTE Code Technologies",
    role: "Python Developer Intern",
    type: "internship",
    period: {
      start: "June 2025",
      end: "July 2025",
    },
    location: "Remote / India",
    responsibilities: [
      "Developed modular Python programs utilizing robust file handling, recursion, loops, and OOP concepts.",
      "Solved practical programming challenges and applied debugging methodologies to optimize code execution.",
      "Built applications following modern software engineering best practices and clean code guidelines.",
      "Strengthened algorithmic problem-solving speed and code optimization techniques.",
    ],
    technologies: ["Python", "OOP", "File Handling", "Data Structures", "Debugging"],
    highlights: [
      "Successfully completed rigorous Python developer internship program with verified credential.",
      "Implemented modular software components with automated test routines.",
    ],
    order: 1,
  },
];

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade: string;
  location: string;
}

export const educationList: EducationEntry[] = [
  {
    id: "btech-niet",
    institution: "Noida Institute of Engineering and Technology (NIET)",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Expected 2028",
    grade: "8.4 CGPA",
    location: "Greater Noida, India",
  },
  {
    id: "intermediate-kv",
    institution: "Kendriya Vidyalaya Raebareli",
    degree: "12th Grade (Intermediate)",
    period: "2021 – 2022",
    grade: "Completed",
    location: "Raebareli, India",
  },
];

export interface CertificationEntry {
  title: string;
  issuer: string;
  credentialUrl?: string;
}

export const certifications: CertificationEntry[] = [
  {
    title: "Python Developer Internship",
    issuer: "AICTE Code Technologies",
    credentialUrl: "https://aicte-india.org",
  },
  {
    title: "Infosys Twitter Bootstrap Certification",
    issuer: "Infosys Springboard",
    credentialUrl: "https://infosys.com",
  },
  {
    title: "Infosys Database Management System Certification",
    issuer: "Infosys Springboard",
    credentialUrl: "https://infosys.com",
  },
];

export const getAllExperiences = (): Experience[] =>
  experiences.sort((a, b) => a.order - b.order);