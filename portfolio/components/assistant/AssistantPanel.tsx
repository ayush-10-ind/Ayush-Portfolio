"use client";
// components/assistant/AssistantPanel.tsx
// AI assistant slide-in panel. Integrated into portfolio visual language.
// NOT a generic chatbot bubble.

import { useState, useRef, useEffect } from "react";
import type { Message, ConversationContext } from "@/types/assistant";
import AssistantInput from "./AssistantInput";
import AssistantResponse from "./AssistantResponse";

const SUGGESTED = [
  "Tell me about Ayush's background",
  "What projects has he built?",
  "What technologies does he work with?",
  "How can I contact him?",
];

export default function AssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context] = useState<ConversationContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: nextMessages.slice(-10),
          context,
        }),
      });

      if (res.status === 429) {
        setError("Too many messages. Please wait a moment.");
        setIsLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error("Assistant unavailable");
      }

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response ?? data.error ?? "I couldn't generate a response.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setError("Assistant temporarily unavailable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open portfolio assistant"
        className={`fixed bottom-8 right-8 z-40 font-mono text-[var(--color-bg)] bg-[var(--color-accent)] text-[var(--text-mono-sm)] tracking-widest uppercase px-[var(--space-3)] py-[var(--space-2)] hover:bg-[var(--color-text-primary)] transition-colors duration-[var(--dur-normal)] ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        Ask →
      </button>

      {/* Panel overlay */}
      <div
        role="dialog"
        aria-label="Portfolio assistant"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-50 flex flex-col w-full tablet:w-[480px] bg-[var(--color-surface)] border-l border-[var(--color-border)] transition-transform duration-[var(--dur-medium)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-[var(--space-5)] py-[var(--space-4)] border-b border-[var(--color-border)] flex-shrink-0">
          <div>
            <p className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-0.5">
              Assistant
            </p>
            <h2 className="font-display text-[var(--color-text-primary)]" style={{ fontSize: "var(--text-heading-md)" }}>
              Ask about Ayush
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close assistant"
            className="font-mono text-[var(--color-text-tertiary)] text-lg hover:text-[var(--color-text-primary)] transition-colors duration-[var(--dur-fast)] p-2"
          >
            ✕
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-[var(--space-5)] py-[var(--space-4)] space-y-[var(--space-4)]">
          {messages.length === 0 && (
            <div className="space-y-[var(--space-4)]">
              <p className="font-body text-[var(--color-text-secondary)] text-sm">
                Ask me anything about Ayush&apos;s work, skills, or background.
              </p>
              <div className="space-y-2">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="block w-full text-left font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] border border-[var(--color-border)] px-3 py-2 hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-all duration-[var(--dur-fast)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <AssistantResponse key={i} message={msg} />
          ))}

          {isLoading && (
            <div className="flex gap-1 py-2" aria-label="Generating response">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-bounce"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          )}

          {error && (
            <p className="font-mono text-[var(--color-error)] text-[var(--text-mono-sm)]" role="alert">
              {error}
            </p>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 border-t border-[var(--color-border)]">
          <AssistantInput onSend={send} disabled={isLoading} />
        </div>
      </div>

      {/* Backdrop (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-bg)] opacity-60 tablet:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
