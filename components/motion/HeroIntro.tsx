"use client";

import { useRef } from "react";
import { gsap, MOTION, SplitText, useGSAP, type MotionConditions } from "@/lib/gsap";

/**
 * Home hero entrance. Marks inside children:
 *   [data-intro="headline"]  split into words that rise and fade in (staggered 0.08s, under 1.2s)
 *   [data-intro="fade"]      fades in after the headline (subheadline, buttons)
 * Pre-paint hiding comes from the `motion-intro` class set in app/layout.tsx (see globals.css);
 * this hook takes over with inline styles and removes that class.
 */
export default function HeroIntro({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;

        const headline = root.current!.querySelector<HTMLElement>('[data-intro="headline"]')!;
        const fades = gsap.utils.toArray<HTMLElement>('[data-intro="fade"]', root.current);
        const split = SplitText.create(headline, { type: "words" });

        // Hold the start state inline before the CSS pre-hide is removed below, so nothing flashes.
        gsap.set([headline, ...fades], { autoAlpha: 1 });
        gsap.set(split.words, { autoAlpha: 0, y: small ? 20 : 40 });
        gsap.set(fades, { autoAlpha: 0, y: small ? 8 : 12 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(split.words, { autoAlpha: 1, y: 0, duration: 0.6, stagger: small ? 0.06 : 0.08 })
          .to(fades, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
          .add(() => {
            split.revert();
            gsap.set(fades, { clearProps: "transform" });
          });
      });

      document.documentElement.classList.remove("motion-intro");
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="contents">
      {children}
    </div>
  );
}
