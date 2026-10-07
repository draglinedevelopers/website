import Button from "@/components/ui/Button";
import Section, { Eyebrow } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section tone="dark" gap="gap-8" className="min-h-[60vh]">
      <Eyebrow tone="dark">404 / Page not found</Eyebrow>
      <h1 className="text-display font-semibold text-white">This thread doesn’t lead anywhere.</h1>
      <Button href="/" className="w-full lg:w-auto lg:self-start">
        Back to home
      </Button>
    </Section>
  );
}
