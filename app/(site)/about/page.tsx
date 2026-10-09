import type { Metadata } from "next";
import SplitHeading from "@/components/motion/SplitHeading";
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
      <Section tone="dark" gap="gap-8" intro aria-labelledby="about-heading">
        <Eyebrow tone="dark">About / Dragline Developers</Eyebrow>
        <SplitHeading id="about-heading" className="text-display font-semibold text-white">
          Built on strong connections.
        </SplitHeading>
        <div data-intro="fade" className="flex max-w-[650px] flex-col gap-5 text-muted-dark">
          <p className="text-[16px] leading-[1.6]">
            We’re a Nigeria-based design and build studio for growing businesses and founders, locally and
            internationally. We bring design and development together to make your next step clearer.
          </p>
          <p className="text-[13px] leading-[1.5]">WEBSITES / DIGITAL PRODUCTS / ONGOING CARE</p>
        </div>
      </Section>

      <WhyDragline animateWeb />

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
        {/* Role cards, styled like the service cards; they stagger in with the section reveal. */}
        <ul data-reveal-stagger className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {team.map((member, i) => (
            <li key={member.role} className="flex flex-col gap-6 border border-line p-7">
              <p className="text-[12px] text-ink">{String(i + 1).padStart(2, "0")} /</p>
              <div className="flex flex-col gap-2">
                {member.name && <p className="text-[16px] text-muted">{member.name}</p>}
                <h3 className="text-[24px] leading-[1.2] text-black">{member.role}</h3>
              </div>
              <div className="h-px bg-line" />
              <p className="text-[16px] leading-[1.6] text-muted">{member.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" aria-labelledby="values-heading">
        <Eyebrow>How we work</Eyebrow>
        <h2 id="values-heading" className="text-heading font-semibold text-ink">
          Good work starts with how.
        </h2>
        {/* Values reveal one by one (0.25s apart). */}
        <ol data-reveal-stagger="0.25" className="grid gap-9 lg:grid-cols-3 lg:gap-10">
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
