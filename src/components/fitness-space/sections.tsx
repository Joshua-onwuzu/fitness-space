import Image from "next/image";

import { assets } from "./data";
import { FadeInOnScroll } from "./FadeInOnScroll";
import { IntroBenefits } from "./IntroBenefits";
import { ScrollSection } from "./ScrollSection";

export function HeroSection() {
  return (
    <ScrollSection
      className="px-3 pb-4 pt-14 sm:px-6 sm:pb-6 sm:pt-20 lg:px-10"
      contentClassName="flex items-center justify-center"
      id="hero"
      intensity={38}
    >
      <FadeInOnScroll className="w-full max-w-[1284px]">
        <article className="relative h-[calc(100svh-4.5rem)] w-full overflow-hidden rounded-[22px] bg-[#f35d0c] sm:h-[calc(100svh-6rem)]">
          <div className="absolute inset-0 bg-[linear-gradient(270deg,#f35d0c_6%,#f54900_94%)]" />
          <Image
            alt=""
            className="absolute left-[-34%] top-[-50%] h-[200%] w-[160%] object-cover opacity-100"
            height={1256}
            priority
            src={assets.heroPattern}
            width={2054}
          />
          <div className="relative z-10 flex h-full max-w-[720px] flex-col justify-center px-7 py-10 sm:px-12 lg:px-[88px]">
            <h1 className="max-w-[650px] text-3xl font-bold leading-none text-white sm:text-5xl lg:text-[56px]">
              Meet Bibi.
              <br />
              Your AI Coach For Sustainable Weight Loss.
            </h1>
            <p className="mt-4 max-w-[600px] text-xs leading-5 text-white sm:mt-5 sm:text-sm sm:leading-6">
              Bibi personalises your meals, selects your workouts, guides your
              fasting and tracks your daily habits - all based on your body,
              your food and your goals. Real results. Starting free.
            </p>
            <a
              className="mt-5 inline-flex w-fit rounded-[7px] bg-white px-4 py-2 text-xs font-semibold capitalize text-black transition hover:bg-white/90 sm:text-sm"
              href="#diet"
            >
              Meet Bibi &mdash; It&apos;s Free
            </a>
            <p className="mt-10 max-w-[480px] text-xs font-semibold text-white sm:mt-20 sm:text-sm">
              No meal plans. No starvation. No guesswork. Just Bibi.
            </p>
          </div>
          <Image
            alt="Bibi, the Fitness Space AI coach"
            className="pointer-events-none absolute bottom-0 right-[-26px] z-10 h-[58%] max-h-[680px] w-auto object-contain sm:right-0 sm:h-[82%] lg:h-[89%]"
            height={1448}
            priority
            src={assets.coach}
            width={1086}
          />
        </article>
      </FadeInOnScroll>
    </ScrollSection>
  );
}

type StatementSectionProps = {
  eyebrow?: string;
  firstLine: string;
  secondLine: string;
  highlight: string;
  id: string;
  trailing?: string;
  body?: string[];
};

export function StatementSection({
  eyebrow,
  firstLine,
  secondLine,
  highlight,
  id,
  trailing = "",
  body,
}: StatementSectionProps) {
  return (
    <ScrollSection
      contentClassName="flex items-center justify-center px-5 text-center"
      id={id}
      intensity={72}
    >
      <FadeInOnScroll className="mx-auto max-w-[900px]">
        {eyebrow ? (
          <p className="mb-5 text-sm font-medium uppercase text-[#f35d0c]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-4xl font-normal capitalize leading-tight text-white sm:text-5xl lg:text-[64px]">
          {firstLine}
          <br />
          {secondLine} <span className="text-[#f35d0c]">{highlight}</span>
          {trailing}
        </h2>
        {body ? (
          <div className="mx-auto mt-6 max-w-[760px] space-y-1 text-sm capitalize leading-6 text-white/85 sm:text-base">
            {body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : null}
      </FadeInOnScroll>
    </ScrollSection>
  );
}

type IntroSectionProps = {
  id: string;
};

export function IntroSection({ id }: IntroSectionProps) {
  return (
    <ScrollSection
      className="px-4 py-16 sm:px-6 lg:px-10"
      contentClassName="mx-auto flex max-w-[1284px] flex-col items-center justify-center text-center"
      id={id}
      intensity={52}
    >
      <div className="relative z-30 w-full">
        <h2 className="text-4xl font-normal capitalize leading-none text-white sm:text-5xl lg:text-[76px]">
          Introducing Fitness Space
        </h2>
        <p className="mx-auto mt-5 max-w-[1006px] bg-[linear-gradient(135deg,#ffffff_4%,#999999_100%)] bg-clip-text text-xs capitalize leading-6 text-transparent sm:text-sm sm:leading-7">
          A science-backed daily system for sustainable weight loss. Built
          around your food, your life and your body. At the centre of everything
          is Bibi, our AI coach who personalises every part of your journey.
          From the meal on your plate to the workout in your living room to the
          steps you take every day.
        </p>
      </div>

      <IntroBenefits />
    </ScrollSection>
  );
}
