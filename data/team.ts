/**
 * Team shown on the About page. Add `name` and a `photo` ("/team/file.jpg" in /public/team/)
 * when ready; without a photo the design's placeholder is shown.
 */
export type TeamMember = {
  role: string;
  name?: string;
  photo?: { src: string; alt: string };
};

export const team: TeamMember[] = [{ role: "Founder" }, { role: "Web Developer" }, { role: "Product Designer" }];
