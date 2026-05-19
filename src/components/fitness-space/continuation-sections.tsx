"use client";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { BodyFoodReveal, CoachingCardAsset } from "./BodyFoodReveal";
import {
  assets,
  coachingCardPairs,
  healthScoreActivities,
  powerfulFeatures,
  remainingCommunitySupportCards,
  remainingSystemPanels,
} from "./data";
import { ScrollSection } from "./ScrollSection";
import { FinalRemainingSections } from "./FinalRemainingSections";
import { FadeInOnScroll } from "./FadeInOnScroll";
import {
  HealthScorePayoffReveal,
  X2NutritionReveal,
} from "./X2NutritionReveal";
import { RemainingWeHearYouReveal } from "./RemainingWeHearYouReveal";
import { RemainingSystemReveal } from "./RemainingSystemReveal";
import { WHATSAPP_LINK } from "./lib/constants";

function SectionPill({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex h-[37px] items-center justify-center rounded-full border border-white px-8 py-5 text-center text-sm font-normal uppercase leading-none text-white sm:min-w-[184px] sm:text-base ${className}`}
    >
      {children}
    </div>
  );
}

function RemainingFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`relative h-[min(calc(100svh-7rem),625px)] min-h-[500px] w-full max-w-[1284px] overflow-hidden bg-black text-white max-md:min-h-[430px] ${className}`}
    >
      {children}
    </article>
  );
}

function RemainingPhoneMockup({
  phone,
}: {
  phone: (typeof remainingSystemPanels)[number]["phone"];
}) {
  return (
    <div
      className="absolute bottom-0 right-0 hidden overflow-hidden md:block"
      style={{
        bottom: `${phone.bottom}px`,
        height: `${phone.height}px`,
        right: `${phone.right}px`,
        width: `${phone.width}px`,
      }}
    >
      <Image
        alt={phone.alt}
        className="h-full w-full object-cover object-top"
        height={1295}
        src={phone.src}
        width={596}
      />
    </div>
  );
}

type SectionStepEvent = CustomEvent<{
  direction: -1 | 1;
  lockMs?: number;
  sameDirectionMaxMs?: number;
  sameDirectionSilenceMs?: number;
  silenceMs?: number;
}>;

const mobileCardSectionTiming = {
  cardDuration: 0.48,
  sameDirectionMaxMs: 1800,
  sameDirectionSilenceMs: 1800,
  stepLockMs: 620,
} as const;

const mobileCoachingCards = coachingCardPairs.flat();

const mobilePowerfulFeatureLayout = [
  {
    bodyTop: "253px",
    numberTop: "90px",
    titleTop: "198px",
    titleWidth: "148px",
  },
  {
    bodyTop: "602px",
    numberTop: "448px",
    titleTop: "556px",
    titleWidth: "157px",
  },
] as const;

const healthScoreDiscountRows = [
  { discount: "No discount - base price", score: "0 - 500" },
  { discount: "20% off your renewal", score: "600 – 749" },
  { discount: "25% off your renewal", score: "750 – 899" },
  { discount: "30% off your renewal", score: "900 – 1,049" },
  { discount: "35% off your renewal", score: "1,050+" },
] as const;

const mobileSystemFeatureSections = [
  {
    height: 1319,
    id: "mobile-remaining-bibi-coach",
    phone: {
      alt: "Bibi AI coach app screen",
      bottom: -72,
      height: 550,
      src: assets.remainingBibiCoachScreen,
      width: 340,
    },
    title: "Bibi — Your AI Coach",
    features: [
      {
        body: "personalised CVP meals from whatever you have at home",
        title: "Bibi Suggest",
        top: 197,
        width: 282,
      },
      {
        body: "Photo based analysis and instant scoring",
        title: "Meal Logging",
        top: 299,
        width: 320,
      },
      {
        body: "CVP Ratio and portion size scored out of 25 point per meal",
        title: "Meal Scoring",
        top: 381,
        width: 220,
      },
      {
        body: "personalised remarks tied to your health conditions",
        title: "Bibi’s Feedback",
        top: 483,
        width: 209,
      },
      {
        body: "forward-looking coaching on smarter habits",
        title: "Tips for Next Time",
        top: 585,
        width: 320,
      },
      {
        body: "every meal graded and stored for your learning",
        title: "Meal History",
        top: 667,
        width: 320,
      },
    ],
  },
  {
    height: 1093,
    id: "mobile-remaining-daily-system",
    phone: {
      alt: "Daily task system app screen",
      bottom: -72,
      height: 516,
      src: assets.remainingDailySystemScreen,
      width: 340,
    },
    title: "The Daily System",
    features: [
      {
        body: "Bibi selects your session daily. No gym. No equipment.",
        title: "Home Workouts",
        top: 197,
        width: 212,
      },
      {
        body: "automatic 16/8 window tracking from 8pm to 12pm",
        title: "Intermittent Fasting",
        top: 299,
        width: 212,
      },
      {
        body: "10,000 steps tracked and rewarded with health score points",
        title: "Daily Steps",
        top: 401,
        width: 244,
      },
      {
        body: "Morning Hydration, coffee break & weight loss drink",
        title: "all tracked and scored",
        top: 503,
        width: 253,
      },
    ],
  },
  {
    height: 939,
    id: "mobile-remaining-community",
    phone: {
      alt: "Community screen inside Fitness Space app",
      bottom: -72,
      height: 511,
      src: assets.remainingCommunityScreen,
      width: 322,
    },
    title: "Community",
    features: [
      {
        body: "answer your questions in real time every single day",
        title: "Expert coaches",
        top: 181,
        width: 282,
      },
      {
        body: "in tribes built around shared goals",
        title: "20,000+  members",
        top: 275,
        width: 320,
      },
      {
        body: "that keeps you consistent when motivation drops",
        title: "Accountability",
        top: 349,
        width: 278,
      },
    ],
  },
] as const;

export function BodyFoodSection() {
  return (
    <ScrollSection
      className="px-5 pt-16 max-sm:px-0 max-sm:pt-0 sm:px-8 lg:px-12"
      contentClassName="mx-auto flex max-w-[1180px] items-center justify-center max-sm:max-w-none"
      desktopStepSection
      id="body-food"
      intensity={54}
      mobileNativeScroll
    >
      <div className="h-full w-full max-sm:hidden">
        <BodyFoodReveal />
      </div>
      <MobileBodyFoodMock />
    </ScrollSection>
  );
}

export function MobileCardSection() {
  return (
    <ScrollSection
      animateOnScroll={false}
      className="px-0 py-0 sm:hidden"
      contentClassName="flex items-center justify-center"
      id="body-food-mobile-cards"
      intensity={0}
    >
      <MobileBodyFoodCardsReveal />
    </ScrollSection>
  );
}

function MobileBodyFoodCardsReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cards = mobileCoachingCards;
  const [stage, setStage] = useState(0);
  const [previousStage, setPreviousStage] = useState<number | null>(
    cards.length > 1 ? cards.length - 1 : null,
  );
  const stageRef = useRef(stage);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const section = rootRef.current?.closest<HTMLElement>("[data-section]");
    if (!section) {
      return;
    }

    const onSectionStep = (event: Event) => {
      const stepEvent = event as SectionStepEvent;
      const direction = stepEvent.detail.direction;
      const currentStage = stageRef.current;
      const nextStage = Math.min(
        Math.max(currentStage + direction, 0),
        cards.length - 1,
      );

      if (nextStage === currentStage) {
        return;
      }

      event.preventDefault();
      stepEvent.detail.lockMs = mobileCardSectionTiming.stepLockMs;
      stepEvent.detail.sameDirectionMaxMs =
        mobileCardSectionTiming.sameDirectionMaxMs;
      stepEvent.detail.sameDirectionSilenceMs =
        mobileCardSectionTiming.sameDirectionSilenceMs;
      stepEvent.detail.silenceMs = 0;
      stageRef.current = nextStage;
      setPreviousStage(currentStage);
      setStage(nextStage);
    };

    section.addEventListener("fitness-space:section-step", onSectionStep);
    return () => {
      section.removeEventListener("fitness-space:section-step", onSectionStep);
    };
  }, [cards.length]);

  return (
    <div
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-black px-0"
      ref={rootRef}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        id="daily-system-mobile-cards"
      />
      <div className="relative aspect-[343/405] w-[min(343px,94vw)]">
        {cards.map((card, index) => {
          const isActive = index === stage;
          const isPrevious = index === previousStage && index !== stage;

          return (
            <div
              className="pointer-events-none absolute inset-0 flex items-start justify-center"
              key={card.src}
              style={{ zIndex: isActive ? 20 : isPrevious ? 10 : 0 }}
            >
              <motion.div
                animate={{
                  opacity: isActive || isPrevious ? 1 : 0,
                  rotate: isPrevious ? -3 : 0,
                  scale: isPrevious ? 0.955 : 1,
                  y: isPrevious ? 18 : 0,
                }}
                transition={{
                  duration: prefersReducedMotion
                    ? 0
                    : mobileCardSectionTiming.cardDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CoachingCardAsset
                  card={card}
                  delay={0}
                  duration={prefersReducedMotion ? 0 : 0.36}
                  imageClassName="h-auto w-full max-w-none drop-shadow-[0_28px_70px_rgba(0,0,0,0.38)]"
                  initialY={0}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileBodyFoodMock() {
  return (
    <div className="relative hidden h-screen w-full bg-black text-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:px-5">
      {/* TOP TEXT */}
      <div className="text-center">
        <p className="text-[42px] leading-tight font-normal mb-[-49px] lg:mb-[0px] ">
          <span className="text-[#fe9a00]">Bibi</span> Knows Your Body.
        </p>
      </div>

      {/* IMAGE */}
      <div className="flex items-center justify-center">
        <Image
          alt="Bibi standing in Fitness Space gear"
          className="h-[80%] w-auto object-contain lg:h-[92%]"
          height={1536}
          priority={false}
          src={assets.bibiStanding}
          width={1024}
        />
      </div>

      {/* BOTTOM TEXT + CTA */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-[42px] leading-tight font-normal mt-[-52px] lg-mt-[0px]">
          <span className="text-[#fe9a00]">Bibi</span> Knows Your Food.
        </p>

        <a
          className="inline-flex items-center justify-center rounded-[7px] bg-white px-5 py-3 text-sm font-semibold text-black"
          href={WHATSAPP_LINK}
        >
          Meet Bibi — It&apos;s Free
        </a>
      </div>
    </div>
  );
}
export function DataCoachCtaSection() {
  return (
    <ScrollSection
      className="px-0 py-8 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="data-coach"
      intensity={44}
      mobileNativeScroll
    >
      <article className="relative w-full max-w-[1284px] overflow-hidden rounded-[22px] bg-[#f35d0c] max-sm:h-[838px] sm:h-[64svh] sm:min-h-[430px]">
        <div className="absolute inset-0 bg-[linear-gradient(270deg,#f35d0c_6%,#f54900_94%)]" />
        <Image
          alt=""
          className="absolute left-[-32%] top-[-64%] h-[230%] w-[160%] object-cover opacity-95"
          height={1256}
          src={assets.coachPattern}
          width={2054}
        />
        <div className="relative z-10 flex h-full flex-col items-center px-[12px] pt-[52px] text-center sm:flex-row sm:items-center sm:px-12 sm:text-left lg:px-20">
          <div className="max-w-[560px] flex flex-col items-center text-center sm:items-start sm:text-left">
            <h2 className="w-[337px] text-[30px] font-bold  leading-[41px] text-white sm:w-auto sm:text-5xl lg:text-[36px] lg:font-semibold lg:leading-[1.2]">
              Bibi does not just track you. She coaches you. Every day. Based on
              your data.
            </h2>

            <a
              className="mt-7 inline-flex h-[46px] w-[200px] lg:w-[183px] items-center justify-center rounded-[7px] bg-white px-[20px] py-[14px] text-[15px] font-semibold leading-[1.2] capitalize text-black transition hover:bg-white/90 sm:mt-8 sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:text-sm sm:leading-normal"
              href={WHATSAPP_LINK}
            >
              Meet Bibi &mdash; It&apos;s Free
            </a>
          </div>
          <div className="absolute bottom-0 left-1/2 h-[511.78px] w-[316.57px] -translate-x-1/2 sm:bottom-[-45px] sm:left-auto sm:right-[7%] sm:h-[112%] sm:w-[min(28vw,256.84px)] sm:translate-x-0 lg:bottom-[-51px]">
            <Image
              alt="Fitness Space app coaching view"
              className="h-full w-full object-contain"
              height={1295}
              src={assets.coachScreen}
              width={596}
            />
          </div>
        </div>
      </article>
    </ScrollSection>
  );
}

export function PowerfulFeaturesSection() {
  return (
    <ScrollSection
      className="px-0 sm:px-8 lg:px-12"
      contentClassName="mx-auto w-full max-w-[1093px]"
      id="features"
      intensity={50}
      mobileNativeScroll
    >
      <div className="flex h-full w-full flex-col items-center pt-[91px] md:pt-[7svh] lg:pt-[0svh]">
        <h2 className="w-[331px] text-center text-[32px] font-normal capitalize leading-[38px] text-white md:w-auto md:whitespace-nowrap md:text-[clamp(2rem,4.57svh,50px)] md:leading-normal">
          Six Powerful Features. One Smart Coach.
        </h2>

        {/* ================= DESKTOP ================= */}
        <div className="relative mt-[4svh] hidden h-[717px] w-full md:grid md:grid-cols-3 md:grid-rows-2">
          <span className="pointer-events-none absolute bottom-0 left-1/3 top-0 w-px bg-white/10" />
          <span className="pointer-events-none absolute bottom-0 left-2/3 top-0 w-px bg-white/10" />
          <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-white/10" />

          {powerfulFeatures.map((feature) => (
            <article
              key={feature.number}
              className="group relative flex flex-col justify-end px-12 pb-14 pt-[5.5rem] transition-colors duration-300"
            >
              <p className="absolute right-10 top-6 text-[64px] font-bold leading-none text-white/[0.04]">
                {feature.number}
              </p>

              <div className="relative max-w-[290px] text-white/30 transition-all duration-300 group-hover:text-white">
                <h3 className="text-[24px] font-bold leading-tight">
                  {feature.title}
                </h3>

                <p className="mt-5 text-[14px] leading-7 font-normal">
                  {feature.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="mt-6 flex w-full max-w-[389px] flex-col divide-y divide-white/10 border-y border-white/10 md:hidden">
          {powerfulFeatures.map((feature) => (
            <article
              key={feature.number}
              className="relative flex min-h-[220px] flex-col justify-end px-8 pb-10 pt-16 text-white"
            >
              <p className="absolute right-6 top-4 text-[72px] font-bold leading-none text-white/[0.04]">
                {feature.number}
              </p>

              <h3 className="max-w-[240px] text-[24px] font-bold leading-[30px]">
                {feature.title}
              </h3>

              <p className="mt-4 max-w-[260px] text-[12px] leading-[20px] text-white/70">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

export function X2FrameworkSection() {
  return (
    <ScrollSection
      className="px-0 py-14 sm:px-8 lg:px-12 min-h-screen"
      contentClassName="flex items-center justify-center"
      desktopStepSection
      id="x2-framework"
      intensity={42}
      mobileNativeScroll
    >
      <div className="hidden w-full md:block">
        <X2NutritionReveal />
      </div>
      <MobileX2FrameworkMock />
    </ScrollSection>
  );
}

function MobileX2FrameworkMock() {
  return (
    <article className="relative h-[678px] w-full max-w-[384px] overflow-hidden rounded-[22px] bg-[#f54900] text-white md:hidden">
      <div className="absolute inset-0 bg-[linear-gradient(270deg,#f35d0c_6%,#f54900_94%)]" />
      <Image
        alt=""
        className="absolute left-[-438px] top-[-316px] h-[1256px] w-[2054px] max-w-none object-cover opacity-70"
        height={1256}
        src={assets.x2FrameworkPattern}
        width={2054}
      />
      <div className="relative z-10 h-full w-full text-center">
        <p className="absolute left-1/2 top-[82px] inline-flex h-[37.5px] w-[266.5px] -translate-x-1/2 items-center justify-center rounded-full border border-white text-[16px] font-normal uppercase leading-none">
          THE X2 NUTRITION SYSTEM
        </p>
        <h2 className="absolute left-1/2 top-[202px] w-[245px] -translate-x-1/2 text-[44px] font-medium capitalize leading-[55px]">
          <span className="block">The Framework</span>
          <span className="block">Behind</span>
          <span className="block">Every Bibi</span>
          <span className="block">Meal</span>
        </h2>
      </div>
    </article>
  );
}

export function DailySystemPointsSection() {
  return (
    <ScrollSection
      className="px-0 py-8 sm:px-8 lg:px-12"
      contentClassName="mx-auto flex w-full max-w-[1440px] flex-col items-center"
      id="daily-system-points"
      intensity={46}
      mobileNativeScroll
      nativeScroll
    >
      <article className="relative mx-auto flex h-[1108px] w-full max-w-[410px] flex-col items-center bg-black text-white md:h-auto md:max-w-none md:pt-[7.4svh] mt-[-4rem] lg:mt-[0px]">
        <SectionPill className="mt-[64px] !h-[42.3px] !w-[247.76px] !px-0 !py-0 !text-[19px] sm:mt-0 sm:!h-[37px] sm:!w-auto sm:!px-8 sm:!py-5 sm:!text-base">
          YOUR DAILY SYSTEM
        </SectionPill>

        <h2 className="mb-0 mt-[45px] w-[364px] text-center text-[32px] font-bold leading-[40px] text-white md:my-5 md:mt-[2.5svh] md:w-auto md:text-[50px] md:leading-tight">
          <span className="block md:inline">Every Activity.</span>
          <span className="block md:inline">Every Point. Every Day.</span>
        </h2>

        <p className="mb-0 mt-[14px] w-[325px] text-center text-[16px] font-normal leading-[18px] text-white/50 md:mb-4 md:mt-[2svh] md:w-auto md:text-sm md:leading-normal">
          Everything you do in Fitness Space earns Health Score points. Every
          point compounds into real results — and real discounts.
        </p>

        <div className="mt-[3.9svh] hidden w-full max-w-[816px] md:block">
          <div className="grid grid-cols-[159px_minmax(0,591px)_66px]">
            <div className="flex py-4 min-h-[min(5.2svh,60px)] items-center border-b border-white/10 text-[24px] font-bold leading-none text-white/50">
              Activity
            </div>

            <div className="flex py-4 min-h-[min(5.2svh,60px)] items-center border-b border-l border-white/10 pl-[59px] text-[24px] font-bold leading-none text-white/50">
              What it does
            </div>

            <div className="flex py-4 min-h-[min(5.2svh,60px)] items-center border-b border-l border-white/10 pl-[15px] text-[24px] font-bold leading-none text-white/50">
              Points
            </div>

            {healthScoreActivities.map((row) => (
              <div className="contents" key={row.activity}>
                <div className="flex py-4 min-h-[min(5.2svh,60px)] items-center border-b border-white/10 pr-5 text-sm font-normal leading-normal text-white/70">
                  {row.activity}
                </div>

                <div className="flex py-4 min-h-[min(5.2svh,60px)] items-center border-b border-l border-white/10 pl-[59px] pr-8 text-sm font-normal leading-normal text-white/70">
                  {row.description}
                </div>

                <div className="flex py-4 min-h-[min(5.2svh,60px)] items-center border-b border-l border-white/10 pl-[15px] text-sm font-normal leading-normal text-white/70">
                  {row.points}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-label="Daily system points table"
          className="relative mt-[32px] h-[711px] w-full overflow-x-auto overflow-y-hidden overscroll-x-contain md:hidden [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="w-[535px] min-w-[535px]">
            <div className="grid grid-cols-[120px_351px_64px]">
              <div className="flex min-h-[63px] items-center border-b border-white/10 px-4 text-[24px] font-bold leading-none text-white/50">
                Activity
              </div>
              <div className="flex min-h-[63px] items-center border-b border-l border-white/10 px-5 text-[24px] font-bold leading-none text-white/50">
                What it does
              </div>
              <div className="flex min-h-[63px] items-center border-b border-l border-white/10 pl-3 text-[24px] font-bold leading-none text-white/50">
                Points
              </div>

              {healthScoreActivities.map((row) => (
                <div className="contents" key={row.activity}>
                  <div className="flex min-h-[81px] items-center border-b border-white/10 px-4 text-[14px] font-normal leading-[18px] text-white/70">
                    {row.activity}
                  </div>

                  <div className="flex min-h-[81px] items-center border-b border-l border-white/10 px-5 text-[14px] font-normal leading-[18px] text-white/70">
                    {row.description}
                  </div>

                  <div className="flex min-h-[81px] items-center border-b border-l border-white/10 pl-3 text-[14px] font-normal leading-[18px] text-white/70">
                    {row.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="absolute left-1/2 top-[1073px] lg:top-[1019px]  w-[341px] -translate-x-1/2 text-center text-[16px] font-normal leading-[30px] text-white md:hidden">
          Complete everything. Earn 100 Health Score points. Every point moves
          you closer to a bigger discount at renewal.
        </p>
      </article>
      <p className="mt-[4svh] hidden max-w-[836px] text-center text-lg font-normal leading-[1.65] text-white md:block md:text-2xl">
        Complete everything. Earn 100 Health Score points.
        <br />
        Every point moves you closer to a bigger discount at renewal.
      </p>
    </ScrollSection>
  );
}

export function MealPlanFailureSection() {
  return (
    <ScrollSection
      className="px-5 py-12 sm:px-8 lg:px-12"
      contentClassName="mx-auto flex max-w-[1284px] items-center justify-center max-sm:!translate-y-0 max-sm:!opacity-100"
      id="meal-plan-failure"
      intensity={42}
    >
      <FadeInOnScroll className="flex w-full flex-col items-center justify-center text-center text-white max-sm:!translate-y-0 max-sm:!opacity-100">
        {/* DESKTOP */}
        <h2 className="hidden md:block max-w-[1115px] text-[64px] font-normal leading-tight">
          Why Every Meal Plan
          <br />
          You Have Tried Has <span className="text-[#f54900]">Failed You</span>
        </h2>

        {/* MOBILE */}
        <h2 className="md:hidden w-[349px] text-center text-[32px] font-medium leading-[1.5] tracking-tight text-white ">
          <span className="block"> Why Every Meal Plan You Have Tried Has</span>
          <span className="block">
            <span className="text-[#f54900]">Failed You</span>
          </span>
        </h2>

        {/* TEXT CONTENT */}
        <div className="mt-8 max-w-[1098px] text-white">
          {/* MOBILE */}
          <div className="md:hidden w-[275px] space-y-4 text-center ">
            <p className="text-[14px] leading-[1.7] text-white">
              Food prices in Nigeria change weekly. Your meal plan does not. The
              ingredients it needs are not always in your market.You travel. You
              attend owambes. You visit family. The plan breaks. Meal plans
              teach you nothing. When they end, you are lost.Most are built for
              Western foods. Not for eba, egusi or jollof rice.
            </p>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block space-y-5 text-[16px] leading-[0.875] text-white">
            <p>
              Food prices in Nigeria change weekly. Your meal plan does not. The
              ingredients it needs are not always in your market.
            </p>

            <p>
              You travel. You attend owambes. You visit family. The plan breaks.
              Meal plans teach you nothing. When they end, you are lost.
            </p>

            <p>
              Most are built for Western foods. Not for eba, egusi or jollof
              rice.
            </p>
          </div>
        </div>
      </FadeInOnScroll>
    </ScrollSection>
  );
}

export function BibiDifferentSection() {
  return (
    <ScrollSection
      className="px-0 py-10 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="bibi-different"
      intensity={42}
      mobileNativeScroll
    >
      <article className="relative h-[min(calc(100svh-7rem),625px)] min-h-[520px] w-full max-w-[1284px] overflow-hidden rounded-[22px] bg-black text-white max-md:h-[823px] max-md:min-h-[823px] max-md:max-w-[400px]">
        <Image
          alt=""
          className="absolute left-[-32%] top-[-64%] h-[230%] w-[160%] object-cover opacity-[0.18]"
          height={1256}
          src={assets.x2FrameworkPattern}
          width={2054}
        />
        <div className="relative z-10 hidden h-full items-start justify-center px-2 lg:items-center lg:justify-start lg:px-[87px] lg:pt-0 md:flex">
          <div className="max-w-[595px] mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="text-[42px] font-bold leading-tight text-white md:text-[64px]">
              Bibi is different.
            </h2>

            <p className="mt-[2.5svh] max-w-[595px] text-[14px] font-normal leading-[1.58] text-white/70 md:text-2xl mx-auto lg:mx-0">
              Bibi works with whatever you have, At a restaurant, at a party, at
              your mother’s house? She applies the system to your real life —
              every single time.
            </p>

            <a
              className="mt-[3.7svh] inline-flex h-[50px] min-w-[273px] items-center justify-center rounded-[7px] bg-[#f54900] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#ff6420] mx-auto lg:mx-0"
              href={WHATSAPP_LINK}
            >
              Meet Bibi — It’s Free
            </a>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center md:hidden">
          <h2 className="mt-[121px] w-[328px] text-[42px] font-bold leading-[53px] text-white">
            Bibi is different
          </h2>

          <p className="mt-5 w-[328px] text-[14px] font-normal leading-[23px] text-white">
            Bibi works with whatever you have. At a restaurant, at a party, at
            your mother’s house? She applies the system to your real life —
            every single time.
          </p>

          <a
            className="mt-10 flex h-[50px] w-[273px] items-center justify-center rounded-[7px] bg-[#f54900] text-sm font-semibold text-white transition hover:bg-[#ff6420]"
            href={WHATSAPP_LINK}
          >
            Meet Bibi — It’s Free
          </a>
        </div>
        <div className="absolute right-0 top-[477px] z-30 h-[442px] w-[331px] overflow-hidden md:hidden">
          <Image
            alt="Bibi standing in a fitness outfit"
            className="h-full w-full object-cover object-top"
            height={1448}
            priority
            src={assets.bibiDifferent}
            width={1086}
          />
        </div>
        <div className="absolute bottom-[0px] right-[-12%] z-30 hidden h-[319px] w-[331px] overflow-hidden md:block lg:bottom-0 lg:right-0 lg:h-[89%] lg:w-auto lg:overflow-visible">
          <Image
            alt="Bibi standing in a fitness outfit"
            className="h-full w-full object-cover object-top lg:object-contain"
            height={1448}
            priority
            src={assets.bibiDifferent}
            width={1086}
          />
        </div>
      </article>
    </ScrollSection>
  );
}

export function HealthScorePayoffSection() {
  return (
    <ScrollSection
      className="px-4 py-14 sm:px-8 lg:px-12 "
      contentClassName="flex items-center justify-center max-sm:!translate-y-0 max-sm:!opacity-100"
      id="health-score-payoff"
      intensity={42}
    >
      <HealthScorePayoffReveal />
    </ScrollSection>
  );
}

function MobileFigmaScrollSection({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <ScrollSection
      className="px-0 py-0 md:hidden"
      contentClassName="flex items-start justify-center"
      id={id}
      intensity={42}
      mobileNativeScroll
    >
      {children}
    </ScrollSection>
  );
}

function MobileHealthScoreRewardCard() {
  return (
    <MobileFigmaScrollSection id="mobile-health-score-reward">
      <article className="relative h-[624px] w-full max-w-[393px] overflow-hidden rounded-[20px] bg-[#f54900] text-center text-white">
        <Image
          alt=""
          className="absolute left-1/2 top-[-224px] h-[1071px] w-[1752px] max-w-none -translate-x-1/2 object-cover opacity-45 mix-blend-screen"
          height={1071}
          src={assets.x2SystemPattern}
          width={1752}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,73,0,0.22)_0%,#f54900_47%,#f35d0c_100%)]" />
        <div className="absolute left-[-32px] top-[92px] h-[638px] w-[445px] rotate-[179.23deg] bg-[linear-gradient(180deg,#f54900_23.077%,rgba(143,43,15,0)_100%)] opacity-80" />
        <Image
          alt="Health Score progress card"
          className="absolute left-1/2 top-[78px] z-10 h-auto w-[267px] -translate-x-1/2"
          height={1099}
          priority
          src={assets.x2NutritionCard2}
          width={1077}
        />
        <p className="absolute left-1/2 top-[418px] z-10 w-[284px] -translate-x-1/2 text-center text-[16px] font-medium leading-[30px] text-white">
          Every activity earns Health Score points — up to 100 per day. Your
          cumulative score determines your renewal discount.
        </p>
        <a
          className="absolute left-1/2 top-[552px] z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-[7px] bg-white px-[11.25px] py-[8.25px] text-[14px] font-semibold capitalize leading-normal text-black transition hover:bg-white/90"
          href={WHATSAPP_LINK}
        >
          &nbsp;&nbsp;Meet Bibi — It&apos;s Free&nbsp;
        </a>
      </article>
    </MobileFigmaScrollSection>
  );
}

function MobileHealthScoreDiscountTable() {
  return (
    <MobileFigmaScrollSection id="mobile-health-score-discounts">
      <article className="relative h-[640px] w-full max-w-[420px] overflow-hidden bg-black text-white">
        <div className="absolute left-1/2 top-[80px] w-full max-w-[420px] -translate-x-1/2">
          <div className="grid grid-cols-[49%_51%]">
            <div className="flex h-[72px] items-center border-b border-white/15 pl-10 text-[20px] font-bold capitalize leading-normal text-white/50">
              Health score
            </div>
            <div className="flex h-[72px] items-center border-b border-l border-white/15 pl-10 text-[20px] font-bold capitalize leading-normal text-white/50">
              Your Discount
            </div>
            {healthScoreDiscountRows.map((row) => (
              <div className="contents" key={row.score}>
                <div className="flex h-[60px] items-center justify-center border-b border-white/15 text-[14px] font-normal capitalize leading-normal text-white/70">
                  {row.score}
                </div>
                <div className="flex h-[60px] items-center border-b border-l border-white/15 pl-8 text-[14px] font-normal capitalize leading-normal text-white/70">
                  {row.discount}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="absolute left-1/2 top-[496px] w-[343px] -translate-x-1/2 text-center text-[14px] font-normal leading-[25px] text-white/70">
          The healthier you live, the less you pay. Fitness Space is the only
          platform that rewards you financially for showing up.
        </p>
      </article>
    </MobileFigmaScrollSection>
  );
}

function MobileOneSystemTitle() {
  return (
    <MobileFigmaScrollSection id="mobile-one-system-title">
      <article className="relative flex h-[625px] w-full max-w-[427px] items-center justify-center overflow-hidden bg-black text-white">
        <h2 className="w-[337px] text-center text-[32px] font-normal capitalize leading-normal text-white">
          One System. Everything You Need.
        </h2>
      </article>
    </MobileFigmaScrollSection>
  );
}

function MobileSystemProductMock({
  section,
}: {
  section: (typeof mobileSystemFeatureSections)[number];
}) {
  return (
    <MobileFigmaScrollSection id={section.id}>
      <article
        className="relative w-full max-w-[425px] overflow-hidden bg-black text-center text-white"
        style={{ height: `${section.height}px` }}
      >
        <p className="absolute left-1/2 top-[17px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[16px] font-normal capitalize leading-normal text-white">
          One System. Everything You Need.
        </p>
        <h2 className="absolute left-1/2 top-[66px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[32px] font-semibold capitalize leading-normal text-white">
          {section.title}
        </h2>

        {section.features.map((feature) => (
          <div
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-center"
            key={feature.title}
            style={{ top: `${feature.top}px`, width: `${feature.width}px` }}
          >
            <h3 className="whitespace-nowrap text-[18px] font-bold capitalize leading-[30px] text-white">
              {feature.title}
            </h3>
            <p className="text-center text-[14px] font-normal leading-[20px] text-white/80">
              {feature.body}
            </p>
          </div>
        ))}

        <div
          className="absolute left-1/2 overflow-hidden"
          style={{
            bottom: `${section.phone.bottom}px`,
            height: `${section.phone.height}px`,
            transform: "translateX(-50%)",
            width: `${section.phone.width}px`,
          }}
        >
          <Image
            alt={section.phone.alt}
            className="h-full w-full object-cover object-top"
            height={1870}
            src={section.phone.src}
            width={1083}
          />
        </div>
      </article>
    </MobileFigmaScrollSection>
  );
}

function MobileCommunitySupportMock() {
  return (
    <MobileFigmaScrollSection id="mobile-community-support">
      <article className="relative h-[939px] w-full max-w-[425px] overflow-hidden bg-black text-center text-white">
        <h2 className="absolute left-1/2 top-[258px] w-[330px] -translate-x-1/2 -translate-y-1/2 text-center text-[38px] font-semibold leading-normal text-white">
          You Are Not Doing This Alone.
        </h2>
        <p className="absolute left-1/2 top-[339px] w-[361px] -translate-x-1/2 -translate-y-1/2 text-center text-[14px] font-normal leading-normal text-white">
          Inside Fitness Space you join 20,000+ women on the same journey —
          supported by expert coaches, shared wins and real accountability.
        </p>
        <div className="absolute left-1/2 top-[437px] flex h-[52px] w-[361px] max-w-[calc(100%_-_32px)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[8px] bg-white/10 px-4 text-center text-[14px] font-normal leading-normal text-white">
          Members share meals, Bibi scores and progress
        </div>
        <div className="absolute left-1/2 top-[513px] flex h-[52px] w-[382px] max-w-[calc(100%_-_32px)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[8px] bg-white/10 px-4 text-center text-[14px] font-normal leading-normal text-white">
          Coaches answer your questions in real time every day
        </div>
        <div className="absolute left-1/2 top-[589px] flex h-[75px] w-[387px] max-w-[calc(100%_-_32px)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[8px] bg-white/10 px-4 text-center text-[14px] font-normal leading-normal text-white">
          Join tribes: 10k Steps Gang, No Fried Food Trybe, Nutrient Fasting
          Trybe and more
        </div>
        <p className="absolute left-1/2 top-[710px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[16px] font-normal leading-normal text-white">
          <span className="block">Consistency becomes effortless</span>
          <span className="block">when you are not doing it alone.</span>
        </p>
      </article>
    </MobileFigmaScrollSection>
  );
}

export function MobilePostHealthScoreSections() {
  return (
    <>
      <MobileHealthScoreRewardCard />
      <MobileHealthScoreDiscountTable />
      <MobileOneSystemTitle />
      {mobileSystemFeatureSections.map((section) => (
        <MobileSystemProductMock key={section.id} section={section} />
      ))}
      <MobileCommunitySupportMock />
    </>
  );
}

export function RemainingSystemSections() {
  const [introPanel, ...productPanels] = remainingSystemPanels;

  return (
    <>
      <ScrollSection
        className="hidden px-4 py-14 md:block sm:px-8 lg:px-12"
        contentClassName="flex items-center justify-center"
        desktopStepSection
        id="one-system"
        intensity={42}
      >
        <RemainingSystemReveal panel={introPanel} />
      </ScrollSection>
      {productPanels.map((panel) => (
        <RemainingProductPanelSection key={panel.id} panel={panel} />
      ))}
      <RemainingCommunitySupportSection />
      <RemainingWeHearYouSection />
      <FinalRemainingSections />
    </>
  );
}

function RemainingProductPanelSection({
  panel,
}: {
  panel: (typeof remainingSystemPanels)[number];
}) {
  return (
    <ScrollSection
      className="hidden px-4 py-14 md:block sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id={panel.id}
      intensity={42}
    >
      <RemainingFrame>
        <p
          className="
  absolute
  left-[9.6%] top-[2.7%]

  text-[clamp(0.875rem,2.19svh,24px)]
  font-normal leading-normal text-white

  max-md:left-1/2
  max-md:-translate-x-1/2
  max-md:-translate-y-1/2
  max-md:text-center
  max-md:w-full
  max-md:px-4
"
        >
          One System. Everything You Need.
        </p>
        <h2
          className="
    absolute left-[9.6%] top-[8.2%]
    whitespace-nowrap
    text-[clamp(2.45rem,5.84svh,64px)]
    font-semibold leading-normal text-white

    max-md:left-1/2
    max-md:-translate-x-1/2
    max-md:text-center
  "
        >
          {panel.title}
        </h2>

        <div
          className="
    absolute left-[9.6%] z-10
    flex max-w-[520px] flex-col items-start

    max-md:left-1/2
    max-md:-translate-x-1/2
    max-md:w-full
    max-md:items-center
    max-md:px-4
    max-md:text-center
  "
          style={{
            gap: `${panel.featureGap}px`,
            top: `${panel.featureTop}px`,
          }}
        >
          {panel.features.map((feature) => (
            <div className="text-left max-md:text-center" key={feature.title}>
              <h3 className="text-lg font-bold leading-[30px] text-white">
                {feature.title}
              </h3>

              <p className="max-w-[470px] text-sm font-normal leading-5 text-white/80 max-md:mx-auto">
                {feature.body}
              </p>
            </div>
          ))}

          {"cta" in panel ? (
            <a
              className="mt-[2px] inline-flex rounded-[7px] bg-white px-[11px] py-2 text-sm font-semibold capitalize text-black transition hover:bg-white/90"
              href={WHATSAPP_LINK}
            >
              &nbsp;&nbsp;Meet Bibi — It&apos;s Free&nbsp;
            </a>
          ) : null}
        </div>

        <RemainingPhoneMockup phone={panel.phone} />
      </RemainingFrame>
    </ScrollSection>
  );
}

function RemainingCommunitySupportSection() {
  return (
    <ScrollSection
      className="hidden px-4 py-10 md:block sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="community-support"
      intensity={42}
    >
      <article className="relative h-[min(calc(100svh-5rem),689px)] min-h-[560px] w-full max-w-[1284px] overflow-hidden bg-black text-center text-white max-md:min-h-[520px]">
        <div className="hidden md:block">
          <h2 className="absolute left-1/2 top-[31%] w-full -translate-x-1/2 -translate-y-1/2 text-[clamp(32px,5vw,64px)] lg:text-[64px] font-normal leading-normal text-white">
            You Are Not Doing This Alone.
          </h2>
          <p className="absolute left-1/2 top-[40%] w-[min(82.9%,1064px)] -translate-x-1/2 -translate-y-1/2 text-sm font-normal leading-normal text-white sm:text-base">
            Inside Fitness Space you join 20,000+ women on the same journey —
            supported by expert coaches, shared wins and real accountability.
          </p>

          <div className="absolute bottom-[14%] left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-6 px-4">
            {remainingCommunitySupportCards.map((card) => (
              <div
                className="flex h-[52px] max-w-full items-center justify-center rounded-[8px] bg-white/10 px-6 text-sm font-normal leading-normal text-white border border-white/10"
                key={card.text}
                style={{ width: `${card.width}px` }}
              >
                {card.text}
              </div>
            ))}
          </div>

          <p className="absolute bottom-[8.7%] left-1/2 w-[min(82.9%,1064px)] -translate-x-1/2 translate-y-1/2 text-sm font-normal leading-normal text-white sm:text-base">
            Consistency becomes effortless when you are not doing it alone.
          </p>
        </div>

        <div className="flex h-full flex-col items-center justify-center px-2 text-center md:hidden">
          <h2 className="text-[38px] font-normal leading-[1.1] text-white">
            You Are Not Doing This Alone.
          </h2>
          <p className="mt-4 text-sm font-normal leading-normal text-white">
            Inside Fitness Space you join 20,000+ women on the same journey —
            supported by expert coaches, shared wins and real accountability.
          </p>
          <div className="mt-[4rem] flex w-full flex-col items-center gap-4">
            {remainingCommunitySupportCards.map((card) => (
              <div
                className="flex min-h-[52px] w-full max-w-[360px] items-center justify-center rounded-[8px] bg-white/10 px-4 text-sm font-normal leading-normal text-white border border-white/10"
                key={card.text}
              >
                {card.text}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-normal leading-normal text-white">
            Consistency becomes effortless when you are not doing it alone.
          </p>
        </div>
      </article>
    </ScrollSection>
  );
}

function RemainingWeHearYouSection() {
  return (
    <ScrollSection
      className="px-0 py-14 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center max-sm:!translate-y-0 max-sm:!opacity-100"
      id="we-hear-you"
      intensity={42}
    >
      <RemainingWeHearYouReveal />
    </ScrollSection>
  );
}
