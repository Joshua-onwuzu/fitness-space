"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

type ScrollSectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
  intensity?: number;
  nativeScroll?: boolean;
};

export function ScrollSection({
  children,
  className = "",
  contentClassName = "",
  id,
  intensity = 64,
  nativeScroll = false,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [intensity, 0, -intensity],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.5, 1, 1, 0.5],
  );

  return (
    <section
      data-section
      data-native-scroll-section={nativeScroll ? "" : undefined}
      id={id}
      ref={sectionRef}
      className={`relative snap-start bg-black text-white ${
        nativeScroll ? "min-h-svh overflow-visible" : "h-svh overflow-hidden"
      } ${className}`}
    >
      <motion.div
        className={`relative w-full ${
          nativeScroll ? "min-h-svh" : "h-full"
        } ${contentClassName}`}
        style={nativeScroll || prefersReducedMotion ? undefined : { y, opacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}
