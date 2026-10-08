"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-transition-router";
import { useEffect, useRef } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import SocialLinks from "@/components/site/SocialLinks";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { bookCallHref, navLinks } from "@/lib/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  /** The hamburger button in the header: its three [data-menu-line] spans morph into an X. */
  toggle: React.RefObject<HTMLButtonElement | null>;
};

const isReduced = () => !window.matchMedia(MOTION.motion).matches;

/**
 * Full-screen mobile menu, driven by one GSAP timeline that plays on open and reverses (1.5× faster)
 * on close: icon → X, top-right clip-path wipe, lime thread drawing down the left, links rising from
 * masks beside lime nodes, then the CTA and socials. Reduced motion: appears/disappears instantly.
 * Tapping a link closes the menu first, then navigates so the page transition plays cleanly.
 */
export default function MobileMenu({ open, onClose, toggle }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pendingHref = useRef<string | null>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname();
  const router = useTransitionRouter();
  const routerRef = useRef(router);
  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  // Navigate to the link that was tapped, once the menu has finished closing.
  const goPending = () => {
    const href = pendingHref.current;
    pendingHref.current = null;
    if (href) routerRef.current.push(href);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const p = panel.current!;
        const q = gsap.utils.selector(p);
        const [top, mid, bottom] = gsap.utils.toArray<HTMLElement>("[data-menu-line]", toggle.current);

        const t = gsap
          .timeline({
            paused: true,
            onReverseComplete: () => {
              gsap.set(p, { autoAlpha: 0 });
              goPending();
            },
          })
          .set(p, { autoAlpha: 1 }, 0)
          // 1. Hamburger → X (0.3s).
          .to(top, { y: 7, rotation: 45, duration: 0.3, ease: "power3.inOut" }, 0)
          .to(bottom, { y: -7, rotation: -45, duration: 0.3, ease: "power3.inOut" }, 0)
          .to(mid, { autoAlpha: 0, duration: 0.15, ease: "power1.out" }, 0)
          // 2. Panel wipes open from the top-right corner (0.5s).
          .fromTo(
            p,
            { clipPath: "circle(0% at 100% 0%)" },
            { clipPath: "circle(150% at 100% 0%)", duration: 0.5, ease: "power3.inOut" },
            0,
          )
          // 3. Lime thread draws down the left side.
          .fromTo(q("[data-menu-thread]"), { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.6, ease: "power2.out" }, 0.15)
          // 4. Nodes + links rise from their masks, just before the panel finishes.
          .fromTo(q("[data-menu-node]"), { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.08, ease: "power3.out" }, 0.4)
          .fromTo(
            q("[data-menu-link]"),
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
            0.4,
          )
          // 5. CTA and socials last.
          .fromTo(q("[data-menu-tail]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, 0.75);

        tl.current = t;
        if (wasOpen.current) t.progress(1);
        return () => {
          tl.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: panel },
  );

  // Open / close + focus management.
  useEffect(() => {
    const p = panel.current!;
    const lines = gsap.utils.toArray<HTMLElement>("[data-menu-line]", toggle.current);

    if (open) {
      wasOpen.current = true;
      if (isReduced() || !tl.current) {
        gsap.set(p, { autoAlpha: 1, clipPath: "none" });
        gsap.set(lines[0], { y: 7, rotation: 45 });
        gsap.set(lines[2], { y: -7, rotation: -45 });
        gsap.set(lines[1], { autoAlpha: 0 });
      } else {
        tl.current.timeScale(1).play();
      }
      // Move focus to the first link as soon as the panel is focusable (it becomes visible a frame or
      // two after opening); retry briefly rather than guessing a delay.
      let frame = 0;
      const focusFirst = (tries: number) => {
        const first = p.querySelector<HTMLElement>("a[href]");
        first?.focus();
        if (document.activeElement !== first && tries > 0) frame = requestAnimationFrame(() => focusFirst(tries - 1));
      };
      focusFirst(20);
      return () => cancelAnimationFrame(frame);
    }

    if (!wasOpen.current) return;
    wasOpen.current = false;
    if (isReduced() || !tl.current) {
      gsap.set(p, { autoAlpha: 0 });
      gsap.set(lines, { clearProps: "transform,opacity,visibility" });
      // Wait two frames so the hidden menu has actually painted before the route changes
      // (one rAF still runs before that frame's paint).
      requestAnimationFrame(() => requestAnimationFrame(goPending));
    } else {
      tl.current.timeScale(1.5).reverse();
    }
    toggle.current?.focus();
  }, [open, toggle]);

  // Trap Tab focus inside the open menu (the hamburger button counts as part of it).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = [toggle.current, ...panel.current!.querySelectorAll<HTMLElement>("a[href], button")].filter(
        (el): el is HTMLElement => !!el,
      );
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !items.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  // Internal links: close first, navigate after the close animation (see goPending). Runs in the
  // capture phase so it cancels the click before next/link's own handler navigates.
  const onClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!a || !href?.startsWith("/") || a.target === "_blank") return;
    e.preventDefault();
    if (href !== pathname) pendingHref.current = href;
    onClose();
  };

  return (
    <div
      ref={panel}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      onClickCapture={onClick}
      className="invisible fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden"
    >
      {/* Lime thread down the left, on the same line as the page thread. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute top-20 bottom-0 left-[9px] h-[calc(100%-80px)] w-px"
        viewBox="0 0 1 1000"
        preserveAspectRatio="none"
      >
        <path data-menu-thread d="M0.5 0V1000" stroke="#e8fd10" strokeWidth="1" fill="none" />
      </svg>

      <div className="px-6 pt-[104px] pb-10 md:px-10">
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-line-dark">
              {/* Lime node on the thread beside each link (positioned against the panel). */}
              <span aria-hidden data-menu-node className="absolute left-[6px] mt-[34px] size-[7px] rounded-full bg-lime" />
              <Link
                href={link.href}
                // The menu closes first and then navigates itself (with the page transition).
                data-transition-ignore
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className="block py-5 text-[34px] leading-[1.04] font-semibold text-white aria-[current=page]:text-lime"
              >
                {/* Mask: the label rises into view from below this clipped box. */}
                <span className="block overflow-hidden">
                  <span data-menu-link className="block">
                    {link.label}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div data-menu-tail className="mt-10">
          <MagneticButton href={bookCallHref} transitionIgnore className="w-full">
            Book a free call
          </MagneticButton>
        </div>
        <div data-menu-tail className="mt-8">
          <SocialLinks tone="dark" />
        </div>
      </div>
    </div>
  );
}
