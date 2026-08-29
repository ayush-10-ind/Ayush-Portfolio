// lib/data/projects.ts — Featured Case Studies for Ayush Trivedi
// Showcases exclusively the two premier engineering projects: AgniPress & Explainable AI
import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "agnipress",
    name: "AgniPress (News & Content Engine)",
    tagline: "Full-stack publishing engine & news portal engineered with Java 21, Spring Boot 3, Spring Data JPA, and automated feed ingestion pipelines.",
    type: "Full-Stack Web Systems / Java 21",
    status: "complete",
    period: "2025",
    problem:
      "Modern editorial platforms require real-time aggregation from multi-source external news and weather APIs, scheduled background ingestion, user personalization (bookmarks, reading history, notifications), and secure role-based access control without compromising database transactional integrity or interface responsiveness.",
    solution:
      "Engineered a full-stack publishing portal using Java 21, Spring Boot 3, and Spring Data JPA. Designed automated scheduling services for external news and weather APIs, role-based access control with OAuth2 login, dynamic bookmarking, live channel streaming, and reading history tracking.",
    architecture:
      "Decoupled MVC & DTO architecture separating Controller endpoints, Service business logic, JPA Repository persistence, scheduled background jobs (NewsScheduler, NewsCleanupService), and custom Spring Security filter chains.",
    decisions: [
      {
        question: "Why Spring Boot 3 and Spring Data JPA for AgniPress?",
        answer: "Spring Boot 3 provides robust dependency injection, production-ready security integrations, and transaction management, while Spring Data JPA simplifies relational data modeling for users, bookmarks, categories, and articles.",
        alternativesConsidered: "Considered lightweight microframeworks, but Spring Boot was chosen for comprehensive enterprise security, declarative transactions, and mature ORM tooling.",
      },
      {
        question: "How is automated news ingestion and lifecycle managed?",
        answer: "Implemented scheduled background tasks (NewsScheduler) using Spring WebClient and custom DTO mappers to fetch, validate, and persist external article feeds while cleaning up stale records asynchronously via NewsCleanupService.",
        alternativesConsidered: "Considered client-side fetching, but server-side background ingestion ensures consistent data normalization, centralized caching, and reduced client network overhead.",
      },
      {
        question: "How is user authentication and session security structured?",
        answer: "Implemented a custom Spring Security filter chain supporting standard username/password authentication alongside OAuth2 / OIDC social login, with role-based endpoint protection and custom access-denied handlers.",
      },
    ],
    challenges: [
      "Managing relational data integrity across interconnected user entities (bookmarks, notifications, reading history, OAuth accounts).",
      "Handling external API schema variations and rate limits with robust exception handling and fallback mapping.",
      "Optimizing scheduled database writes to prevent locking during peak ingestion cycles.",
    ],
    outcome:
      "Complete full-stack publishing platform with role-based security, OAuth2 integration, automated background news ingestion, and responsive editorial interfaces.",
    technologies: [
      "Java 21",
      "Spring Boot 3",
      "Spring Data JPA",
      "Spring Security (OAuth2 / OIDC)",
      "Oracle / Relational DBMS",
      "Thymeleaf / HTML5 / CSS3",
      "REST APIs & WebClient",
      "Scheduled Tasks (Cron)",
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
    tagline: "Researching model interpretability, feature attribution distributions, and decision transparency in machine learning pipelines.",
    type: "Machine Learning / Research / Python",
    status: "complete",
    period: "2024 – 2025",
    problem:
      "Complex machine learning models frequently operate as opaque black boxes. In high-stakes applications, the inability to understand internal decision boundaries, verify feature importance distributions, and audit model predictions introduces severe transparency and trust deficits.",
    solution:
      "Researched and evaluated Explainable AI (XAI) attribution methods to inspect model inference mechanisms, analyze feature importance distributions, and provide human-interpretable explanations of algorithmic decision pathways.",
    architecture:
      "Python-based machine learning analytics pipeline evaluating model prediction weights, feature attribution scoring, and prediction interpretability visualizations.",
    decisions: [
      {
        question: "Why Python for Explainable AI research?",
        answer: "Python provides the standard scientific and machine learning ecosystem necessary for matrix computations, model inspection, and rapid algorithmic validation.",
        alternativesConsidered: "Considered R for statistical depth, but Python was chosen for broader framework interoperability and standard ML library tooling.",
      },
      {
        question: "How is model interpretability evaluated?",
        answer: "Analyzed post-hoc feature attribution techniques to quantify individual input feature contributions toward final model predictions, comparing local and global explanation fidelity.",
      },
    ],
    challenges: [
      "Analyzing decision boundaries across complex machine learning model predictions.",
      "Providing clear, interpretable representations of model decision mechanics without mathematical distortion.",
      "Balancing computational overhead during real-time feature attribution calculation.",
    ],
    outcome:
      "Completed comprehensive research analysis on XAI methods with public GitHub repository and YouTube technical demonstration.",
    technologies: [
      "Python",
      "Machine Learning",
      "Explainable AI (XAI)",
      "Feature Attribution",
      "Model Interpretability",
      "Data Analysis & Visualization",
    ],
    links: {
      github: "https://github.com",
      live: "https://youtube.com",
    },
    featured: true,
    order: 2,
  },
];

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export const getAllProjects = (): Project[] =>
  projects.sort((a, b) => a.order - b.order);

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);