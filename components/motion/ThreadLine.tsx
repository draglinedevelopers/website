"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP, type MotionConditions } from "@/lib/gsap";

/**
 * The continuous dragline down the page.
 * - Static track (Figma: #858585 at 28%) is always rendered, so the design is intact without JS.
 * - With motion allowed, a solid thread draws over it (DrawSVG), scrubbed to scroll so its tip
 *   follows the middle of the viewport, and each section node fills lime as the tip reaches it.
 */
export default function ThreadLine({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;

        gsap.set(".thread-draw", { autoAlpha: 1 });
        gsap.fromTo(
          ".thread-draw path",
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 50%",
              // The page may end before the bottom reaches mid-screen; clamp so the line still completes.
              end: "clamp(bottom 50%)",
              scrub: true,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-thread-node]").forEach((node) => {
          const fill = node.querySelector("[data-thread-fill]");
          const tl = gsap
            .timeline({ paused: true, defaults: { duration: 0.35, ease: "power3.out" } })
            .to(fill, { autoAlpha: 1 })
            .to(node, { scale: small ? 1.3 : 1.6 }, 0);

          ScrollTrigger.create({
            trigger: node,
            start: "center 50%",
            onEnter: () => tl.play(),
            onLeaveBack: () => tl.reverse(),
          });
        });
      });

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
      {/* viewBox is 1×1000 stretched to the page height; x-scale stays 1 so the stroke stays 1px wide. */}
      <svg
        aria-hidden
        className="thread-draw pointer-events-none invisible absolute inset-y-0 left-[9px] z-10 h-full w-px lg:left-[32px]"
        viewBox="0 0 1 1000"
        preserveAspectRatio="none"
      >
        <path d="M0.5 0V1000" stroke="#858585" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
