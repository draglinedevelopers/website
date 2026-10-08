"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { Faq } from "@/data/faqs";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * FAQ accordion (one item open at a time). Panels open and close with a GSAP height tween — the one
 * deliberate exception to the transform/opacity-only rule — and the plus icon rotates into a cross.
 * Starting heights/rotations are set once from `defaultOpen` and never re-rendered, so GSAP owns them
 * after hydration. Reduced motion: instant.
 */
export default function FaqList({ faqs, defaultOpen = 1 }: { faqs: Faq[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const { contextSafe } = useGSAP({ scope: root });

  const toggle = (i: number) =>
    contextSafe(() => {
      const next = open === i ? null : i;
      const duration = window.matchMedia(MOTION.motion).matches ? 0.4 : 0;
      const items = gsap.utils.toArray<HTMLElement>("[data-faq]", root.current);
      items.forEach((item, idx) => {
        const opening = idx === next;
        if (!opening && idx !== open) return;
        gsap.to(item.querySelector("[data-faq-panel]"), {
          height: opening ? "auto" : 0,
          duration,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(item.querySelector("[data-faq-icon]"), { rotation: opening ? 45 : 0, duration, ease: "power3.out", overwrite: true });
      });
      setOpen(next);
    })();

  return (
    <div ref={root} className="flex flex-col border-b border-line">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const startsOpen = i === defaultOpen;
        return (
          <div key={faq.question} data-faq className="border-t border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-[18px] py-6 text-left"
              >
                <span className="flex-1 text-[18px] leading-[1.4] font-medium text-black">{faq.question}</span>
                <Image
                  data-faq-icon
                  src="/figma/plus.svg"
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                  style={{ transform: startsOpen ? "rotate(45deg)" : "none" }}
                />
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              data-faq-panel
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              className="overflow-hidden"
              style={{ height: startsOpen ? "auto" : 0 }}
            >
              <p className="-mt-1 pb-6 text-[16px] leading-[1.6] text-muted">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
