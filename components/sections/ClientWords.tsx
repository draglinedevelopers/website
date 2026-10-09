import Section, { Eyebrow } from "@/components/ui/Section";

type ClientWordsProps = {
  /** Only pass a real, approved client quote. Without one, the section is not shown. */
  testimonial?: { quote: string; attribution: string };
};

export default function ClientWords({ testimonial }: ClientWordsProps) {
  if (!testimonial) return null;
  return (
    <Section tone="mist" gap="gap-7">
      <Eyebrow>Client words</Eyebrow>
      <figure className="flex flex-col gap-7">
        <blockquote className="text-quote text-black">{testimonial.quote}</blockquote>
        {testimonial.attribution && <figcaption className="text-[14px] text-muted">{testimonial.attribution}</figcaption>}
      </figure>
    </Section>
  );
}
