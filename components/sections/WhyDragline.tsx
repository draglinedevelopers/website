import WebIllustration from "@/components/motion/WebIllustration";
import Section, { Eyebrow } from "@/components/ui/Section";

/** `animateWeb`: draw the web on scroll (About page). Home shows it static. */
export default function WhyDragline({ animateWeb = false }: { animateWeb?: boolean }) {
  return (
    <Section aria-labelledby="why-heading">
      <div data-reveal-stagger className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[100px]">
        <div className="flex flex-1 flex-col gap-7">
          <Eyebrow>Why Dragline</Eyebrow>
          <h2 id="why-heading" className="text-heading font-semibold text-ink">
            One strong thread. Everything connected.
          </h2>
          <p className="text-[16px] leading-[1.6] text-muted">
            A spider’s dragline is its strongest silk thread. It anchors the web and connects everything else. That
            idea shapes our name and our work: strong, thoughtful connections between your business and the bigger
            web.
          </p>
        </div>

        <figure className="flex flex-1 flex-col gap-3">
          <WebIllustration animate={animateWeb} />
          <figcaption className="text-[12px] text-muted">A connection that holds everything together.</figcaption>
        </figure>
      </div>
    </Section>
  );
}
