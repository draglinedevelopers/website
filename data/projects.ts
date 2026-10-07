/**
 * Work / case studies.
 *
 * To add a project, copy one of the objects below, give it a unique `slug`, and fill in the fields.
 * The Work page and each case study page (/work/<slug>) are built from this list automatically,
 * so no page code needs to change.
 *
 * Images: put files in /public/work/<slug>/ and reference them as "/work/<slug>/file.jpg".
 * Any image you leave out shows the design's labelled placeholder instead.
 *
 * Order: projects appear in the order they are listed. Set `featured: true` to show one on the
 * Home page (the first three featured projects are used). "Next project" on a case study links
 * to the following project in this list.
 *
 * Text in [square brackets] is placeholder copy from the design. Replace it with verified content.
 */

export const workCategories = ["Websites", "Product design", "Campaigns"] as const;
export type WorkCategory = (typeof workCategories)[number];

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  category: WorkCategory;
  /** One-line outcome shown on cards. */
  result: string;
  featured?: boolean;

  /** Shown on cards and as the case study hero image. */
  cover?: ProjectImage;
  client: string;
  service: string;
  year: string;

  challenge: string;
  approach: string;
  outcome: string;

  /** "A closer look": one wide image, then two side by side. */
  gallery?: [ProjectImage?, ProjectImage?, ProjectImage?];
  /** Only add a real, approved quote. Leave out to show the placeholder. */
  testimonial?: { quote: string; attribution: string };
};

const placeholderDetails = {
  client: "[Client]",
  service: "[Service]",
  year: "[Year]",
  challenge: "[Challenge]",
  approach: "[What we did]",
  outcome: "[Outcome]",
};

export const projects: Project[] = [
  {
    slug: "herpride",
    title: "HerPride: campaign design",
    category: "Campaigns",
    result: "[Project result]",
    featured: true,
    ...placeholderDetails,
  },
  {
    slug: "project-two",
    title: "[Project name]",
    category: "Websites",
    result: "[Project result]",
    featured: true,
    ...placeholderDetails,
  },
  {
    slug: "project-three",
    title: "[Project name]",
    category: "Product design",
    result: "[Project result]",
    featured: true,
    ...placeholderDetails,
  },
  {
    slug: "project-four",
    title: "[Project name]",
    category: "Websites",
    result: "[Project result]",
    ...placeholderDetails,
  },
  {
    slug: "project-five",
    title: "[Project name]",
    category: "Campaigns",
    result: "[Project result]",
    ...placeholderDetails,
  },
  {
    slug: "project-six",
    title: "[Project name]",
    category: "Product design",
    result: "[Project result]",
    ...placeholderDetails,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/** True while a project still contains design placeholder copy or images. */
export function hasPlaceholders(project: Project) {
  const text = [project.title, project.result, project.client, project.service, project.year, project.challenge, project.approach, project.outcome];
  return !project.cover || text.some((t) => t.includes("["));
}
