/**
 * Server-side loader for the Work section, reading the Keystatic "projects" collection
 * (content/projects/<slug>/). Server components only.
 *
 * The read is wrapped in `use cache` (Next 16 Cache Components) so pages stay prerendered.
 * Content only changes when an edit is committed, which triggers a new deploy and a fresh build.
 */
import { createReader } from "@keystatic/core/reader";
import Markdoc, { type Node } from "@markdoc/markdoc";
import { cacheLife } from "next/cache";
import keystaticConfig from "../keystatic.config";
import type { Project, ProjectImage, RichText, WorkCategory } from "@/data/projects";

const plainText = (node: Node): string =>
  (node.type === "text" ? String(node.attributes.content ?? "") : "") + node.children.map(plainText).join("");

/** Markdoc render tree as plain JSON (cache-serialisable; Markdoc's React renderer accepts it). */
const richText = (node: Node): RichText => ({
  tree: JSON.parse(JSON.stringify(Markdoc.transform(node))),
  text: plainText(node).trim(),
});

const img = (src: string | null, alt: string): ProjectImage | undefined => (src ? { src, alt } : undefined);

async function loadProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("max");

  const reader = createReader(process.cwd(), keystaticConfig);
  const entries = await reader.collections.projects.all({ resolveLinkedFiles: true });

  return entries
    .map(({ slug, entry: e }): Project => {
      const quote = e.testimonial.quote.trim();
      return {
        slug,
        title: e.title,
        category: e.category as WorkCategory,
        result: e.result,
        featured: e.featured,
        order: e.order ?? 100,
        cover: img(e.cover, e.coverAlt),
        client: e.client,
        service: e.service,
        year: e.year,
        challenge: richText(e.challenge.node),
        approach: richText(e.approach.node),
        outcome: richText(e.outcome.node),
        gallery: [
          img(e.galleryWide, e.galleryWideAlt),
          img(e.galleryLeft, e.galleryLeftAlt),
          img(e.galleryRight, e.galleryRightAlt),
        ],
        testimonial: quote ? { quote, attribution: e.testimonial.attribution.trim() } : undefined,
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/** All projects, in display order. */
export const getProjects = () => loadProjects();

/** The first three projects marked "Featured on Home", in display order. */
export async function getFeaturedProjects() {
  return (await loadProjects()).filter((p) => p.featured).slice(0, 3);
}

export async function getProject(slug: string) {
  return (await loadProjects()).find((p) => p.slug === slug);
}

/** The project after `slug` in display order (wraps around), for "Follow the next thread". */
export async function getNextProject(slug: string) {
  const projects = await loadProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
