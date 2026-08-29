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
        "Welcome to Ayush Trivedi's Research Archive. I can provide verified details on his software engineering projects (such as AgniPress), Explainable AI research, AICTE Python internship, technical skills, or academic record.",
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
          content: "Unable to complete request at this time. Please review the case studies and resume sheets directly.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Editorial Research Archive Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 bg-[#FFFDF7] text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] shadow-lg transition-all duration-200 flex items-center gap-2"
          aria-label="Open Research Archive"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
          <span>RESEARCH ARCHIVE ↗</span>
        </button>
      </div>

      {/* Slide-in Research Panel Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Research Archive Panel"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#FFFDF7] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between bg-[#F4F0E6]">
            <div>
              <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block font-medium">
                GROUNDED REASONING INDEX
              </span>
              <h2 className="font-display text-xl text-[var(--color-text-primary)] font-normal">
                Research Archive
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs uppercase px-3 py-1 border border-[var(--color-border-strong)] bg-[#FFFDF7] hover:border-[var(--color-accent)] text-[var(--color-text-primary)] transition-colors"
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
                        ? "bg-[var(--color-pitch-green)] text-[#FFFDF7] rounded-xs"
                        : "bg-[#F4F0E6] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-xs"
                    }`}
                  >
                    <p>{m.content}</p>

                    {m.groundedFacts && m.groundedFacts.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--color-border)] font-mono text-[10px] text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] block font-medium">GROUNDED CITATIONS:</span>
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
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] p-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-ping" />
                <span>Searching verified archives...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-[var(--color-border)] bg-[#F4F0E6] flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about AgniPress, XAI, Java, or experience..."
              className="flex-1 bg-[#FFFDF7] border border-[var(--color-border-strong)] px-3 py-2 text-xs font-body text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="font-mono text-xs px-4 py-2 bg-[var(--color-pitch-green)] text-[#FFFDF7] hover:bg-[var(--color-pitch-deep)] disabled:opacity-50 transition-colors uppercase font-medium"
            >
              Ask
            </button>
          </form>
        </div>
      )}
    </>
  );
}