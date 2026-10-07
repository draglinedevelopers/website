import Image from "next/image";
import Section, { Eyebrow } from "@/components/ui/Section";

export default function WhyDragline() {
  return (
    <Section aria-labelledby="why-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[100px]">
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
          <div aria-hidden className="relative flex h-[250px] items-center justify-center lg:h-[340px]">
            <span className="h-px w-[70px] bg-thread lg:w-[120px]" />
            {/* The web graphic sits 13.46% in from the left of its 280×290 frame, as in Figma. */}
            <span className="relative h-[220px] w-[210px] lg:h-[290px] lg:w-[280px]">
              <Image
                src="/figma/connected-web.svg"
                alt=""
                fill
                unoptimized
                className="!left-[13.46%] !w-[86.54%]"
              />
            </span>
            <Image
              src="/figma/connection-node.svg"
              alt=""
              width={6}
              height={6}
              unoptimized
              className="absolute top-[calc(50%-3px)] left-[calc(50%+43px)] -translate-x-1/2 -translate-y-1/2 lg:left-[calc(50%+68px)]"
            />
          </div>
          <figcaption className="text-[12px] text-muted">A connection that holds everything together.</figcaption>
        </figure>
      </div>
    </Section>
  );
}
