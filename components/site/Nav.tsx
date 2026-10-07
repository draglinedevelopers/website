"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/site/Logo";
import Button from "@/components/ui/Button";
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

  // Lock page scroll while the menu is open, close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="relative z-40 bg-ink">
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
              className="flex h-11 items-center text-[15px] text-white transition-colors hover:text-lime aria-[current=page]:text-lime"
            >
              {link.label}
            </Link>
          ))}
          <Button href={bookCallHref}>Book a free call</Button>
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
        <Button href={bookCallHref} className="mt-10 w-full">
          Book a free call
        </Button>
      </div>
    </header>
  );
}
