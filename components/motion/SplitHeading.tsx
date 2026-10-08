"use client";

import { useRef } from "react";
import { gsap, MOTION, SplitText, transitionDelay, useGSAP, type MotionConditions } from "@/lib/gsap";

type SplitHeadingProps = {
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Page headline that rises in word by word on load (SplitText, staggered 0.08s, under 1.2s),
 * then reverts to its original markup. Hidden before first paint via [data-intro] + the
 * `motion-intro` class (see app/layout.tsx and globals.css), so there is no flash.
 * Supporting text that should follow it is marked data-intro="fade" inside a <Section intro>.
 */
export default function SplitHeading({ as: Tag = "h1", id, className, children }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;

        const heading = ref.current!;
        const split = SplitText.create(heading, { type: "words" });

        // Hold the start state inline before the CSS pre-hide is removed, so nothing flashes.
        gsap.set(heading, { autoAlpha: 1 });
        gsap.set(split.words, { autoAlpha: 0, y: small ? 20 : 40 });
        gsap.to(split.words, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: small ? 0.06 : 0.08,
          delay: transitionDelay(),
          onComplete: () => split.revert(),
        });
      });

      document.documentElement.classList.remove("motion-intro");
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-intro="headline" className={className}>
      {children}
    </Tag>
  );
}
