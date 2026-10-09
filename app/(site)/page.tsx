import Image from "next/image";
import ProjectCard from "@/components/cards/ProjectCard";
import ServiceCard from "@/components/cards/ServiceCard";
import FaqList from "@/components/FaqList";
import SplitHeading from "@/components/motion/SplitHeading";
import ProcessSteps from "@/components/motion/ProcessSteps";
import ClosingInvitation from "@/components/sections/ClosingInvitation";
import WhyDragline from "@/components/sections/WhyDragline";
import MagneticButton from "@/components/motion/MagneticButton";
import Button from "@/components/ui/Button";
import Section, { Eyebrow } from "@/components/ui/Section";
import { faqs } from "@/data/faqs";
import { getFeaturedProjects } from "@/lib/projects";
import { services } from "@/data/services";
import { bookCallHref } from "@/lib/site";

const promises = ["Fixed scope", "Fixed price", "On time"];

const steps = [
  { title: "Free call", body: "Tell us about your business, your goals and what you need next." },
  { title: "Proposal and deposit", body: "Agree the scope, price and schedule. A deposit gets work started." },
  { title: "Design and build", body: "We turn the agreed direction into a considered, working experience." },
  { title: "Launch and handover", body: "We launch together and show you how to manage what we’ve built." },
];

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  return (
    <>
      {/* Hero */}
      <Section tone="dark" intro aria-labelledby="hero-heading">
        <div className="flex items-start justify-between text-[12px] text-muted-dark">
          <p className="font-semibold uppercase">Design &amp; build studio</p>
          <p className="hidden lg:block">NIGERIA → EVERYWHERE</p>
        </div>
        <div className="flex max-w-[1160px] flex-col gap-8">
          <SplitHeading id="hero-heading" className="text-display font-semibold text-white">
            Connecting businesses <br className="hidden lg:block" />
            to the bigger web.
          </SplitHeading>
          <div className="flex max-w-[590px] flex-col gap-8">
            <p data-intro="fade" className="text-[18px] leading-[1.5] text-muted-dark lg:text-[21px]">
              We design and build websites and digital products for growing businesses.
            </p>
            <div data-intro="fade" className="flex flex-col gap-3 lg:flex-row">
              <MagneticButton href={bookCallHref} className="w-full lg:w-auto">
                Book a free call
              </MagneticButton>
              <Button href="/work" variant="secondary-dark" className="w-full lg:w-auto">
                See our work
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between pt-6 text-[12px] text-muted-dark">
          <p>For growing businesses. For what comes next.</p>
          <p className="hidden lg:block">FOLLOW THE THREAD ↓</p>
        </div>
      </Section>

      {/* Promise strip */}
      <div className="border-b border-line px-6 py-8 md:px-10 lg:px-20">
        <ul className="mx-auto flex max-w-[1280px] flex-col gap-[22px] lg:flex-row lg:justify-between">
          {promises.map((promise) => (
            <li key={promise} className="flex items-center gap-[14px]">
              <Image src="/figma/promise-node.svg" alt="" width={6} height={6} unoptimized />
              <span className="text-[20px] font-medium text-black lg:text-[24px]">{promise}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 01 / What we do */}
      <Section aria-labelledby="services-heading">
        <Eyebrow>01 / What we do</Eyebrow>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[140px]">
          <h2 id="services-heading" className="text-heading flex-1 font-semibold text-ink">
            The right starting point.
          </h2>
          <p className="flex-1 text-[16px] leading-[1.6] text-muted">
            Three focused ways to move your business forward. Clear deliverables, from the first conversation.
          </p>
        </div>
        <div data-reveal-stagger className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* 02 / Selected work: only shown once at least one finished project is featured. */}
      {featuredProjects.length > 0 && (
        <Section tone="mist" aria-labelledby="work-heading">
          <Eyebrow>02 / Selected work</Eyebrow>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
            <h2 id="work-heading" className="text-heading flex-1 font-semibold text-ink">
              A few threads we&apos;ve built.
            </h2>
            <Button href="/work" variant="secondary-light" className="w-full lg:w-auto">
              View all work
            </Button>
          </div>
          <div data-reveal-stagger className="grid gap-10 lg:grid-cols-3 lg:gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      )}

      {/* 03 / How we work (02 while Selected work is hidden) */}
      <Section tone="dark" aria-labelledby="process-heading">
        <Eyebrow tone="dark">{featuredProjects.length > 0 ? "03" : "02"} / How we work</Eyebrow>
        <h2 id="process-heading" className="text-heading font-semibold text-white">
          A clear path from here to live.
        </h2>
        <ProcessSteps steps={steps} />
      </Section>

      <WhyDragline />

      {/* FAQ */}
      <Section aria-labelledby="faq-heading">
        <div data-reveal-stagger className="flex flex-col gap-10 lg:flex-row lg:gap-[100px]">
          <div className="flex flex-col gap-6 lg:w-[400px]">
            <Eyebrow>A little clarity</Eyebrow>
            <h2 id="faq-heading" className="text-heading font-semibold text-ink">
              Before we begin.
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted">A few things you might be wondering.</p>
          </div>
          <div className="flex-1">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </Section>

      <ClosingInvitation />
    </>
  );
}
