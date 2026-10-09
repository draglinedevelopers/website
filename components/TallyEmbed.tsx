"use client";

import Script from "next/script";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

type TallyWindow = Window & { Tally?: { loadEmbeds: () => void } };
const loadEmbeds = () => (window as TallyWindow).Tally?.loadEmbeds();

/**
 * ▶ TALLY FORM EMBED SPOT
 * Set `tallyFormId` in lib/site.ts and the form renders here. Until then, visitors are invited to
 * email instead (no placeholder is shown on the live site). Fields in the Figma design, for building the Tally form:
 * Name, Business name, Email, WhatsApp number (include country code), Service needed
 * (Website in 14 Days / App Design Sprint / Monthly Care Plan / Not sure yet), Budget range,
 * Project details. Submit label: "Book my free call".
 */
export default function TallyEmbed({ formId, title }: { formId: string; title: string }) {
  // After client-side navigation the script is already loaded, so re-scan for the iframe.
  useEffect(() => {
    if (formId) loadEmbeds();
  }, [formId]);

  if (!formId) {
    return (
      <div data-tally-slot className="flex flex-col items-start gap-6 border border-line p-6 lg:p-8">
        <p className="text-[16px] leading-[1.6] text-muted">
          Email us a few lines about your business and what you need. We’ll reply to arrange your free call.
        </p>
        <Button href={`mailto:${site.email}?subject=${encodeURIComponent(title)}`} className="w-full lg:w-auto">
          Email us
        </Button>
      </div>
    );
  }

  return (
    <>
      <iframe
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height="560"
        title={title}
        className="w-full border-0"
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        // Tally's script swaps data-tally-src into src and keeps the iframe height in sync.
        onLoad={loadEmbeds}
      />
    </>
  );
}
