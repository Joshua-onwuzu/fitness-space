"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { remainingSystemPanels } from "./data";

type RemainingSystemPanel = (typeof remainingSystemPanels)[number];

type SectionStepEvent = CustomEvent<{
  direction: -1 | 1;
  lockMs?: number;
  silenceMs?: number;
}>;

const remainingSystemRevealTiming = {
  headlineScale: 0.375,
  panelEnterDelay: 0.22,
  panelEnterDuration: 0.46,
  panelExitDuration: 0.18,
  shrinkDuration: 0.74,
  stepLockMs: 820,
} as const;

const remainingSystemEase = [0.22, 1, 0.36, 1] as const;

export function RemainingSystemReveal({
  panel,
}: {
  panel: RemainingSystemPanel;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(stage);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(rootRef, { amount: 0.72 });

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
      const nextStage = Math.min(Math.max(currentStage + direction, 0), 1);

      if (nextStage === currentStage) {
        return;
      }

      event.preventDefault();
      stepEvent.detail.lockMs = remainingSystemRevealTiming.stepLockMs;
      stepEvent.detail.silenceMs = 0;
      stageRef.current = nextStage;
      setStage(nextStage);
    };

    section.addEventListener("fitness-space:section-step", onSectionStep);
    return () => {
      section.removeEventListener("fitness-space:section-step", onSectionStep);
    };
  }, []);

  return (
    <div
      className="relative h-[min(calc(100svh-7rem),625px)] min-h-[500px] w-full max-w-[1284px] overflow-hidden bg-black text-white max-md:min-h-[430px]"
      ref={rootRef}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        id={panel.id}
      />
      <motion.h2
        animate={{
          left: stage === 0 ? "50%" : "9.6%",
          opacity: isInView ? 1 : 0,
          scale:
            stage === 0 ? 1 : remainingSystemRevealTiming.headlineScale,
          top: stage === 0 ? "50%" : "2.7%",
          x: stage === 0 ? "-50%" : "0%",
          y: stage === 0 ? "-50%" : "0%",
        }}
        className="absolute z-20 whitespace-nowrap text-[clamp(2.25rem,5.84svh,64px)] font-normal leading-normal text-white will-change-transform max-md:whitespace-normal"
        initial={{
          left: "50%",
          opacity: 0,
          scale: 1,
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        style={{ transformOrigin: "top left" }}
        transition={{
          duration: prefersReducedMotion
            ? 0
            : remainingSystemRevealTiming.shrinkDuration,
          ease: remainingSystemEase,
        }}
      >
        One System. Everything You Need.
      </motion.h2>

      <AnimatePresence>
        {stage > 0 ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 z-10"
            exit={{
              opacity: 0,
              transition: {
                duration: prefersReducedMotion
                  ? 0
                  : remainingSystemRevealTiming.panelExitDuration,
                ease: remainingSystemEase,
              },
              y: 18,
            }}
            initial={{ opacity: 0, y: 18 }}
            transition={{
              delay: prefersReducedMotion
                ? 0
                : remainingSystemRevealTiming.panelEnterDelay,
              duration: prefersReducedMotion
                ? 0
                : remainingSystemRevealTiming.panelEnterDuration,
              ease: remainingSystemEase,
            }}
          >
            <h2 className="absolute left-[9.6%] top-[8.2%] whitespace-nowrap text-[clamp(2.45rem,5.84svh,64px)] font-semibold leading-normal text-white max-md:whitespace-normal">
              {panel.title}
            </h2>

            <div
              className="absolute left-[9.6%] z-10 flex max-w-[520px] flex-col items-start"
              style={{
                gap: `${panel.featureGap}px`,
                top: `${panel.featureTop}px`,
              }}
            >
              {panel.features.map((feature) => (
                <div className="text-left" key={feature.title}>
                  <h3 className="text-lg font-bold leading-[30px] text-white">
                    {feature.title}
                  </h3>
                  <p className="max-w-[470px] text-sm font-normal leading-5 text-white/80">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>

            <RemainingRevealPhoneMockup phone={panel.phone} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function RemainingRevealPhoneMockup({
  phone,
}: {
  phone: RemainingSystemPanel["phone"];
}) {
  return (
    <div
      className="absolute bottom-0 right-0 hidden overflow-hidden rounded-[34px] border border-white/10 bg-black shadow-[0_28px_90px_rgba(0,0,0,0.42)] md:block"
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
        sizes="371px"
        src={phone.src}
        width={596}
      />
    </div>
  );
}
