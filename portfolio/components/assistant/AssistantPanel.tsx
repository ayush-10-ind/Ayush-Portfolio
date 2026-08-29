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
        "Welcome to Ayush Trivedi's Shihan Archive. I provide verified factual details regarding his software engineering architecture (AgniPress), Explainable AI research, AICTE Python internship, or academic record.",
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
          content: "Unable to complete request at this time. Please inspect the case studies and resume archive directly.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Editorial Command Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 bg-[#111620] text-[var(--color-steel-white)] border border-[var(--color-cut-strong)] hover:border-[var(--color-blade-crimson)] hover:text-[var(--color-blade-crimson)] shadow-2xl transition-all duration-150 flex items-center gap-2"
          aria-label="Open Shihan Archive"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-blade-crimson)] shadow-[0_0_8px_var(--color-blade-crimson)]" />
          <span>SHIHAN ARCHIVE ↗</span>
        </button>
      </div>

      {/* Slide-in Research Panel Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shihan Archive Panel"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#080B10] border-l border-[var(--color-cut-line)] shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--color-cut-line)] flex items-center justify-between bg-[#111620]">
            <div>
              <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
                GROUNDED KNOWLEDGE INDEX
              </span>
              <h2 className="font-display text-xl text-[var(--color-steel-white)] font-normal">
                Shihan Archive
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs uppercase px-3 py-1 border border-[var(--color-cut-strong)] bg-[#080B10] hover:border-[var(--color-blade-crimson)] text-[var(--color-steel-white)] transition-colors"
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
                        ? "bg-[var(--color-blade-crimson)] text-white rounded-xs"
                        : "bg-[#111620] text-[var(--color-steel-white)] border border-[var(--color-cut-line)] rounded-xs"
                    }`}
                  >
                    <p>{m.content}</p>

                    {m.groundedFacts && m.groundedFacts.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--color-cut-line)] font-mono text-[10px] text-[var(--color-mist-gray)]">
                        <span className="text-[var(--color-wano-jade)] block font-medium">GROUNDED CITATIONS:</span>
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
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-blade-crimson)] p-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blade-crimson)] animate-ping" />
                <span>Searching verified archives...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-[var(--color-cut-line)] bg-[#111620] flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about AgniPress, XAI, Java, or experience..."
              className="flex-1 bg-[#080B10] border border-[var(--color-cut-strong)] px-3 py-2 text-xs font-body text-[var(--color-steel-white)] placeholder-[var(--color-dim-gray)] focus:outline-none focus:border-[var(--color-blade-crimson)]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="font-mono text-xs px-4 py-2 bg-[var(--color-blade-crimson)] text-white hover:bg-[#d42d3a] disabled:opacity-50 transition-colors uppercase font-medium"
            >
              Query
            </button>
          </form>
        </div>
      )}
    </>
  );
}