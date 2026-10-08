import MagneticButton from "@/components/motion/MagneticButton";
import Section, { Eyebrow } from "@/components/ui/Section";
import { bookCallHref } from "@/lib/site";

export default function ClosingInvitation() {
  return (
    <Section tone="dark" gap="gap-8" aria-labelledby="closing-heading">
      <Eyebrow tone="dark">Start a conversation</Eyebrow>
      <div data-reveal-stagger className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-[100px]">
        <h2 id="closing-heading" className="text-heading flex-1 font-semibold text-white">
          Ready to connect your business to the bigger web?
        </h2>
        {/* Wrapper takes the scroll reveal so the button's own transform is free for the magnetic effect. */}
        <div className="lg:shrink-0">
          <MagneticButton href={bookCallHref} className="w-full lg:w-auto">
            Book a free call
          </MagneticButton>
        </div>
      </div>
    </Section>
  );
}
