import { collection, config, fields } from "@keystatic/core";
import { categories } from "./lib/work-categories";

/**
 * Keystatic CMS: manages the Work section only (see CMS-GUIDE.md).
 *
 * Storage: GitHub mode, so every save in /keystatic is a commit to this repo (Vercel then
 * redeploys). For local development without GitHub, set NEXT_PUBLIC_KEYSTATIC_STORAGE=local
 * to edit the files on disk instead.
 */
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "local"
    ? ({ kind: "local" } as const)
    : ({ kind: "github", repo: "draglinedevelopers/website" } as const);

/** Images live in the repo under public/work/<project-slug>/ and are served from /work/<slug>/. */
const image = (label: string, description?: string) =>
  fields.image({ label, description, directory: "public/work", publicPath: "/work/" });

/** Simple formatting only, to keep case studies consistent with the design. */
const richText = (label: string, description: string) =>
  fields.markdoc({
    label,
    description,
    options: {
      bold: true,
      italic: true,
      link: true,
      unorderedList: true,
      orderedList: true,
      strikethrough: false,
      code: false,
      heading: false,
      blockquote: false,
      table: false,
      image: false,
      divider: false,
      codeBlock: false,
    },
  });

export default config({
  storage,
  ui: { brand: { name: "Dragline Developers" } },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*/",
      format: { data: "yaml" },
      columns: ["category", "order", "featured"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
          slug: {
            label: "Web address (slug)",
            description: "Created from the title. Used in the link, e.g. /work/your-project. Avoid changing it after publishing.",
          },
        }),
        category: fields.select({
          label: "Category",
          options: categories.map((c) => ({ label: c, value: c })),
          defaultValue: "Websites",
        }),
        client: fields.text({ label: "Client name", defaultValue: "[Client]" }),
        service: fields.text({ label: "Service", description: "e.g. Website in 14 Days", defaultValue: "[Service]" }),
        year: fields.text({ label: "Year", defaultValue: "[Year]" }),
        result: fields.text({
          label: "One-line result",
          description: "Shown under the title on project cards.",
          defaultValue: "[Project result]",
        }),

        cover: image("Cover image", "Shown on project cards and at the top of the case study. Landscape works best."),
        coverAlt: fields.text({ label: "Cover image description (alt text)", description: "Describe the image for people who can’t see it." }),

        galleryWide: image("Gallery: wide image", "First image in “A closer look”, full width."),
        galleryWideAlt: fields.text({ label: "Wide image description (alt text)" }),
        galleryLeft: image("Gallery: left image", "Second image, shown on the left."),
        galleryLeftAlt: fields.text({ label: "Left image description (alt text)" }),
        galleryRight: image("Gallery: right image", "Third image, shown on the right."),
        galleryRightAlt: fields.text({ label: "Right image description (alt text)" }),

        challenge: richText("The challenge", "What problem did the client need solving?"),
        approach: richText("What we did", "How Dragline approached and delivered the work."),
        outcome: richText("The outcome", "What changed for the client as a result."),

        testimonial: fields.object(
          {
            quote: fields.text({ label: "Quote", multiline: true, description: "Only add a real, approved client quote." }),
            attribution: fields.text({ label: "Attribution", description: "e.g. Jane Doe, Founder of Acme" }),
          },
          { label: "Testimonial (optional)", description: "Leave empty to hide the quote section." },
        ),

        featured: fields.checkbox({
          label: "Featured on Home",
          description: "The first three featured projects (by display order) appear in “Selected work”.",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Display order",
          description: "Lower numbers come first on the Work page and Home.",
          defaultValue: 100,
        }),
      },
    }),
  },
});
