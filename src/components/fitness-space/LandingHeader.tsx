import Image from "next/image";

import { assets } from "./data";
import { WHATSAPP_LINK } from "./lib/constants";

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full lg:w-[1179.5px] px-3 py-4 max-sm:absolute max-sm:px-[25px] sm:px-6 lg:px-10">
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
