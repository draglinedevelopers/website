"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis share one frame loop.
 * Only created when motion is allowed: reduced-motion users keep native scrolling with no Lenis at all.
 * Below 800px there is no Lenis at all: phones scroll natively (Lenis would only add per-frame work there).
 */
export default function SmoothScroll() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(`${MOTION.motion} and (min-width: 800px)`, () => {
      const lenis = new Lenis({
        autoRaf: false,
        anchors: true, // same-page #links scroll smoothly
        autoToggle: true, // pauses while <html> overflow is hidden (mobile menu open)
        stopInertiaOnNavigate: true, // no leftover momentum after a route change
      });

      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        setLenis(null);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  });

  return null;
}
