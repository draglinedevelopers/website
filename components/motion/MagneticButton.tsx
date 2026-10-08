"use client";

import { useRef } from "react";
import Button, { type ButtonProps } from "@/components/ui/Button";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** Desktop pointers only: a fine pointer that can hover, with motion allowed. */
const MAGNETIC_QUERY = `(pointer: fine) and (hover: hover) and ${MOTION.motion}`;
const MAX_PULL = 8;

/** Drifts an element toward the cursor (max 8px) while hovered, easing back on leave. */
export function useMagnetic(ref: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MAGNETIC_QUERY, () => {
        const el = ref.current!;
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          // Offset from centre, normalised to -1..1 across the element, scaled to the max pull.
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          xTo(gsap.utils.clamp(-1, 1, dx) * MAX_PULL);
          yTo(gsap.utils.clamp(-1, 1, dy) * MAX_PULL);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );
}

/** <Button> with the desktop-only magnetic hover. Used for every "Book a free call". */
export default function MagneticButton(props: Omit<ButtonProps, "ref">) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);
  return <Button ref={ref} {...props} />;
}
