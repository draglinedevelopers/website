import Image from "next/image";
import { site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram, icon: "/figma/instagram.svg", framed: false },
  { label: "LinkedIn", href: site.socials.linkedin, icon: "/figma/linkedin.svg", framed: false },
  // The X and TikTok assets already include their 44px frame.
  { label: "X", href: site.socials.x, icon: "/figma/x-link.svg", framed: true },
  { label: "TikTok", href: site.socials.tiktok, icon: "/figma/tiktok-link.svg", framed: true },
];

/** Social icon row. `dark` inverts the Figma icons for use on black (mobile menu). */
export default function SocialLinks({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <ul className={`flex gap-2 ${className}`}>
      {socials.map(({ label, href, icon, framed }) => {
        const content = framed ? (
          <Image src={icon} alt="" width={44} height={44} unoptimized className={dark ? "invert" : ""} />
        ) : (
          <span className={`flex size-11 items-center justify-center border ${dark ? "border-line-dark" : "border-line"}`}>
            <Image src={icon} alt="" width={19} height={19} unoptimized className={dark ? "invert" : ""} />
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
  );
}
