"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Faq } from "@/data/faqs";

export default function FaqList({ faqs, defaultOpen = 1 }: { faqs: Faq[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <div className="flex flex-col border-b border-line">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-t border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-[18px] py-6 text-left"
              >
                <span className="flex-1 text-[18px] leading-[1.4] font-medium text-black">{faq.question}</span>
                <Image
                  src={isOpen ? "/figma/minus.svg" : "/figma/plus.svg"}
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                />
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="-mt-1 pb-6 text-[16px] leading-[1.6] text-muted">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
