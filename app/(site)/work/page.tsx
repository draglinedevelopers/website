import type { Metadata } from "next";
import SplitHeading from "@/components/motion/SplitHeading";
import ClosingInvitation from "@/components/sections/ClosingInvitation";
import Section, { Eyebrow } from "@/components/ui/Section";
import WorkGrid from "@/components/WorkGrid";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites, product design and campaigns by Dragline Developers.",
};

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <Section tone="dark" gap="gap-8" intro aria-labelledby="work-heading">
        <Eyebrow tone="dark">Work / Selected connections</Eyebrow>
        <SplitHeading id="work-heading" className="text-display font-semibold text-white">
          From an idea to something real.
        </SplitHeading>
        <p data-intro="fade" className="max-w-[600px] text-[16px] leading-[1.6] text-muted-dark">
          Websites, product design and campaigns. A place for the work — and the thinking that connects it.
        </p>
      </Section>

      <Section gap="gap-12" aria-label="Projects">
        {projects.length > 0 ? (
          <WorkGrid projects={projects} />
        ) : (
          // Shown until the first project is completed in the CMS (unfinished projects stay hidden).
          <p className="max-w-[600px] text-[18px] leading-[1.5] text-muted">
            Case studies are on their way. In the meantime, book a free call and we’ll talk you through our work.
          </p>
        )}
      </Section>

      <ClosingInvitation />
    </>
  );
}
