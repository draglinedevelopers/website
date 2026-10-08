import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Logo from "@/components/site/Logo";
import SocialLinks from "@/components/site/SocialLinks";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-12 md:px-10 lg:px-20 lg:py-16">
      {/* Footer content reveals with a short stagger as it enters the viewport. */}
      <Reveal stagger={0.08} className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <div data-reveal-stagger className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
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
            <SocialLinks />
          </div>
        </div>

        <div className="h-px bg-line" />

        <div className="flex flex-col gap-4 text-[13px] text-muted lg:flex-row lg:justify-between">
          <p>{site.location}</p>
          <p>{site.website}</p>
        </div>
      </Reveal>
    </footer>
  );
}
