// lib/ai/intentDetection.ts
// Classifies normalized user query into one of 11 intent categories.

import type { Intent } from "@/types/assistant";

const intentPatterns: Array<{ intent: Intent; patterns: RegExp[] }> = [
  {
    intent: "profile",
    patterns: [/who is/, /about ayush/, /tell me about/, /background/, /introduce/],
  },
  {
    intent: "education",
    patterns: [/university/, /college/, /degree/, /study/, /studied/, /gpa/, /grade/, /major/, /course/],
  },
  {
    intent: "skills",
    patterns: [/skill/, /technology/, /tech stack/, /language/, /framework/, /tool/, /know how/, /proficient/],
  },
  {
    intent: "technical_decision",
    patterns: [/why did/, /why use/, /why chose/, /why pick/, /reason for/, /why not/, /chose .+ over/, /prefer/],
  },
  {
    intent: "project",
    patterns: [/project/, /built/, /created/, /developed/, /made/, /work on/, /app/, /system/, /portfolio/],
  },
  {
    intent: "experience",
    patterns: [/work/, /job/, /intern/, /company/, /role/, /position/, /employ/, /career history/],
  },
  {
    intent: "achievement",
    patterns: [/award/, /achievement/, /win/, /won/, /hackathon/, /competition/, /recognition/, /accomplish/],
  },
  {
    intent: "career",
    patterns: [/goal/, /future/, /looking for/, /interested in/, /next role/, /aspir/, /plan/],
  },
  {
    intent: "personality",
    patterns: [/hobby/, /hobbies/, /interest/, /outside work/, /personal/, /like to/, /enjoy/, /passion/],
  },
  {
    intent: "contact",
    patterns: [/contact/, /reach/, /email/, /linkedin/, /github/, /social/, /connect/, /hire/],
  },
];

/**
 * Detect the primary intent of a normalized query.
 */
export function detectIntent(normalizedQuery: string): Intent {
  for (const { intent, patterns } of intentPatterns) {
    if (patterns.some((p) => p.test(normalizedQuery))) {
      return intent;
    }
  }
  return "general";
}
