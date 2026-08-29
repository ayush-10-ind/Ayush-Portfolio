// lib/ai/queryNormalization.ts
// Normalizes raw user input before intent detection.

/**
 * Normalize a query for intent detection:
 * - Lowercase
 * - Trim whitespace
 * - Expand common contractions
 * - Remove filler words
 */
export function normalizeQuery(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/\bi am\b/g, "i")
    .replace(/\byou are\b/g, "you")
    .replace(/\bdid you\b/g, "did ayush")
    .replace(/\byou\b/g, "ayush")
    .replace(/\s+/g, " ");
}
