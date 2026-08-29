// app/api/assistant/route.ts
// Intelligent Grounded Portfolio Assistant Endpoint (Server-Side Only)

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { normalizeQuery } from "@/lib/ai/queryNormalization";
import { extractEntitiesAndTopic } from "@/lib/ai/entityExtraction";
import { getContextForTopic } from "@/lib/knowledge/loader";
import { buildContext } from "@/lib/ai/contextBuilder";
import { groundingCheck } from "@/lib/ai/groundingCheck";
import type { AssistantRequest, AssistantResponse } from "@/types/assistant";

// ── In-Memory Rate Limiting ───────────────────────────────────────────────
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // 20 requests per minute
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// ── Offline / Fallback Responder ──────────────────────────────────────────
function generateVerifiedFallback(topic: string, query: string): string {
  const q = query.toLowerCase();

  if (q.includes("traffic") || q.includes("revenue") || q.includes("users") || q.includes("salary")) {
    return "I don't have that detail in Ayush's verified portfolio information.";
  }

  if (topic === "agnipress" || q.includes("agnipress") || q.includes("spring boot")) {
    return "AgniPress is a full-stack publishing engine and news portal built with Java 21, Spring Boot 3, and Spring Data JPA. It features automated background feed ingestion using Spring WebClient schedulers, role-based access control with OAuth2 login, bookmarking, and reading history tracking.";
  }

  if (topic === "explainable_ai" || q.includes("explainable") || q.includes("xai")) {
    return "Ayush's Explainable AI Research Project investigated interpretability techniques in Python to inspect machine learning model decision boundaries, evaluate feature attribution distributions, and improve prediction transparency.";
  }

  if (topic === "java" || q.includes("why java")) {
    return "Ayush uses Java for its strong static typing, deterministic memory model, and object-oriented architectural discipline. He applied it in desktop game engine development and enterprise backend engineering with Spring Boot 3 in AgniPress.";
  }

  if (topic === "python" || q.includes("why python")) {
    return "Ayush uses Python for its mature scientific computing ecosystem and machine learning frameworks, which he applied during his Explainable AI research and Python Developer Internship at AICTE Code Technologies.";
  }

  if (topic === "aicte_internship" || q.includes("internship")) {
    return "Ayush completed a Python Developer Internship at AICTE Code Technologies (June–July 2025), where he developed modular Python applications, applied OOP principles, optimized code execution, and solved programming challenges.";
  }

  if (topic === "niet_education" || q.includes("gpa") || q.includes("college") || q.includes("niet")) {
    return "Ayush is pursuing his B.Tech in Computer Science and Engineering at Noida Institute of Engineering and Technology (NIET, Gr. Noida) with an 8.4 CGPA (Expected graduation: 2028).";
  }

  return "Ayush Trivedi is a Computer Science and Engineering student at NIET Gr. Noida (8.4 CGPA) specializing in Java, Spring Boot 3, Python, Explainable AI research, and responsive web development. You can reach him directly at ayushtrivediayushtrivedi2@gmail.com.";
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Rate Limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "local-client";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before sending another message." },
      { status: 429 }
    );
  }

  // 2. Parse & Validate Payload
  let body: AssistantRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const { message, history = [], context } = body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (message.length > 1000) {
    return NextResponse.json(
      { error: "Message exceeds maximum allowed length of 1000 characters." },
      { status: 400 }
    );
  }

  const normalizedQuery = normalizeQuery(message);

  // 3. Entity & Topic Extraction
  const { primaryTopic, secondaryTopics, resolvedSubject } = extractEntitiesAndTopic(
    normalizedQuery,
    history,
    context
  );

  // 4. Retrieve Domain-Specific Knowledge Context
  const knowledgeContext = getContextForTopic(primaryTopic, secondaryTopics);

  // 5. Check API Key & Environment Config
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.AI_MODEL_NAME || "gemini-1.5-flash";

  // If no Gemini API key configured, use verified deterministic fallback
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
    const fallbackAnswer = generateVerifiedFallback(primaryTopic, message);
    const responsePayload: AssistantResponse = {
      response: fallbackAnswer,
      intent: primaryTopic as any,
      sources: [resolvedSubject],
    };
    return NextResponse.json(responsePayload);
  }

  // 6. Build Grounded Prompt Context
  const fullContext = buildContext(knowledgeContext, history, primaryTopic, context);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: fullContext,
      generationConfig: {
        temperature: 0.2, // Low temperature for high factual precision
        maxOutputTokens: 500,
      },
    });

    const result = await model.generateContent(message);
    const rawResponse = result.response.text();

    // 7. Grounding & Anti-Hallucination Validation
    const grounding = groundingCheck(rawResponse, knowledgeContext);

    if (!grounding.passed) {
      console.warn("Assistant Grounding Check Intercepted Output:", grounding.reason);
      return NextResponse.json({
        response:
          "I don't have enough verified information in Ayush's portfolio records to answer that accurately. You can reach Ayush directly at ayushtrivediayushtrivedi2@gmail.com for more details.",
        intent: primaryTopic as any,
        sources: [resolvedSubject],
      });
    }

    const responsePayload: AssistantResponse = {
      response: rawResponse,
      intent: primaryTopic as any,
      sources: [resolvedSubject],
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Gemini API Error, falling back to verified context:", error);
    // Graceful recovery using verified context
    const fallbackAnswer = generateVerifiedFallback(primaryTopic, message);
    return NextResponse.json({
      response: fallbackAnswer,
      intent: primaryTopic as any,
      sources: [resolvedSubject],
    });
  }
}