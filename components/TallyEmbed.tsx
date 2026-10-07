"use client";

import Script from "next/script";
import { useEffect } from "react";

type TallyWindow = Window & { Tally?: { loadEmbeds: () => void } };
const loadEmbeds = () => (window as TallyWindow).Tally?.loadEmbeds();

/**
 * ▶ TALLY FORM EMBED SPOT
 * Set `tallyFormId` in lib/site.ts and the form renders here. Until then, a clearly marked
 * placeholder shows where it will go. Fields in the Figma design, for building the Tally form:
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
      <div
        data-tally-slot
        className="flex min-h-[560px] flex-col justify-between border border-dashed border-thread bg-mist p-5 text-muted"
      >
        <div className="flex items-start justify-between">
          <p className="text-[10px]">TALLY FORM EMBED</p>
          <p className="text-[10px]">lib/site.ts → tallyFormId</p>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[20px] lg:text-[28px]">[Tally form]</p>
          <p className="max-w-[360px] text-[13px] leading-[1.5]">
            Add your Tally form ID in lib/site.ts and the enquiry form will appear here.
          </p>
        </div>
        <div className="flex items-start justify-between">
          <span className="h-px w-3 bg-thread" />
          <span className="h-px w-3 bg-thread" />
        </div>
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
