"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import Logo from "@/components/site/Logo";
import MobileMenu from "@/components/site/MobileMenu";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { bookCallHref, navLinks } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the mobile menu on navigation (adjusting state during render, not in an effect).
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  const header = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuOpen = useRef(false);

  // While the menu is open: lock page scroll, pause Lenis, close on Escape or on widening to desktop.
  useEffect(() => {
    menuOpen.current = open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  // Hide the nav while scrolling down, bring it back on scroll up. Always shown near the top of the
  // page and while the mobile menu is open. Reduced motion: the nav simply stays put.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const el = header.current!;
        let hidden = false;
        const setHidden = (next: boolean) => {
          if (next === hidden) return;
          hidden = next;
          gsap.to(el, { yPercent: next ? -100 : 0, duration: 0.3, ease: "power3.out", overwrite: true });
        };
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (self.scroll() < el.offsetHeight || menuOpen.current) setHidden(false);
            else if (self.direction === 1) setHidden(true);
            else setHidden(false);
          },
        });
      });
      return () => mm.revert();
    },
    { scope: header },
  );

  return (
    <>
      {/* z-50 keeps the header (and its X button) above the full-screen mobile menu panel (z-40). */}
      <header ref={header} className="sticky top-0 z-50 bg-ink">
        <nav
          aria-label="Main"
          className="mx-auto flex h-20 items-center justify-between px-6 md:px-10 lg:h-[104px] lg:px-20"
        >
          <Logo tone="light" />

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className="group relative flex h-11 items-center text-[15px] text-white transition-colors hover:text-muted-dark"
              >
                {link.label}
                {/* Active indicator: 16×2 lime bar under the current page, as in Figma. */}
                <span
                  aria-hidden
                  className="absolute top-[calc(50%+16px)] left-0 hidden h-[2px] w-4 bg-lime group-aria-[current=page]:block"
                />
              </Link>
            ))}
            <MagneticButton href={bookCallHref}>
              Book a free call
            </MagneticButton>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2.5 flex size-11 items-center justify-center lg:hidden"
          >
            {/* Three lines matching the Figma menu icon (24px, 16px wide, 1.5px). MobileMenu morphs them into an X. */}
            <span aria-hidden className="relative block size-6">
              <span data-menu-line className="absolute top-[4.25px] left-1 h-[1.5px] w-4 rounded-full bg-white" />
              <span data-menu-line className="absolute top-[11.25px] left-1 h-[1.5px] w-4 rounded-full bg-white" />
              <span data-menu-line className="absolute top-[18.25px] left-1 h-[1.5px] w-4 rounded-full bg-white" />
            </span>
          </button>
        </nav>

      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} toggle={toggleRef} />
    </>
  );
}
