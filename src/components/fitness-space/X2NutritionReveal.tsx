"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { assets, healthScorePayoffCards, x2NutritionCards } from "./data";

type SectionStepEvent = CustomEvent<{
  direction: -1 | 1;
  lockMs?: number;
  sameDirectionMaxMs?: number;
  sameDirectionSilenceMs?: number;
  silenceMs?: number;
}>;

type X2NutritionCard = {
  description: string;
  image: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  text: string;
};
export type X2TransitionDirection = -1 | 1;
export type X2CardMotionContext = {
  direction: X2TransitionDirection;
  prefersReducedMotion: boolean | null;
};

export const x2RevealTiming = {
  cardEnterDuration: 0.52,
  cardExitDuration: 0.18,
  cardReverseEnterDuration: 0.26,
  cardReverseExitDuration: 0.34,
  frameworkFadeDuration: 0.48,
  sameDirectionMaxMs: 1280,
  sameDirectionSilenceMs: 260,
  stepLockMs: 640,
  slideDistance: 210,
} as const;
export const x2CardEase = [0.22, 1, 0.36, 1] as const;

export const x2CardVariants = {
  initial: ({ direction, prefersReducedMotion }: X2CardMotionContext) => ({
    opacity: prefersReducedMotion ? 1 : 0,
    scale: prefersReducedMotion || direction === -1 ? 1 : 0.96,
    y:
      prefersReducedMotion || direction === -1
        ? 0
        : x2RevealTiming.slideDistance,
  }),
  visible: ({ direction, prefersReducedMotion }: X2CardMotionContext) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion
        ? 0
        : direction === -1
          ? x2RevealTiming.cardReverseEnterDuration
          : x2RevealTiming.cardEnterDuration,
      ease: x2CardEase,
    },
  }),
  exit: ({ direction, prefersReducedMotion }: X2CardMotionContext) => ({
    opacity: 0,
    scale: 1,
    y: prefersReducedMotion ? 0 : x2RevealTiming.slideDistance,
    transition: {
      duration: prefersReducedMotion
        ? 0
        : direction === -1
          ? x2RevealTiming.cardReverseExitDuration
          : x2RevealTiming.cardExitDuration,
      ease: x2CardEase,
    },
  }),
};

export function useX2NutritionOrderReveal(cardCount: number) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [transitionDirection, setTransitionDirection] =
    useState<X2TransitionDirection>(1);
  const stageRef = useRef(stage);
  const prefersReducedMotion = useReducedMotion();
  const cardMotionContext = {
    direction: transitionDirection,
    prefersReducedMotion,
  };

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const section = rootRef.current?.closest<HTMLElement>("[data-section]");
    if (!section) {
      return;
    }

    const onSectionStep = (event: Event) => {
      const direction = (event as SectionStepEvent).detail.direction;
      const currentStage = stageRef.current;
      const nextStage = Math.min(
        Math.max(currentStage + direction, 0),
        cardCount,
      );

      if (nextStage === currentStage) {
        return;
      }

      event.preventDefault();
      (event as SectionStepEvent).detail.lockMs = x2RevealTiming.stepLockMs;
      (event as SectionStepEvent).detail.silenceMs = 0;
      (event as SectionStepEvent).detail.sameDirectionMaxMs =
        x2RevealTiming.sameDirectionMaxMs;
      (event as SectionStepEvent).detail.sameDirectionSilenceMs =
        x2RevealTiming.sameDirectionSilenceMs;
      setTransitionDirection(direction);
      stageRef.current = nextStage;
      setStage(nextStage);
    };

    section.addEventListener("fitness-space:section-step", onSectionStep);
    return () => {
      section.removeEventListener("fitness-space:section-step", onSectionStep);
    };
  }, [cardCount]);

  return {
    cardMotionContext,
    prefersReducedMotion,
    rootRef,
    stage,
  };
}

