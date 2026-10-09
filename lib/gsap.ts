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

/** Extra delay for page intros while a page transition panel is still sweeping away. */
export const transitionDelay = () =>
  typeof document !== "undefined" && document.documentElement.hasAttribute("data-transitioning") ? 0.3 : 0;

/**
 * Runs `play` once when `trigger` reaches `start`, then kills the trigger so nothing is left watching
 * the scroll. `clamp()` keeps the start within the page, so elements too close to the bottom to ever
 * reach `start` still play when the visitor reaches the end.
 */
export function onceInView(trigger: Element, start: string, play: () => void) {
  return ScrollTrigger.create({
    trigger,
    start: `clamp(${start})`,
    onEnter: (self) => {
      self.kill();
      play();
    },
  });
}

/**
 * Route-change cleanup. Next keeps recently visited pages mounted but hidden (display:none), so a
 * trigger whose element is no longer rendered belongs to a page the visitor has left: kill it and its
 * animation, then re-measure the remaining triggers once for the new page.
 */
export function resetScrollTriggersForRoute() {
  ScrollTrigger.getAll().forEach((st) => {
    const el = st.trigger;
    if (el instanceof Element && el !== document.documentElement && (!el.isConnected || el.getClientRects().length === 0)) {
      st.animation?.kill();
      st.kill();
    }
  });
  ScrollTrigger.refresh();
}

export type MotionConditions = { motion: boolean; small: boolean };

export { gsap, DrawSVGPlugin, Flip, ScrollTrigger, SplitText, useGSAP };
