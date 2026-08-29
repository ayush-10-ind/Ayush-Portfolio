// lib/ai/groundingCheck.ts
// Heuristic post-generation grounding validator to detect and block potential hallucinations

export interface GroundingResult {
  passed: boolean;
  reason?: string;
}

// Suspicious patterns not present in Ayush's verified profile
const UNAUTHORIZED_PATTERNS: Array<{ pattern: RegExp; description: string }> = [
  { pattern: /\b(google|meta|amazon|apple|netflix|microsoft|uber|openai|goldman sachs)\b/i, description: "Unauthorized big tech employer" },
  { pattern: /\b(phd|doctorate|master['’]?s degree|m\.tech|mba)\b/i, description: "Unauthorized graduate degree" },
  { pattern: /\b(forbes|30 under 30|tedx speaker)\b/i, description: "Fabricated award" },
  { pattern: /\b(\d+\s*(million|k|billion)\s*(users|downloads|requests\/sec|revenue|dau|mau))\b/i, description: "Fabricated traffic / revenue metrics" },
  { pattern: /\b(\$\s*\d+[\d,]*(\.\d+)?\s*(k|m|million|billion)?)\b/i, description: "Fabricated monetary valuation" },
];

/**
 * Validate LLM output against verified context to catch ungrounded claims
 */
export function groundingCheck(
  response: string,
  knowledgeContext: string
): GroundingResult {
  const normalizedResponse = response.toLowerCase();
  const normalizedContext = knowledgeContext.toLowerCase();

  for (const { pattern, description } of UNAUTHORIZED_PATTERNS) {
    if (pattern.test(normalizedResponse)) {
      // If the pattern appears in the response but was NOT in the verified context, flag it
      if (!pattern.test(normalizedContext)) {
        return {
          passed: false,
          reason: `Response triggered ungrounded pattern: ${description}`,
        };
      }
    }
  }

  // Ensure response isn't empty or nonsensical
  if (!response || response.trim().length < 5) {
    return {
      passed: false,
      reason: "Empty or malformed response",
    };
  }

  return { passed: true };
}