import MagneticButton from "@/components/motion/MagneticButton";
import type { Service } from "@/data/services";
import { formatPrice } from "@/lib/currency";
import { bookCallHref } from "@/lib/site";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col gap-6 border border-line p-7">
      <p className="text-[12px] text-ink">{service.number} /</p>
      <h3 className="text-[28px] leading-[1.1] font-semibold text-black lg:text-[30px]">{service.title}</h3>
      <p className="text-[16px] leading-[1.6] text-muted">{service.description}</p>
      <ul className="flex flex-col gap-3">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-[10px]">
            <span aria-hidden className="text-[16px] text-ink">
              ↳
            </span>
            <span className="flex-1 text-[15px] leading-[1.4] text-black">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-6">
        <div className="h-px bg-line" />
        <p className="text-[16px] text-black">Starting from {formatPrice(service.startingPrice)}</p>
        <MagneticButton href={bookCallHref} variant="secondary-light" className="w-full">
          Book a free call
        </MagneticButton>
      </div>
    </article>
  );
}
