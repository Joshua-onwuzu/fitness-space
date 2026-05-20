"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { updateAgreementState } from "./lib/agreement-store";

import Link from "next/link";
import { assets, finalTestimonials, finalTrialFacts } from "./data";
import { ScrollSection } from "./ScrollSection";
import { WHATSAPP_LINK } from "./lib/constants";

type SectionStepEvent = CustomEvent<{
  direction: -1 | 1;
  lockMs?: number;
  sameDirectionMaxMs?: number;
  sameDirectionSilenceMs?: number;
  silenceMs?: number;
}>;

const mobileRealResultsTiming = {
  cardDuration: 0.48,
  sameDirectionMaxMs: 1800,
  sameDirectionSilenceMs: 1800,
  stepLockMs: 620,
} as const;

function FinalFrame({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <ScrollSection
      className="px-4 py-14 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center"
      id={id}
      intensity={42}
    >
      <article
        className={`relative h-[min(calc(100svh-5rem),680px)] min-h-[500px] w-full max-w-[1284px] overflow-hidden bg-black text-white max-md:min-h-[430px] ${className}`}
      >
        {children}
      </article>
    </ScrollSection>
  );
}

function TrialFactPill({
  bottom,
  fact,
}: {
  bottom: number;
  fact: (typeof finalTrialFacts)[number];
}) {
  return (
    <div
      className="absolute left-1/2 flex h-[52px] max-w-[90%] -translate-x-1/2 items-center justify-center rounded-[8px] bg-white/10 px-6 text-center text-[14px] font-normal leading-normal text-white max-sm:h-auto max-sm:min-h-[48px] max-sm:px-4 max-sm:text-xs border border-white/10"
      style={{ bottom: `${bottom}px`, width: `${fact.width}px` }}
    >
      {fact.text}
    </div>
  );
}

