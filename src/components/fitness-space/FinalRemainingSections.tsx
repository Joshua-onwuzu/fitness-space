import Image from "next/image";
import type { ReactNode } from "react";

import { assets, finalTestimonials, finalTrialFacts } from "./data";
import { ScrollSection } from "./ScrollSection";

function FinalFrame({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <ScrollSection
      className="px-4 py-14 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id={id}
      intensity={42}
    >
      <article
        className={`relative h-[min(calc(100svh-5rem),680px)] min-h-[500px] w-full max-w-[1284px] overflow-hidden bg-black text-white max-md:min-h-[430px] ${className}`}
      >
        {children}
      </article>
    </ScrollSection>
  );
}

function TrialFactPill({
  bottom,
  fact,
}: {
  bottom: number;
  fact: (typeof finalTrialFacts)[number];
}) {
  return (
    <div
      className="absolute left-1/2 flex h-[52px] max-w-[90%] -translate-x-1/2 items-center justify-center rounded-[8px] bg-white/10 px-6 text-center text-[14px] font-normal leading-normal text-white max-sm:h-auto max-sm:min-h-[48px] max-sm:px-4 max-sm:text-xs"
      style={{ bottom: `${bottom}px`, width: `${fact.width}px` }}
    >
      {fact.text}
    </div>
  );
}

