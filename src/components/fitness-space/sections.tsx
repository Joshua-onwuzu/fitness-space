import Image from "next/image";

import { assets } from "./data";
import { FadeInOnScroll } from "./FadeInOnScroll";
import { IntroBenefits } from "./IntroBenefits";
import { PrimaryCta } from "./PrimaryCta";
import { ScrollSection } from "./ScrollSection";

const answerBlocks = [
  {
    title: "What is Bibi?",
    body: "Bibi is the Fitness Space AI nutrition and fitness coach. She helps you plan balanced meals, choose home workouts, track fasting, and build daily habits for sustainable weight loss.",
  },
  {
    title: "Who is Fitness Space for?",
    body: "Fitness Space is built first for Nigerian women and African diaspora users who want a weight loss app that understands local food, busy schedules, budgets, and motivation dips.",
  },
  {
    title: "How does Bibi help with Nigerian meals?",
    body: "Bibi works with jollof rice, eba, beans, plantain, egusi, and the food you already have. She helps you balance carbs, vegetables, protein, and portions without forcing foreign meal plans.",
  },
  {
    title: "What does the daily system include?",
    body: "The daily system combines AI meal coaching, photo meal logging, home workouts, fasting guidance, step goals, hydration, Health Score points, and community accountability.",
  },
  {
    title: "Is Bibi medical advice?",
    body: "Bibi is a nutrition and habit coach, not a doctor. Fitness Space is designed for everyday coaching and accountability, with human coaches in the community when users need support.",
  },
  {
    title: "How much does Fitness Space cost?",
    body: "You can start free for 14 days. The standard subscription is ₦5,000 per month, with Health Score discounts of up to 50% at renewal.",
  },
] as const;

export function HeroSection() {
  return (
    <ScrollSection
      animateOnScroll={false}
      className="px-3 pb-4 pt-14 sm:px-6 sm:pb-6 sm:pt-20 lg:px-10"
      contentClassName="flex items-center justify-center"
      id="hero"
      intensity={38}
    >
      <FadeInOnScroll className="w-full max-w-[1284px]" initialVisible>
        <article className="relative h-[calc(100svh-4.5rem)] w-full overflow-hidden rounded-[22px] bg-[#f35d0c] sm:h-[calc(100svh-6rem)]">
          <div className="absolute inset-0 bg-[linear-gradient(270deg,#f35d0c_6%,#f54900_94%)]" />
          <Image
            alt=""
            className="absolute left-[-34%] top-[-50%] h-[200%] w-[160%] object-cover opacity-100"
            height={1256}
            priority
            sizes="100vw"
            src={assets.heroPattern}
            width={2054}
          />
          <div className="relative z-10 flex h-full max-w-[720px] flex-col justify-center px-7 py-10 sm:px-12 lg:px-[88px]">
            <h1 className="max-w-[650px] text-3xl font-bold leading-none text-white sm:text-5xl lg:text-[56px]">
              Meet Bibi.
              <br />
              Your AI Nutrition Coach For Nigerian Weight Loss.
            </h1>
            <p className="mt-4 max-w-[600px] text-xs leading-5 text-white sm:mt-5 sm:text-sm sm:leading-6">
              Bibi personalises Nigerian meals, selects home workouts, guides
              fasting and tracks your daily habits - all based on your body,
              your food, your budget and your goals. Real results. Starting
              free.
            </p>
            <PrimaryCta className="mt-5 w-fit px-4 py-2 text-xs sm:text-sm" />
            <p className="mt-10 max-w-[480px] text-xs font-semibold text-white sm:mt-20 sm:text-sm">
              No meal plans. No starvation. No guesswork. Just Bibi.
            </p>
          </div>
          <Image
            alt="Bibi, the Fitness Space AI coach"
            className="pointer-events-none absolute bottom-0 right-[-26px] z-10 h-[58%] max-h-[680px] w-auto object-contain sm:right-0 sm:h-[82%] lg:h-[89%]"
            height={1448}
            priority
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 430px, 260px"
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

export function SearchAnswerSection() {
  return (
    <ScrollSection
      className="px-5 py-16 sm:px-8 lg:px-12"
      contentClassName="mx-auto flex max-w-[1180px] flex-col justify-center"
      id="bibi-answers"
      intensity={28}
      nativeScroll
    >
      <div className="max-w-[880px]">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#f35d0c]">
          AI weight loss coach for real life
        </p>
        <h2 className="mt-4 text-[34px] font-bold leading-tight text-white sm:text-[48px]">
          Bibi is built for Nigerian food, African meals and daily
          accountability.
        </h2>
        <p className="mt-5 max-w-[760px] text-sm leading-7 text-white/70 sm:text-base">
          Fitness Space is not a generic AI meal planner. It is a personalized
          weight loss app for people who need local meals, simple home workouts,
          habit tracking and human-backed consistency in one daily system.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {answerBlocks.map((answer) => (
          <article
            className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left"
            key={answer.title}
          >
            <h3 className="text-base font-semibold leading-tight text-white">
              {answer.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/70">
              {answer.body}
            </p>
          </article>
        ))}
      </div>

      <PrimaryCta
        className="mt-8 w-fit px-4 py-2 text-sm"
        variant="orange"
      />
    </ScrollSection>
  );
}
