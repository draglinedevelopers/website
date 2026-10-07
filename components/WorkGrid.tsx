"use client";

import { useRef, useState } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import { workCategories, type Project, type WorkCategory } from "@/data/projects";
import { Flip, gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Filter = WorkCategory | "All";

export default function WorkGrid({ projects, showPlaceholderNote }: { projects: Project[]; showPlaceholderNote: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const revealsCleared = useRef(false);

  // After React applies the new filter, animate cards from their recorded positions (Flip).
  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      const small = window.matchMedia(MOTION.small).matches;

      Flip.from(state, {
        targets: "[data-card]",
        duration: small ? 0.5 : 0.6,
        ease: "power3.out",
        // Moving cards stay in flow so the grid (and everything below it) goes straight to its final
        // height instead of collapsing mid-animation; only leaving cards are lifted out to fade.
        absolute: false,
        absoluteOnLeave: true,
        onEnter: (els) =>
          gsap.fromTo(els, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.96, duration: 0.3, ease: "power3.out" }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { scope: grid, dependencies: [filter] },
  );

  const { contextSafe } = useGSAP({ scope: grid });

  // contextSafe is applied at click time so the GSAP work joins this component's context (cleanup).
  const choose = (next: Filter) =>
    contextSafe(() => {
      if (next === filter) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", grid.current);

      // Cards placed by Flip should never re-run their scroll reveal afterwards.
      if (!revealsCleared.current) {
        revealsCleared.current = true;
        ScrollTrigger.getAll().forEach((st) => cards.includes(st.trigger as HTMLElement) && st.kill());
        gsap.set(cards, { autoAlpha: 1, y: 0, clearProps: "transform" });
      }

      if (window.matchMedia(MOTION.motion).matches) flipState.current = Flip.getState(cards);
      setFilter(next);
    })();

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {(["All", ...workCategories] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => choose(option)}
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

      {/* All cards stay mounted so Flip can animate them in and out; filtered-out cards are `hidden`. */}
      <div ref={grid} data-reveal-stagger className="grid gap-12 lg:grid-cols-2 lg:gap-x-10">
        {projects.map((project) => (
          <div
            key={project.slug}
            data-card
            data-flip-id={project.slug}
            hidden={filter !== "All" && project.category !== filter}
          >
            <ProjectCard project={project} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        ))}
      </div>
    </>
  );
}
