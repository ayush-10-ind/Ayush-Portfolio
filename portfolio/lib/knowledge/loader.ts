// lib/knowledge/loader.ts
// Knowledge base loader and structured domain retrieval for Ayush Trivedi's portfolio

import { EntityTopic } from "@/lib/ai/entityExtraction";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { experiences, educationList, certifications } from "@/lib/data/experience";
import { skillGroups } from "@/lib/data/skills";

/**
 * Retrieve targeted, verified factual context based on extracted topic
 */
export function getContextForTopic(topic: EntityTopic, secondaryTopics: EntityTopic[] = []): string {
  const sections: string[] = [];

  // Core Identity Baseline
  sections.push(`
=== AYUSH TRIVEDI (FACTUAL IDENTITY) ===
- Full Name: Ayush Trivedi
- Current Role: Computer Science & Engineering Student at Noida Institute of Engineering and Technology (NIET, Gr. Noida)
- Academic Standing: 8.4 CGPA (B.Tech CSE, Expected Graduation: 2028)
- Location: Greater Noida (Gr. Noida), Uttar Pradesh, India
- Email: ayushtrivediayushtrivedi2@gmail.com
- Direct Phone: +91 8303155683
- GitHub: github.com | LinkedIn: linkedin.com
- Availability: Seeking software engineering internships and developer opportunities.
`);

  // Domain Specific Injections
  switch (topic) {
    case "agnipress":
    case "spring_boot": {
      const agni = projects.find((p) => p.id === "agnipress")!;
      sections.push(`
=== FEATURED PROJECT: AGNIPRESS (NEWS & PUBLISHING PORTAL) ===
- Project Title: ${agni.name}
- Category: Full-Stack Web Systems / Java 21 & Spring Boot 3
- Verified Tech Stack: Java 21, Spring Boot 3, Spring Data JPA, Spring Security (OAuth2 / OIDC), Relational Database (Oracle / MySQL), Thymeleaf, HTML5, CSS3, REST APIs & Spring WebClient, Cron Schedulers.
- Problem Solved: Real-time multi-source news and weather feed aggregation, automated scheduled ingestion, user personalization (bookmarks, reading history, notifications), and secure role-based access control without database locking.
- Architecture: Decoupled MVC & DTO architecture cleanly separating Controller REST/web endpoints, Service business logic, JPA Repository persistence, background scheduled jobs (NewsScheduler, NewsCleanupService), and custom Spring Security filter chains.
- Technical Decisions:
  1. Why Spring Boot 3 & JPA: Provides declarative transaction management, robust dependency injection, and native security integrations for relational data modeling.
  2. How feed ingestion works: Server-side background workers (NewsScheduler) use Spring WebClient and custom DTO mappers to fetch, validate, and persist external article feeds while asynchronously cleaning up stale records.
  3. Security Architecture: Custom Spring Security filter chains supporting standard credential authentication and OAuth2 / OIDC social login with role-based access control.
- Engineering Challenges Solved: Interconnected relational data integrity (bookmarks, reading history, notifications, OAuth accounts) and handling external API schema variations with fallback mapping.
- Outcome: Completed full-stack publishing engine with automated background ingestion and responsive reading interface.
`);
      break;
    }

    case "explainable_ai": {
      const xai = projects.find((p) => p.id === "explainable-ai-research")!;
      sections.push(`
=== FEATURED PROJECT: EXPLAINABLE AI RESEARCH PROJECT ===
- Project Title: ${xai.name}
- Category: Machine Learning / Artificial Intelligence (XAI)
- Verified Tech Stack: Python, Machine Learning, Explainable AI (XAI), Feature Attribution, Data Analysis & Visualization.
- Problem Solved: Complex machine learning models frequently operate as opaque black boxes, making high-stakes decision auditing and prediction verification opaque.
- Approach & Solution: Researched and evaluated Explainable AI (XAI) attribution methods to inspect model inference mechanisms, analyze feature importance distributions, and provide human-interpretable explanations of algorithmic decision pathways.
- Architecture: Python-based analytics pipeline analyzing prediction activations, feature attribution scoring, and prediction interpretability visualizations.
- Technical Decisions:
  1. Why Python: Standard scientific and machine learning ecosystem for numerical matrix computations, model inspection, and rapid algorithmic validation.
  2. How interpretability is evaluated: Analyzed post-hoc feature attribution techniques to quantify individual input feature contributions toward final model predictions.
- Engineering Challenges: Analyzing decision boundaries across complex machine learning model predictions without mathematical distortion.
- Outcome: Completed comprehensive research analysis on XAI methods with public GitHub repository and YouTube technical demonstration.
`);
      break;
    }

    case "flappy_bird": {
      sections.push(`
=== HISTORICAL PROJECT: FLAPPY BIRD GAME (JAVA) ===
- Category: Desktop Application / Object-Oriented Systems
- Verified Tech Stack: Java, Object-Oriented Programming (OOP), Collision Detection, Data Structures.
- Problem Solved: Real-time 2D game loop synchronization, coordinate bounding-box collision detection, obstacle generation, and score tracking without frame drops.
- Approach: Built a pure Java desktop game applying OOP principles, modular entity classes, and responsive collision physics.
- Note: This is an authentic past project in Ayush's background, though the current portfolio features AgniPress and Explainable AI as its primary showcase.
`);
      break;
    }

    case "java": {
      sections.push(`
=== TECHNICAL DECISION: WHY JAVA? ===
- Why Ayush uses Java: Strong static typing, deterministic memory management, and explicit object-oriented programming foundations. Used extensively for systems architecture, desktop applications (Flappy Bird), and enterprise backend engineering (AgniPress with Spring Boot 3).
- Competencies: Core Java, OOP design patterns, collections, exception handling, multithreading, and Spring Boot framework.
`);
      break;
    }

    case "python": {
      sections.push(`
=== TECHNICAL DECISION: WHY PYTHON? ===
- Why Ayush uses Python: Rich scientific computing ecosystem, expressive syntax, and mature machine learning libraries. Used for Explainable AI (XAI) research and during his Python Developer Internship at AICTE Code Technologies.
- Competencies: Python OOP, file handling, recursion, algorithmic problem solving, machine learning libraries, and data analysis.
`);
      break;
    }

    case "aicte_internship": {
      const exp = experiences[0];
      sections.push(`
=== INDUSTRY EXPERIENCE: AICTE CODE TECHNOLOGIES ===
- Role: Python Developer Intern
- Duration: June 2025 – July 2025
- Organization: AICTE Code Technologies
- Key Contributions:
  1. Developed modular Python programs utilizing robust file handling, recursion, functions, loops, and OOP concepts.
  2. Solved practical programming challenges and applied debugging methodologies to optimize code execution.
  3. Built applications following modern software engineering best practices and clean code guidelines.
  4. Strengthened algorithmic problem-solving speed and code optimization techniques.
- Verified Credential: Completed internship program with verified certification.
`);
      break;
    }

    case "niet_education": {
      const btech = educationList[0];
      const kv = educationList[1];
      sections.push(`
=== ACADEMIC EDUCATION ===
1. Undergrad: ${btech.degree} at ${btech.institution} (${btech.period}).
   - Academic Standing: 8.4 CGPA.
   - Major: Computer Science and Engineering.
   - Location: Greater Noida, India.
2. Secondary: ${kv.degree} at ${kv.institution} (${kv.period}). Location: Raebareli, India.
`);
      break;
    }

    case "certifications": {
      sections.push(`
=== VERIFIED CERTIFICATIONS ===
1. Python Developer Internship — AICTE Code Technologies
2. Infosys Twitter Bootstrap Certification — Infosys Springboard (Responsive UI Design)
3. Infosys Database Management System Certification — Infosys Springboard (Relational Databases & SQL)
`);
      break;
    }

    case "skills":
    case "javascript_react":
    case "oracle_database": {
      sections.push(`
=== TECHNICAL SKILLS SUMMARY ===
- Languages: Java (Core & OOP), Python, JavaScript (ES6+)
- Backend & Frameworks: Spring Boot 3, Spring Data JPA, Spring Security, REST APIs
- Databases: Oracle Database, Relational Schema Design, SQL
- Frontend: React.js, HTML5, CSS3, Tailwind CSS
- Developer Tools: Git, GitHub, VS Code, LeetCode / DSA
`);
      break;
    }

    case "football_athletics":
    case "dsa_leetcode": {
      sections.push(`
=== EXTRACURRICULAR & DISCIPLINE ===
- Athletics: Active football player. Develops tactical discipline, high-pressure communication, adaptability, and teamwork.
- Problem Solving: Daily engagement with Data Structures & Algorithms (DSA) on LeetCode and competitive programming challenges.
`);
      break;
    }

    case "contact_info": {
      sections.push(`
=== CONTACT INFORMATION ===
- Email: ayushtrivediayushtrivedi2@gmail.com
- Phone: +91 8303155683
- Location: Greater Noida (Gr. Noida), Uttar Pradesh, India
- LinkedIn: linkedin.com
- GitHub: github.com
`);
      break;
    }

    default: {
      // General overview injecting core summary
      sections.push(`
=== COMPREHENSIVE OVERVIEW ===
- Education: B.Tech CSE at NIET Gr. Noida (8.4 CGPA, Expected 2028).
- Experience: Python Developer Intern at AICTE Code Technologies (June–July 2025).
- Featured Projects: AgniPress (Java 21/Spring Boot 3 News Engine) & Explainable AI Research Project (Python/ML Interpretability).
- Core Stack: Java, Python, JavaScript, React.js, Spring Boot, Oracle Database.
- Certifications: AICTE Python Internship, Infosys Bootstrap, Infosys DBMS.
- Athletics: Football player & competitive DSA problem solver.
`);
      break;
    }
  }

  // Include secondary topics if relevant
  if (secondaryTopics.includes("spring_boot") && topic !== "agnipress") {
    sections.push(`- Key Backend Architecture: AgniPress built with Spring Boot 3, JPA, and OAuth2.`);
  }
  if (secondaryTopics.includes("explainable_ai") && topic !== "explainable_ai") {
    sections.push(`- Key AI Research: Explainable AI Research Project exploring ML model interpretability in Python.`);
  }

  return sections.join("\n");
}

export function getFullKnowledgeContext(): string {
  return getContextForTopic("general_profile");
}