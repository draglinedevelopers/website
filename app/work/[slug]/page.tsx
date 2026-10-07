import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Media } from "@/components/cards/ProjectCard";
import ClientWords from "@/components/sections/ClientWords";
import Button from "@/components/ui/Button";
import Section, { Eyebrow } from "@/components/ui/Section";
import { getNextProject, getProject, hasPlaceholders, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.result };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const [wide, left, right] = project.gallery ?? [];
  const meta = [
    { label: "Client", value: project.client },
    { label: "Service", value: project.service },
    { label: "Year", value: project.year },
  ];
  const narrative = [
    { title: "The challenge", body: project.challenge },
    { title: "What we did", body: project.approach },
    { title: "The outcome", body: project.outcome },
  ];

  return (
    <>
      <Section tone="dark" aria-labelledby="project-heading">
        <Eyebrow tone="dark">Case study / {project.category}</Eyebrow>
        <h1 id="project-heading" className="text-display font-semibold text-white">
          {project.title}
        </h1>
        <dl className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          {meta.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2">
              <dt className="text-[12px] text-muted-dark uppercase">{label}</dt>
              <dd className="text-[18px] text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <Media image={project.cover} tone="dark" priority className="h-[280px] lg:h-[580px]" />
        {hasPlaceholders(project) && (
          <p className="text-[13px] leading-[1.5] text-muted-dark">
            A case study template. Replace the bracketed fields with verified project content.
          </p>
        )}
      </Section>

      <Section aria-labelledby="narrative-heading">
        <div data-reveal-stagger className="flex flex-col gap-10 lg:flex-row lg:gap-[100px]">
          <div className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0">
            <Eyebrow>The project</Eyebrow>
            <h2 id="narrative-heading" className="text-heading font-semibold text-ink">
              The thinking behind the thread.
            </h2>
          </div>
          <ol className="flex flex-1 flex-col gap-10">
            {narrative.map((item, i) => (
              <li key={item.title} className="flex flex-col gap-5">
                <div className="h-px bg-line" />
                <h3 className="flex items-start gap-5">
                  <span className="text-[13px] text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[26px] text-black">{item.title}</span>
                </h3>
                <p className="text-[16px] leading-[1.6] text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="mist" aria-label="Project gallery">
        <Eyebrow>A closer look</Eyebrow>
        <Media image={wide} className="h-[260px] lg:h-[520px]" />
        <div data-reveal-stagger className="grid gap-6 lg:grid-cols-2">
          <Media image={left} sizes="(min-width: 1024px) 50vw, 100vw" className="h-[260px] lg:h-[380px]" />
          <Media image={right} sizes="(min-width: 1024px) 50vw, 100vw" className="h-[260px] lg:h-[380px]" />
        </div>
      </Section>

      <ClientWords testimonial={project.testimonial} />

      <Section tone="dark" aria-labelledby="next-heading">
        <Eyebrow tone="dark">Follow the next thread</Eyebrow>
        <h2 id="next-heading" className="text-heading font-semibold text-white">
          {next.title}
        </h2>
        <div className="flex flex-col gap-3 lg:flex-row">
          <Button href={`/work/${next.slug}`} className="w-full lg:w-auto">
            Next project
          </Button>
          <Button href="/work" variant="secondary-dark" className="w-full lg:w-auto">
            Back to all work
          </Button>
        </div>
      </Section>
    </>
  );
}
