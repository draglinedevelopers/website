"use client";

import { useRef } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP, type MotionConditions } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Set false to render the container without reveal animations (e.g. the Home hero, which has its own intro). */
  enabled?: boolean;
};

/**
 * Container whose direct children fade in and rise as they enter the viewport (once, start "top 85%").
 * A direct child marked [data-reveal-stagger] reveals its own children instead, staggered 0.1s.
 * Anything already in view when the page loads is left untouched, so nothing above the fold is hidden.
 */
export default function Reveal({ children, className, enabled = true }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;

        const fold = window.innerHeight * 0.85;
        const items = Array.from(root.current!.children).flatMap((child) =>
          child.hasAttribute("data-reveal-stagger") ? Array.from(child.children) : [child],
        ) as HTMLElement[];
        const pending = items.filter((el) => el.getBoundingClientRect().top > fold);
        if (!pending.length) return;

        gsap.set(pending, { autoAlpha: 0, y: small ? 16 : 30 });
        ScrollTrigger.batch(pending, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: small ? 0.06 : 0.1,
              overwrite: true,
              clearProps: "transform",
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [enabled] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