function FinalButton({
  className = "",
  variant = "orange",
  onClick,
  disabled = false,
}: {
  className?: string;
  variant?: "orange" | "white";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
}) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-[7px] px-[11.25px] py-[8.25px] text-center text-[14px] font-semibold capitalize leading-normal transition ${
        variant === "orange"
          ? "bg-[#f54900] text-white hover:bg-[#ff6420]"
          : "bg-white text-black hover:bg-white/90"
      } ${className} ${disabled ? "pointer-events-none opacity-50" : ""}`}
      href={disabled ? undefined : WHATSAPP_LINK}
      onClick={onClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      &nbsp;&nbsp;Meet Bibi — It&apos;s Free&nbsp;
    </a>
  );
}

export function FinalRemainingSections() {
  return (
    <>
      <StartFreeTrialSection />
      <RealResultsSection />
      <FourteenDayPayoffSection />
      <FinalFooterCtaSection />
    </>
  );
}

function StartFreeTrialSection() {
  const bottoms = [317, 241, 165, 89];

  return (
    <FinalFrame id="start-free-trial">
      <h2 className="absolute left-1/2 top-[50px] lg:top-[106px] w-full -translate-x-1/2 text-center text-[42px] font-semibold lg:font-normal capitalize leading-tight text-white md:top-[70px] md:text-[64px] md:leading-normal">
        Start Free for 14 Days
      </h2>
      <p className="absolute left-1/2 top-[175px] lg:top-[190px] w-[min(82.9%,1064px)] -translate-x-1/2 text-center text-[16px] font-normal capitalize leading-normal text-white md:top-[160px] md:text-[16px]">
        Meet Bibi. Explore the full system. Start seeing results. Completely
        free for 14 days. No payment required.
      </p>
      <div className="hidden md:block">
        {finalTrialFacts.map((fact, index) => (
          <TrialFactPill
            bottom={bottoms[index] ?? 165}
            fact={fact}
            key={fact.text}
          />
        ))}
      </div>
      <div className="absolute bottom-[40px] left-1/2 flex w-full max-w-[430px] -translate-x-1/2 flex-col items-center gap-4 px-5 md:hidden ">
        {finalTrialFacts.map((fact) => (
          <div
            className="flex min-h-[48px] w-full items-center justify-center bg-white/10 px-4 text-center text-xs font-normal capitalize leading-normal text-white border border-white/10 rounded-[8px]"
            key={fact.text}
          >
            {fact.text}
          </div>
        ))}
      </div>
    </FinalFrame>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof finalTestimonials)[number];
}) {
  return (
    <div
      className="absolute hidden items-center justify-center md:flex"
      style={{
        height: `${testimonial.wrapper.height}px`,
        left: `${testimonial.wrapper.left}px`,
        top: `${testimonial.wrapper.top}px`,
        width: `${testimonial.wrapper.width}px`,
      }}
    >
      <article
        className="relative h-[375.668px] w-[312.204px] overflow-hidden rounded-[20px] bg-white text-black"
        style={{ transform: `rotate(${testimonial.rotation}deg)` }}
      >
        <div className="absolute left-[40.65px] top-[100px] w-[239.008px] whitespace-pre-wrap text-left text-black">
          <p className="mb-9 text-[24px] font-normal leading-normal">
            {testimonial.quote}
          </p>
          <p className="text-[16px] font-bold capitalize leading-normal">
            {testimonial.name}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="absolute left-[41px] top-[72.58px] -translate-x-1/2 -translate-y-1/2 rotate-[1.31deg] text-center text-[128px] font-semibold capitalize leading-none text-black/20"
        >
          “
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-[76.42px] right-[41px] translate-x-1/2 translate-y-1/2 rotate-180 text-center text-[128px] font-semibold capitalize leading-none text-black/20"
        >
          “
        </span>
      </article>
    </div>
  );
}

function MobileRealResultTestimonialCard({
  isActive,
  isPrevious,
  prefersReducedMotion,
  testimonial,
}: {
  isActive: boolean;
  isPrevious: boolean;
  prefersReducedMotion: boolean | null;
  testimonial: (typeof finalTestimonials)[number];
}) {
  const wrapper = isPrevious
    ? {
        height: 399.438,
        left: "calc(50% - 162.5465px)",
        top: 501.38,
        width: 341.253,
      }
    : {
        height: 415.233,
        left: "calc(50% - 171.496px)",
        top: 496,
        width: 367.072,
      };
  const card = isPrevious
    ? { rotation: 4.59, width: 312.204 }
    : { rotation: -7.73, width: 319.427 };

  return (
    <motion.div
      animate={{
        opacity: isActive || isPrevious ? 1 : 0,
        rotate: isPrevious ? -3 : 0,
        scale: isPrevious ? 0.955 : 1,
        y: isPrevious ? 18 : 0,
      }}
      className="absolute flex items-center justify-center"
      data-mobile-real-results-card={testimonial.id}
      initial={false}
      style={{
        height: `${wrapper.height}px`,
        left: wrapper.left,
        top: `${wrapper.top}px`,
        width: `${wrapper.width}px`,
        zIndex: isActive ? 20 : isPrevious ? 10 : 0,
      }}
      transition={{
        duration: prefersReducedMotion
          ? 0
          : mobileRealResultsTiming.cardDuration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <article
        className="relative h-[375.668px] overflow-hidden rounded-[20px] bg-white text-left text-black"
        style={{
          transform: `rotate(${card.rotation}deg)`,
          width: `${card.width}px`,
        }}
      >
        <div className="absolute left-[40.65px] top-[100px] w-[239.008px] whitespace-pre-wrap text-left text-black">
          <p className="mb-8 text-[24px] font-normal leading-normal">
            {testimonial.quote}
          </p>
          <p className="text-[16px] font-bold leading-normal">
            {testimonial.name}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="absolute left-[30.58px] top-[72.58px] -translate-x-1/2 -translate-y-1/2 rotate-[1.31deg] text-center text-[128px] font-semibold capitalize leading-none text-black/20"
        >
          “
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-[76.42px] right-[22px] translate-x-1/2 translate-y-1/2 rotate-180 text-center text-[128px] font-semibold capitalize leading-none text-black/20"
        >
          “
        </span>
      </article>
    </motion.div>
  );
}

function MobileRealResultsReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const testimonials = [finalTestimonials[1], finalTestimonials[0]];
  const [stage, setStage] = useState(0);
  const [previousStage, setPreviousStage] = useState<number | null>(
    testimonials.length > 1 ? testimonials.length - 1 : null,
  );
  const inputLockedRef = useRef(false);
  const stageRef = useRef(stage);
  const touchStartYRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const stepByDirection = useCallback(
    (direction: -1 | 1) => {
      const currentStage = stageRef.current;
      const nextStage = Math.min(
        Math.max(currentStage + direction, 0),
        testimonials.length - 1,
      );

      if (nextStage === currentStage) {
        return false;
      }

      stageRef.current = nextStage;
      setPreviousStage(currentStage);
      setStage(nextStage);
      return true;
    },
    [testimonials.length],
  );

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const section = rootRef.current?.closest<HTMLElement>("[data-section]");
    if (!section) {
      return;
    }

    const onSectionStep = (event: Event) => {
      if (!window.matchMedia("(max-width: 767px)").matches) {
        return;
      }

      const stepEvent = event as SectionStepEvent;
      const direction = stepEvent.detail.direction;
      if (!stepByDirection(direction)) {
        return;
      }

      event.preventDefault();
      stepEvent.detail.lockMs = mobileRealResultsTiming.stepLockMs;
      stepEvent.detail.sameDirectionMaxMs =
        mobileRealResultsTiming.sameDirectionMaxMs;
      stepEvent.detail.sameDirectionSilenceMs =
        mobileRealResultsTiming.sameDirectionSilenceMs;
      stepEvent.detail.silenceMs = 0;
    };

    section.addEventListener("fitness-space:section-step", onSectionStep);
    return () => {
      section.removeEventListener("fitness-space:section-step", onSectionStep);
    };
  }, [stepByDirection]);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.closest<HTMLElement>("[data-section]");
    if (!root || !section) {
      return;
    }

    let unlockTimer: ReturnType<typeof setTimeout> | null = null;
    let suppressedDirection: -1 | 1 | null = null;
    let suppressTimer: ReturnType<typeof setTimeout> | null = null;
    let wheelDelta = 0;
    let wheelResetTimer: ReturnType<typeof setTimeout> | null = null;

    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

    const canStep = (direction: -1 | 1) => {
      const currentStage = stageRef.current;
      const nextStage = Math.min(
        Math.max(currentStage + direction, 0),
        testimonials.length - 1,
      );

      return nextStage !== currentStage;
    };

    const isAtCardStepBoundary = () => {
      if (section.hasAttribute("data-internal-scroll-section")) {
        const maxScrollTop = section.scrollHeight - section.clientHeight;
        return section.scrollTop >= maxScrollTop - 2;
      }

      const rect = section.getBoundingClientRect();
      return rect.bottom <= window.innerHeight + 32;
    };

    const clearSuppression = () => {
      suppressedDirection = null;

      if (suppressTimer) {
        clearTimeout(suppressTimer);
        suppressTimer = null;
      }
    };

    const isDirectionSuppressed = (direction: -1 | 1) => {
      if (suppressedDirection === null) {
        return false;
      }

      if (suppressedDirection !== direction) {
        clearSuppression();
        return false;
      }

      return true;
    };

    const suppressSameDirection = (direction: -1 | 1) => {
      clearSuppression();
      suppressedDirection = direction;
      suppressTimer = setTimeout(() => {
        suppressedDirection = null;
        suppressTimer = null;
      }, mobileRealResultsTiming.sameDirectionSilenceMs);
    };

    const lockInput = (direction: -1 | 1) => {
      inputLockedRef.current = true;
      suppressSameDirection(direction);

      if (unlockTimer) {
        clearTimeout(unlockTimer);
      }

      unlockTimer = setTimeout(
        () => {
          inputLockedRef.current = false;
        },
        prefersReducedMotion ? 0 : mobileRealResultsTiming.stepLockMs,
      );
    };

    const resetWheelDeltaSoon = () => {
      if (wheelResetTimer) {
        clearTimeout(wheelResetTimer);
      }

      wheelResetTimer = setTimeout(() => {
        wheelDelta = 0;
      }, 180);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      if (!isMobile() || !isAtCardStepBoundary()) {
        return;
      }

      if (inputLockedRef.current || isDirectionSuppressed(direction)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (!canStep(direction)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      wheelDelta += event.deltaY;
      resetWheelDeltaSoon();

      if (Math.abs(wheelDelta) < 36) {
        return;
      }

      wheelDelta = 0;
      if (stepByDirection(direction)) {
        lockInput(direction);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY === null || currentY === undefined) {
        return;
      }

      const delta = startY - currentY;
      if (Math.abs(delta) <= 8) {
        return;
      }

      const direction = delta > 0 ? 1 : -1;
      if (!isMobile() || !isAtCardStepBoundary()) {
        return;
      }

      const directionIsSuppressed = isDirectionSuppressed(direction);
      if (
        !canStep(direction) &&
        !inputLockedRef.current &&
        !directionIsSuppressed
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;

      const endY = event.changedTouches[0]?.clientY;
      if (startY === null || endY === undefined) {
        return;
      }

      const delta = startY - endY;
      if (Math.abs(delta) < 48) {
        return;
      }

      const direction = delta > 0 ? 1 : -1;
      if (!isMobile() || !isAtCardStepBoundary()) {
        return;
      }

      if (inputLockedRef.current || isDirectionSuppressed(direction)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (!canStep(direction)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (stepByDirection(direction)) {
        lockInput(direction);
      }
    };

    root.addEventListener("wheel", onWheel, { capture: true, passive: false });
    root.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });
    root.addEventListener("touchmove", onTouchMove, {
      capture: true,
      passive: false,
    });
    root.addEventListener("touchend", onTouchEnd, {
      capture: true,
      passive: false,
    });

    return () => {
      root.removeEventListener("wheel", onWheel, { capture: true });
      root.removeEventListener("touchstart", onTouchStart, { capture: true });
      root.removeEventListener("touchmove", onTouchMove, { capture: true });
      root.removeEventListener("touchend", onTouchEnd, { capture: true });

      if (unlockTimer) {
        clearTimeout(unlockTimer);
      }

      if (suppressTimer) {
        clearTimeout(suppressTimer);
      }

      if (wheelResetTimer) {
        clearTimeout(wheelResetTimer);
      }
    };
  }, [prefersReducedMotion, stepByDirection, testimonials.length]);

  return (
    <div className="absolute inset-0 md:hidden" ref={rootRef}>
      <h2 className="absolute left-[calc(50%+3px)] top-[185px] lg:top-[162px] w-[288px] -translate-x-1/2 -translate-y-1/2 text-center text-[64px] font-extrabold capitalize leading-[1.1] lg:leading-normal text-white/15">
        Real People. Real Results.
      </h2>
      <p className="absolute left-[calc(50%+3.5px)] top-[392px] w-[243px] -translate-x-1/2 -translate-y-1/2 text-center text-[16px] font-normal leading-normal text-white">
        Our members eat jollof rice, beans, eba and their favourite Nigerian
        meals. Just smarter.
      </p>
      {testimonials.map((testimonial, index) => (
        <MobileRealResultTestimonialCard
          isActive={index === stage}
          isPrevious={index === previousStage && index !== stage}
          key={testimonial.id}
          prefersReducedMotion={prefersReducedMotion}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

function RealResultsSection() {
  return (
    <ScrollSection
      className="px-0 py-0 md:px-4 md:py-14 lg:px-12"
      contentClassName="flex items-start justify-center md:items-center"
      id="real-results"
      intensity={42}
      mobileNativeScroll
      stepAtNativeBoundary
    >
      <article className="relative h-[923px] w-full max-w-[393px] overflow-hidden bg-black text-white md:h-[min(calc(100svh-5rem),680px)] md:min-h-[500px] md:max-w-[1284px]">
        <MobileRealResultsReveal />
        <div className="hidden md:block">
          <h2 className="absolute left-1/2 top-[221px] w-[288px] -translate-x-1/2 text-center text-[64px] font-extrabold capitalize leading-normal text-white/15">
            Real People. Real Results.
          </h2>
          <p className="absolute left-1/2 top-[607px] w-[243px] -translate-x-1/2 text-center text-[16px] font-normal capitalize leading-normal text-white">
            Our members eat jollof rice, beans, eba and their favourite Nigerian
            meals. Just smarter.
          </p>
          {finalTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </article>
    </ScrollSection>
  );
}

function FourteenDayPayoffSection() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Check initial agreement state
    const checkAgreement = () => {
      // You'll need to import getAgreementState from your store
      import("./lib/agreement-store").then(({ getAgreementState }) => {
        const state = getAgreementState();
        setIsButtonEnabled(state.terms && state.privacy);
      });
    };

    checkAgreement();

    // Listen for agreement changes
    const handleAgreementChange = (event: CustomEvent) => {
      const { terms, privacy } = event.detail;
      setIsButtonEnabled(terms && privacy);
    };

    window.addEventListener('fitness-space:agreement-changed', handleAgreementChange as EventListener);
    
    return () => {
      window.removeEventListener('fitness-space:agreement-changed', handleAgreementChange as EventListener);
    };
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isButtonEnabled) {
      e.preventDefault();
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <ScrollSection
      className="px-4 py-10 sm:px-8 lg:px-12"
      contentClassName="flex items-center justify-center max-sm:!translate-y-0 max-sm:!opacity-100"
      id="fourteen-day-payoff"
      intensity={42}
    >
      <article className="relative h-[min(calc(100svh-5rem),741px)] min-h-[560px] w-full max-w-[1284px] overflow-hidden rounded-[22px] bg-black text-white max-md:min-h-[500px]">
        <Image
          alt=""
          className="absolute left-[-438.2px] top-[-316.21px] h-[1255.923px] w-[2054.306px] max-w-none object-cover"
          height={1256}
          src={assets.finalBlackPattern}
          width={2054}
        />
        <h2 className="absolute left-1/2 top-[88px] w-full -translate-x-1/2 text-center text-[25px] font-normal leading-[31px] text-white md:top-[100px] md:text-[42px] md:leading-[50px]">
          {/* Mobile text */}
          <span className="block md:hidden">
            Most users notice changes within 14 days. Not starvation.{" "}
            <span className="italic">Just consistency</span>
          </span>

          {/* Laptop/Desktop text */}
          <span className="hidden md:block">
            Most users notice changes within 14 days.
            <br />
            Not starvation. <span className="italic">Just consistency</span>
          </span>
        </h2>
        
        <FinalButton 
          className={`absolute left-1/2 top-[238px] h-[50px] w-[273px] -translate-x-1/2 md:top-[229px] transition-opacity ${
            !isButtonEnabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleButtonClick}
          disabled={!isButtonEnabled}
        />
        
        {showError && (
          <div className="absolute left-1/2 top-[300px] z-20 -translate-x-1/2 rounded-lg bg-red-500/90 px-4 py-2 text-center text-xs text-white md:top-[290px]">
            Please agree to Terms of Use and Privacy Policy to continue
          </div>
        )}
        
        <Image
          alt="Bibi fitness coach"
          className="absolute bottom-[16px] left-1/2 z-10 h-[434px] w-[325px] translate-y-1/3 -translate-x-1/2 object-cover max-md:h-[360px] max-md:w-[270px]"
          height={1448}
          src={assets.finalBibi}
          width={1086}
        />
        <div className="absolute left-1/2 top-[565px] h-[270px] w-[800px] -translate-x-1/2 bg-[linear-gradient(5.93deg,#000_67.185%,rgba(0,0,0,0)_91.265%)]" />
      </article>
    </ScrollSection>
  );
}

