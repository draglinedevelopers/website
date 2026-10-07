"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

type Variant = "primary" | "secondary-dark" | "secondary-light";

const styles: Record<Variant, string> = {
  primary: "bg-lime border-transparent text-ink hover:bg-[#d9ee00]",
  "secondary-dark": "bg-ink border-line-dark text-white hover:border-thread",
  "secondary-light": "bg-white border-line text-ink hover:border-ink",
};

/** Desktop pointers only: a fine pointer that can hover, with motion allowed. */
const MAGNETIC_QUERY = `(pointer: fine) and (hover: hover) and ${MOTION.motion}`;
const MAX_PULL = 8;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens in a new tab (for off-site links such as WhatsApp). */
  external?: boolean;
  /** Button drifts toward the cursor (max 8px) on hover. Used for "Book a free call". */
  magnetic?: boolean;
};

export default function Button({ href, children, variant = "primary", className = "", external, magnetic }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!magnetic) return;
      const mm = gsap.matchMedia();

      mm.add(MAGNETIC_QUERY, () => {
        const el = ref.current!;
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          // Offset from centre, normalised to -1..1 across the button, scaled to the max pull.
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
    { scope: ref, dependencies: [magnetic] },
  );

  return (
    <Link
      ref={ref}
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group inline-flex min-h-[52px] items-center justify-center gap-5 border px-[22px] py-[14px] text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
      <Image
        src={variant === "secondary-dark" ? "/figma/arrow-white.svg" : "/figma/arrow-dark.svg"}
        alt=""
        width={16}
        height={16}
        unoptimized
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
