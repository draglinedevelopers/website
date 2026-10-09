import Image from "next/image";
import Link from "next/link";

type LogoProps = { tone: "light" | "dark" };

/** Mark from /public/logo.png + the two-line Figma wordmark. `light` = white, for dark backgrounds. */
export default function Logo({ tone }: LogoProps) {
  return (
    <Link href="/" aria-label="Dragline Developers home" className="flex items-center gap-[10px]">
      <Image
        src={tone === "light" ? "/logo-mark-white.png" : "/logo-mark.png"}
        alt=""
        width={21}
        height={32}
      />
      <span
        className={`text-[19px] leading-[0.98] font-semibold ${tone === "light" ? "text-white" : "text-ink"}`}
      >
        dragline
        <br />
        developers
      </span>
    </Link>
  );
}
