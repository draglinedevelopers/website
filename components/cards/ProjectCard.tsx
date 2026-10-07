import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  /** Image height on desktop. Three-column cards use 380px; two-column cards on Work are taller. */
  imageClassName?: string;
};

export default function ProjectCard({ project, imageClassName = "h-[260px] lg:h-[380px]" }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-5">
      {project.cover ? (
        <div className={`relative overflow-hidden border border-line bg-mist ${imageClassName}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <ImagePlaceholder className={imageClassName} />
      )}
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

export function ImagePlaceholder({ label = "[Project image]", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col justify-between border border-line bg-mist p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <p className="text-[10px] text-muted">PLACEHOLDER</p>
        <Image src="/figma/image.svg" alt="" width={16} height={16} unoptimized />
      </div>
      <p className="text-center text-[20px] text-muted lg:text-[28px]">{label}</p>
      <div className="flex items-start justify-between">
        <span className="h-px w-3 bg-thread" />
        <span className="h-px w-3 bg-thread" />
      </div>
    </div>
  );
}
