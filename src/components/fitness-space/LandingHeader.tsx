import Image from "next/image";

import { assets } from "./data";
import { PrimaryCta } from "./PrimaryCta";

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-2 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1284px] items-center justify-between gap-4">
        <a aria-label="Fitness Space home" className="block" href="#hero">
          <Image
            alt="Fitness Space"
            className="h-auto w-[118px] sm:w-[160px] lg:w-[200px]"
            height={201}
            sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 118px"
            src={assets.logo}
            width={1733}
          />
        </a>
        <PrimaryCta className="px-3 py-2 text-xs sm:text-sm" />
      </div>
    </header>
  );
}
