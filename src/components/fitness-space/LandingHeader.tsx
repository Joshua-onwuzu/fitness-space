import Image from "next/image";

import { assets } from "./data";
import { WHATSAPP_LINK } from "./lib/constants";

type LandingHeaderProps = {
  className?: string;
  mobileFlow?: boolean;
};

export function LandingHeader({
  className = "",
  mobileFlow = false,
}: LandingHeaderProps) {
  const positionClass = mobileFlow
    ? "relative z-50 w-full py-4"
    : "absolute left-1/2 top-0 z-50 w-full -translate-x-1/2 px-[25px] py-4 sm:fixed sm:px-6 lg:w-[1179.5px] lg:px-10";

  return (
    <header className={`${positionClass} ${className}`}>
      <div className="mx-auto flex w-full items-center justify-between gap-4">
        <a aria-label="Fitness Space home" className="block" href="#hero">
          <Image
            alt="Fitness Space"
            className="h-auto w-[118px] max-sm:w-[141px] sm:w-[160px] lg:w-[200px]"
            height={201}
            priority
            src={assets.logo}
            width={1733}
          />
        </a>

        <a
          className="rounded-[7px] bg-white px-3 py-2 text-xs font-semibold capitalize text-black transition hover:bg-white/90 max-sm:px-[11px] max-sm:text-sm sm:text-sm"
          href={WHATSAPP_LINK}
        >
          Meet Bibi — It&apos;s Free
        </a>
      </div>
    </header>
  );
}
