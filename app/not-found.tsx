import SplitHeading from "@/components/motion/SplitHeading";
import Button from "@/components/ui/Button";
import Section, { Eyebrow } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section tone="dark" gap="gap-8" intro className="min-h-[60vh]">
      <Eyebrow tone="dark">404 / Page not found</Eyebrow>
      <SplitHeading className="text-display font-semibold text-white">This thread doesn’t lead anywhere.</SplitHeading>
      <div data-intro="fade" className="lg:self-start">
        <Button href="/" className="w-full lg:w-auto">
          Back to home
        </Button>
      </div>
    </Section>
  );
}
