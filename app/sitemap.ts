import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const pages = ["", "/work", "/services", "/about", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}` })),
  ];
}
