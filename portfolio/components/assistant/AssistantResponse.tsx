"use client";

import React from "react";
import type { Message } from "@/types/assistant";

interface AssistantResponseProps {
  message: Message;
}

export default function AssistantResponse({ message }: AssistantResponseProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex flex-col gap-1.5 ${
        isUser ? "items-end ml-8" : "items-start mr-8"
      }`}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider">
        <span>{isUser ? "You" : "Ayush's Assistant"}</span>
        <span>·</span>
        <span>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div
        className={`p-4 font-body text-xs tablet:text-sm leading-relaxed ${
          isUser
            ? "bg-[var(--color-surface-elev)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
            : "bg-[#141414] text-[var(--color-text-primary)] border border-[var(--color-border)]"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}