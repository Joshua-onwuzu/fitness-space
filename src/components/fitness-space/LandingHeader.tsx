import Image from "next/image";

import { assets } from "./data";

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-2 max-sm:absolute max-sm:top-[82px] max-sm:px-[25px] max-sm:py-0 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1284px] items-center justify-between gap-4">
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
          href="#hero"
        >
          Meet Bibi &mdash; It&apos;s Free
        </a>
      </div>
    </header>
  );
}
