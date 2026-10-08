"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/site/Logo";
import MagneticButton from "@/components/motion/MagneticButton";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";
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
  const menuOpen = useRef(false);

  // Lock page scroll while the menu is open, close on Escape.
  useEffect(() => {
    menuOpen.current = open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
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
    <header ref={header} className="sticky top-0 z-40 bg-ink">
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
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2.5 flex size-11 items-center justify-center lg:hidden"
        >
          {open ? (
            <span aria-hidden className="relative block size-6">
              <span className="absolute top-1/2 left-[4px] h-[1.5px] w-4 -translate-y-1/2 rotate-45 rounded-full bg-white" />
              <span className="absolute top-1/2 left-[4px] h-[1.5px] w-4 -translate-y-1/2 -rotate-45 rounded-full bg-white" />
            </span>
          ) : (
            <Image src="/figma/menu.svg" alt="" width={24} height={24} unoptimized />
          )}
        </button>
      </nav>

      {/* Mobile menu: not drawn in Figma, built from the same tokens as the nav. */}
      <div
        id="mobile-menu"
        hidden={!open}
        onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-ink px-6 pt-6 pb-10 md:px-10 lg:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-line-dark">
              <Link
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className="flex items-center py-5 text-[34px] leading-[1.04] font-semibold text-white aria-[current=page]:text-lime"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <MagneticButton href={bookCallHref} className="mt-10 w-full">
          Book a free call
        </MagneticButton>
      </div>
    </header>
  );
}
