// types/assistant.ts — AI Assistant Type Definitions

// ── Intent Categories ──────────────────────────────────────────────────────

export type Intent =
  | "profile"
  | "education"
  | "skills"
  | "technical_decision"
  | "project"
  | "experience"
  | "achievement"
  | "career"
  | "personality"
  | "contact"
  | "general"
  | "unknown";

// ── Conversation ───────────────────────────────────────────────────────────

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ConversationContext {
  activeSection?: string;
  activeProject?: string;
  lastMentionedProject?: string;
  lastMentionedCompany?: string;
  lastMentionedTechnology?: string;
}

// ── API Request / Response ─────────────────────────────────────────────────

export interface AssistantRequest {
  message: string;
  history: Message[];
  context?: ConversationContext;
}

export interface AssistantResponse {
  response: string;
  intent: Intent;
  sources: string[]; // knowledge sections used
}

// ── UI State ───────────────────────────────────────────────────────────────

export interface AssistantState {
  isOpen: boolean;
  isLoading: boolean;
  isStreaming: boolean;
  messages: Message[];
  error: string | null;
  context: ConversationContext;
}

export type AssistantAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "SEND_MESSAGE"; payload: string }
  | { type: "RECEIVE_MESSAGE"; payload: string }
  | { type: "STREAM_CHUNK"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "UPDATE_CONTEXT"; payload: Partial<ConversationContext> };