function FinalFooterCtaSection() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [showError, setShowError] = useState(false);

  const isButtonEnabled = agreeToTerms && agreeToPrivacy;

  const handleCheckboxChange = (type: 'terms' | 'privacy', checked: boolean) => {
  if (type === 'terms') {
    setAgreeToTerms(checked);
  } else {
    setAgreeToPrivacy(checked);
  }
  setShowError(false);
  
  // Update global state
  const newTerms = type === 'terms' ? checked : agreeToTerms;
  const newPrivacy = type === 'privacy' ? checked : agreeToPrivacy;
  updateAgreementState(newTerms, newPrivacy);
};

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isButtonEnabled) {
      e.preventDefault();
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <ScrollSection
      className="px-0 py-10 sm:px-8 lg:px-12"
      contentClassName="flex items-start justify-center"
      id="final-cta"
      intensity={42}
      nativeScroll
    >
      <article className="relative w-full max-w-[1284px] overflow-visible bg-black text-white">
        <div className="absolute left-1/2 top-0 h-[625px] w-[min(100%,1185px)] -translate-x-1/2 overflow-hidden rounded-[22px] bg-[#f25602]">
          <div className="absolute left-1/2 top-0 h-[625px] w-[1284px] -translate-x-1/2 rounded-[10px] bg-[#f25602]" />
          <Image
            alt=""
            className="absolute left-[-438.2px] top-[-316.21px] h-[1255.923px] w-[2054.306px] max-w-none object-cover"
            height={1256}
            src={assets.finalOrangePattern}
            width={2054}
          />
          <h2 className="absolute left-1/2 top-[97px] w-full max-w-[840px] -translate-x-1/2 text-center text-[32px] font-bold capitalize leading-[99.915%] text-white md:text-[48px]">
            <span className="block">Your body has been waiting for</span>
            <span className="block">a system built for it.</span>
          </h2>

          {/* Checkboxes Section - Desktop */}
          <div className="absolute left-1/2 top-[200px] hidden -translate-x-1/2 flex-col gap-3 md:flex">
            {/* Terms of Use Checkbox */}
            <label className="flex cursor-pointer items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => handleCheckboxChange('terms', e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-white bg-transparent checked:bg-orange-500"
              />
              <span className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="underline hover:text-orange-300">
                  Terms of Use
                </Link>
              </span>
            </label>

            {/* Privacy Policy Checkbox */}
            <label className="flex cursor-pointer items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={agreeToPrivacy}
                onChange={(e) => handleCheckboxChange('privacy', e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-white bg-transparent checked:bg-orange-500"
              />
              <span className="text-sm">
                I agree to the{" "}
                <Link href="/privacy" className="underline hover:text-orange-300">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Error Message */}
            {showError && (
              <p className="text-xs text-red-300">
                Please agree to both the Terms of Use and Privacy Policy to continue.
              </p>
            )}
          </div>

          <FinalButton
            className={`absolute left-1/2 top-[280px] -translate-x-1/2 transition-opacity ${
              !isButtonEnabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            variant="white"
            onClick={handleButtonClick}
            disabled={!isButtonEnabled}
          />

          <Image
            alt="Fitness Space logo"
            className="absolute bottom-[31.8px] left-10 h-[23.197px] w-[200px] object-contain max-md:left-5 max-md:w-[150px]"
            height={201}
            src={assets.finalFooterLogo}
            width={1733}
          />
          <p className="hidden md:block absolute bottom-[35px] right-[48px] text-center text-[14px] font-bold capitalize leading-[99.915%] text-white max-md:right-5 max-md:text-[10px]">
            © 2026 All rights reserved. ·&nbsp;
            <span>Privacy</span>
            &nbsp;·&nbsp;
            <span>Terms</span>
          </p>
        </div>

        <Image
          alt="Bibi fitness coach"
          className="absolute left-1/2 top-[416px] z-10 h-[438px] w-[329px] -translate-x-1/2 object-cover max-md:top-[370px] max-md:h-[360px] max-md:w-[270px]"
          height={1448}
          src={assets.finalBibi}
          width={1086}
        />
        
        {/* DESKTOP BIBI TEXT */}
        <p className="hidden md:block absolute left-1/2 top-[650px] -translate-x-[45%] whitespace-nowrap text-center text-[clamp(8rem,21.8svh,280px)] font-bold capitalize leading-[99.915%] text-white/10">
          Bibi. Bibi. Bibi.
        </p>

        {/* MOBILE ONLY */}
        <div className="md:hidden absolute bottom-6 left-1/2 z-20 flex w-full -translate-x-1/2 flex-col items-center px-4 text-center">
          {/* MOBILE BIBI TEXT */}
          <p className="whitespace-nowrap text-[clamp(120px,28vw,220px)] font-bold leading-[0.82] text-white/10">
            Bibi.
          </p>

          {/* MOBILE CHECKBOXES */}
          <div className="mt-4 flex flex-col items-start gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => handleCheckboxChange('terms', e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-white bg-transparent checked:bg-orange-500"
              />
              <span className="text-xs">
                I agree to the{" "}
                <Link href="/terms" className="underline hover:text-orange-300">
                  Terms of Use
                </Link>
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={agreeToPrivacy}
                onChange={(e) => handleCheckboxChange('privacy', e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-white bg-transparent checked:bg-orange-500"
              />
              <span className="text-xs">
                I agree to the{" "}
                <Link href="/privacy" className="underline hover:text-orange-300">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {showError && (
              <p className="text-xs text-red-300">
                Please agree to both policies to continue.
              </p>
            )}
          </div>

          {/* MOBILE FOOTER */}
          <div className="mt-4 flex flex-col items-center gap-3">
            <Image
              alt="Fitness Space logo"
              className="h-[24px] w-[150px] object-contain"
              src={assets.finalFooterLogo}
              height={201}
              width={1733}
            />

            <p className="text-[11px] font-medium leading-relaxed text-white/80">
              © 2026 All rights reserved. · <span>Privacy</span> ·{" "}
              <span>Terms</span>
            </p>
          </div>
        </div>
      </article>
    </ScrollSection>
  );
}