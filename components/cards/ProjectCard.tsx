import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectImage } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  sizes?: string;
};

export default function ProjectCard({ project, sizes = "(min-width: 1024px) 33vw, 100vw" }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-5">
      <Media image={project.cover} sizes={sizes} className="h-[260px] lg:h-[380px]" />
      <div className="flex items-center gap-4">
        <h3 className="flex-1 text-[23px] leading-[1.2] font-medium text-black lg:text-[27px]">{project.title}</h3>
        <Image
          src="/figma/arrow-lime.svg"
          alt=""
          width={22}
          height={22}
          unoptimized
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <div className="flex flex-col gap-2 text-muted">
        <p className="text-[12px] uppercase">{project.category}</p>
        <p className="text-[16px]">{project.result}</p>
      </div>
    </Link>
  );
}

type MediaProps = {
  image?: ProjectImage;
  className: string;
  sizes?: string;
  label?: string;
  tone?: "light" | "dark";
  priority?: boolean;
};

/** A project image, or the design's labelled placeholder when no image has been added yet. */
export function Media({ image, className, sizes = "100vw", label, tone = "light", priority }: MediaProps) {
  if (!image) return <ImagePlaceholder label={label} tone={tone} className={className} />;
  return (
    <div className={`relative overflow-hidden border ${tone === "dark" ? "border-line-dark" : "border-line"} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}

export function ImagePlaceholder({
  label = "[Project image]",
  tone = "light",
  className = "",
}: {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col justify-between border p-5 ${dark ? "border-line-dark bg-[#161616] text-muted-dark" : "border-line bg-mist text-muted"} ${className}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px]">PLACEHOLDER</p>
        <Image src="/figma/image.svg" alt="" width={16} height={16} unoptimized className={dark ? "invert" : ""} />
      </div>
      <p className="text-center text-[20px] lg:text-[28px]">{label}</p>
      <div className="flex items-start justify-between">
        <span className="h-px w-3 bg-thread" />
        <span className="h-px w-3 bg-thread" />
      </div>
    </div>
  );
}
