/**
 * Team roles shown on the About page as role cards. Edit the one-line descriptions freely;
 * add `name` to show a person's name above their role.
 */
export type TeamMember = {
  role: string;
  description: string;
  name?: string;
};

export const team: TeamMember[] = [
  {
    role: "Founder",
    description: "Sets the direction, leads client relationships and keeps every project on track.",
  },
  {
    role: "Web Developer",
    description: "Builds fast, reliable websites and keeps them running smoothly after launch.",
  },
  {
    role: "Product Designer",
    description: "Shapes clear, considered interfaces, from first user flows to final screens.",
  },
];
