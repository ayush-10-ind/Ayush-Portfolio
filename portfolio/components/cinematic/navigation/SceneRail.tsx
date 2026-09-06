// components/cinematic/navigation/SceneRail.tsx
// Quiet navigation integrated into the world: 00–06 index + progress hairline.

"use client";

import { useEffect, useRef, useState } from "react";
import { SCENES, sceneAnchor } from "@/lib/cinematic/timeline";
import { runtime } from "@/lib/cinematic/runtime";
import { scrollToProgress } from "@/lib/cinematic/scrollController";

export default function SceneRail() {
  const [active, setActive] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => runtime.subscribe(() => setActive(runtime.sceneIndex)), []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = `${(runtime.progress * 100).toFixed(2)}%`;
      if (lineRef.current) lineRef.current.style.height = v;
      if (mobileLineRef.current) mobileLineRef.current.style.width = v;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const jump = (index: number) => scrollToProgress(sceneAnchor(index));

  return (
    <>
      {/* Desktop vertical rail */}
      <nav
        aria-label="Scene navigation"
        className="scene-rail hidden md:flex"
      >
        <div className="scene-rail__line">
          <div ref={lineRef} className="scene-rail__progress" />
        </div>
        <ul>
          {SCENES.map((s) => (
            <li key={s.id}>
              <button
                className={`scene-rail__item ${
                  active === s.index ? "is-active" : ""
                }`}
                onClick={() => jump(s.index)}
                aria-current={active === s.index ? "true" : undefined}
              >
                <span className="scene-rail__num">{s.number}</span>
                <span className="scene-rail__label">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile compact bar */}
      <nav aria-label="Scene navigation" className="scene-rail-mobile md:hidden">
        <div className="scene-rail-mobile__progress">
          <div ref={mobileLineRef} className="scene-rail-mobile__fill" />
        </div>
        <ul>
          {SCENES.map((s) => (
            <li key={s.id}>
              <button
                className={active === s.index ? "is-active" : ""}
                onClick={() => jump(s.index)}
                aria-current={active === s.index ? "true" : undefined}
                aria-label={`Go to ${s.label}`}
              >
                {s.number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
