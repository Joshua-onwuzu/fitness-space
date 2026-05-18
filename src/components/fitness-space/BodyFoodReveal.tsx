"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { assets, coachingCardPairs } from "./data";
import { WHATSAPP_LINK } from "./lib/constants";

type SectionStepEvent = CustomEvent<{
  direction: -1 | 1;
  lockMs?: number;
  sameDirectionMaxMs?: number;
  sameDirectionSilenceMs?: number;
  silenceMs?: number;
  suppressDirectionChanges?: boolean;
}>;

export type CoachingCardImage = (typeof coachingCardPairs)[number][number];

export const bodyFoodRevealTiming = {
  imageDelay: 0,
  firstHeadlineDelay: 1,
  secondHeadlineDelay: 1.85,
  ctaDelay: 2.35,
  duration: 0.65,
  lift: 18,
  hiddenScale: 0.98,
  dailyCardDelay: 0,
  dailyShrinkDelay: 0,
  dailyCardDuration: 0.26,
  dailyNextCardDuration: 0,
  dailyPairExitDuration: 0.12,
  dailyCardLift: 18,
  dailyShrinkDuration: 0.36,
  firstStepLockMs: 380,
  sameDirectionMaxMs: 1200,
  sameDirectionSilenceMs: 80,
  stepLockMs: 160,
} as const;

const revealVariants = {
  hidden: {
    opacity: 0,
    scale: bodyFoodRevealTiming.hiddenScale,
    y: bodyFoodRevealTiming.lift,
  },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay,
      duration: bodyFoodRevealTiming.duration,
    },
  }),
};

function getDailyImageScale() {
  if (typeof window === "undefined") {
    return 0.55;
  }

  const viewportHeight = window.innerHeight || 1;
  const isMedium = window.matchMedia("(min-width: 768px)").matches;
  const isSmall = window.matchMedia("(min-width: 640px)").matches;
  const bodyHeight = viewportHeight * (isSmall ? 0.78 : 0.67);
  const dailyHeight = Math.min(viewportHeight * (isMedium ? 0.43 : 0.34), 420);

  return dailyHeight / bodyHeight;
}

