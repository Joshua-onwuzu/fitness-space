import Image from "next/image";

import { assets } from "./data";

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-[130px] pt-[20px]">
      <div className="mx-auto flex h-[35.5px] max-w-[1179.5px] items-center justify-between">
        <a aria-label="Fitness Space home" className="block" href="#hero">
          <Image
            alt="Fitness Space"
            className="h-auto w-[200px]"
            height={201}
            priority
            src={assets.logo}
            width={1733}
          />
        </a>

        <a
          className="rounded-[7px] bg-white px-4 py-2 text-sm font-semibold capitalize text-black transition hover:bg-white/90"
          href="#hero"
        >
          Meet Bibi &mdash; It&apos;s Free
        </a>
      </div>
    </header>
  );
}
