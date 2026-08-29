"use client";
// components/assistant/AssistantInput.tsx

import { useState, useRef } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function AssistantInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-[var(--space-5)] py-[var(--space-3)]">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything..."
        maxLength={1000}
        disabled={disabled}
        aria-label="Message to assistant"
        className="flex-1 bg-transparent font-body text-[var(--color-text-primary)] text-[var(--text-body-md)] placeholder-[var(--color-text-tertiary)] outline-none border-b border-[var(--color-border)] pb-2 focus:border-[var(--color-accent)] transition-colors duration-[var(--dur-fast)]"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="font-mono text-[var(--color-accent)] text-[var(--text-mono-sm)] tracking-wider uppercase disabled:opacity-30 hover:text-[var(--color-text-primary)] transition-colors duration-[var(--dur-fast)] px-2 py-1"
      >
        Send
      </button>
    </form>
  );
}
