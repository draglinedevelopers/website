"use client";

import { useState } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import { workCategories, type Project, type WorkCategory } from "@/data/projects";

export default function WorkGrid({ projects, showPlaceholderNote }: { projects: Project[]; showPlaceholderNote: boolean }) {
  const [filter, setFilter] = useState<WorkCategory | "All">("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {(["All", ...workCategories] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className="min-h-11 border border-line bg-white px-[18px] py-3 text-[14px] text-muted transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white"
          >
            {option}
          </button>
        ))}
      </div>

      {showPlaceholderNote && (
        <p className="text-[13px] leading-[1.5] text-muted">
          Project imagery and results are labelled placeholders where details have not yet been provided.
        </p>
      )}

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-10">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} sizes="(min-width: 1024px) 50vw, 100vw" />
        ))}
      </div>
    </>
  );
}
