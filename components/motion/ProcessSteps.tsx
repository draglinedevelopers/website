"use client";

import { useRef } from "react";
import { gsap, MOTION, onceInView, useGSAP, type MotionConditions } from "@/lib/gsap";

type Step = { title: string; body: string };

/**
 * "How we work" steps. With motion allowed, steps start dimmed and light up one by one, once, as
 * they come into view: a lime ring fades in over the step node, the step text comes to full strength
 * and a lime thread grows along the connector. Without JS / with reduced motion they render as in Figma.
 * Each trigger fires once and is then killed, so nothing runs while the page scrolls.
 */
export default function ProcessSteps({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;

        const items = gsap.utils.toArray<HTMLElement>("[data-step]");
        const part = (el: HTMLElement, name: string) => el.querySelectorAll(`[data-step-${name}]`);

        gsap.set(".step-text", { autoAlpha: 0.35 });
        gsap.set("[data-step-ring], [data-step-thread]", { autoAlpha: 1 });
        gsap.set("[data-step-ring]", { opacity: 0 });
        gsap.set("[data-step-thread]", { scaleX: 0, transformOrigin: "left center" });

        // Lights one step: ring + node pop + text, then the thread grows toward the next step.
        const light = (tl: gsap.core.Timeline, el: HTMLElement) =>
          tl
            .to(part(el, "ring"), { opacity: 1, duration: 0.3 })
            .to(part(el, "node"), { scale: 1.08, duration: 0.3 }, "<")
            .to(el.querySelectorAll(".step-text"), { autoAlpha: 1, duration: 0.3 }, "<")
            .to(part(el, "thread"), { scaleX: 1, duration: 0.4 }, "-=0.1");

        if (small) {
          // Stacked: each step lights as its node reaches mid-screen, where the thread tip is.
          items.forEach((el) => {
            const tl = light(gsap.timeline({ paused: true, defaults: { ease: "power2.out" } }), el);
            onceInView(part(el, "node")[0], "center 55%", () => tl.play());
          });
        } else {
          // One row: light the steps left to right once the row reaches the thread tip.
          const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
          items.forEach((el) => light(tl, el));
          onceInView(root.current!, "top 65%", () => tl.play());
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ol ref={root} data-reveal-stagger className="flex flex-col lg:flex-row lg:gap-7">
      {steps.map((step, i) => (
        <li key={step.title} data-step className="flex flex-1 flex-col gap-5 pb-9 lg:pb-0">
          <div className="flex items-center gap-4">
            <span
              data-step-node
              className="relative flex size-11 items-center justify-center rounded-full border border-line-dark text-[14px] text-white"
            >
              {i + 1}
              <span data-step-ring aria-hidden className="invisible absolute -inset-px rounded-full border border-lime" />
            </span>
            <span aria-hidden className="relative h-px flex-1 bg-line-dark">
              <span data-step-thread className="invisible absolute inset-0 bg-lime" />
            </span>
          </div>
          <h3 className="step-text text-[24px] text-white">{step.title}</h3>
          <p className="step-text text-[16px] leading-[1.6] text-muted-dark">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
