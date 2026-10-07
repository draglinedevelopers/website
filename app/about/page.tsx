import type { Metadata } from "next";
import { Media } from "@/components/cards/ProjectCard";
import ClosingInvitation from "@/components/sections/ClosingInvitation";
import WhyDragline from "@/components/sections/WhyDragline";
import Section, { Eyebrow } from "@/components/ui/Section";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About",
  description: "A Nigeria-based design and build studio for growing businesses and founders.",
};

const values = [
  {
    title: "Clarity",
    body: "We define the problem, the scope and the next step. You should always know what we’re doing and why.",
  },
  {
    title: "Craft",
    body: "We care about the details that make a website or product feel considered, readable and useful.",
  },
  {
    title: "Momentum",
    body: "We keep the work moving with focused stages, practical feedback and a clear path to launch.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="dark" gap="gap-8" aria-labelledby="about-heading">
        <Eyebrow tone="dark">About / Dragline Developers</Eyebrow>
        <h1 id="about-heading" className="text-display font-semibold text-white">
          Built on strong connections.
        </h1>
        <div className="flex max-w-[650px] flex-col gap-5 text-muted-dark">
          <p className="text-[16px] leading-[1.6]">
            We’re a Nigeria-based design and build studio for growing businesses and founders, locally and
            internationally. We bring design and development together to make your next step clearer.
          </p>
          <p className="text-[13px] leading-[1.5]">WEBSITES / DIGITAL PRODUCTS / ONGOING CARE</p>
        </div>
      </Section>

      <WhyDragline />

      <Section tone="dark" aria-labelledby="mission-heading">
        <Eyebrow tone="dark">Our mission</Eyebrow>
        <h2 id="mission-heading" className="text-heading font-semibold text-white">
          Build the strongest threads between businesses and the bigger web
        </h2>
      </Section>

      <Section aria-labelledby="team-heading">
        <Eyebrow>The team</Eyebrow>
        <h2 id="team-heading" className="text-heading font-semibold text-ink">
          Different skills. One thread.
        </h2>
        <ul data-reveal-stagger className="grid gap-9 lg:grid-cols-3 lg:gap-6">
          {team.map((member) => (
            <li key={member.role} className="flex flex-col gap-5">
              <Media
                image={member.photo}
                label="[Photo]"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-[310px] lg:h-[360px]"
              />
              <div className="flex flex-col gap-1">
                {member.name && <p className="text-[16px] text-muted">{member.name}</p>}
                <p className="text-[24px] text-black">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" aria-labelledby="values-heading">
        <Eyebrow>How we work</Eyebrow>
        <h2 id="values-heading" className="text-heading font-semibold text-ink">
          Good work starts with how.
        </h2>
        <ol data-reveal-stagger className="grid gap-9 lg:grid-cols-3 lg:gap-10">
          {values.map((value, i) => (
            <li key={value.title} className="flex flex-col gap-5">
              <div className="h-px bg-line" />
              <span className="text-[12px] text-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[30px] text-black">{value.title}</h3>
              <p className="text-[16px] leading-[1.6] text-muted">{value.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingInvitation />
    </>
  );
}
