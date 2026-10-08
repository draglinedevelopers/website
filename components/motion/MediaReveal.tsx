"use client";

import { useRef } from "react";
import { gsap, MOTION, ScrollTrigger, transitionDelay, useGSAP, type MotionConditions } from "@/lib/gsap";

type MediaRevealProps = {
  children: React.ReactNode;
  /** Size classes for the frame (e.g. "h-[260px] lg:h-[380px]"). */
  className?: string;
  /** "scroll": wipe in when it enters the viewport. "load": wipe in on page load (pre-hidden, no flash). */
  mode?: "scroll" | "load";
  /** Max px the frame drifts down (scrubbed) while its section scrolls away. Used on case study heroes. */
  parallax?: number;
};

const HIDDEN = "inset(100% 0% 0% 0%)";
const SHOWN = "inset(0% 0% 0% 0%)";

/**
 * Image frame that reveals with a bottom-to-top clip-path wipe while the image settles from
 * scale 1.1 to 1. Content is visible by default; animation only runs with motion allowed.
 */
export default function MediaReveal({ children, className = "", mode = "scroll", parallax }: MediaRevealProps) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { motion, small } = context.conditions as MotionConditions;
        if (!motion) return;
        const el = frame.current!;
        const inner = el.firstElementChild as HTMLElement;

        const wipe = (delay = 0) =>
          gsap
            .timeline({ delay, onComplete: () => gsap.set(el, { clearProps: "clipPath" }) })
            .fromTo(el, { clipPath: HIDDEN }, { clipPath: SHOWN, duration: 0.9, ease: "power3.out" })
            .fromTo(inner, { scale: 1.1 }, { scale: 1, duration: 1.2, ease: "power3.out", clearProps: "transform" }, 0);

        if (mode === "load") {
          gsap.set(el, { autoAlpha: 1 });
          wipe(0.3 + transitionDelay());
          document.documentElement.classList.remove("motion-intro");
        } else if (el.getBoundingClientRect().top > window.innerHeight * 0.85) {
          gsap.set(el, { clipPath: HIDDEN });
          gsap.set(inner, { scale: 1.1 });
          ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => wipe() });
        }

        if (parallax) {
          gsap.to(el, {
            y: small ? parallax / 2 : parallax,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: true },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div
      ref={frame}
      data-media-reveal
      {...(mode === "load" && { "data-intro": "media" })}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
