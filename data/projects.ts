/**
 * Work / case studies.
 *
 * To add a project, copy one of the objects below, give it a unique `slug`, and fill in the fields.
 * The Work page and the case study pages read from this list automatically, so no page code
 * needs to change. Put images in /public/work/<slug>/ and reference them as "/work/<slug>/file.jpg".
 *
 * Projects appear in the order they are listed. Set `featured: true` to show one on the Home page
 * (the first three featured projects are used).
 */

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  /** Short label shown above the result, e.g. "Websites", "Campaigns", "Product design". */
  category: string;
  /** One-line outcome shown on cards. */
  result: string;
  /** Card / hero image. Leave out to show the design's image placeholder. */
  cover?: ProjectImage;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "herpride",
    title: "HerPride: campaign design",
    category: "Campaigns",
    result: "[Project result]",
    featured: true,
  },
  {
    slug: "project-two",
    title: "[Project name]",
    category: "Websites",
    result: "[Project result]",
    featured: true,
  },
  {
    slug: "project-three",
    title: "[Project name]",
    category: "Product design",
    result: "[Project result]",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
