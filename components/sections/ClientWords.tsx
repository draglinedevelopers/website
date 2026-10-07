import Section, { Eyebrow } from "@/components/ui/Section";

type ClientWordsProps = {
  /** Only pass a real, approved client quote. Without one, the design's placeholder is shown. */
  testimonial?: { quote: string; attribution: string };
};

export default function ClientWords({ testimonial }: ClientWordsProps) {
  return (
    <Section tone="mist" gap="gap-7">
      <Eyebrow>{testimonial ? "Client words" : "Client words / Placeholder"}</Eyebrow>
      <figure className="flex flex-col gap-7">
        <blockquote className="text-quote text-black">{testimonial?.quote ?? "[Testimonial]"}</blockquote>
        <figcaption className="text-[14px] text-muted">{testimonial?.attribution ?? "[Client attribution]"}</figcaption>
      </figure>
    </Section>
  );
}
