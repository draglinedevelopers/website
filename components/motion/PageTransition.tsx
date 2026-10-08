"use client";

import { TransitionRouter } from "next-transition-router";
import { useRef } from "react";
import { gsap, MOTION } from "@/lib/gsap";

/**
 * Page transitions (next-transition-router, auto-detects internal links).
 * Leave: a black panel sweeps up from the bottom while a thin lime thread draws across its centre.
 * Enter: the panel sweeps away upward to reveal the new page. Total ≈ 0.62s.
 * Reduced motion: navigation is instant (no panel).
 * While a transition runs, <html data-transitioning> lets page intros wait for the reveal.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);

  const reduced = () => !window.matchMedia(MOTION.motion).matches;

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        if (reduced()) return next();
        document.documentElement.dataset.transitioning = "";
        const tl = gsap
          .timeline({ onComplete: next })
          .fromTo(panel.current, { yPercent: 100, autoAlpha: 1 }, { yPercent: 0, duration: 0.28, ease: "power3.inOut" })
          .fromTo(line.current, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.2, ease: "power2.out" }, 0.12);
        return () => tl.kill();
      }}
      enter={(next) => {
        if (reduced() || !document.documentElement.hasAttribute("data-transitioning")) return next();
        const tl = gsap
          .timeline({
            onComplete: () => {
              gsap.set(panel.current, { autoAlpha: 0, yPercent: 100 });
              delete document.documentElement.dataset.transitioning;
              next();
            },
          })
          .to(panel.current, { yPercent: -100, duration: 0.3, ease: "power3.inOut" });
        return () => tl.kill();
      }}
    >
      {children}
      <div
        ref={panel}
        aria-hidden
        // Hidden (visibility) until a transition starts; GSAP owns its position, so no CSS offset here.
        className="pointer-events-none invisible fixed inset-0 z-[60] bg-ink"
      >
        {/* 1000×1 viewBox stretched to full width; height 1px keeps the stroke exactly 1px. */}
        <svg className="absolute top-1/2 left-0 h-px w-full" viewBox="0 0 1000 1" preserveAspectRatio="none">
          <path ref={line} d="M0 0.5H1000" stroke="#e8fd10" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </TransitionRouter>
  );
}
