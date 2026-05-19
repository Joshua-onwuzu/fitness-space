"use client";
import Image from "next/image";

import { assets, benefitCards } from "./data";
import { FadeInOnScroll } from "./FadeInOnScroll";
import { IntroBenefits } from "./IntroBenefits";
import { LandingHeader } from "./LandingHeader";
import { ScrollSection } from "./ScrollSection";
import { WHATSAPP_LINK } from "./lib/constants";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const rotatingTexts = [
  "Weight Loss.",
  "Healthy Habits.",
  "Insulin Resistance.",
  "Lifestyle Changes.",
];

export function HeroSection() {
  // desktop fade state
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // DESKTOP: fade rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotatingTexts.length);
        setFade(true);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollSection
      animateOnScroll={false}
      className="px-0 py-0 sm:px-6 sm:pb-6 sm:pt-[149px] lg:px-10"
      contentClassName="flex flex-col items-center justify-start sm:justify-center"
      id="hero"
      intensity={38}
      mobileNativeScroll
    >
      <FadeInOnScroll
        className="flex w-full max-w-[1284px] flex-col items-center justify-start sm:justify-center"
        initialVisible
      >
        <LandingHeader className="sm:hidden" mobileFlow />
        <article className="relative hidden min-h-[100svh] w-full overflow-hidden rounded-[22px] bg-[#f35d0c] sm:block">
          <Image
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            height={1256}
            priority
            src={assets.heroPattern}
            width={2054}
          />

          {/* CONTENT */}
          <div className="relative z-10 flex h-full max-w-full flex-col justify-center lg:justify-start lg:translate-y-4 px-7 pt-[5rem] sm:px-12 lg:pl-[83px] lg:pr-[54px] lg:pt-[8rem]">
            <h1 className="text-[40px] font-bold text-white sm:text-5xl lg:text-[48px] leading-tight">
              <span className="block">Meet Bibi.</span>
              <span className="block leading-tight">
                <span className="block">Your AI Coach for</span>

                <span className="block">
                  Sustainable{" "}
                  <span className="inline-block min-w-[260px] lg:min-w-[320px]">
                    <span
                      className={`text-black inline-block transition-all duration-300 ease-in-out ${
                        fade
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      {rotatingTexts[index]}
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            <p className="mt-4 max-w-[600px] text-xs leading-5 text-white sm:text-sm">
              Bibi personalises your meals, selects your workouts, guides your
              fasting and tracks your daily habits — all based on your body,
              your food and your goals. Real results. Starting free.
            </p>

            <a
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-[7px] bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90 max-sm:mx-auto"
              href={WHATSAPP_LINK}
            >
              <Image
                src={assets.whatsappIcon}
                alt="WhatsApp"
                className="h-8 w-8"
                height={16}
                priority
                width={16}
              />
              Meet Bibi — It&apos;s Free
            </a>

            {/* TEXT BELOW BUTTON */}
            <h2 className="mt-5 sm:mt-14 lg:mt-20 text-base font-semibold leading-[1.4] text-white sm:text-xl">
              No meal plans. No starvation. No guesswork. Just Bibi.
            </h2>
          </div>

          <Image
            alt="Bibi AI coach"
            className="pointer-events-none absolute bottom-[62px] right-0 z-10 h-[82%] w-auto object-contain"
            height={1448}
            priority
            src={assets.coach}
            width={1086}
          />
        </article>

        <article className="relative h-[798px] w-full max-w-[390px] overflow-hidden rounded-[22px] bg-[#f54900] text-white sm:hidden">
          <div className="absolute left-1/2 top-0 h-[798px] w-[1284px] -translate-x-1/2 rounded-[10px] bg-[linear-gradient(269.9205066135185deg,#f35d0c_5.875%,#f54900_93.728%)]" />
          <Image
            alt=""
            className="absolute left-[-714px] top-[-180px] h-[1000px] w-[1636px] max-w-none object-cover"
            height={1256}
            priority
            src={assets.heroPattern}
            width={2054}
          />
          <Image
            alt="Bibi AI coach"
            className="pointer-events-none absolute bottom-[-127px] right-[46px] h-[360px] w-[269px] max-w-none object-cover"
            height={1448}
            priority
            src={assets.coach}
            width={1086}
          />
          <h1 className="absolute left-1/2 top-[164px] w-[321px] -translate-x-1/2 -translate-y-1/2 text-center text-[42px] font-bold capitalize leading-[111.915%] text-white ">
            <span className="mb-0 block">Meet Bibi.</span>
            <span className="sm:hidden block text-center">
              Your AI Coach for Sustainable
            </span>

            <span className="sm:hidden flex w-full justify-center">
              <span className="min-h-[42px] flex items-center">
                <span className="whitespace-nowrap  text-[38px] text-black">
                  {rotatingTexts[index]}
                </span>
              </span>
            </span>
          </h1>
          <p className="absolute left-1/2 top-[327px] w-[90%] max-w-[313px] -translate-x-1/2 -translate-y-1/2 text-center text-[14px] font-normal leading-normal text-white">
            Bibi personalises your meals, selects your workouts, guides your
            fasting and tracks your daily habits — all based on your body, your
            food and your goals. Real results. Starting free.
          </p>
          <a
            className="absolute left-1/2 top-[calc(50%+20.25px)] flex w-[260px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-[7px] bg-white px-4 py-3 text-[14px] font-semibold text-black transition hover:bg-white/90"
            href={WHATSAPP_LINK}
          >
            <Image
              src={assets.whatsappIcon}
              alt="WhatsApp"
              className="h-8 w-8"
              height={16}
              priority
              width={16}
            />
            Meet Bibi — It&apos;s Free
          </a>
          <p className="absolute left-1/2 top-[497px] w-[239px] -translate-x-1/2 -translate-y-1/2 text-center text-[14px] font-semibold leading-normal text-white">
            No meal plans. No starvation. No guesswork. Just Bibi.
          </p>
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
        <h2 className="text-4xl font-normal leading-tight sm:leading-[1.2] text-white max-sm:w-[277px] max-sm:text-[42px] max-sm:font-medium max-sm:leading-[1.3] sm:text-5xl lg:text-[64px]">
          <span className="max-sm:block sm:inline">{firstLine}</span>

          <span className="max-sm:block sm:inline">
            {secondLine} <span className="text-[#f35d0c]">{highlight}</span>
          </span>

          {trailing ? (
            <span className="max-sm:block sm:inline">{trailing}</span>
          ) : null}
        </h2>
        {body ? (
          <>
            {/* 📱 MOBILE: stacked lines (your design) */}
            <div className="sm:hidden mx-auto mt-6 max-w-[251px] space-y-1 text-sm leading-[1.5] text-white text-center">
              {body.map((line, i) => (
                <p key={i} className="block">
                  {line}
                </p>
              ))}
            </div>

            {/* 💻 DESKTOP: normal paragraph */}
            <div className="hidden sm:block mx-auto mt-6 max-w-[500px] text-sm leading-6 text-white">
              {body.filter((line) => line !== "").join(" ")}
            </div>
          </>
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
          {/* Laptop/Desktop */}
          <span className="hidden sm:block">
            A science-backed daily system for sustainable weight loss. Built
            around your food, your life and your body.
            <br />
            At the centre of everything is Bibi, our AI coach who personalises
            every part of your journey. From the meal on your plate
            <br />
            to the workout in your living room to the steps you take every day.
          </span>

          {/* Mobile */}
          <span className="block sm:hidden">
            A science-backed daily system for sustainable weight loss. Built
            around your food, your life and your body. At the centre of
            everything is Bibi, our AI coach who personalises every part of your
            journey. From the meal on your plate to the workout in your living
            room to the steps you take every day.
          </span>
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
      <p className="absolute left-1/2 top-[277px] w-[305px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(100deg,#ffffff_4%,#999999_100%)] bg-clip-text text-xs  leading-7 text-transparent">
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

      <motion.div
        className="absolute left-1/2 top-[996px] flex w-[312px] -translate-x-1/2 flex-col gap-[17px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.28,
            },
          },
        }}
      >
        {benefitCards.map((label) => (
          <motion.div
            className="flex h-[74px] items-center gap-3 overflow-hidden rounded-lg bg-white px-[17px] text-left text-sm capitalize leading-normal text-black"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.97 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.7,
                  ease: "easeOut",
                },
              },
            }}
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
