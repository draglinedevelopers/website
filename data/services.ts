export type Service = {
  slug: string;
  number: string;
  /** One-word stage shown on the Services page, e.g. "01 / Launch". */
  stage: string;
  title: string;
  description: string;
  /** Short list shown on the Home page cards. */
  features: string[];
  /** Shown as "Starting from …". Keep "[price]" until pricing is confirmed. */
  startingPrice: string;
  audience: string;
  included: string[];
  excluded: string[];
  upgrade?: { title: string; description: string };
  timeline: { value: string; note: string };
};

export const services: Service[] = [
  {
    slug: "website-in-14-days",
    number: "01",
    stage: "Launch",
    title: "Website in 14 Days",
    description: "A focused website, built to introduce your business clearly and get you online.",
    features: ["Up to 5 core pages", "Responsive design and build", "Launch and handover"],
    startingPrice: "[price]",
    audience:
      "Growing businesses and founders who need a clear, professional website without an open-ended project.",
    included: [
      "Discovery and page structure",
      "Design and build of up to 5 pages",
      "Mobile and desktop layouts",
      "Contact form and basic search setup",
      "Launch support and editing handover",
    ],
    excluded: [
      "Brand identity or logo design",
      "Custom applications and complex integrations",
      "Hosting, domain and third-party fees",
    ],
    upgrade: {
      title: "Online store upgrade",
      description:
        "Add a product catalogue, cart and checkout. Product count, payment setup, price and timeline are agreed separately.",
    },
    timeline: { value: "14 days", note: "From agreed scope, deposit and receipt of your content." },
  },
  {
    slug: "app-design-sprint",
    number: "02",
    stage: "Shape",
    title: "App Design Sprint",
    description: "Turn an early product idea into a clear, considered interface before you build.",
    features: ["Core user flows", "High-fidelity interface design", "Clickable prototype"],
    startingPrice: "[price]",
    audience:
      "Founders and product teams who want to shape a core product experience before committing to development.",
    included: [
      "Product discovery and core user flows",
      "Wireframes for the agreed scope",
      "High-fidelity interface design",
      "Clickable prototype",
      "Design files and developer handover",
    ],
    excluded: [
      "App development or deployment",
      "Ongoing product management",
      "Additional flows outside the agreed scope",
    ],
    timeline: { value: "[Timeline]", note: "The schedule is agreed around your core flows and deliverables." },
  },
  {
    slug: "monthly-care-plan",
    number: "03",
    stage: "Maintain",
    title: "Monthly Care Plan",
    description: "Keep your website maintained, up to date and ready for what comes next.",
    features: ["Routine website updates", "Maintenance and checks", "Monthly support"],
    startingPrice: "[price]",
    audience: "Businesses with an existing website that need a dependable point of contact for ongoing upkeep.",
    included: [
      "Routine maintenance and website checks",
      "Agreed content updates",
      "Backup and update review",
      "Small fixes within your support scope",
      "Monthly summary and support",
    ],
    excluded: [
      "Full redesigns or new websites",
      "Major features and custom development",
      "Hosting and third-party subscription fees",
    ],
    timeline: {
      value: "[Timeline]",
      note: "Monthly support; response times and update allowance are agreed in your plan.",
    },
  },
];
