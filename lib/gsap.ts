/**
 * Single place where GSAP and its plugins are registered. Import gsap and plugins from here,
 * never directly from "gsap/*", so registration happens exactly once.
 * Only import this from client components (GSAP must not run during SSR).
 */
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, Flip);
}

/** gsap.matchMedia() conditions shared by every animation. */
export const MOTION = {
  /** Full animations. Nothing runs outside this condition, so reduced-motion users see the final state. */
  motion: "(prefers-reduced-motion: no-preference)",
  /** Lighter variants (shorter distances, fewer staggers) below 800px. */
  small: "(max-width: 799px)",
};

export type MotionConditions = { motion: boolean; small: boolean };

export { gsap, DrawSVGPlugin, Flip, ScrollTrigger, SplitText, useGSAP };
