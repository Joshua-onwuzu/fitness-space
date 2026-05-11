"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { assets, benefitCards } from "./data";

export const introRevealTiming = {
  phoneDelay: 0,
  phoneDuration: 0.65,
  benefitDelay: 1,
  benefitStagger: 1,
  benefitDuration: 0.58,
  benefitLift: 16,
  benefitHiddenScale: 0.97,
} as const;

const phoneVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: introRevealTiming.phoneDelay,
      duration: introRevealTiming.phoneDuration,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: introRevealTiming.benefitHiddenScale,
    y: introRevealTiming.benefitLift,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay:
        introRevealTiming.benefitDelay +
        index * introRevealTiming.benefitStagger,
      duration: introRevealTiming.benefitDuration,
    },
  }),
};

const mobileCards = [
  { label: benefitCards[0], className: "" },
  { label: benefitCards[1], className: "" },
  { label: benefitCards[2], className: "" },
  { label: benefitCards[3], className: "" },
] as const;

const desktopCards = [
  { label: benefitCards[0], className: "left-0 top-[24%]" },
  { label: benefitCards[1], className: "bottom-[18%] left-[4%]" },
  { label: benefitCards[2], className: "right-[2%] top-[23%]" },
  { label: benefitCards[3], className: "bottom-[25%] right-0" },
] as const;

export function IntroBenefits() {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? "visible" : "hidden";

  return (
    <>
      <motion.div
        className="relative mt-7 flex h-[51svh] min-h-[330px] w-full max-w-[1060px] items-center justify-center max-sm:hidden sm:mt-9 md:h-[55svh]"
        initial={initial}
        viewport={{ amount: 0.72, once: false }}
        whileInView="visible"
      >
        {desktopCards.map((card, index) => (
          <FeatureCard
            className={card.className}
            index={index}
            key={card.label}
          >
            {card.label}
          </FeatureCard>
        ))}
        <PhoneShowcase />
      </motion.div>

      <motion.div
        className="grid w-full max-w-xl grid-cols-1 gap-2 text-left text-xs max-sm:hidden sm:grid-cols-2 md:hidden"
        initial={initial}
        viewport={{ amount: 0.5, once: false }}
        whileInView="visible"
      >
        {mobileCards.map((card, index) => (
          <MobileFeatureCard index={index} key={card.label}>
            {card.label}
          </MobileFeatureCard>
        ))}
      </motion.div>
    </>
  );
}

type FeatureCardProps = {
  children: string;
  className?: string;
  index: number;
};

function FeatureCard({ children, className = "", index }: FeatureCardProps) {
  return (
    <motion.div
      className={`absolute z-20 hidden min-h-[74px] w-[330px] items-center gap-4 rounded-lg bg-white px-4 text-left text-sm capitalize leading-5 text-black shadow-[0_24px_80px_rgba(0,0,0,0.4)] md:flex ${className}`}
      custom={index}
      variants={cardVariants}
    >
      <Image
        alt=""
        className="h-6 w-6 shrink-0"
        height={24}
        src={assets.bullet}
        width={24}
      />
      <span>{children}</span>
    </motion.div>
  );
}

function MobileFeatureCard({ children, index }: FeatureCardProps) {
  return (
    <motion.div
      className="flex min-h-11 items-center gap-3 rounded-lg bg-white px-3 py-2 capitalize leading-4 text-black max-sm:min-h-[74px] max-sm:w-[312px] max-sm:max-w-[calc(100vw-48px)] max-sm:px-[17px] max-sm:leading-normal"
      custom={index}
      variants={cardVariants}
    >
      <Image
        alt=""
        className="h-5 w-5 shrink-0"
        height={24}
        src={assets.bullet}
        width={24}
      />
      <span>{children}</span>
    </motion.div>
  );
}

function PhoneShowcase() {
  return (
    <motion.div
      className="relative z-10 aspect-[547/820] w-[190px] max-sm:w-[min(397px,calc(100vw+8px))] sm:w-[230px] lg:w-[300px] xl:w-[340px]"
      variants={phoneVariants}
    >
      <div className="pointer-events-none absolute left-1/2 top-[15%] h-[56%] w-[42%] -translate-x-1/2 rounded-[28px] shadow-[2px_2px_55px_14px_rgba(242,164,18,0.72)]" />
      <Image
        alt="Fitness Space app shown on a phone held in hand"
        className="relative z-10 h-full w-full object-contain"
        height={820}
        src={assets.phoneComposite}
        width={547}
      />
    </motion.div>
  );
}
