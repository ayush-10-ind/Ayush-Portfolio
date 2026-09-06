"use client";

import React, { useState, useRef, useEffect } from "react";

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  groundedFacts?: string[];
}

export default function AssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to Ayush Trivedi's Studio Assistant. I can answer questions regarding his software engineering architecture (such as AgniPress), Explainable AI research, AICTE Python internship, or verified academic credentials.",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const userText = inputQuery.trim();
    const userMessage: AssistantMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userText,
          history: messages.slice(-6),
        }),
      });

      const data = await response.json();

      const assistantMessage: AssistantMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.response || "No response received.",
        timestamp: Date.now(),
        groundedFacts: data.groundedFacts,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Unable to complete request at this time. Please inspect the case studies and resume sheets directly.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Editorial Studio Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 bg-[#FFFDF8] text-[var(--color-ink-primary)] border-2 border-[var(--color-ink-primary)] hover:bg-[var(--color-terracotta)] hover:text-white shadow-[4px_4px_0px_0px_rgba(26,29,32,0.9)] transition-all duration-150 flex items-center gap-2 font-bold"
          aria-label="Open Studio Assistant"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]" />
          <span>STUDIO ASSISTANT ↗</span>
        </button>
      </div>

      {/* Slide-in Assistant Panel Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Studio Assistant Panel"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#F5F1E8] border-l-2 border-[var(--color-ink-primary)] shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b-2 border-[var(--color-ink-primary)] flex items-center justify-between bg-[#FFFDF8]">
            <div>
              <span className="font-mono text-[10px] text-[var(--color-terracotta)] uppercase tracking-widest block font-bold">
                GROUNDED REASONING INDEX
              </span>
              <h2 className="font-display text-xl text-[var(--color-ink-primary)] font-normal">
                Studio Assistant
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs uppercase px-3 py-1 border-2 border-[var(--color-ink-primary)] bg-[#FFFDF8] hover:bg-[var(--color-terracotta)] hover:text-white text-[var(--color-ink-primary)] font-bold transition-colors shadow-xs"
            >
              Close
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 text-xs font-body leading-relaxed ${
                      isUser
                        ? "bg-[var(--color-ink-primary)] text-[#FFFDF8] rounded-xs shadow-xs"
                        : "bg-[#FFFDF8] text-[var(--color-ink-primary)] border-2 border-[var(--color-ink-primary)] rounded-xs shadow-xs"
                    }`}
                  >
                    <p>{m.content}</p>

                    {m.groundedFacts && m.groundedFacts.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--color-sketch-line)] font-mono text-[10px] text-[var(--color-ink-secondary)]">
                        <span className="text-[var(--color-terracotta)] block font-bold">GROUNDED CITATIONS:</span>
                        <ul className="list-disc pl-3 pt-0.5 space-y-0.5">
                          {m.groundedFacts.slice(0, 3).map((f: string, idx: number) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-terracotta)] p-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)] animate-ping" />
                <span>Searching verified archives...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t-2 border-[var(--color-ink-primary)] bg-[#FFFDF8] flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about AgniPress, XAI, Java, or experience..."
              className="flex-1 bg-[#F5F1E8] border border-[var(--color-ink-primary)] px-3 py-2 text-xs font-body text-[var(--color-ink-primary)] placeholder-[var(--color-ink-faint)] focus:outline-none focus:border-[var(--color-terracotta)]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="font-mono text-xs px-4 py-2 bg-[var(--color-ink-primary)] text-white hover:bg-[var(--color-terracotta)] disabled:opacity-50 transition-colors uppercase font-bold"
            >
              Ask
            </button>
          </form>
        </div>
      )}
    </>
  );
}