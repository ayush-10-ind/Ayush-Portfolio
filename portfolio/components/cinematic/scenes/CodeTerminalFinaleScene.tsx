"use client";

import React from "react";
import { profile } from "@/lib/data/profile";

interface SceneProps {
  progress: number;
}

export default function CodeTerminalFinaleScene({ progress }: SceneProps) {
  // Active window: 87% -> 100%
  if (progress < 0.87) return null;

  const opacity = Math.min(1, (progress - 0.87) / 0.05);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-sketch-line)] pb-4 font-mono text-[11px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-terracotta)]">STAGE 07 //</span>
          <span>THE DEVELOPER CODE TERMINAL · FULL TIME</span>
        </div>
        <span className="text-[var(--color-wano-green)] font-medium">WHERE CREATIVITY MEETS CODE »</span>
      </div>

      {/* Full-Screen Code IDE Editor Window */}
      <div className="my-auto max-w-4xl mx-auto w-full space-y-6">
        <div className="code-window p-6 rounded-xs space-y-4 font-mono text-xs">
          {/* IDE Window Header */}
          <div className="flex items-center justify-between border-b border-[#2A3038] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E06C75]" />
              <span className="w-3 h-3 rounded-full bg-[#E5C07B]" />
              <span className="w-3 h-3 rounded-full bg-[#98C379]" />
              <span className="ml-3 text-[11px] text-[#ABB2BF]">AyushTrivedi.ts — Portfolio Studio</span>
            </div>
            <span className="text-[10px] text-[#5C6370]">TypeScript · UTF-8</span>
          </div>

          {/* IDE Code Body */}
          <div className="space-y-1 text-[13px] leading-relaxed overflow-x-auto py-2">
            <p><span className="text-[#C678DD]">const</span> <span className="text-[#E5C07B]">ayushTrivedi</span>: <span className="text-[#61AFEF]">SoftwareEngineer</span> = &#123;</p>
            <p className="pl-6"><span className="text-[#E06C75]">name</span>: <span className="text-[#98C379]">&quot;Ayush Trivedi&quot;</span>,</p>
            <p className="pl-6"><span className="text-[#E06C75]">academics</span>: <span className="text-[#98C379]">&quot;B.Tech CSE @ NIET Gr. Noida (8.4 CGPA)&quot;</span>,</p>
            <p className="pl-6"><span className="text-[#E06C75]">status</span>: <span className="text-[#98C379]">&quot;Open for Software Engineering &amp; Backend Roles&quot;</span>,</p>
            <p className="pl-6"><span className="text-[#E06C75]">verifiedCaseStudies</span>: [<span className="text-[#98C379]">&quot;AgniPress&quot;</span>, <span className="text-[#98C379]">&quot;Explainable AI Research&quot;</span>],</p>
            <p className="pl-6"><span className="text-[#E06C75]">email</span>: <span className="text-[#98C379]">&quot;{profile.email}&quot;</span>,</p>
            <p className="pl-6"><span className="text-[#E06C75]">phone</span>: <span className="text-[#98C379]">&quot;+91 8303155683&quot;</span>,</p>
            <p className="pl-6"><span className="text-[#E06C75]">motto</span>: <span className="text-[#98C379]">&quot;Full Time. Let&apos;s build something.&quot;</span></p>
            <p>&#125;;</p>
          </div>

          {/* Direct Action Bar inside IDE */}
          <div className="border-t border-[#2A3038] pt-4 flex flex-wrap gap-4 items-center justify-between">
            <a
              href={`mailto:${profile.email}`}
              className="px-4 py-2 bg-[var(--color-terracotta)] text-white hover:bg-[#c45a33] transition-colors uppercase font-semibold text-xs rounded-xs"
            >
              Send Email Direct ↗
            </a>

            <div className="flex gap-4 text-xs font-medium">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61AFEF] hover:underline"
              >
                github.com ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61AFEF] hover:underline"
              >
                linkedin.com ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--color-sketch-line)] pt-4 flex flex-col tablet:flex-row justify-between items-center gap-2 font-mono text-[10px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <span>© {new Date().getFullYear()} AYUSH TRIVEDI · WHERE CREATIVITY MEETS CODE</span>
        <span>NIET GREATER NOIDA · CSE &apos;28</span>
      </div>
    </div>
  );
}