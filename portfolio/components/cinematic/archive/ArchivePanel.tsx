// components/cinematic/archive/ArchivePanel.tsx
// The Archive — a grounded intelligence terminal embedded in the world.
// Not a chat bubble: an architectural records console. Reuses /api/assistant.

"use client";

import React, { useEffect, useRef, useState } from "react";

interface ArchiveMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

const SUGGESTIONS = [
  "Why does Ayush choose Java?",
  "What is AgniPress?",
  "Tell me about the XAI research",
  "What is his CGPA?",
];

export default function ArchivePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ArchiveMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Archive online. Ask about Ayush's systems, research, or record — answers are grounded strictly in his verified portfolio.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const content = text.trim();
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content },
    ]);
    setInput("");
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
            timestamp: Date.now(),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.response || "No response.",
          sources: data.sources,
        },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to reach the archive.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger — integrated, quiet */}
      <button
        className="archive-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open the archive"
      >
        <span className="archive-trigger__dot" />
        ARCHIVE
      </button>

      {isOpen && (
        <div className="archive" role="dialog" aria-modal="true" aria-label="The Archive">
          <header className="archive__head">
            <div>
              <span className="ovl-meta">GROUNDED KNOWLEDGE INDEX</span>
              <h2 className="archive__title">The Archive</h2>
            </div>
            <button className="archive__close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </header>

          <div className="archive__body">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`archive__msg ${m.role === "user" ? "is-user" : ""}`}
              >
                <p>{m.content}</p>
                {m.sources && m.sources.length > 0 && (
                  <span className="archive__src">
                    grounded · {m.sources.join(", ")}
                  </span>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="archive__typing">searching verified records…</div>
            )}
            {error && <div className="archive__error">{error}</div>}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="archive__suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="archive__input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AgniPress, XAI, Java, the record…"
              maxLength={1000}
              aria-label="Message the archive"
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              Query
            </button>
          </form>
        </div>
      )}
    </>
  );
}
