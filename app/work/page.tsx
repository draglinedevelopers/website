import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";
import ClosingInvitation from "@/components/sections/ClosingInvitation";
import Section, { Eyebrow } from "@/components/ui/Section";
import { hasPlaceholders, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites, product design and campaigns by Dragline Developers.",
};

export default function WorkPage() {
  return (
    <>
      <Section tone="dark" gap="gap-8" aria-labelledby="work-heading">
        <Eyebrow tone="dark">Work / Selected connections</Eyebrow>
        <h1 id="work-heading" className="text-display font-semibold text-white">
          From an idea to something real.
        </h1>
        <p className="max-w-[600px] text-[16px] leading-[1.6] text-muted-dark">
          Websites, product design and campaigns. A place for the work — and the thinking that connects it.
        </p>
      </Section>

      <Section gap="gap-12" aria-label="Projects">
        <WorkGrid projects={projects} showPlaceholderNote={projects.some(hasPlaceholders)} />
      </Section>

      <ClosingInvitation />
    </>
  );
}
