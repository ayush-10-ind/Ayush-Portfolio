"use client";

import React, { useState, useRef } from "react";

interface AssistantInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function AssistantInput({ onSend, disabled }: AssistantInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-[var(--color-border)] bg-[#0C0C0C]"
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Ayush's work, code, or background..."
          maxLength={1000}
          disabled={disabled}
          aria-label="Message to assistant"
          className="flex-1 bg-[#141414] border border-[var(--color-border)] px-4 py-3 font-body text-xs tablet:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-accent)] transition-colors"
        />

        <button
          type="submit"
          disabled={disabled || !input.trim()}
          aria-label="Send message"
          className="font-mono text-xs text-[var(--color-bg)] bg-[var(--color-accent)] hover:bg-[var(--color-text-primary)] disabled:opacity-40 disabled:hover:bg-[var(--color-accent)] px-5 py-3 uppercase tracking-wider font-medium transition-colors shrink-0"
        >
          Send
        </button>
      </div>

      <div className="flex justify-between items-center mt-2 font-mono text-[10px] text-[var(--color-text-tertiary)]">
        <span>STRICTLY GROUNDED IN VERIFIED PORTFOLIO RECORDS</span>
        <span>{input.length}/1000</span>
      </div>
    </form>
  );
}