// lib/knowledge/loader.ts
// Parses data/knowledge.md into structured sections at server startup.
// Used by the AI assistant pipeline to retrieve relevant knowledge.

import fs from "fs";
import path from "path";

export interface KnowledgeSection {
  id: string;
  title: string;
  content: string;
  intents: string[]; // which AI intents map to this section
}

let cachedSections: KnowledgeSection[] | null = null;

/**
 * Load and parse the knowledge base.
 * Results are cached after first load.
 */
export function loadKnowledgeBase(): KnowledgeSection[] {
  if (cachedSections) return cachedSections;

  const knowledgePath = path.join(process.cwd(), "data", "knowledge.md");
  const raw = fs.readFileSync(knowledgePath, "utf-8");

  cachedSections = parseKnowledgeMarkdown(raw);
  return cachedSections;
}

/**
 * Retrieve knowledge sections relevant to a given intent.
 */
export function getKnowledgeForIntent(intent: string): KnowledgeSection[] {
  const sections = loadKnowledgeBase();
  return sections.filter((s) => s.intents.includes(intent) || s.intents.includes("general"));
}

/**
 * Get full knowledge context as a single string for AI prompt injection.
 */
export function getFullKnowledgeContext(): string {
  const sections = loadKnowledgeBase();
  return sections
    .map((s) => `## ${s.title}\n\n${s.content}`)
    .join("\n\n---\n\n");
}

/**
 * Get knowledge context for specific intents.
 */
export function getContextForIntent(intent: string): string {
  const sections = getKnowledgeForIntent(intent);
  return sections
    .map((s) => `## ${s.title}\n\n${s.content}`)
    .join("\n\n---\n\n");
}

// ── Parser ─────────────────────────────────────────────────────────────────

function parseKnowledgeMarkdown(raw: string): KnowledgeSection[] {
  // Split on H2 headers (## Section Name)
  const sectionPattern = /^## (.+)$/m;
  const parts = raw.split(/^(?=## )/m);

  const intentMap: Record<string, string[]> = {
    "1. IDENTITY":             ["profile", "general", "contact"],
    "2. EDUCATION":            ["education", "general"],
    "3. SKILLS":               ["skills", "technical_decision"],
    "4. PROJECTS":             ["project", "technical_decision"],
    "5. EXPERIENCE":           ["experience"],
    "6. ACHIEVEMENTS":         ["achievement"],
    "7. TECHNICAL DECISIONS":  ["technical_decision", "skills"],
    "8. CAREER GOALS":         ["career"],
    "9. INTERESTS & PERSONALITY": ["personality"],
    "10. CONTACT":             ["contact"],
    "11. WHAT AYUSH IS NOT":   [], // internal — not returned to AI
  };

  const sections: KnowledgeSection[] = [];

  for (const part of parts) {
    const match = part.match(sectionPattern);
    if (!match) continue;

    const title = match[1].trim();
    const content = part.replace(sectionPattern, "").trim();

    // Skip internal/meta sections
    if (title.includes("IMPORTANT NOTICE") || title.includes("HOW TO COMPLETE")) continue;
    // Skip sections that start with number patterns we can match
    const normalizedTitle = title.toUpperCase();
    const intents = findIntentsForSection(normalizedTitle, intentMap);

    sections.push({
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      content,
      intents,
    });
  }

  return sections;
}

function findIntentsForSection(
  title: string,
  intentMap: Record<string, string[]>
): string[] {
  for (const [key, intents] of Object.entries(intentMap)) {
    if (title.includes(key.toUpperCase())) return intents;
  }
  return ["general"];
}
