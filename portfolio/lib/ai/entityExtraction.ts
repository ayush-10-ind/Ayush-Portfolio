// lib/ai/entityExtraction.ts
// Semantic topic and entity extraction with conversational follow-up resolution

import type { Message, ConversationContext } from "@/types/assistant";

export type EntityTopic =
  | "agnipress"
  | "explainable_ai"
  | "flappy_bird"
  | "portfolio_site"
  | "java"
  | "python"
  | "javascript_react"
  | "spring_boot"
  | "oracle_database"
  | "aicte_internship"
  | "niet_education"
  | "certifications"
  | "football_athletics"
  | "dsa_leetcode"
  | "contact_info"
  | "skills"
  | "technical_decision"
  | "general_profile"
  | "unknown";

export interface ExtractionResult {
  primaryTopic: EntityTopic;
  secondaryTopics: EntityTopic[];
  isFollowUp: boolean;
  resolvedSubject: string;
}

/**
 * Extract semantic entity and resolve conversational context
 */
export function extractEntitiesAndTopic(
  query: string,
  history: Message[] = [],
  pageContext?: ConversationContext
): ExtractionResult {
  const q = query.toLowerCase().trim();
  const secondaryTopics: EntityTopic[] = [];

  // Check recent conversation history for active topic resolution
  let priorTopic: EntityTopic | null = null;
  if (history.length > 0) {
    for (let i = history.length - 1; i >= 0; i--) {
      const msg = history[i].content.toLowerCase();
      if (msg.includes("agnipress") || msg.includes("news portal") || msg.includes("publishing")) {
        priorTopic = "agnipress";
        break;
      }
      if (msg.includes("explainable ai") || msg.includes("xai") || msg.includes("interpretability") || msg.includes("transparency")) {
        priorTopic = "explainable_ai";
        break;
      }
      if (msg.includes("flappy") || msg.includes("game")) {
        priorTopic = "flappy_bird";
        break;
      }
      if (msg.includes("internship") || msg.includes("aicte")) {
        priorTopic = "aicte_internship";
        break;
      }
      if (msg.includes("education") || msg.includes("niet") || msg.includes("college") || msg.includes("university")) {
        priorTopic = "niet_education";
        break;
      }
    }
  }

  // Detect follow-up references
  const isFollowUpPattern =
    /\b(it|this|that|the project|the app|the system|the backend|the challenge|the database|why spring boot|what db|how does it work)\b/i.test(q);

  // 1. Language & Technical Decisions (High Priority)
  if (/\b(why java|why did .* choose java|why does .* use java|what made .* choose java|why java .* python|java language)\b/i.test(q)) {
    return {
      primaryTopic: "java",
      secondaryTopics: ["flappy_bird", "agnipress"],
      isFollowUp: false,
      resolvedSubject: "Java Technical Decision & Systems Architecture",
    };
  }

  if (/\b(why python|why does .* use python|what made .* choose python|python language|python in machine learning)\b/i.test(q)) {
    return {
      primaryTopic: "python",
      secondaryTopics: ["explainable_ai", "aicte_internship"],
      isFollowUp: false,
      resolvedSubject: "Python Technical Decision & ML Tooling",
    };
  }

  // 2. Direct Project Matches
  if (q.includes("agnipress") || q.includes("news portal") || q.includes("publishing engine") || q.includes("spring boot project") || q.includes("backend project")) {
    return {
      primaryTopic: "agnipress",
      secondaryTopics: ["spring_boot", "oracle_database"],
      isFollowUp: false,
      resolvedSubject: "AgniPress (News & Publishing Portal)",
    };
  }

  if (q.includes("explainable ai") || q.includes("xai") || q.includes("interpretability") || q.includes("model transparency") || q.includes("feature attribution") || q.includes("machine learning research")) {
    return {
      primaryTopic: "explainable_ai",
      secondaryTopics: ["python"],
      isFollowUp: false,
      resolvedSubject: "Explainable AI Research Project",
    };
  }

  if (q.includes("flappy bird") || q.includes("desktop game") || (q.includes("game") && !q.includes("football"))) {
    return {
      primaryTopic: "flappy_bird",
      secondaryTopics: ["java"],
      isFollowUp: false,
      resolvedSubject: "Flappy Bird Game (Java)",
    };
  }

  // 3. Resolve follow-ups using prior conversation context
  if (isFollowUpPattern && priorTopic) {
    if (priorTopic === "agnipress") {
      return {
        primaryTopic: "agnipress",
        secondaryTopics: ["spring_boot"],
        isFollowUp: true,
        resolvedSubject: "AgniPress (Context Follow-Up)",
      };
    }
    if (priorTopic === "explainable_ai") {
      return {
        primaryTopic: "explainable_ai",
        secondaryTopics: ["python"],
        isFollowUp: true,
        resolvedSubject: "Explainable AI (Context Follow-Up)",
      };
    }
  }

  // 4. Specific Frameworks & Database
  if (q.includes("spring boot") || q.includes("spring data") || q.includes("spring security") || q.includes("oauth2")) {
    return {
      primaryTopic: "spring_boot",
      secondaryTopics: ["agnipress", "java"],
      isFollowUp: false,
      resolvedSubject: "Spring Boot & AgniPress Backend",
    };
  }

  if (q.includes("database") || q.includes("oracle") || q.includes("sql") || q.includes("dbms")) {
    return {
      primaryTopic: "oracle_database",
      secondaryTopics: ["agnipress", "certifications"],
      isFollowUp: false,
      resolvedSubject: "Oracle Database & Relational Modeling",
    };
  }

  if (q.includes("react") || q.includes("frontend") || q.includes("html") || q.includes("css") || q.includes("javascript")) {
    return {
      primaryTopic: "javascript_react",
      secondaryTopics: ["portfolio_site"],
      isFollowUp: false,
      resolvedSubject: "Frontend Technologies (React, HTML5, CSS3, JS)",
    };
  }

  // 5. Experience & Internships
  if (q.includes("internship") || q.includes("aicte") || q.includes("work experience") || q.includes("job") || q.includes("company")) {
    return {
      primaryTopic: "aicte_internship",
      secondaryTopics: ["python"],
      isFollowUp: false,
      resolvedSubject: "AICTE Code Technologies Internship",
    };
  }

  // 6. Education & Academics
  if (q.includes("education") || q.includes("niet") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("gpa") || q.includes("cgpa") || q.includes("school") || q.includes("btech") || q.includes("b.tech")) {
    return {
      primaryTopic: "niet_education",
      secondaryTopics: ["general_profile"],
      isFollowUp: false,
      resolvedSubject: "NIET Greater Noida Education (8.4 CGPA)",
    };
  }

  // 7. Certifications
  if (q.includes("certification") || q.includes("certificate") || q.includes("infosys") || q.includes("credential")) {
    return {
      primaryTopic: "certifications",
      secondaryTopics: ["aicte_internship"],
      isFollowUp: false,
      resolvedSubject: "Verified Certifications (AICTE & Infosys)",
    };
  }

  // 8. Athletics & Extracurriculars
  if (q.includes("football") || q.includes("sport") || q.includes("hobby") || q.includes("extracurricular") || q.includes("hobbies") || q.includes("dsa") || q.includes("leetcode") || q.includes("coding challenge")) {
    return {
      primaryTopic: q.includes("football") ? "football_athletics" : "dsa_leetcode",
      secondaryTopics: ["general_profile"],
      isFollowUp: false,
      resolvedSubject: "Athletics & Problem Solving Discipline",
    };
  }

  // 9. Contact
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach") || q.includes("linkedin") || q.includes("github") || q.includes("social")) {
    return {
      primaryTopic: "contact_info",
      secondaryTopics: [],
      isFollowUp: false,
      resolvedSubject: "Direct Contact Information",
    };
  }

  // 10. Skills overview
  if (q.includes("skill") || q.includes("language") || q.includes("stack") || q.includes("technolog")) {
    return {
      primaryTopic: "skills",
      secondaryTopics: ["java", "python", "javascript_react", "oracle_database"],
      isFollowUp: false,
      resolvedSubject: "Technical Skills & Stack",
    };
  }

  // 11. Profile Overview
  return {
    primaryTopic: "general_profile",
    secondaryTopics: ["niet_education", "agnipress", "explainable_ai"],
    isFollowUp: false,
    resolvedSubject: "Ayush Trivedi Profile & Identity",
  };
}