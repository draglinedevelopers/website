import Button from "@/components/ui/Button";
import Section, { Eyebrow } from "@/components/ui/Section";
import { bookCallHref } from "@/lib/site";

export default function ClosingInvitation() {
  return (
    <Section tone="dark" gap="gap-8" aria-labelledby="closing-heading">
      <Eyebrow tone="dark">Start a conversation</Eyebrow>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-[100px]">
        <h2 id="closing-heading" className="text-heading flex-1 font-semibold text-white">
          Ready to connect your business to the bigger web?
        </h2>
        <Button href={bookCallHref} className="w-full lg:w-auto">
          Book a free call
        </Button>
      </div>
    </Section>
  );
}
