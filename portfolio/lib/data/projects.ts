// lib/data/projects.ts — 100% verified factual projects for Ayush Trivedi
import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "agnipress",
    name: "AgniPress (News Portal)",
    tagline: "Full-stack publishing engine & news platform with Spring Boot, JPA, and automated feed ingestion.",
    type: "Full-Stack Web Systems / Java",
    status: "complete",
    period: "2025",
    problem:
      "Modern news platforms require real-time aggregation from multi-source external APIs, scheduled background ingestion, user personalization (bookmarks, reading history), and secure role-based authentication without system degradation.",
    solution:
      "Engineered a full-stack publishing portal using Java 21, Spring Boot 3, and Spring Data JPA. Developed automated scheduling services for external news and weather APIs, role-based access control with OAuth2 login, dynamic bookmarking, live channel streaming, and reading history tracking.",
    architecture:
      "Decoupled MVC & DTO architecture separating Controller endpoints, Service business logic, JPA Repository persistence, scheduled background jobs (NewsScheduler, NewsCleanupService), and custom Spring Security filter chains.",
    decisions: [
      {
        question: "Why Spring Boot and Spring Data JPA for AgniPress?",
        answer: "Spring Boot provides robust dependency injection, production-ready security integrations, and transaction management, while Spring Data JPA simplifies relational data modeling for users, bookmarks, categories, and articles.",
        alternativesConsidered: "Considered lightweight microframeworks, but Spring Boot was chosen for comprehensive enterprise security, declarative transactions, and mature ORM tooling.",
      },
      {
        question: "How is external news ingestion handled?",
        answer: "Implemented scheduled background tasks (NewsScheduler) using Spring WebClient and custom DTO mappers to fetch, validate, and persist external article feeds while cleaning up stale records asynchronously.",
      },
    ],
    challenges: [
      "Managing relational data integrity across interconnected user interactions (bookmarks, notifications, reading history, OAuth accounts).",
      "Handling external API schema variations and rate limits with robust exception handling and fallback mapping.",
    ],
    outcome:
      "Complete full-stack publishing platform with role-based security, OAuth2 integration, automated background news ingestion, and responsive editorial interfaces.",
    technologies: [
      "Java 21",
      "Spring Boot 3",
      "Spring Data JPA",
      "Spring Security (OAuth2)",
      "Oracle / Relational DBMS",
      "Thymeleaf / HTML5 / CSS3",
      "REST APIs & WebClient",
    ],
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
      "Machine learning models often operate as opaque black boxes, making it challenging to understand decision boundaries, interpret predictions, and audit algorithmic outcomes.",
    solution:
      "Researched and evaluated Explainable AI (XAI) methods to inspect model inference mechanisms, analyze feature importance distributions, and enhance model interpretability.",
    architecture:
      "Python-based machine learning analytics pipeline analyzing model inference activations, prediction interpretability, and feature attribution.",
    decisions: [
      {
        question: "Why Python for Explainable AI research?",
        answer: "Python provides the standard scientific and machine learning ecosystem necessary for matrix computations, model inspection, and rapid algorithmic validation.",
        alternativesConsidered: "Considered R, but Python was chosen for broader framework interoperability and standard ML library tooling.",
      },
    ],
    challenges: [
      "Analyzing decision boundaries across complex machine learning model predictions.",
      "Providing clear, interpretable representations of model decision mechanics without mathematical distortion.",
    ],
    outcome:
      "Completed comprehensive research analysis on XAI methods with public GitHub repository and YouTube technical demonstration.",
    technologies: ["Python", "Machine Learning", "Explainable AI (XAI)", "Data Analysis"],
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
    tagline: "Java desktop game engine implementing collision physics, obstacle generation, score tracking, and OOP principles.",
    type: "Desktop Application / Systems",
    status: "complete",
    period: "2024",
    problem:
      "Designing a deterministic 2D game loop with real-time coordinate bounding-box collision detection, obstacle generation, and score tracking without frame stutter.",
    solution:
      "Developed a pure Java game applying object-oriented programming principles to manage game logic, collision detection algorithms, obstacle spawning, and game state transitions.",
    architecture:
      "Object-oriented architecture cleanly separating game entities, coordinate collision detection algorithms, obstacle generator routines, and score state management.",
    decisions: [
      {
        question: "Why Java for desktop game development?",
        answer: "Java enforces strong static typing, explicit memory modeling, and OOP encapsulation, making it ideal for mastering deterministic state machines and entity management.",
        alternativesConsidered: "Considered script-based canvas frameworks, but Java was chosen to solidify core OOP and computational foundations.",
      },
    ],
    challenges: [
      "Precision collision detection between dynamic bird coordinates and moving obstacle pipes.",
      "Managing game state transitions (start, active gameplay, game over, score reset).",
    ],
    outcome:
      "Functional desktop game demonstrating OOP principles and collision physics, published on GitHub.",
    technologies: ["Java", "Object-Oriented Programming (OOP)", "Collision Detection", "Data Structures"],
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
        alternativesConsidered: "Static site generators were considered, but building from fundamentals ensured direct control over UI responsiveness and dark mode design.",
      },
    ],
    challenges: [
      "Ensuring clean mobile-first layout fluidity across diverse viewport resolutions.",
      "Implementing smooth UI animations and dark mode theme transitions.",
    ],
    outcome:
      "Deployed responsive portfolio showcasing projects, skills, and professional profile.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI Animations"],
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