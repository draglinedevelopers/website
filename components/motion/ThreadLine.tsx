"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, MOTION, resetScrollTriggersForRoute, ScrollTrigger, useGSAP, type MotionConditions } from "@/lib/gsap";

/**
 * The continuous dragline down the page.
 * - Static track (Figma: #858585 at 28%) is always rendered, so the design is intact without JS.
 * - With motion allowed, a solid line grows over it (scaleY only, so the browser composites it instead
 *   of repainting the page), scrubbed to scroll so its tip follows the middle of the viewport.
 * - Section nodes fill lime once as the tip passes them. They hang off the line's single ScrollTrigger,
 *   so a page has exactly one trigger for the whole thread.
 */
export default function ThreadLine({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;

        // Pages kept alive by Next (hidden with display:none) still have nodes in the DOM; skip them.
        const nodes = gsap.utils
          .toArray<HTMLElement>("[data-thread-node]")
          .filter((node) => node.getClientRects().length > 0);
        let stops: { node: HTMLElement; at: number }[] = [];
        let next = 0;

        const measure = () => {
          const top = root.current!.getBoundingClientRect().top;
          const height = root.current!.offsetHeight || 1;
          stops = nodes
            .map((node) => {
              const r = node.getBoundingClientRect();
              return { node, at: (r.top + r.height / 2 - top) / height };
            })
            .sort((a, b) => a.at - b.at);
          next = 0;
        };

        const light = (progress: number) => {
          while (next < stops.length && progress >= stops[next].at) {
            const { node } = stops[next++];
            if (node.dataset.lit) continue;
            node.dataset.lit = "1";
            gsap.to(node.querySelector("[data-thread-fill]"), { autoAlpha: 1, duration: 0.35, ease: "power3.out" });
            gsap.to(node, { scale: small ? 1.3 : 1.6, duration: 0.35, ease: "power3.out" });
          }
        };

        gsap.set(line.current, { autoAlpha: 1, scaleY: 0 });
        gsap.to(line.current, {
          scaleY: 1,
          ease: "none",
          onUpdate() {
            light(this.progress());
          },
          scrollTrigger: {
            trigger: root.current,
            start: "top 50%",
            // The page may end before the bottom reaches mid-screen; clamp so the line still completes.
            end: "clamp(bottom 50%)",
            scrub: 0.5,
            onRefresh: measure,
            // Give the line its own compositor layer only while it is moving.
            onToggle: (self) => gsap.set(line.current, { willChange: self.isActive ? "transform" : "auto" }),
          },
        });

        return () => nodes.forEach((node) => delete node.dataset.lit);
      });

      // Runs on every route change, after the new page's own triggers exist (children's effects run first).
      resetScrollTriggersForRoute();

      // Content height changes (accordions, filters, fonts) don't fire a window resize,
      // so keep trigger positions in sync with the page height.
      let timer: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      ro.observe(root.current!);

      return () => {
        clearTimeout(timer);
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="relative">
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[9px] z-10 w-px bg-thread opacity-28 lg:left-[32px]"
      />
      <div
        ref={line}
        aria-hidden
        className="pointer-events-none invisible absolute inset-y-0 left-[9px] z-10 w-px origin-top bg-thread lg:left-[32px]"
      />
    </div>
  );
}
