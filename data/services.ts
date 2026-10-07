export type Service = {
  slug: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  /** Shown as "Starting from …". Keep "[price]" until pricing is confirmed. */
  startingPrice: string;
};

export const services: Service[] = [
  {
    slug: "website-in-14-days",
    number: "01",
    title: "Website in 14 Days",
    description: "A focused website, built to introduce your business clearly and get you online.",
    features: ["Up to 5 core pages", "Responsive design and build", "Launch and handover"],
    startingPrice: "[price]",
  },
  {
    slug: "app-design-sprint",
    number: "02",
    title: "App Design Sprint",
    description: "Turn an early product idea into a clear, considered interface before you build.",
    features: ["Core user flows", "High-fidelity interface design", "Clickable prototype"],
    startingPrice: "[price]",
  },
  {
    slug: "monthly-care-plan",
    number: "03",
    title: "Monthly Care Plan",
    description: "Keep your website maintained, up to date and ready for what comes next.",
    features: ["Routine website updates", "Maintenance and checks", "Monthly support"],
    startingPrice: "[price]",
  },
];