function FinalButton({
  className = "",
  variant = "orange",
}: {
  className?: string;
  variant?: "orange" | "white";
}) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-[7px] px-[11.25px] py-[8.25px] text-center text-[14px] font-semibold capitalize leading-normal transition ${
        variant === "orange"
          ? "bg-[#f54900] text-white hover:bg-[#ff6420]"
          : "bg-white text-black hover:bg-white/90"
      } ${className}`}
      href="#hero"
    >
      &nbsp;&nbsp;Meet Bibi — It&apos;s Free&nbsp;
    </a>
  );
}

export function FinalRemainingSections() {
  return (
    <>
      <StartFreeTrialSection />
      <RealResultsSection />
      <FourteenDayPayoffSection />
      <FinalFooterCtaSection />
    </>
  );
}

function StartFreeTrialSection() {
  const bottoms = [317, 241, 165, 89];

  return (
    <FinalFrame id="start-free-trial">
      <h2 className="absolute left-1/2 top-[106px] w-full -translate-x-1/2 text-center text-[40px] font-normal capitalize leading-tight text-white md:top-[97px] md:text-[64px] md:leading-normal">
        Start Free for 14 Days
      </h2>
      <p className="absolute left-1/2 top-[236px] w-[min(82.9%,1064px)] -translate-x-1/2 text-center text-[12px] font-normal capitalize leading-normal text-white md:top-[188px] md:text-[16px]">
        Meet Bibi. Explore the full system. Start seeing results. Completely
        free for 14 days. No payment required.
      </p>
      <div className="hidden md:block">
        {finalTrialFacts.map((fact, index) => (
          <TrialFactPill
            bottom={bottoms[index] ?? 89}
            fact={fact}
            key={fact.text}
          />
        ))}
      </div>
      <div className="absolute bottom-[70px] left-1/2 flex w-full max-w-[430px] -translate-x-1/2 flex-col items-center gap-4 px-5 md:hidden">
        {finalTrialFacts.map((fact) => (
          <div
            className="flex min-h-[48px] w-full items-center justify-center rounded-[8px] bg-white/10 px-4 text-center text-xs font-normal capitalize leading-normal text-white"
            key={fact.text}
          >
            {fact.text}
          </div>
        ))}
      </div>
    </FinalFrame>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof finalTestimonials)[number];
}) {
  return (
    <div
      className="absolute hidden items-center justify-center md:flex"
      style={{
        height: `${testimonial.wrapper.height}px`,
        left: `${testimonial.wrapper.left}px`,
        top: `${testimonial.wrapper.top}px`,
        width: `${testimonial.wrapper.width}px`,
      }}
    >
      <article
        className="relative h-[375.668px] w-[312.204px] overflow-hidden rounded-[20px] bg-white text-black"
        style={{ transform: `rotate(${testimonial.rotation}deg)` }}
      >
        <div className="absolute left-[40.65px] top-[134px] w-[239.008px] whitespace-pre-wrap text-left text-black">
          <p className="mb-9 text-[24px] font-normal leading-normal">
            {testimonial.quote}
          </p>
          <p className="text-[16px] font-bold capitalize leading-normal">
            {testimonial.name}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="absolute left-[30.58px] top-[72.58px] -translate-x-1/2 -translate-y-1/2 rotate-[1.31deg] text-center text-[128px] font-semibold capitalize leading-none text-black/20"
        >
          “
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-[76.42px] right-[21.99px] translate-x-1/2 translate-y-1/2 rotate-180 text-center text-[128px] font-semibold capitalize leading-none text-black/20"
        >
          “
        </span>
      </article>
    </div>
  );
}

function MobileTestimonialCard({
  testimonial,
}: {
  testimonial: (typeof finalTestimonials)[number];
}) {
  return (
    <article className="relative min-h-[176px] w-full max-w-[252px] overflow-hidden rounded-[16px] bg-white px-7 py-7 text-left text-black">
      <p className="text-[14px] font-normal capitalize leading-tight">
        {testimonial.quote}
      </p>
      <p className="mt-3 text-xs font-bold capitalize leading-normal">
        {testimonial.name}
      </p>
      <span
        aria-hidden="true"
        className="absolute left-5 top-8 -translate-y-1/2 text-[64px] font-semibold leading-none text-black/20"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-5 right-5 rotate-180 text-[64px] font-semibold leading-none text-black/20"
      >
        “
      </span>
    </article>
  );
}

function RealResultsSection() {
  return (
    <FinalFrame id="real-results">
      <h2 className="absolute left-1/2 top-[221px] w-[288px] -translate-x-1/2 text-center text-[64px] font-extrabold capitalize leading-normal text-white/15 max-md:top-[42px] max-md:w-[250px] max-md:text-[38px] max-md:leading-none">
        Real People. Real Results.
      </h2>
      <p className="absolute left-1/2 top-[607px] w-[243px] -translate-x-1/2 text-center text-[16px] font-normal capitalize leading-normal text-white max-md:bottom-8 max-md:top-auto max-md:w-[260px] max-md:text-xs">
        Our members eat jollof rice, beans, eba and their favourite Nigerian
        meals. Just smarter.
      </p>
      {finalTestimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
      <div className="absolute left-1/2 top-[164px] flex w-full -translate-x-1/2 flex-col items-center gap-3 px-5 md:hidden">
        {finalTestimonials.map((testimonial) => (
          <MobileTestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
          />
        ))}
      </div>
    </FinalFrame>
  );
}

function FourteenDayPayoffSection() {
  return (
    <ScrollSection
      className="px-4 py-10 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="fourteen-day-payoff"
      intensity={42}
    >
      <article className="relative h-[min(calc(100svh-5rem),741px)] min-h-[560px] w-full max-w-[1284px] overflow-hidden rounded-[22px] bg-black text-white max-md:min-h-[500px]">
        <Image
          alt=""
          className="absolute left-[-438.2px] top-[-316.21px] h-[1255.923px] w-[2054.306px] max-w-none object-cover"
          height={1256}
          src={assets.finalBlackPattern}
          width={2054}
        />
        <h2 className="absolute left-1/2 top-[88px] w-full -translate-x-1/2 text-center text-[25px] font-normal leading-[31px] text-white md:top-[119px] md:text-[42px] md:leading-[38px]">
          <span className="block">
            Most users notice changes within 14 days.
          </span>
          <span className="block">Not starvation. The system.</span>
        </h2>
        <FinalButton className="absolute left-1/2 top-[238px] h-[50px] w-[273px] -translate-x-1/2 md:top-[229px]" />
        <Image
          alt="Bibi fitness coach"
          className="absolute bottom-[-25px] left-1/2 z-10 h-[434px] w-[325px] -translate-x-1/2 object-cover max-md:h-[360px] max-md:w-[270px]"
          height={1448}
          src={assets.finalBibi}
          width={1086}
        />
        <div className="absolute left-1/2 top-[565px] h-[270px] w-[800px] -translate-x-1/2 bg-[linear-gradient(5.93deg,#000_67.185%,rgba(0,0,0,0)_91.265%)]" />
      </article>
    </ScrollSection>
  );
}

function FinalFooterCtaSection() {
  return (
    <ScrollSection
      className="px-4 py-10 sm:px-8 lg:px-12"
      contentClassName="flex items-start justify-center"
      id="final-cta"
      intensity={42}
      nativeScroll
    >
      <article className="relative min-h-[960px] w-full max-w-[1284px] overflow-visible bg-black text-white max-md:min-h-[900px]">
        <div className="absolute left-1/2 top-0 h-[625px] w-[min(100%,1185px)] -translate-x-1/2 overflow-hidden rounded-[22px] bg-[#f25602]">
          <div className="absolute left-1/2 top-0 h-[625px] w-[1284px] -translate-x-1/2 rounded-[10px] bg-[#f25602]" />
          <Image
            alt=""
            className="absolute left-[-438.2px] top-[-316.21px] h-[1255.923px] w-[2054.306px] max-w-none object-cover"
            height={1256}
            src={assets.finalOrangePattern}
            width={2054}
          />
          <h2 className="absolute left-1/2 top-[97px] w-full max-w-[840px] -translate-x-1/2 text-center text-[32px] font-bold capitalize leading-[99.915%] text-white md:text-[48px]">
            <span className="block">Your body has been waiting for</span>
            <span className="block">a system built for it.</span>
          </h2>
          <FinalButton
            className="absolute left-1/2 top-[241px] -translate-x-1/2"
            variant="white"
          />
          <Image
            alt="Fitness Space logo"
            className="absolute bottom-[31.8px] left-10 h-[23.197px] w-[200px] object-contain max-md:left-5 max-md:w-[150px]"
            height={201}
            src={assets.finalFooterLogo}
            width={1733}
          />
          <p className="absolute bottom-[35px] right-[48px] text-center text-[14px] font-bold capitalize leading-[99.915%] text-white max-md:right-5 max-md:text-[10px]">
            © 2026 All rights reserved. ·&nbsp;
            <span>Privacy</span>
            &nbsp;·&nbsp;
            <span>Terms</span>
          </p>
        </div>

        <Image
          alt="Bibi fitness coach"
          className="absolute left-1/2 top-[416px] z-10 h-[438px] w-[329px] -translate-x-1/2 object-cover max-md:top-[370px] max-md:h-[360px] max-md:w-[270px]"
          height={1448}
          src={assets.finalBibi}
          width={1086}
        />
        <p className="absolute left-1/2 top-[650px] -translate-x-[45%] whitespace-nowrap text-center text-[clamp(8rem,21.8svh,280px)] font-bold capitalize leading-[99.915%] text-white/10">
          Bibi. Bibi. Bibi.
        </p>
      </article>
    </ScrollSection>
  );
}
