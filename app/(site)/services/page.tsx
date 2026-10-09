import type { Metadata } from "next";
import MagneticButton from "@/components/motion/MagneticButton";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ClosingInvitation from "@/components/sections/ClosingInvitation";
import Section, { Eyebrow } from "@/components/ui/Section";
import { services, type Service } from "@/data/services";
import { bookCallHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Website in 14 Days, App Design Sprint and Monthly Care Plan. Clear scopes, fixed prices.",
};

export default function ServicesPage() {
  return (
    <>
      <Section gap="gap-8" intro aria-labelledby="services-heading">
        <Eyebrow>Services / Clear by design</Eyebrow>
        <SplitHeading id="services-heading" className="text-display font-semibold text-ink">
          A focused scope. <br className="hidden lg:block" />A stronger connection.
        </SplitHeading>
        <div data-intro="fade" className="flex max-w-[650px] flex-col gap-5 text-muted">
          <p className="text-[16px] leading-[1.6]">
            A website, a product interface or ongoing care. Choose the starting point that fits your business, then
            we’ll agree exactly what’s involved.
          </p>
          <p className="text-[13px] leading-[1.5]">
            The scopes below are proposed starting points, refined together on your free call.
          </p>
        </div>
      </Section>

      {services.map((service, i) => (
        <ServiceOffer key={service.slug} service={service} dark={i % 2 === 0} />
      ))}

      <ClosingInvitation />
    </>
  );
}

function ServiceOffer({ service, dark }: { service: Service; dark: boolean }) {
  const t = dark
    ? { heading: "text-white", body: "text-muted-dark", divider: "bg-line-dark", border: "border-line-dark" }
    : { heading: "text-ink", body: "text-muted", divider: "bg-line", border: "border-line" };

  return (
    <Section tone={dark ? "dark" : "light"} id={service.slug} aria-labelledby={`${service.slug}-heading`}>
      <div data-reveal-stagger className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[100px]">
        <div className="flex flex-col gap-7 lg:w-[410px] lg:shrink-0">
          <Eyebrow tone={dark ? "dark" : "light"}>
            {service.number} / {service.stage}
          </Eyebrow>
          <h2 id={`${service.slug}-heading`} className={`text-heading font-semibold ${t.heading}`}>
            {service.title}
          </h2>
          <p className={`text-[16px] leading-[1.6] ${t.body}`}>{service.description}</p>
          <div className={`h-px ${t.divider}`} />
          <p className={`text-[21px] ${t.heading}`}>Starting from {service.startingPrice}</p>
          <MagneticButton href={bookCallHref} className="w-full lg:w-auto lg:self-start">
            Book a free call
          </MagneticButton>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h3 className={`text-[18px] font-medium ${t.heading}`}>Who it’s for</h3>
            <p className={`text-[16px] leading-[1.6] ${t.body}`}>{service.audience}</p>
          </div>

          <div className="flex flex-col gap-9 lg:flex-row lg:gap-10">
            <ScopeList title="What’s included" items={service.included} t={t} />
            <ScopeList title="What’s not included" items={service.excluded} t={t} />
          </div>

          {service.upgrade && (
            // Slides in from the right as it enters the viewport.
            <Reveal from="right">
              <div className={`flex flex-col gap-3 border p-6 ${t.border}`}>
                <p className={`text-[12px] font-semibold uppercase ${t.body}`}>Optional upgrade</p>
                <h3 className={`text-[23px] ${t.heading}`}>{service.upgrade.title}</h3>
                <p className={`text-[16px] leading-[1.6] ${t.body}`}>{service.upgrade.description}</p>
              </div>
            </Reveal>
          )}

          <div className={`h-px ${t.divider}`} />
          <div className="flex flex-col gap-[10px]">
            <p className={`text-[22px] ${t.heading}`}>Timeline / {service.timeline.value}</p>
            <p className={`text-[16px] leading-[1.6] ${t.body}`}>{service.timeline.note}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ScopeList({
  title,
  items,
  t,
}: {
  title: string;
  items: string[];
  t: { heading: string; body: string; divider: string };
}) {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <h3 className={`text-[18px] font-medium ${t.heading}`}>{title}</h3>
      <div className={`h-px ${t.divider}`} />
      {/* Items stagger in one by one as the list enters the viewport. */}
      <Reveal as="ul" stagger={0.08} className="flex flex-col gap-5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden className="text-[14px] text-thread">
              —
            </span>
            <span className={`flex-1 text-[16px] leading-[1.5] ${t.body}`}>{item}</span>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