export function X2NutritionReveal() {
  const { cardMotionContext, prefersReducedMotion, rootRef, stage } =
    useX2NutritionOrderReveal(x2NutritionCards.length);
  const currentCard = stage > 0 ? x2NutritionCards[stage - 1] : null;

  return (
    <div
      className="relative flex h-[57svh] min-h-[420px] w-full max-w-[1284px] items-center justify-center overflow-visible"
      ref={rootRef}
    >
      <span aria-hidden="true" className="sr-only" id="x2-system" />
      <article className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] bg-[#f54900]">
        <div className="absolute inset-0 bg-[linear-gradient(270deg,#f35d0c_6%,#f54900_94%)]" />
        <Image
          alt=""
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70"
          height={1256}
          src={assets.x2FrameworkPattern}
          width={2054}
        />
        <motion.div
          animate={{
            opacity: stage === 0 ? 1 : 0.18,
            scale: stage === 0 ? 1 : 0.965,
          }}
          className="relative z-10 flex h-full w-full flex-col items-center px-6 pt-[10%] text-center sm:px-12"
          transition={{
            duration: prefersReducedMotion
              ? 0
              : x2RevealTiming.frameworkFadeDuration,
          }}
        >
          <p className="rounded-full border border-white px-8 py-[0.6rem] text-xs font-normal uppercase leading-none text-white sm:text-base">
            THE X2 NUTRITION SYSTEM
          </p>
          <h2 className="mt-[7%] max-w-[1007px] text-[clamp(2.6rem,8.2svh,90px)] font-medium capitalize leading-[1.08] text-white">
            The Framework Behind Every Bibi Meal
          </h2>
        </motion.div>
      </article>

      <AnimatePresence custom={cardMotionContext} mode="wait">
        {currentCard ? (
          <X2NutritionOrderCard
            card={currentCard}
            key={`${stage}-${currentCard.text}`}
            motionContext={cardMotionContext}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function HealthScorePayoffReveal() {
  const { cardMotionContext, prefersReducedMotion, rootRef, stage } =
    useX2NutritionOrderReveal(healthScorePayoffCards.length);
  const currentCard = stage > 0 ? healthScorePayoffCards[stage - 1] : null;

  return (
    <div
      className="relative flex h-[min(calc(100svh-7rem),625px)] min-h-[520px] w-full max-w-[1284px] items-center justify-center overflow-visible max-md:min-h-[420px]"
      ref={rootRef}
    >
      <span
        aria-hidden="true"
        className="sr-only"
        id="health-score-payoff-system"
      />
      <article className="relative h-full w-full overflow-hidden rounded-[22px] bg-black text-white">
        <motion.div
          animate={{
            opacity: stage === 0 ? 1 : 0.18,
            scale: stage === 0 ? 1 : 0.965,
          }}
          className="relative z-10 h-full w-full text-center"
          transition={{
            duration: prefersReducedMotion
              ? 0
              : x2RevealTiming.frameworkFadeDuration,
          }}
        >
          <p className="absolute left-1/2 top-[10.56%] inline-flex h-[37.5px] min-w-[147px] -translate-x-1/2 items-center justify-center rounded-full border border-white px-[32.25px] text-xs font-normal uppercase leading-none text-white sm:text-base">
            HEALTH SCORE
          </p>
          <h2 className="absolute left-1/2 top-[43.68%] w-[min(90%,1120px)] -translate-x-1/2 -translate-y-1/2 text-[43px] font-medium leading-normal text-white md:text-[90px]">
            <span className="block">The More You Show Up,</span>
            <span className="block">The Less You Pay.</span>
          </h2>
        </motion.div>
      </article>

      <AnimatePresence custom={cardMotionContext} mode="wait">
        {currentCard ? (
          <X2NutritionOrderCard
            card={currentCard}
            key={`${stage}-${currentCard.text}`}
            motionContext={cardMotionContext}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function X2NutritionOrderCard({
  card,
  motionContext,
}: {
  card: X2NutritionCard;
  motionContext: X2CardMotionContext;
}) {
  return (
    <div className="absolute left-1/2 top-[63%] z-20 h-[min(52svh,530px)] min-h-[390px] w-[88%] max-w-[1080px] -translate-x-1/2 -translate-y-1/2 sm:w-[84%]">
      <motion.article
        animate="visible"
        className="relative h-full w-full overflow-hidden rounded-t-[20px] bg-black shadow-[0_36px_110px_rgba(0,0,0,0.48)]"
        custom={motionContext}
        exit="exit"
        initial="initial"
        variants={x2CardVariants}
      >
        <Image
          alt=""
          className="absolute -left-[48%] -top-[42%] h-[202%] w-[162%] object-cover opacity-[0.07]"
          height={1071}
          src={assets.x2SystemPattern}
          width={1752}
        />
        <div className="relative z-10 flex h-full flex-col justify-center gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-start sm:gap-7 sm:px-[9.8%] sm:py-0">
          <div className="max-w-[370px] text-left">
            <h2 className="text-xl font-semibold capitalize leading-[1.25] text-white sm:text-2xl">
              {card.text}
            </h2>
            <p className="mt-3 text-sm font-normal leading-[1.72] text-white sm:mt-4 sm:text-base sm:leading-[1.875]">
              {card.description}
            </p>
            <a
              className="mt-5 inline-flex rounded-[7px] bg-white px-[11px] py-2 text-xs font-semibold capitalize text-black transition hover:bg-white/90 sm:mt-7 sm:text-sm"
              href="#hero"
            >
              &nbsp;&nbsp;Meet Bibi &mdash; It&apos;s Free&nbsp;
            </a>
          </div>
          <div className="mx-auto w-full max-w-[220px] sm:hidden">
            <NutritionScoreCardAsset image={card.image} />
          </div>
        </div>
        <div className="absolute bottom-0 right-[-3%] top-0 hidden w-[41.5%] overflow-hidden bg-[#f54900] sm:block">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f54900_0%,#f54900_48%,#f35d0c_100%)]" />
          <div className="absolute left-1/2 top-[48%] w-[72%] max-w-[330px] -translate-x-1/2 -translate-y-1/2">
            <NutritionScoreCardAsset image={card.image} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function NutritionScoreCardAsset({
  image,
}: {
  image: X2NutritionCard["image"];
}) {
  return (
    <Image
      alt={image.alt}
      className="h-auto w-full"
      height={image.height}
      src={image.src}
      width={image.width}
    />
  );
}
