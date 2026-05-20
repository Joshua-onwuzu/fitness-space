"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type ScrollSectionProps = {
  animateOnScroll?: boolean;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  desktopStepSection?: boolean;
  id?: string;
  intensity?: number;
  mobileNativeScroll?: boolean;
  nativeScroll?: boolean;
  stepAtNativeBoundary?: boolean;
};

export function ScrollSection({
  animateOnScroll = true,
  children,
  className = "",
  contentClassName = "",
  desktopStepSection = false,
  id,
  intensity = 64,
  mobileNativeScroll = false,
  nativeScroll = false,
  stepAtNativeBoundary = false,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isOverflowingViewport, setIsOverflowingViewport] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const usesMobileOverflowLayout =
    isMobileViewport && (isOverflowingViewport || mobileNativeScroll);
  const usesNativeScrollLayout = nativeScroll || usesMobileOverflowLayout;
  const centersShortMobileContent =
    isMobileViewport && mobileNativeScroll && !isOverflowingViewport;
  const sectionSizingClass = usesNativeScrollLayout
    ? "min-h-svh overflow-visible"
    : "h-svh overflow-hidden";
  const contentSizingClass = usesNativeScrollLayout
    ? "min-h-svh"
    : "h-full";
  const mobileNativeVisibilityClass = mobileNativeScroll
    ? "max-sm:!translate-y-0 max-sm:!opacity-100"
    : "";
  const shortMobileContentCenterClass = centersShortMobileContent
    ? "max-sm:!items-center max-sm:!justify-center"
    : "";
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

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const measureOverflow = () => {
      const sectionStyles = window.getComputedStyle(section);
      const paddingY =
        Number.parseFloat(sectionStyles.paddingTop) +
        Number.parseFloat(sectionStyles.paddingBottom);
      const availableHeight = Math.max(window.innerHeight - paddingY, 0);
      const contentRect = content.getBoundingClientRect();
      const childBounds = Array.from(content.children).reduce(
        (bounds, child) => {
          const rect = child.getBoundingClientRect();
          return {
            bottom: Math.max(bounds.bottom, rect.bottom - contentRect.top),
            top: Math.min(bounds.top, rect.top - contentRect.top),
          };
        },
        { bottom: content.scrollHeight, top: 0 },
      );
      const visualContentHeight =
        childBounds.bottom - Math.min(childBounds.top, 0);

      const nextIsMobileViewport = mobileQuery.matches;
      const nextIsOverflowingViewport =
        Math.max(content.scrollHeight, visualContentHeight) >
        availableHeight + 2;

      setIsMobileViewport(nextIsMobileViewport);
      setIsOverflowingViewport(nextIsOverflowingViewport);
    };

    measureOverflow();

    const resizeObserver = new ResizeObserver(measureOverflow);
    resizeObserver.observe(section);
    resizeObserver.observe(content);
    window.addEventListener("resize", measureOverflow);
    mobileQuery.addEventListener("change", measureOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureOverflow);
      mobileQuery.removeEventListener("change", measureOverflow);
    };
  }, []);

  return (
    <section
      data-section
      data-boundary-step-section={stepAtNativeBoundary ? "" : undefined}
      data-desktop-step-section={desktopStepSection ? "" : undefined}
      data-native-scroll-section={usesNativeScrollLayout ? "" : undefined}
      id={id}
      ref={sectionRef}
      className={`relative snap-start bg-black text-white ${sectionSizingClass} ${className}`}
    >
      <motion.div
        className={`fitness-section-content relative w-full ${contentSizingClass} ${mobileNativeVisibilityClass} ${contentClassName} ${shortMobileContentCenterClass}`}
        ref={contentRef}
        style={
          !animateOnScroll || usesNativeScrollLayout || prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { y, opacity }
        }
      >
        {children}
      </motion.div>
    </section>
  );
}
