import Image from "next/image";
import Link from "next/link";

type Variant = "primary" | "secondary-dark" | "secondary-light";

const styles: Record<Variant, string> = {
  primary: "bg-lime border-transparent text-ink hover:bg-[#d9ee00]",
  "secondary-dark": "bg-ink border-line-dark text-white hover:border-thread",
  "secondary-light": "bg-white border-line text-ink hover:border-ink",
};

export type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens in a new tab (for off-site links such as WhatsApp). */
  external?: boolean;
  /** Skip the automatic page transition for this link (the caller navigates itself, e.g. the mobile menu). */
  transitionIgnore?: boolean;
  ref?: React.Ref<HTMLAnchorElement>;
};

export default function Button({ href, children, variant = "primary", className = "", external, transitionIgnore, ref }: ButtonProps) {
  return (
    <Link
      ref={ref}
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...(transitionIgnore && { "data-transition-ignore": "" })}
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
