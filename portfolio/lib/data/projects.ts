// lib/data/projects.ts — Authoritative featured projects for Ayush Trivedi
import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "agnipress",
    name: "AgniPress",
    tagline: "Full-stack publishing engine engineered with clean architectural separation and optimized content delivery.",
    type: "Full-Stack Application / Web Systems",
    status: "complete",
    period: "2025",
    problem:
      "Modern editorial platforms frequently suffer from monolithic bloat, slow database querying for content hierarchies, and brittle coupling between editorial management and reading experiences.",
    solution:
      "Engineered AgniPress as an efficient, modern publishing engine with modular service boundaries for content persistence, API delivery, and responsive editorial interfaces.",
    architecture:
      "Decoupled full-stack architecture featuring structured database storage, API layer for content retrieval, and a responsive frontend reading experience.",
    decisions: [
      {
        question: "Why a decoupled architecture for AgniPress?",
        answer: "Decoupling content management from presentation allows independent scalability, caching optimization, and clean API boundaries for diverse client consumers.",
        alternativesConsidered: "A coupled monolithic CMS was considered, but decoupled services provide superior maintainability and performance.",
      },
    ],
    challenges: [
      "Designing efficient relational and document schemas for dynamic content categorization and authoring.",
      "Ensuring sub-second content rendering and responsive typography across diverse devices.",
    ],
    outcome:
      "High-performance publishing engine with clean codebase structure and scalable content management workflows.",
    technologies: ["JavaScript / TypeScript", "Node.js", "Database Systems", "React / Modern Web", "REST APIs"],
    links: {
      github: "https://github.com",
    },
    featured: true,
    order: 1,
  },
  {
    id: "explainable-ai-research",
    name: "Explainable AI Research Project",
    tagline: "Researched Explainable AI (XAI) techniques to improve transparency and interpretability of machine learning models.",
    type: "Machine Learning / Research",
    status: "complete",
    period: "2024 – 2025",
    problem:
      "Understanding model predictions and decision-making processes in machine learning models that often function as opaque black boxes.",
    solution:
      "Researched Explainable AI (XAI) techniques to analyze model predictions, improve transparency, and evaluate decision-making pipelines for improved interpretability.",
    architecture:
      "Python-based machine learning workflow analyzing feature attributions and prediction interpretability.",
    decisions: [
      {
        question: "Why Python and ML frameworks for Explainable AI?",
        answer: "Python provides robust machine learning libraries and computational tooling suited for model auditing and interpretability algorithms.",
        alternativesConsidered: "Evaluated generic analytical tooling, but Python offered the most cohesive ecosystem for machine learning research.",
      },
    ],
    challenges: [
      "Analyzing decision boundaries across complex machine learning model predictions.",
      "Providing clear, interpretable representations of model decision mechanics.",
    ],
    outcome:
      "Completed research analysis on XAI methods with public GitHub repository and YouTube technical demonstration.",
    technologies: ["Python", "Machine Learning", "Explainable AI (XAI)"],
    links: {
      github: "https://github.com",
      live: "https://youtube.com",
    },
    featured: true,
    order: 2,
  },
  {
    id: "flappy-bird-java",
    name: "Flappy Bird Game",
    tagline: "Java-based game implementing collision detection, obstacle generation, score tracking, and OOP principles.",
    type: "Desktop Application / Systems",
    status: "complete",
    period: "2024",
    problem:
      "Designing deterministic 2D game loops, real-time bounding-box collision detection, dynamic obstacle spawning, and score tracking.",
    solution:
      "Developed a Java-based Flappy Bird game applying object-oriented programming principles to manage game logic, collision detection, and obstacle generation.",
    architecture:
      "Object-oriented architecture cleanly separating game entities, collision detection routines, obstacle generation algorithms, and score tracking state.",
    decisions: [
      {
        question: "Why Java for the game?",
        answer: "Java provides strong object-oriented programming foundations, deterministic control over entity state, and robust memory management.",
        alternativesConsidered: "Considered script-based alternatives, but Java was chosen to solidify core OOP and data structures principles.",
      },
    ],
    challenges: [
      "Precision collision detection between dynamic bird coordinates and moving obstacle pipes.",
      "Managing game state transitions (start, active gameplay, game over, score reset).",
    ],
    outcome:
      "Functional desktop game demonstrating OOP principles, published on GitHub.",
    technologies: ["Java", "Object-Oriented Programming (OOP)", "Collision Detection"],
    links: {
      github: "https://github.com",
    },
    featured: true,
    order: 3,
  },
  {
    id: "personal-portfolio-website",
    name: "Personal Portfolio Website",
    tagline: "Responsive portfolio website featuring dark mode, mobile-first design, and smooth UI animations.",
    type: "Web Development",
    status: "complete",
    period: "2024 – 2025",
    problem:
      "Creating an accessible, user-friendly personal website to showcase projects, technical skills, and professional profile across devices.",
    solution:
      "Designed and deployed a responsive portfolio website featuring dark mode, mobile-first design, and smooth UI animations.",
    architecture:
      "Clean modular frontend structure showcasing projects, skills, education, and contact in a user-friendly interface.",
    decisions: [
      {
        question: "Why HTML5, CSS3, and JavaScript?",
        answer: "Mastering foundational web standards ensures responsive performance, semantic structure, and smooth animations without heavy dependencies.",
        alternativesConsidered: "Static template generators were considered, but building from fundamentals ensured direct control over UI responsiveness and dark mode design.",
      },
    ],
    challenges: [
      "Ensuring clean mobile-first layout fluidity across diverse viewport resolutions.",
      "Implementing smooth UI animations and dark mode theme transitions.",
    ],
    outcome:
      "Deployed responsive portfolio showcasing projects, skills, and professional profile.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    links: {
      github: "https://github.com",
    },
    featured: true,
    order: 4,
  },
];

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export const getAllProjects = (): Project[] =>
  projects.sort((a, b) => a.order - b.order);

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);