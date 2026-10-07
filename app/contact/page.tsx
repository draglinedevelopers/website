import type { Metadata } from "next";
import TallyEmbed from "@/components/TallyEmbed";
import Button from "@/components/ui/Button";
import Section, { Eyebrow } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free call. Tell us about your business and what you have in mind.",
};

export default function ContactPage() {
  return (
    <>
      <Section tone="dark" gap="gap-8" aria-labelledby="contact-heading">
        <Eyebrow tone="dark">Contact / Book a free call</Eyebrow>
        <h1 id="contact-heading" className="text-display font-semibold text-white">
          Let’s find your next thread.
        </h1>
        <p className="max-w-[640px] text-[16px] leading-[1.6] text-muted-dark">
          Tell us a little about your business and what you have in mind. We’ll use your free call to understand the
          project and explore the right starting point.
        </p>
      </Section>

      <Section aria-labelledby="enquiry-heading">
        <div data-reveal-stagger className="flex flex-col gap-16 lg:flex-row lg:items-start xl:gap-[120px]">
          <div className="flex min-w-0 flex-1 flex-col gap-7">
            <h2 id="enquiry-heading" className="text-[28px] text-black lg:text-[34px]">
              A little about your project.
            </h2>

            {/* ▶ TALLY FORM EMBED: set `tallyFormId` in lib/site.ts */}
            <TallyEmbed formId={site.tallyFormId} title="Book a free call" />

            <p className="text-[13px] leading-[1.5] text-muted">
              We’ll only use these details to respond to your enquiry and arrange your call.
            </p>
          </div>

          <aside className="flex flex-col gap-7 bg-mist p-6 lg:w-[400px] lg:p-8" aria-labelledby="direct-heading">
            <p className="text-[12px] font-semibold text-muted uppercase">Prefer a direct conversation?</p>
            <h2 id="direct-heading" className="text-[30px] leading-[1.12] text-black">
              Start wherever feels right.
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted">
              You can also reach us by email, phone or WhatsApp. We work with businesses in Nigeria and
              internationally.
            </p>
            <div className="h-px bg-line" />
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-muted">EMAIL</p>
              <a href={`mailto:${site.email}`} className="text-[16px] leading-[1.5] break-words text-black hover:underline">
                {site.email}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-muted">PHONE / WHATSAPP</p>
              <a href={`tel:${site.phoneHref}`} className="text-[17px] text-black hover:underline">
                {site.phone}
              </a>
            </div>
            <Button href={site.whatsappHref} variant="secondary-light" external className="w-full">
              Chat on WhatsApp
            </Button>
          </aside>
        </div>
      </Section>
    </>
  );
}
