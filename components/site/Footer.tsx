import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/site/Logo";
import { navLinks, site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram, icon: "/figma/instagram.svg", framed: false },
  { label: "LinkedIn", href: site.socials.linkedin, icon: "/figma/linkedin.svg", framed: false },
  // The X and TikTok assets already include their 44px frame.
  { label: "X", href: site.socials.x, icon: "/figma/x-link.svg", framed: true },
  { label: "TikTok", href: site.socials.tiktok, icon: "/figma/tiktok-link.svg", framed: true },
];

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-12 md:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-5 lg:w-[380px]">
            <Logo tone="dark" />
            <p className="text-[16px] leading-[1.6] text-muted">{site.tagline}</p>
          </div>

          <ul className="flex flex-wrap gap-6 text-[15px] lg:flex-col lg:gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink transition-colors hover:text-muted">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 text-[16px]">
            <a href={`mailto:${site.email}`} className="text-ink transition-colors hover:text-muted">
              {site.email}
            </a>
            <a href={`tel:${site.phoneHref}`} className="text-muted transition-colors hover:text-ink">
              {site.phone}
            </a>
            <ul className="flex gap-2">
              {socials.map(({ label, href, icon, framed }) => {
                const content = framed ? (
                  <Image src={icon} alt="" width={44} height={44} unoptimized />
                ) : (
                  <span className="flex size-11 items-center justify-center border border-line">
                    <Image src={icon} alt="" width={19} height={19} unoptimized />
                  </span>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="block transition-opacity hover:opacity-60"
                      >
                        {content}
                      </a>
                    ) : (
                      <span aria-label={`${label} (coming soon)`} role="img" className="block">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="h-px bg-line" />

        <div className="flex flex-col gap-4 text-[13px] text-muted lg:flex-row lg:justify-between">
          <p>{site.location}</p>
          <p>{site.website}</p>
        </div>
      </div>
    </footer>
  );
}
