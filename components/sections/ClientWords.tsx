import Section, { Eyebrow } from "@/components/ui/Section";

/** Testimonial placeholder. Replace the bracketed text only with a real, approved client quote. */
export default function ClientWords() {
  return (
    <Section tone="mist" gap="gap-7">
      <Eyebrow>Client words / Placeholder</Eyebrow>
      <figure className="flex flex-col gap-7">
        <blockquote className="text-quote text-black">[Testimonial]</blockquote>
        <figcaption className="text-[14px] text-muted">[Client attribution]</figcaption>
      </figure>
    </Section>
  );
}
