"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

import { BodyFoodReveal } from "./BodyFoodReveal";
import {
  assets,
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

function SectionPill({ children }: { children: string }) {
  return (
    <div className="inline-flex h-[37px] items-center justify-center rounded-full border border-white px-8 py-5 text-center text-sm font-normal uppercase leading-none text-white sm:min-w-[184px] sm:text-base">
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

export function BodyFoodSection() {
  return (
    <ScrollSection
      className="px-5 pt-16 max-sm:px-0 max-sm:pt-0 sm:px-8 lg:px-12"
      contentClassName="mx-auto flex max-w-[1180px] items-center justify-center max-sm:max-w-none"
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

function MobileBodyFoodMock() {
  return (
    <div className="relative hidden h-[1018px] w-full overflow-hidden bg-black text-center text-white max-sm:block">
      <h2 className="absolute left-[calc(50%+0.5px)] top-[159px] w-[296px] -translate-x-1/2 -translate-y-1/2 text-[52px] font-normal capitalize leading-normal">
        <span className="text-[#fe9a00]">Bibi</span> Knows Your Body.
      </h2>
      <Image
        alt="Bibi standing in Fitness Space gear"
        className="absolute left-[calc(50%+0.5px)] top-[487px] h-[582px] w-[388px] -translate-x-1/2 -translate-y-1/2 object-cover"
        height={1536}
        priority={false}
        src={assets.bibiStanding}
        width={1024}
      />
      <h2 className="absolute left-[calc(50%+4px)] top-[786px] w-[273px] -translate-x-1/2 -translate-y-1/2 text-[52px] font-normal capitalize leading-normal">
        <span className="text-[#fe9a00]">Bibi</span> Knows Your Food.
      </h2>
      <a
        className="absolute bottom-[93.5px] left-[calc(50%+0.25px)] inline-flex -translate-x-1/2 items-center justify-center rounded-[7px] bg-white px-[14px] py-3 text-center text-sm font-semibold capitalize leading-normal text-black transition hover:bg-white/90"
        href={WHATSAPP_LINK}
      >
        &nbsp;&nbsp;Meet Bibi — It&apos;s Free&nbsp;
      </a>
    </div>
  );
}

export function DataCoachCtaSection() {
  return (
    <ScrollSection
      className="px-4 py-16 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="data-coach"
      intensity={44}
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
        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-[72px] text-center sm:flex-row sm:items-center sm:px-12 sm:text-left lg:px-20">
          <div className="max-w-[560px] flex flex-col items-center text-center sm:items-start sm:text-left">
            <h2 className="max-sm:w-[290px] text-[30px] font-bold capitalize leading-[1.35] text-white sm:text-5xl lg:text-[36px] lg:leading-[1.2] lg:font-semibold">
              Bibi does not just track you. She coaches you. Every day. Based on
              your data.
            </h2>

            <a
              className="mt-8 inline-flex rounded-[7px] bg-white px-4 py-2 text-xs font-semibold capitalize text-black transition hover:bg-white/90 sm:text-sm"
              href={WHATSAPP_LINK}
            >
              Meet Bibi &mdash; It&apos;s Free
            </a>
          </div>
          <div className="absolute bottom-[-45px] lg:bottom-[-51px] left-1/2 h-[571.21px] w-[276.42px] -translate-x-1/2 sm:left-auto sm:right-[7%] sm:h-[112%] sm:w-[min(28vw,256.84px)] sm:translate-x-0">
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
  const [visibleCount, setVisibleCount] = useState(2);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // SCROLL UP → show more cards
      if (currentScrollY < lastScrollY) {
        setVisibleCount((prev) => Math.min(prev + 1, powerfulFeatures.length));
      }

      // SCROLL DOWN → hide back to 2 minimum
      if (currentScrollY > lastScrollY) {
        setVisibleCount((prev) => Math.max(2, prev - 1));
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <ScrollSection
      className="px-5 sm:px-8 lg:px-12"
      contentClassName="mx-auto w-full max-w-[1093px]"
      id="features"
      intensity={50}
    >
      <div className="flex h-full w-full flex-col items-center pt-[11.5svh]">
        <h2 className="whitespace-nowrap text-center text-[clamp(2rem,4.57svh,50px)] font-normal capitalize leading-normal text-white max-sm:whitespace-normal">
          Six Powerful Features. One Smart Coach.
        </h2>
        <div className="relative mt-[4svh] hidden h-[717px] w-full md:grid md:grid-cols-3 md:grid-rows-2">
          {/* Grid lines */}
          <span className="pointer-events-none absolute bottom-0 left-1/3 top-0 w-px bg-white/10" />
          <span className="pointer-events-none absolute bottom-0 left-2/3 top-0 w-px bg-white/10" />
          <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-white/10" />

          {powerfulFeatures.map((feature) => (
            <article
              key={feature.number}
              className="group relative flex flex-col justify-end px-12 pb-14 pt-[5.5rem] transition-colors duration-300"
            >
              <p className="absolute right-10 top-6 text-[64px] font-bold leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-white/[0.08]">
                {feature.number}
              </p>

              <div className="relative max-w-[290px] text-white/30 transition-all duration-300 group-hover:text-white">
                <h3 className="text-[24px] font-bold leading-tight">
                  {feature.title}
                </h3>

                <p className="mt-5 text-[14px] leading-7">{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col md:hidden">
          {powerfulFeatures.slice(0, visibleCount).map((feature) => (
            <article
              key={feature.number}
              className="
        group relative overflow-hidden bg-white/[0.03] px-6 py-10
        border-x border-b border-white/10
        transition-all duration-500 ease-out
      "
            >
              <p className="absolute right-6 top-6 text-[56px] font-bold leading-none text-white/[0.04]">
                {feature.number}
              </p>

              <div className="relative text-white">
                <h3 className="max-w-[220px] text-[28px] font-bold leading-tight">
                  {feature.title}
                </h3>

                <p className="mt-6 text-sm leading-7 text-white/70">
                  {feature.body}
                </p>
              </div>
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
      className="px-4 py-14 sm:px-8 lg:px-12 min-h-screen"
      contentClassName="flex items-center justify-center"
      id="x2-framework"
      intensity={42}
    >
      <X2NutritionReveal />
    </ScrollSection>
  );
}

export function DailySystemPointsSection() {
  return (
    <div>
      <ScrollSection
        className="px-4 py-8 sm:px-8 lg:px-12"
        contentClassName="mx-auto w-full max-w-[1440px]"
        id="daily-system-points"
        intensity={46}
      >
        <article className="flex w-full flex-col items-center bg-black md:pt-[7.4svh] text-white">
          <SectionPill>YOUR DAILY SYSTEM</SectionPill>

          <h2 className="my-5 md:mt-[2.5svh] text-center text-[30px] font-bold leading-tight text-white md:text-[50px]">
            <span className="block md:inline">Every Activity.</span>
            <span className="block md:inline">Every Point. Every Day.</span>
          </h2>

          <p className="mb-4 md:mt-[2svh] text-xs font-normal leading-normal text-white/50 sm:text-sm text-center ">
            Everything you do in Fitness Space earns Health
            <br className="md:hidden" />
            Score points. Every point compounds into real
            <br className="md:hidden" />
            results — and real discounts.
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

          <div className="mt-[3svh] grid w-full max-w-[560px] gap-2 md:hidden">
            {healthScoreActivities.map((row) => (
              <article
                className="grid grid-cols-[1fr_auto] gap-x-4 rounded-lg border border-white/10 px-4 py-2.5"
                key={row.activity}
              >
                <h3 className="text-sm font-bold leading-tight text-white/80">
                  {row.activity}
                </h3>
                <p className="text-sm font-bold leading-tight text-white/80">
                  {row.points}
                </p>
                <p className="col-span-2 mt-1 text-[11px] font-normal leading-snug text-white/55">
                  {row.description}
                </p>
              </article>
            ))}
          </div>
        </article>
      </ScrollSection>
      <div className="flex w-full justify-center">
        <p className="mt-[4svh] max-w-[836px] text-center text-lg font-normal leading-[1.65] text-white md:text-2xl">
          Complete everything. Earn 100 Health Score points.
          <br />
          Every point moves you closer to a bigger discount at renewal.
        </p>
      </div>
    </div>
  );
}

export function MealPlanFailureSection() {
  return (
    <ScrollSection
      className="px-5 py-12 sm:px-8 lg:px-12"
      contentClassName="mx-auto flex max-w-[1284px] items-center justify-center"
      id="meal-plan-failure"
      intensity={42}
    >
      <FadeInOnScroll className="flex h-full w-full flex-col items-center justify-center bg-black text-center text-white">
        <h2 className="max-w-[1115px] text-[32px] font-normal leading-tight text-white md:text-[64px]">
          Why Every Meal Plan
          <br />
          You Have Tried Has <span className="text-[#f54900]">Failed You</span>
        </h2>
        <div className="mt-[4svh] max-w-[1098px] space-y-[0.9svh] text-[clamp(0.875rem,1.46svh,16px)] font-normal leading-[1.875] text-white/50">
          {/* MOBILE ONLY - single paragraph */}
          <p className="block md:hidden px-3">
            Food prices in Nigeria change weekly. Your meal plan does not. The
            ingredients it needs are not always in your market. You travel. You
            attend owambes. You visit family. The plan breaks. Meal plans teach
            you nothing. When they end, you are lost. Most are built for Western
            foods. Not for eba, egusi or jollof rice.
          </p>

          {/* DESKTOP VERSION - unchanged */}
          <div className="hidden md:block space-y-[0.9svh]">
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
      className="px-4 py-14 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="bibi-different"
      intensity={42}
    >
      <article className="relative h-[min(calc(100svh-7rem),625px)] min-h-[520px] w-full max-w-[1284px] overflow-hidden rounded-[22px] bg-black text-white max-md:min-h-[430px]">
        <Image
          alt=""
          className="absolute left-[-32%] top-[-64%] h-[230%] w-[160%] object-cover opacity-[0.18]"
          height={1256}
          src={assets.x2FrameworkPattern}
          width={2054}
        />
        <div className="relative z-10 flex h-full items-start lg:items-center px-2 sm:px-12 lg:px-[87px] justify-center lg:justify-start lg:pt-0">
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
        <div
          className="
    absolute
    bottom-[0px]
    right-[-12%]
    z-30

    h-[319px]
    w-[331px]
    overflow-hidden

    lg:bottom-0
    lg:right-0
    lg:h-[89%]
    lg:w-auto
    lg:overflow-visible
  "
        >
          <Image
            alt="Bibi standing in a fitness outfit"
            className="
      h-full
      w-full
      object-cover
      object-top

      lg:object-contain
    "
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
      className="px-4 py-14 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="health-score-payoff"
      intensity={42}
    >
      <HealthScorePayoffReveal />
    </ScrollSection>
  );
}

export function RemainingSystemSections() {
  const [introPanel, ...productPanels] = remainingSystemPanels;

  return (
    <>
      <ScrollSection
        className="px-4 py-14 sm:px-8 lg:px-12"
        contentClassName="flex items-center justify-center"
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
      className="px-4 py-14 sm:px-8 lg:px-12"
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
            top: window.innerWidth < 768 ? "32%" : `${panel.featureTop}px`,
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
      className="px-4 py-10 sm:px-8 lg:px-12"
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
      className="px-4 py-14 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id="we-hear-you"
      intensity={42}
    >
      <RemainingWeHearYouReveal />
    </ScrollSection>
  );
}
