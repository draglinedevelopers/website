import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

type Tone = "dark" | "light" | "mist";

const backgrounds: Record<Tone, string> = {
  dark: "bg-ink",
  light: "bg-white",
  mist: "bg-mist",
};

// Thread nodes are filled with the section colour so the dragline appears to pass through them.
const nodes: Record<Tone, string> = {
  dark: "/figma/thread-node-dark.svg",
  light: "/figma/thread-node-white.svg",
  mist: "/figma/thread-node-grey.svg",
};

type SectionProps = {
  tone?: Tone;
  children: React.ReactNode;
  /** Gap between direct children. Figma uses 40px for most sections. */
  gap?: string;
  className?: string;
  /** Scroll reveal for this section's content (default on). */
  reveal?: boolean;
  id?: string;
  "aria-labelledby"?: string;
};

export default function Section({ tone = "light", children, gap = "gap-10", className = "", reveal = true, ...rest }: SectionProps) {
  return (
    <section
      className={`relative overflow-clip px-6 py-16 md:px-10 lg:px-20 lg:py-24 ${backgrounds[tone]} ${className}`}
      {...rest}
    >
      {/* Thread node. The lime fill layer is decorative and only revealed by the ThreadLine animation. */}
      {/* suppressHydrationWarning: ThreadLine (in the layout) may style these before the page finishes hydrating. */}
      <span
        data-thread-node
        aria-hidden
        suppressHydrationWarning
        className="absolute top-[68px] left-[6px] z-20 size-[7px] lg:top-[100px] lg:left-[29px]"
      >
        <Image src={nodes[tone]} alt="" width={7} height={7} unoptimized className="block" />
        <span
          data-thread-fill
          suppressHydrationWarning
          className="invisible absolute inset-0 rounded-full bg-lime opacity-0"
        />
      </span>
      <Reveal enabled={reveal} className={`mx-auto flex w-full max-w-[1280px] flex-col ${gap}`}>
        {children}
      </Reveal>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <p className={`text-[12px] font-semibold uppercase ${tone === "dark" ? "text-muted-dark" : "text-muted"}`}>
      {children}
    </p>
  );
}
