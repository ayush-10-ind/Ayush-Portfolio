// lib/data/skills.ts — 100% factual skills from resume
import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    domain: "Programming Languages",
    skills: [
      { name: "Java (Core & OOP)", level: "primary" },
      { name: "Python", level: "primary" },
      { name: "JavaScript (ES6+)", level: "proficient" },
    ],
  },
  {
    domain: "Frontend Technologies",
    skills: [
      { name: "React.js", level: "primary" },
      { name: "HTML5", level: "primary" },
      { name: "CSS3 & Tailwind", level: "primary" },
    ],
  },
  {
    domain: "Databases & Storage",
    skills: [
      { name: "Oracle Database", level: "proficient" },
      { name: "DBMS & SQL", level: "proficient" },
    ],
  },
  {
    domain: "Developer Tools & Platforms",
    skills: [
      { name: "Git", level: "primary" },
      { name: "GitHub", level: "primary" },
      { name: "VS Code", level: "primary" },
      { name: "LeetCode / DSA", level: "proficient" },
    ],
  },
];

export const getAllSkillGroups = (): SkillGroup[] => skillGroups;