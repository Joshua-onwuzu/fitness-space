import Image from "next/image";

import { assets, benefitCards } from "./data";
import { FadeInOnScroll } from "./FadeInOnScroll";
import { IntroBenefits } from "./IntroBenefits";
import { ScrollSection } from "./ScrollSection";

export function HeroSection() {
  return (
    <ScrollSection
      animateOnScroll={false}
      className="px-3 pb-4 pt-14 max-sm:px-0 max-sm:pb-0 max-sm:pt-[147px] sm:px-6 sm:pb-6 sm:pt-20 lg:px-10"
      contentClassName="flex items-center justify-center max-sm:block"
      id="hero"
      intensity={38}
    >
      <FadeInOnScroll className="w-full max-w-[1284px]" initialVisible>
        <article className="relative h-[calc(100svh-4.5rem)] w-full overflow-hidden rounded-[22px] bg-[#f35d0c] max-sm:h-[798px] sm:h-[calc(100svh-6rem)]">
          <div className="absolute inset-0 bg-[linear-gradient(270deg,#f35d0c_6%,#f54900_94%)]" />
          <Image
            alt=""
            className="absolute left-[-34%] top-[-50%] h-[200%] w-[160%] object-cover opacity-100 max-sm:left-[-184%] max-sm:top-[-23%] max-sm:h-[125%] max-sm:w-[421%]"
            height={1256}
            priority
            src={assets.heroPattern}
            width={2054}
          />
          <div className="relative z-10 flex h-full max-w-[720px] flex-col justify-center px-7 py-10 max-sm:w-full max-sm:max-w-none max-sm:items-center max-sm:justify-start max-sm:px-8 max-sm:pt-[100px] max-sm:text-center sm:px-12 lg:px-[88px]">
            <h1 className="max-w-[650px] text-3xl font-bold leading-none text-white max-sm:w-[321px] max-sm:max-w-full max-sm:text-[42px] max-sm:capitalize max-sm:leading-[0.999] sm:text-5xl lg:text-[56px]">
              <span className="sm:hidden">
                Meet Bibi.
                <br />
                Your AI Coach for Sustainable Weight Loss.
              </span>
              <span className="hidden sm:inline">
                Meet Bibi.
                <br />
                Your AI Coach For Sustainable Weight Loss.
              </span>
            </h1>
            <p className="mt-4 max-w-[600px] text-xs leading-5 text-white max-sm:mt-9 max-sm:w-[313px] max-sm:max-w-full max-sm:text-sm max-sm:leading-normal sm:mt-5 sm:text-sm sm:leading-6">
              <span className="sm:hidden">
                Bibi personalises your meals, selects your workouts, guides your
                fasting and tracks your daily habits — all based on your body,
                your food and your goals. Real results. Starting free.
              </span>
              <span className="hidden sm:inline">
                Bibi personalises your meals, selects your workouts, guides your
                fasting and tracks your daily habits - all based on your body,
                your food and your goals. Real results. Starting free.
              </span>
            </p>
            <a
              className="mt-5 inline-flex w-fit rounded-[7px] bg-white px-4 py-2 text-xs font-semibold capitalize text-black transition hover:bg-white/90 max-sm:mt-8 max-sm:py-3 max-sm:text-sm sm:text-sm"
              href="#diet"
            >
              Meet Bibi &mdash; It&apos;s Free
            </a>
            <p className="mt-10 max-w-[480px] text-xs font-semibold text-white max-sm:mt-9 max-sm:w-[239px] max-sm:max-w-full max-sm:text-sm sm:mt-20 sm:text-sm">
              No meal plans. No starvation. No guesswork. Just Bibi.
            </p>
          </div>
          <Image
            alt="Bibi, the Fitness Space AI coach"
            className="pointer-events-none absolute bottom-0 right-[-26px] z-10 h-[58%] max-h-[680px] w-auto object-contain max-sm:bottom-[-127px] max-sm:right-[46px] max-sm:h-[360px] sm:right-0 sm:h-[82%] lg:h-[89%]"
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
      contentClassName="flex items-center justify-center px-5 text-center max-sm:!h-[695px]"
      id={id}
      intensity={72}
    >
      <FadeInOnScroll className="mx-auto max-w-[900px] max-sm:!translate-y-0 max-sm:!opacity-100 max-sm:flex max-sm:flex-col max-sm:items-center">
        {eyebrow ? (
          <p className="mb-5 text-sm font-medium uppercase text-[#f35d0c]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-4xl font-normal capitalize leading-tight text-white max-sm:w-[287px] max-sm:max-w-full max-sm:text-[42px] max-sm:font-medium max-sm:leading-normal sm:text-5xl lg:text-[64px]">
          {firstLine}
          <br />
          {secondLine} <span className="text-[#f35d0c]">{highlight}</span>
          {trailing}
        </h2>
        {body ? (
          <div className="mx-auto mt-6 max-w-[760px] space-y-1 text-sm capitalize leading-6 text-white/85 max-sm:w-[268px] max-sm:max-w-full max-sm:leading-normal sm:text-base">
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
      className="px-4 py-16 max-sm:px-0 max-sm:py-0 sm:px-6 lg:px-10"
      contentClassName="mx-auto flex max-w-[1284px] flex-col items-center justify-center text-center max-sm:block max-sm:max-w-none"
      id={id}
      intensity={52}
      mobileNativeScroll
    >
      <div className="relative z-30 w-full max-sm:hidden">
        <h2 className="text-4xl font-normal capitalize leading-none text-white max-sm:mx-auto max-sm:w-[353px] max-sm:max-w-full max-sm:text-5xl max-sm:font-medium max-sm:leading-normal sm:text-5xl lg:text-[76px]">
          Introducing Fitness Space
        </h2>
        <p className="mx-auto mt-5 max-w-[1006px] bg-[linear-gradient(135deg,#ffffff_4%,#999999_100%)] bg-clip-text text-xs  leading-6 text-transparent max-sm:w-[363px] max-sm:max-w-[calc(100vw-26px)] max-sm:text-sm max-sm:leading-7 sm:text-sm sm:leading-7">
          A science-backed daily system for sustainable weight loss. Built
          around your food, your life and your body. At the centre of everything
          is Bibi, our AI coach who personalises every part of your journey.
          From the meal on your plate to the workout in your living room to the
          steps you take every day.
        </p>
      </div>

      <IntroBenefits />
      <MobileIntroMock />
    </ScrollSection>
  );
}

function MobileIntroMock() {
  return (
    <div className="relative hidden h-[1343px] w-full overflow-hidden text-center max-sm:block">
      <h2 className="absolute left-1/2 top-[111px] w-[353px] -translate-x-1/2 -translate-y-1/2 text-5xl font-medium capitalize leading-normal text-white">
        Introducing Fitness Space
      </h2>
      <p className="absolute left-1/2 top-[277px] w-[363px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(100deg,#ffffff_4%,#999999_100%)] bg-clip-text text-sm  leading-7 text-transparent">
        A science-backed daily system for sustainable weight loss. Built around
        your food, your life and your body. At the centre of everything is Bibi,
        our AI coach who personalises every part of your journey. From the meal
        on your plate to the workout in your living room to the steps you take
        every day.
      </p>

      <div className="absolute bottom-[395px] right-[7px] h-[562px] w-[397px]">
        <Image
          alt="Fitness Space app shown on a phone held in hand"
          className="h-full w-full object-contain"
          height={820}
          priority={false}
          src={assets.phoneComposite}
          width={547}
        />
        <div className="pointer-events-none absolute bottom-[-248px] left-1/2 h-[397px] w-[926px] -translate-x-1/2 bg-gradient-to-b from-black/10 to-black" />
      </div>

      <div className="absolute left-[calc(50%+20.5px)] top-[996px] flex w-[312px] -translate-x-1/2 flex-col gap-[17px]">
        {benefitCards.map((label) => (
          <div
            className="flex h-[74px] items-center gap-3 overflow-hidden rounded-lg bg-white px-[17px] text-left text-sm capitalize leading-normal text-black"
            key={label}
          >
            <Image
              alt=""
              className="h-6 w-6 shrink-0"
              height={24}
              src={assets.bullet}
              width={24}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