export function BodyFoodReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [animationCycle, setAnimationCycle] = useState(0);
  const [imageRevealCycle, setImageRevealCycle] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [dailyImageScale, setDailyImageScale] = useState(0.55);
  const stageRef = useRef(stage);
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? "visible" : "hidden";
  const pairIndex = Math.max(stage - 1, 0);
  const coachingCardDelay =
    stage === 1 ? bodyFoodRevealTiming.dailyCardDelay : 0;
  const coachingCardDuration =
    stage === 1
      ? bodyFoodRevealTiming.dailyCardDuration
      : bodyFoodRevealTiming.dailyNextCardDuration;
  const imageTargetScale = stage === 0 ? 1 : dailyImageScale;

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const updateScale = () => {
      const nextScale = getDailyImageScale();
      setDailyImageScale(nextScale);
    };
    const onResize = () => {
      updateScale();
    };

    updateScale();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
        coachingCardPairs.length,
      );

      if (nextStage === currentStage) {
        return;
      }

      event.preventDefault();
      stepEvent.detail.lockMs =
        currentStage === 0 || nextStage === 0
          ? bodyFoodRevealTiming.firstStepLockMs
          : bodyFoodRevealTiming.stepLockMs;
      stepEvent.detail.silenceMs = 0;
      stepEvent.detail.sameDirectionMaxMs =
        bodyFoodRevealTiming.sameDirectionMaxMs;
      stepEvent.detail.sameDirectionSilenceMs =
        bodyFoodRevealTiming.sameDirectionSilenceMs;
      stepEvent.detail.suppressDirectionChanges = true;
      stageRef.current = nextStage;
      setStage(nextStage);
      setAnimationCycle((cycle) => cycle + 1);
    };

    section.addEventListener("fitness-space:section-step", onSectionStep);
    return () => {
      section.removeEventListener("fitness-space:section-step", onSectionStep);
    };
  }, []);

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center max-sm:min-h-[1018px]"
      onViewportEnter={() => {
        setIsInViewport(true);
        setImageRevealCycle((cycle) => cycle + 1);
        setAnimationCycle((cycle) => cycle + 1);
      }}
      onViewportLeave={() => {
        setIsInViewport(false);
      }}
      ref={rootRef}
      viewport={{ amount: 0.72, once: false }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        id="daily-system"
      />

      <AnimatePresence>
        {isInViewport && stage === 0 ? (
          <motion.div
            className="absolute left-0 top-[18%] z-20 max-w-[360px] text-left max-sm:left-1/2 max-sm:top-[8.5%] max-sm:w-[296px] max-sm:max-w-full max-sm:-translate-x-1/2 max-sm:text-center sm:left-[2%] lg:left-[4%]"
            animate="visible"
            custom={bodyFoodRevealTiming.firstHeadlineDelay}
            exit={{ opacity: 0, y: -bodyFoodRevealTiming.lift }}
            initial={initial}
            key={`body-headline-${animationCycle}`}
            variants={revealVariants}
          >
            <BibiHeadline suffix="Knows Your Body." />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isInViewport ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            animate="visible"
            className="h-[67svh] w-auto max-sm:h-[min(582px,69svh)] sm:h-[78svh]"
            custom={bodyFoodRevealTiming.imageDelay}
            initial={initial}
            key={`bibi-image-${imageRevealCycle}`}
            variants={revealVariants}
          >
            <motion.div
              animate={{ scale: imageTargetScale }}
              className="h-full w-auto"
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      delay:
                        stage === 0 ? 0 : bodyFoodRevealTiming.dailyShrinkDelay,
                      duration: bodyFoodRevealTiming.dailyShrinkDuration,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <Image
                alt="Bibi standing in Fitness Space gear"
                className="h-full w-auto max-w-[78vw] object-contain"
                height={1536}
                priority={false}
                src={assets.bibiStanding}
                width={1024}
              />
            </motion.div>
          </motion.div>
        </div>
      ) : null}

      <AnimatePresence>
        {isInViewport && stage === 0 ? (
          <motion.div
            className="absolute bottom-[18%] right-0 z-20 max-w-[380px] text-left max-sm:bottom-[8.5%] max-sm:right-1/2 max-sm:w-[273px] max-sm:max-w-full max-sm:translate-x-1/2 max-sm:text-center sm:right-[4%] lg:right-[-2%]"
            exit={{ opacity: 0, y: bodyFoodRevealTiming.lift }}
            key={`food-headline-${animationCycle}`}
          >
            <motion.div
              animate="visible"
              custom={bodyFoodRevealTiming.secondHeadlineDelay}
              initial={initial}
              variants={revealVariants}
            >
              <BibiHeadline suffix="Knows Your Food." />
            </motion.div>
            <motion.a
              animate="visible"
              className="mt-5 inline-flex rounded-[7px] bg-white px-4 py-2 text-xs font-semibold capitalize text-black transition hover:bg-white/90 sm:text-sm"
              custom={bodyFoodRevealTiming.ctaDelay}
              href={WHATSAPP_LINK}
              initial={initial}
              variants={revealVariants}
            >
              Meet Bibi &mdash; It&apos;s Free
            </motion.a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isInViewport && stage > 0 ? (
          <motion.div
            className="relative z-20 grid w-full grid-cols-[minmax(0,1fr)_minmax(88px,20vw)_minmax(0,1fr)] items-center gap-x-1 sm:grid-cols-[minmax(0,1fr)_minmax(130px,22vw)_minmax(0,1fr)] md:gap-x-6"
            exit={{ opacity: 0, y: stage === 1 ? -18 : 18 }}
            key={`coaching-pair-${stage}-${animationCycle}`}
            transition={{
              duration: bodyFoodRevealTiming.dailyPairExitDuration,
            }}
          >
            <CoachingCardAsset
              align="left"
              card={coachingCardPairs[pairIndex][0]}
              delay={coachingCardDelay}
              duration={coachingCardDuration}
            />
            <div aria-hidden="true" />
            <CoachingCardAsset
              align="right"
              card={coachingCardPairs[pairIndex][1]}
              delay={coachingCardDelay}
              duration={coachingCardDuration}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function BibiHeadline({ suffix }: { suffix: string }) {
  return (
    <h2 className="text-4xl font-normal capitalize leading-tight text-white max-sm:text-[52px] max-sm:leading-normal sm:text-5xl lg:text-[70px]">
      <span className="text-[#fe9a00]">Bibi</span> {suffix}
    </h2>
  );
}

type CoachingCardAssetProps = {
  align?: "left" | "right";
  card: CoachingCardImage;
  className?: string;
  delay?: number;
  duration?: number;
  imageClassName?: string;
  initialY?: number;
};

export function CoachingCardAsset({
  align,
  card,
  className = "",
  delay = 0,
  duration = bodyFoodRevealTiming.dailyCardDuration,
  imageClassName,
  initialY = bodyFoodRevealTiming.dailyCardLift,
}: CoachingCardAssetProps) {
  const alignmentClass =
    align === "left"
      ? "justify-self-end"
      : align === "right"
        ? "justify-self-start"
        : "";

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`${alignmentClass} ${className}`.trim()}
      exit={{ opacity: 0, y: align === "left" ? -18 : 18 }}
      initial={{
        opacity: 0,
        y: initialY,
      }}
      transition={{
        delay,
        duration,
      }}
    >
      <Image
        alt={`${card.title} coaching card`}
        className={
          imageClassName ??
          "h-auto w-[43vw] max-w-[200px] drop-shadow-[0_28px_70px_rgba(0,0,0,0.38)] sm:max-w-[280px] md:w-[31vw] md:max-w-[390px]"
        }
        height={card.height}
        priority={false}
        src={card.src}
        width={card.width}
      />
    </motion.div>
  );
}
