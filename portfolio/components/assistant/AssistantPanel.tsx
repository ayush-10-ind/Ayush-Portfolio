"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { Message, ConversationContext } from "@/types/assistant";
import AssistantInput from "./AssistantInput";
import AssistantResponse from "./AssistantResponse";

const SUGGESTED_QUERIES = [
  "What is AgniPress and how does the backend work?",
  "Why did Ayush choose Java for his systems engineering?",
  "Explain his Explainable AI research on model interpretability.",
  "What did Ayush build during his AICTE internship?",
  "What is his academic standing and university?",
];

export default function AssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context] = useState<ConversationContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // ESC key to close panel
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: nextHistory.slice(-10),
          context,
        }),
      });

      if (res.status === 429) {
        setError("Too many requests. Please wait a moment before sending another message.");
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Assistant request failed");
      }

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response || "I could not generate a response based on the available information.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setError("Assistant is temporarily unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <>
      {/* Editorial Fixed Control Strip in Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open portfolio research assistant"
          aria-expanded={isOpen}
          className={`font-mono text-xs tracking-widest uppercase px-5 py-3 border transition-all duration-200 shadow-2xl flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
            isOpen
              ? "opacity-0 pointer-events-none"
              : "opacity-100 bg-[#121212] border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0A0A0A]"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span>RESEARCH ARCHIVE · ASK ABOUT MY WORK ↗</span>
        </button>
      </div>

      {/* Slide-In Architectural Research Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Portfolio Research Assistant"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-50 flex flex-col w-full tablet:w-[500px] bg-[#0A0A0A] border-l border-[var(--color-border)] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] bg-[#101010]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
              <span>Grounded Knowledge System</span>
            </div>
            <h3 className="font-display text-base text-[var(--color-text-primary)] font-normal">
              Ayush Trivedi Research Archive
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                aria-label="Clear discussion"
                className="font-mono text-[10px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] uppercase px-2 py-1 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
              className="font-mono text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] p-2 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Message Stream Body */}
        <div
          aria-live="polite"
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0C0C0C] architectural-grid"
        >
          {messages.length === 0 && (
            <div className="space-y-6">
              <div className="p-5 border border-[var(--color-border)] bg-[#121212] drafting-corner space-y-2">
                <span className="font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-wider block">
                  Natural Language Inquiries
                </span>
                <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Directly inquire about Ayush&apos;s verified background, engineering decisions (Java vs. Python), AgniPress architecture, Explainable AI research, or AICTE internship responsibilities.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                  Suggested Architectural Inquiries:
                </span>
                <div className="space-y-2">
                  {SUGGESTED_QUERIES.map((query, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSend(query)}
                      className="w-full text-left font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] p-3 bg-[#121212] transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Render Messages */}
          {messages.map((msg, idx) => (
            <AssistantResponse key={idx} message={msg} />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] p-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-ping" />
              <span>Retrieving verified portfolio records...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div
              role="alert"
              className="p-3 border border-[var(--color-error)] text-[var(--color-error)] font-mono text-xs bg-[#1C1212]"
            >
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <AssistantInput onSend={handleSend} disabled={isLoading} />
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm tablet:hidden"
        />
      )}
    </>
  );
}