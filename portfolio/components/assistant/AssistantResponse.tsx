// components/assistant/AssistantResponse.tsx

import type { Message } from "@/types/assistant";

export default function AssistantResponse({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
      <span className="font-mono text-[var(--color-text-tertiary)] text-[10px] tracking-widest uppercase">
        {isUser ? "You" : "Ayush's Portfolio"}
      </span>
      <div
        className={`max-w-[85%] font-body text-[var(--text-body-sm)] leading-relaxed px-[var(--space-3)] py-[var(--space-2)] ${
          isUser
            ? "text-[var(--color-text-primary)] bg-[var(--color-surface-elev)]"
            : "text-[var(--color-text-secondary)]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
