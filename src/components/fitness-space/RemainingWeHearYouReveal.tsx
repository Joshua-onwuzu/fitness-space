"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import { assets, remainingWeHearYouCards } from "./data";
import {
  type X2CardMotionContext,
  useX2NutritionOrderReveal,
  x2CardVariants,
  x2RevealTiming,
} from "./X2NutritionReveal";

type RemainingWeHearYouCard = (typeof remainingWeHearYouCards)[number];

export function RemainingWeHearYouReveal() {
  const { cardMotionContext, prefersReducedMotion, rootRef, stage } =
    useX2NutritionOrderReveal(remainingWeHearYouCards.length);
  const currentCard = stage > 0 ? remainingWeHearYouCards[stage - 1] : null;

  return (
    <div
      className="relative flex h-[min(calc(100svh-7rem),625px)] min-h-[500px] w-full max-w-[1284px] items-center justify-center overflow-visible max-md:min-h-[430px]"
      ref={rootRef}
    >
      <motion.article
        animate={{
          opacity: stage === 0 ? 1 : 0.22,
          scale: stage === 0 ? 1 : 0.965,
        }}
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f54900] text-white"
        transition={{
          duration: prefersReducedMotion
            ? 0
            : x2RevealTiming.frameworkFadeDuration,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(270deg,#f35d0c_6%,#f54900_94%)]" />
        <h2 className="relative z-10 text-center text-[40px] font-normal leading-normal text-white sm:text-[clamp(2.4rem,5.84svh,64px)]">
          We Hear You
        </h2>
      </motion.article>

      <AnimatePresence custom={cardMotionContext} mode="wait">
        {currentCard ? (
          <RemainingWeHearYouStackCard
            card={currentCard}
            key={`${stage}-${currentCard.id}`}
            motionContext={cardMotionContext}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function RemainingWeHearYouStackCard({
  card,
  motionContext,
}: {
  card: RemainingWeHearYouCard;
  motionContext: X2CardMotionContext;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 h-[min(67.68svh,423px)] min-h-[330px] w-[88%] max-w-[870px] -translate-x-1/2 -translate-y-1/2 max-sm:min-h-[360px] max-sm:w-[92%]">
      <motion.div
        animate="visible"
        className="h-full w-full"
        custom={motionContext}
        exit="exit"
        initial="initial"
        variants={x2CardVariants}
      >
        <RemainingWeHearYouQuoteCard card={card} />
      </motion.div>
    </div>
  );
}

export function RemainingWeHearYouQuoteCard({
  card,
}: {
  card: RemainingWeHearYouCard;
}) {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#111] text-white shadow-[0_36px_110px_rgba(0,0,0,0.48)]">
      <Image
        alt=""
        className="absolute left-[calc(50%-0.85px)] top-[-316.21px] h-[1255.923px] w-[2054.306px] max-w-none -translate-x-1/2 object-cover"
        height={1256}
        src={assets.remainingWeHearYouCardPattern}
        width={2054}
      />
      <div
        className="absolute left-1/2 top-[calc(50%-13.5px)] flex w-[76%] -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center text-[32px] font-normal leading-[38px] text-white max-md:text-[28px] max-md:leading-[32px] max-sm:w-[74%] max-sm:text-[22px] max-sm:leading-[26px]"
        style={{ maxWidth: `${card.textWidth}px` }}
      >
        {card.lines.map((line) => (
          <p
            className="mb-[21px] leading-[inherit] last:mb-0"
            key={line.text}
            style={{ color: line.color }}
          >
            {line.text}
          </p>
        ))}
      </div>
      <span
        aria-hidden="true"
        className="absolute left-[44px] top-[80.5px] -translate-x-1/2 -translate-y-1/2 text-center text-[128px] font-semibold capitalize leading-none text-white/20 max-sm:left-8 max-sm:top-14 max-sm:text-[86px]"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-[80.5px] right-[44px] translate-x-1/2 translate-y-1/2 rotate-180 text-center text-[128px] font-semibold capitalize leading-none text-white/20 max-sm:bottom-14 max-sm:right-8 max-sm:text-[86px]"
      >
        “
      </span>
    </article>
  );
}
