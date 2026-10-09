import SplitHeading from "@/components/motion/SplitHeading";
import Button from "@/components/ui/Button";
import Section, { Eyebrow } from "@/components/ui/Section";

/** 404 content, shared by app/not-found.tsx (unmatched URLs) and app/(site)/not-found.tsx (notFound() calls). */
export default function NotFoundContent() {
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
