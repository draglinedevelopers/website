/**
 * Work / case study types and helpers.
 *
 * The projects themselves are managed in the CMS at /keystatic (see CMS-GUIDE.md) and stored in
 * content/projects/<slug>/. They are loaded on the server by lib/projects.ts. This file holds only
 * what both server and browser code need (it must not import the CMS reader).
 */
import { categories } from "@/lib/work-categories";

export const workCategories = categories;
export type WorkCategory = (typeof workCategories)[number];

export type ProjectImage = { src: string; alt: string };

/** Rich text from the CMS: a plain, serialisable Markdoc render tree plus its plain text. */
export type RichText = { tree: unknown; text: string };

export type Project = {
  slug: string;
  title: string;
  category: WorkCategory;
  /** One-line outcome shown on cards. */
  result: string;
  featured: boolean;
  order: number;

  /** Shown on cards and as the case study hero image. Missing → the design's placeholder. */
  cover?: ProjectImage;
  client: string;
  service: string;
  year: string;

  challenge: RichText;
  approach: RichText;
  outcome: RichText;

  /** "A closer look": one wide image, then two side by side. */
  gallery: [ProjectImage?, ProjectImage?, ProjectImage?];
  /** Only set when a real quote has been entered. */
  testimonial?: { quote: string; attribution: string };
};

/** True while a project still contains design placeholder copy or images. */
export function hasPlaceholders(project: Project) {
  const text = [
    project.title,
    project.result,
    project.client,
    project.service,
    project.year,
    project.challenge.text,
    project.approach.text,
    project.outcome.text,
  ];
  return !project.cover || text.some((t) => t.includes("["));
}
