"use client";
import Image from "next/image";

import { assets, benefitCards } from "./data";
import { FadeInOnScroll } from "./FadeInOnScroll";
import { IntroBenefits } from "./IntroBenefits";
import { ScrollSection } from "./ScrollSection";
import { WHATSAPP_LINK } from "./lib/constants";

import { useEffect, useState } from "react";

const rotatingTexts = [
  "Weight Loss.",
  "Healthy Habits.",
  "Insulin Resistance.",
  "Lifestyle Change.",
];

export function HeroSection() {
  // desktop fade state
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // mobile typewriter state
  const [mobileText, setMobileText] = useState("");
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // MOBILE: typewriter (left → right)
  useEffect(() => {
    const current = rotatingTexts[mobileIndex];
    const speed = isDeleting ? 45 : 85;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.substring(0, mobileText.length + 1);
        setMobileText(next);

        if (next === current) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        const next = current.substring(0, mobileText.length - 1);
        setMobileText(next);

        if (next === "") {
          setIsDeleting(false);
          setMobileIndex((prev) => (prev + 1) % rotatingTexts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [mobileText, isDeleting, mobileIndex]);

  return (
    <ScrollSection
      animateOnScroll={false}
      className="px-3 pb-6 pt-[71px] sm:pt-[149px] sm:px-6 lg:px-10"
      contentClassName="flex items-center justify-center max-sm:block"
      id="hero"
      intensity={38}
    >
      <FadeInOnScroll className="w-full max-w-[1284px]" initialVisible>
        <article className="relative min-h-[115svh] sm:min-h-[100svh] w-full overflow-hidden rounded-[22px] bg-[#f35d0c]">
          <Image
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            height={1256}
            priority
            src={assets.heroPattern}
            width={2054}
          />

          <div className="relative z-10 flex h-full max-w-full flex-col justify-center px-7 pt-[5rem] max-sm:w-full max-sm:text-center max-sm:px-[1rem] max-sm:pt-[50px] sm:px-12 lg:pl-[83px] lg:pr-[54px]">
            <h1 className="text-[40px] font-bold text-white sm:text-5xl lg:text-[48px] leading-tight">
              <span className="block">Meet Bibi.</span>

              {/* DESKTOP (forced 2-line layout) */}
              <span className="hidden sm:block leading-tight">
                <span className="block">Your AI Coach for</span>

                <span className="block">
                  Sustainable{" "}
                  <span className="inline-block min-w-[260px] lg:min-w-[320px]">
                    <span
                      className={`inline-block transition-all duration-300 ease-in-out ${
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
              {/* MOBILE (typewriter left → right, black, smaller) */}
              {/* MOBILE */}
              <span className="sm:hidden block text-center">
                Your AI Coach for Sustainable
              </span>

              <span className="sm:hidden block text-center min-h-[42px]">
                <span className="inline-block whitespace-nowrap border-r-2 border-black pr-1 animate-pulse text-[38px] text-black">
                  {mobileText}
                </span>
              </span>
            </h1>

            <p className="mt-4 max-w-[600px] text-xs leading-5 text-white sm:text-sm">
              Bibi personalises your meals, selects your workouts, guides your
              fasting and tracks your daily habits — all based on your body,
              your food and your goals. Real results. Starting free.
            </p>

            <a
              className="mt-5 inline-flex w-fit rounded-[7px] bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90 max-sm:mx-auto"
              href={WHATSAPP_LINK}
            >
              Meet Bibi — It&apos;s Free
            </a>
          </div>

          <Image
            alt="Bibi AI coach"
            className="pointer-events-none absolute right-[-26px] z-10 w-auto object-contain max-sm:bottom-[-127px] max-sm:right-[46px] max-sm:h-[360px] sm:right-0 sm:h-[82%] h-[556px] bottom-[62px]"
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
        <h2 className="text-4xl font-normal capitalize leading-tight sm:leading-[1.2] text-white max-sm:w-[287px] max-sm:max-w-full max-sm:text-[42px] max-sm:font-medium max-sm:leading-normal sm:text-5xl lg:text-[64px]">
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

      <div className="absolute left-[calc(50%+0.5px)] top-[996px] flex w-[312px] -translate-x-1/2 flex-col gap-[17px]">
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
