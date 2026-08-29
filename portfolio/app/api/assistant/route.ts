// app/api/assistant/route.ts
// AI Assistant API endpoint — server-side only.
// AI Model is configurable via AI_MODEL_NAME environment variable.

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { normalizeQuery } from "@/lib/ai/queryNormalization";
import { detectIntent } from "@/lib/ai/intentDetection";
import { getContextForIntent, getFullKnowledgeContext } from "@/lib/knowledge/loader";
import { buildContext } from "@/lib/ai/contextBuilder";
import { groundingCheck } from "@/lib/ai/groundingCheck";
import type { AssistantRequest } from "@/types/assistant";

// ── Rate limiting (in-memory) ─────────────────────────────────────────────
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // max requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  let body: AssistantRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { message, history = [], context } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > 1000) {
    return NextResponse.json(
      { error: "Message too long (max 1000 characters)." },
      { status: 400 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not configured.");
    return NextResponse.json(
      { error: "Assistant temporarily unavailable." },
      { status: 503 }
    );
  }

  // Model name is dynamically configurable via environment variable
  const modelName = process.env.AI_MODEL_NAME || "gemini-1.5-flash";

  try {
    const normalized = normalizeQuery(message);
    const intent = detectIntent(normalized);

    const knowledgeContext =
      intent === "general" || intent === "unknown"
        ? getFullKnowledgeContext()
        : getContextForIntent(intent);

    const fullContext = buildContext(knowledgeContext, history, context);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: fullContext,
    });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    const grounding = groundingCheck(responseText, knowledgeContext);
    if (!grounding.passed) {
      console.warn("Grounding check failed:", grounding.reason);
      return NextResponse.json({
        response:
          "I don't have enough verified information to answer that accurately. You can reach Ayush directly via email at ayushtrivediayushtrivedi2@gmail.com.",
        intent,
        sources: [],
      });
    }

    return NextResponse.json({ response: responseText, intent, sources: [intent] });
  } catch (error) {
    console.error("Assistant error:", error);
    return NextResponse.json(
      { error: "Assistant temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }
}