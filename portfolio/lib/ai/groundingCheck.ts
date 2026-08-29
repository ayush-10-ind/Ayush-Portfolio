// lib/ai/groundingCheck.ts
// Post-generation validation to catch potential hallucinations.
// This is a lightweight heuristic check — the system prompt is the primary defense.

const SUSPICIOUS_PATTERNS = [
  /at google/i,
  /at microsoft/i,
  /at amazon/i,
  /at meta/i,
  /at apple/i,
  /at netflix/i,
  /at openai/i,
  /phd/i,
  /forbes/i,
  /million users/i,
  /\$\d+[km]/i, // dollar amounts
];

export interface GroundingResult {
  passed: boolean;
  reason?: string;
}

/**
 * Check if a response contains potentially hallucinated content.
 * Returns { passed: true } if clean, { passed: false, reason } if suspect.
 * 
 * Note: This is a heuristic safety net. The main anti-hallucination
 * mechanism is the system prompt grounding rules.
 */
export function groundingCheck(
  response: string,
  knowledgeContext: string
): GroundingResult {
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(response) && !pattern.test(knowledgeContext)) {
      return {
        passed: false,
        reason: `Response contains potentially ungrounded claim matching pattern: ${pattern}`,
      };
    }
  }
  return { passed: true };
}
