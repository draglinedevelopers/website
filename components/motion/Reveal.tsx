"use client";

import { useRef } from "react";
import { gsap, MOTION, ScrollTrigger, transitionDelay, useGSAP, type MotionConditions } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  /**
   * "scroll" (default): direct children fade in and rise 30px as they enter (once, start "top 85%").
   *   A direct child marked [data-reveal-stagger] reveals its own children instead; the attribute's
   *   value (e.g. "0.2") overrides the default 0.1s stagger.
   * "load": elements marked data-intro="fade" inside fade and rise in on page load, following the
   *   page's <SplitHeading>. They are hidden before first paint via the `motion-intro` class.
   * "off": no animation.
   */
  mode?: "scroll" | "load" | "off";
  /** Direction the content travels in from (scroll mode). */
  from?: "bottom" | "right";
  /** Load mode: seconds before the fades start (default lines up with the end of the headline). */
  delay?: number;
  /** Seconds between items entering together (scroll mode). Default 0.1. */
  stagger?: number;
};

/**
 * Container that reveals its content. Anything already in view on load is left untouched in scroll
 * mode, so nothing above the fold is ever hidden. Without JS or with reduced motion nothing animates.
 */
export default function Reveal({ children, className, as: Tag = "div", mode = "scroll", from = "bottom", delay, stagger = 0.1 }: RevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (mode === "off") return;
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;

        if (mode === "load") {
          const fades = gsap.utils.toArray<HTMLElement>('[data-intro="fade"]', root.current);
          if (!fades.length) return;
          gsap.set(fades, { autoAlpha: 0, y: small ? 8 : 12 });
          gsap.to(fades, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            delay: (delay ?? (small ? 0.6 : 0.7)) + transitionDelay(),
            clearProps: "transform",
          });
          return;
        }

        const fold = window.innerHeight * 0.85;
        const items = Array.from(root.current!.children).flatMap((child) =>
          child.hasAttribute("data-reveal-stagger") ? Array.from(child.children) : [child],
        ) as HTMLElement[];
        const pending = items.filter((el) => el.getBoundingClientRect().top > fold);
        if (!pending.length) return;

        const offset = from === "right" ? { x: small ? 30 : 60 } : { y: small ? 16 : 30 };
        gsap.set(pending, { autoAlpha: 0, ...offset });
        ScrollTrigger.batch(pending, {
          // clamp(): items too close to the bottom to reach 85% still reveal at the end of the page.
          start: "clamp(top 85%)",
          onEnter: (batch, triggers) => {
            // Each item reveals once; drop its trigger straight away.
            triggers.forEach((st) => st.kill());
            const custom = parseFloat((batch[0] as HTMLElement).parentElement?.getAttribute("data-reveal-stagger") || "");
            gsap.to(batch, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: small ? Math.min(0.06, stagger) : Number.isFinite(custom) ? custom : stagger,
              overwrite: true,
              clearProps: "transform",
            });
          },
        });
      });

      if (mode === "load") document.documentElement.classList.remove("motion-intro");
      return () => mm.revert();
    },
    { scope: root, dependencies: [mode] },
  );

  return (
    <Tag ref={root as React.RefObject<HTMLDivElement & HTMLUListElement & HTMLOListElement>} className={className}>
      {children}
    </Tag>
  );
}
