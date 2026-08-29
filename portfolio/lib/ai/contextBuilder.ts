// lib/ai/contextBuilder.ts
// Builds the system prompt and full prompt context for the AI provider.

import type { Message, ConversationContext } from "@/types/assistant";

const SYSTEM_PROMPT = `You are a knowledgeable assistant for Ayush Trivedi's portfolio.

CRITICAL RULES — YOU MUST FOLLOW THESE WITHOUT EXCEPTION:
1. You may ONLY state facts that are explicitly present in the KNOWLEDGE CONTEXT provided below.
2. If information is not in the knowledge context, say clearly: "I don't have that information, but you can reach Ayush directly."
3. You must NEVER invent, guess, or extrapolate any factual claim about Ayush.
4. Never fabricate companies, jobs, projects, technologies, achievements, awards, or statistics.
5. Respond conversationally and naturally. Do not start with "According to my knowledge base...".
6. Keep responses concise unless the user asks for detail.
7. Maintain conversation context from the history provided — resolve "it", "that", "the project" from prior turns.
8. You are here to help the visitor understand Ayush's work and capabilities.`;

/**
 * Build the full context string to inject into the AI prompt.
 */
export function buildContext(
  knowledgeContext: string,
  history: Message[],
  pageContext?: ConversationContext
): string {
  const historyText = history
    .slice(-10) // last 10 messages only
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const pageContextText = pageContext?.activeProject
    ? `\n\nCURRENT PAGE CONTEXT: The user is currently viewing the project "${pageContext.activeProject}".`
    : pageContext?.activeSection
    ? `\n\nCURRENT PAGE CONTEXT: The user is currently in the "${pageContext.activeSection}" section.`
    : "";

  return `${SYSTEM_PROMPT}

---

KNOWLEDGE CONTEXT:
${knowledgeContext}
${pageContextText}

---

CONVERSATION HISTORY:
${historyText || "(No prior conversation)"}`;
}
