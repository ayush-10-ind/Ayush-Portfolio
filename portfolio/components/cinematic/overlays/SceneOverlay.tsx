// components/cinematic/overlays/SceneOverlay.tsx
// DOM content for one scene. Gated to an EXCLUSIVE timeline window so at most
// one scene is readable at any progress. Parallax + staggered reveals driven
// by rAF writing straight to the DOM (no React re-render per frame).

"use client";

import React, { useEffect, useRef } from "react";
import { runtime } from "@/lib/cinematic/runtime";
import { range, windowEase, parallaxOffset, clamp01 } from "@/lib/cinematic/easing";

export interface SceneOverlayProps {
  window: [number, number];
  align?: "left" | "right" | "center" | "full";
  className?: string;
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}

export default function SceneOverlay({
  window: w,
  align = "center",
  className = "",
  fadeIn = 0.14,
  fadeOut = 0.16,
  children,
}: SceneOverlayProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    let visible = false;

    const tick = () => {
      const p = runtime.progress;
      const local = range(p, w[0], w[1]);
      const opacity = windowEase(local, fadeIn, fadeOut);
      const shouldShow = opacity > 0.004;

      if (shouldShow !== visible) {
        visible = shouldShow;
        el.style.visibility = visible ? "visible" : "hidden";
        el.setAttribute("aria-hidden", visible ? "false" : "true");
      }

      if (visible) {
        el.style.opacity = opacity.toFixed(3);
        const para = parallaxOffset(local);
        const amount = runtime.reducedMotion ? 0 : 46;
        el.style.transform = `translate3d(0, ${(-para * amount).toFixed(2)}px, 0)`;

        if (!runtime.reducedMotion) {
          el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((node) => {
            const f = parseFloat(node.dataset.parallax || "0");
            node.style.transform = `translate3d(0, ${(
              -para *
              amount *
              f
            ).toFixed(2)}px, 0)`;
          });

          el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
            const delay = parseFloat(node.dataset.delay || "0");
            const rr = range(local, delay, clamp01(delay + 0.42));
            const o = windowEase(rr, 0.22, 0.05);
            node.style.opacity = o.toFixed(3);
            node.style.transform = `translate3d(0, ${((1 - o) * 30).toFixed(2)}px, 0)`;
          });
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [w, fadeIn, fadeOut]);

  return (
    <section
      ref={rootRef}
      className={`scene-overlay scene-overlay--${align} ${className}`}
      style={{ visibility: "hidden", opacity: 0 }}
      aria-hidden="true"
    >
      {children}
    </section>
  );
}
