"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION, onceInView, useGSAP } from "@/lib/gsap";

/** Path data of public/figma/connected-web.svg (242.308 × 290), inlined so each cell can be drawn. */
const WEB_D =
  "M235.992 243.228L97.4473 289.351L102.523 243.795L193.991 212.747L194.248 212.66L194.29 212.393L194.616 210.355L235.992 243.228ZM39.3966 207.402L39.6202 207.532L101.647 243.528L96.5489 289.29L0.803783 238.134L39.3966 206.32V207.402ZM193.808 209.713L193.443 211.982L102.633 242.807L107.709 197.245L107.804 197.222L156.266 184.793L156.534 184.725L156.594 184.453L157.396 180.785L193.808 209.713ZM77.0889 176.309L77.2833 176.442L106.857 196.758L101.756 242.552L40.296 206.883V205.579L77.0889 175.249V176.309ZM241.832 145.45L236.521 242.498L194.779 209.336L204.999 145.45H241.832ZM39.3966 145.45V205.154L0.450268 237.26V145.45H39.3966ZM204.088 145.45L193.971 208.693L157.61 179.806L165.132 145.45H204.088ZM77.0889 145.45V174.082L40.296 204.413V145.45H77.0889ZM156.611 180.162L155.773 183.989L107.816 196.289L113.434 145.858L156.611 180.162ZM106.971 195.743L77.9884 175.834V174.508L112.507 146.053L106.971 195.743ZM164.209 145.45L156.825 179.183L114.367 145.45H164.209ZM111.823 145.45L77.9884 173.341V145.45H111.823ZM241.676 144.55H204.928L178.114 72.3438L178.045 72.1562L177.859 72.082L175.753 71.2373L204.449 37.1455L241.676 144.55ZM177.34 72.8438L203.968 144.55H165.039L145.781 108.538L145.706 108.396L145.558 108.335L144.795 108.017L175.143 71.9629L177.34 72.8438ZM145.063 109.103L164.018 144.55H114.044L144.188 108.738L145.063 109.103ZM112.627 144.55H78.4132L112.627 96.6895V144.55ZM112.627 95.1416L77.3067 144.55H40.7423L112.627 47.9648V95.1416ZM112.627 46.458L39.6202 144.55H0.920971L112.627 1.30762V46.458ZM143.316 108.375L113.527 143.765V95.9609L143.316 108.375ZM174.263 71.6104L143.924 107.654L113.527 94.9854V47.2715L174.263 71.6104ZM203.868 36.4375L174.873 70.8857L113.527 46.3027V0.661133L203.868 36.4375Z";

/** Where the anchoring thread meets the web (left edge, vertical centre), in the web's own units. */
const ENTRY = { x: 0, y: 145 };

// Split the compound path into its closed cells, ordered by distance from the entry point so the
// web appears to branch outward from the thread as it draws.
const CELLS = WEB_D.split("Z")
  .map((c) => c.trim())
  .filter(Boolean)
  .map((c) => {
    const n = c.match(/-?\d*\.?\d+/g)!.map(Number);
    let x = 0;
    let y = 0;
    for (let i = 0; i < n.length - 1; i += 2) {
      x += n[i];
      y += n[i + 1];
    }
    const pts = Math.floor(n.length / 2);
    return { d: `${c}Z`, dist: Math.hypot(x / pts - ENTRY.x, y / pts - ENTRY.y) };
  })
  .sort((a, b) => a.dist - b.dist);

/**
 * The "Why Dragline" illustration: anchoring thread + connected web + lime connection node.
 * With `animate`, plays once as it comes into view: the single thread draws first, then branches into the web
 * cell by cell, then the node lights. Static (identical to the Figma asset) otherwise.
 */
export default function WebIllustration({ animate = false }: { animate?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animate) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const tl = gsap
          .timeline({ paused: true, defaults: { ease: "power2.inOut" } })
          .fromTo("[data-web-thread]", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.5 })
          .fromTo("[data-web-cell]", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.5, stagger: 0.04 })
          .fromTo("[data-web-node]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
        onceInView(root.current!, "top 70%", () => tl.play());
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [animate] },
  );

  return (
    <div ref={root} aria-hidden className="relative flex h-[250px] items-center justify-center lg:h-[340px]">
      {/* Anchoring thread. 120×1 viewBox stretched to the span; 1px tall keeps the stroke at 1px. */}
      <svg className="h-px w-[70px] lg:w-[120px]" viewBox="0 0 120 1" preserveAspectRatio="none">
        <path data-web-thread d="M0 0.5H120" stroke="#858585" strokeWidth="1" fill="none" />
      </svg>
      {/* The web sits 13.46% in from the left of its 280×290 frame, as in Figma. */}
      <span className="relative h-[220px] w-[210px] lg:h-[290px] lg:w-[280px]">
        <svg
          className="absolute inset-y-0 right-0 left-[13.46%] h-full w-[86.54%]"
          viewBox="0 0 242.308 290"
          preserveAspectRatio="none"
          fill="none"
        >
          {CELLS.map((cell) => (
            <path key={cell.d} data-web-cell d={cell.d} stroke="#858585" strokeWidth="0.9" />
          ))}
        </svg>
      </span>
      <Image
        data-web-node
        src="/figma/connection-node.svg"
        alt=""
        width={6}
        height={6}
        unoptimized
        className="absolute top-[calc(50%-3px)] left-[calc(50%+43px)] -translate-x-1/2 -translate-y-1/2 lg:left-[calc(50%+68px)]"
      />
    </div>
  );
}
