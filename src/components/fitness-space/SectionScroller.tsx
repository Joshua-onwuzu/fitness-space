"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type SectionScrollerProps = {
  children: ReactNode;
};

const MAX_SCROLL_LOCK_MS = 1800;
const INPUT_SILENCE_MS = 180;
const INTERNAL_STEP_LOCK_MS = 1300;
const MOBILE_LAYOUT_PADDING_PX = 0;
const WHEEL_THRESHOLD = 36;
const TOUCH_THRESHOLD = 48;
const FAST_NATIVE_BOUNDARY_WHEEL_THRESHOLD = 160;
const NATIVE_SECTION_BOUNDARY_EPSILON_PX = 2;
const NATIVE_SECTION_END_BUFFER_PX = 32;
const NATIVE_SECTION_NEAR_BOUNDARY_PX = 72;

type SectionStepDetail = {
  direction: -1 | 1;
  sameDirectionMaxMs?: number;
  lockMs?: number;
  sameDirectionSilenceMs?: number;
  silenceMs?: number;
};

export function SectionScroller({ children }: SectionScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const settleFrameRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchSectionRef = useRef<HTMLElement | null>(null);
  const touchStartBoundaryRef = useRef<{
    down: boolean;
    up: boolean;
  } | null>(null);
  const touchUsedNativeScrollRef = useRef(false);
  const lastInputAtRef = useRef(0);
  const nativeWheelResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nativeWheelScrollRef = useRef(false);
  const stepUnlockRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sameDirectionSuppressRef = useRef<{
    direction: -1 | 1;
    maxMs: number;
    resetTimer: ReturnType<typeof setTimeout> | null;
    silenceMs: number;
    startedAt: number;
  } | null>(null);
  const wheelDeltaRef = useRef(0);
  const wheelResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const getSections = () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>("[data-section]") ??
          [],
      ).filter(
        (section) =>
          section.offsetHeight > 0 &&
          window.getComputedStyle(section).display !== "none",
      );

    const getMobileLayoutOffset = () =>
      window.matchMedia("(max-width: 639px)").matches
        ? MOBILE_LAYOUT_PADDING_PX
        : 0;

    const getSectionScrollTop = (section: HTMLElement) =>
      Math.max(section.offsetTop - getMobileLayoutOffset(), 0);

    const getCurrentIndex = () => {
      const sections = getSections();
      if (!sections.length) {
        return 0;
      }

      const thresholdY =
        window.scrollY +
        getMobileLayoutOffset() +
        Math.min(window.innerHeight * 0.45, 280);
      const containingIndex = sections.findIndex(
        (section) =>
          thresholdY >= section.offsetTop &&
          thresholdY < section.offsetTop + section.offsetHeight,
      );

      if (containingIndex !== -1) {
        return containingIndex;
      }

      return sections.reduce((closestIndex, section, index) => {
        const closestDistance = Math.abs(
          window.scrollY - getSectionScrollTop(sections[closestIndex]),
        );
        const sectionDistance = Math.abs(
          window.scrollY - getSectionScrollTop(section),
        );
        return sectionDistance < closestDistance ? index : closestIndex;
      }, 0);
    };

    const canScrollNativeSection = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      if (!section) {
        return false;
      }

      const isNativeScrollSection =
        section.hasAttribute("data-native-scroll-section") ||
        section.offsetHeight > window.innerHeight + 2;

      if (!isNativeScrollSection) {
        return false;
      }

      if (section.hasAttribute("data-internal-scroll-section")) {
        const maxScrollTop = section.scrollHeight - section.clientHeight;

        if (direction === 1) {
          return (
            section.scrollTop <
            maxScrollTop - NATIVE_SECTION_BOUNDARY_EPSILON_PX
          );
        }

        return section.scrollTop > NATIVE_SECTION_BOUNDARY_EPSILON_PX;
      }

      const sectionTop = getSectionScrollTop(section);
      const sectionBottom = sectionTop + section.offsetHeight;
      const maxScrollY =
        Math.max(
          sectionBottom - window.innerHeight + getMobileLayoutOffset(),
          sectionTop,
        ) +
        NATIVE_SECTION_END_BUFFER_PX;

      if (direction === 1) {
        return (
          window.scrollY <
          maxScrollY - NATIVE_SECTION_BOUNDARY_EPSILON_PX
        );
      }

      return (
        window.scrollY >
        sectionTop + NATIVE_SECTION_BOUNDARY_EPSILON_PX
      );
    };

    const getNativeBoundaryState = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      if (!section) {
        return null;
      }

      const isNativeScrollSection =
        section.hasAttribute("data-native-scroll-section") ||
        section.offsetHeight > window.innerHeight + 2;

      if (!isNativeScrollSection) {
        return null;
      }

      if (section.hasAttribute("data-internal-scroll-section")) {
        const maxScrollTop = Math.max(
          section.scrollHeight - section.clientHeight,
          0,
        );
        const target = direction === 1 ? maxScrollTop : 0;

        return {
          distance: Math.abs(target - section.scrollTop),
          isInternal: true,
          target,
        };
      }

      const sectionTop = getSectionScrollTop(section);
      const sectionBottom = sectionTop + section.offsetHeight;
      const maxScrollY =
        Math.max(
          sectionBottom - window.innerHeight + getMobileLayoutOffset(),
          sectionTop,
        ) +
        NATIVE_SECTION_END_BUFFER_PX;
      const target = direction === 1 ? maxScrollY : sectionTop;

      return {
        distance: Math.abs(target - window.scrollY),
        isInternal: false,
        target,
      };
    };

    const isNearNativeBoundary = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      const state = getNativeBoundaryState(section, direction);
      return Boolean(
        section?.hasAttribute("data-native-scroll-section") &&
          state &&
          state.distance <= NATIVE_SECTION_NEAR_BOUNDARY_PX,
      );
    };

    const markInput = () => {
      lastInputAtRef.current = performance.now();
    };

    const resetWheelDeltaSoon = () => {
      if (wheelResetRef.current) {
        clearTimeout(wheelResetRef.current);
      }

      wheelResetRef.current = setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, INPUT_SILENCE_MS);
    };

    const markNativeWheelScroll = () => {
      nativeWheelScrollRef.current = true;

      if (nativeWheelResetRef.current) {
        clearTimeout(nativeWheelResetRef.current);
      }

      nativeWheelResetRef.current = setTimeout(() => {
        nativeWheelScrollRef.current = false;
      }, INPUT_SILENCE_MS);
    };

    const clearSameDirectionSuppress = () => {
      if (sameDirectionSuppressRef.current?.resetTimer) {
        clearTimeout(sameDirectionSuppressRef.current.resetTimer);
      }

      sameDirectionSuppressRef.current = null;
    };

    const resetInteractionState = () => {
      lockedRef.current = false;
      touchStartYRef.current = null;
      touchSectionRef.current = null;
      touchStartBoundaryRef.current = null;
      touchUsedNativeScrollRef.current = false;
      nativeWheelScrollRef.current = false;
      wheelDeltaRef.current = 0;

      if (settleFrameRef.current) {
        cancelAnimationFrame(settleFrameRef.current);
        settleFrameRef.current = null;
      }

      if (wheelResetRef.current) {
        clearTimeout(wheelResetRef.current);
        wheelResetRef.current = null;
      }

      if (stepUnlockRef.current) {
        clearTimeout(stepUnlockRef.current);
        stepUnlockRef.current = null;
      }

      if (nativeWheelResetRef.current) {
        clearTimeout(nativeWheelResetRef.current);
        nativeWheelResetRef.current = null;
      }

      clearSameDirectionSuppress();
    };

    const scheduleSameDirectionSuppressClear = () => {
      const suppression = sameDirectionSuppressRef.current;
      if (!suppression) {
        return;
      }

      if (suppression.resetTimer) {
        clearTimeout(suppression.resetTimer);
      }

      const elapsed = performance.now() - suppression.startedAt;
      const remainingMax = Math.max(suppression.maxMs - elapsed, 0);
      const clearDelay = Math.min(suppression.silenceMs, remainingMax);

      suppression.resetTimer = setTimeout(() => {
        if (sameDirectionSuppressRef.current === suppression) {
          sameDirectionSuppressRef.current = null;
        }
      }, clearDelay);
    };

    const shouldSuppressSameDirection = (direction: -1 | 1) => {
      const suppression = sameDirectionSuppressRef.current;
      if (!suppression) {
        return false;
      }

      if (suppression.direction !== direction) {
        clearSameDirectionSuppress();
        return false;
      }

      const elapsed = performance.now() - suppression.startedAt;
      if (elapsed >= suppression.maxMs) {
        clearSameDirectionSuppress();
        return false;
      }

      scheduleSameDirectionSuppressClear();
      return true;
    };

    const unlockWhenSettled = (index: number) => {
      if (settleFrameRef.current) {
        cancelAnimationFrame(settleFrameRef.current);
      }

      const startedAt = performance.now();

      const check = () => {
        const target = getSections()[index];
        if (!target) {
          lockedRef.current = false;
          return;
        }

        const now = performance.now();
        const targetScrollTop = getSectionScrollTop(target);
        const isAtTarget = Math.abs(window.scrollY - targetScrollTop) <= 2;
        const inputIsSilent = now - lastInputAtRef.current >= INPUT_SILENCE_MS;
        const timedOut = now - startedAt >= MAX_SCROLL_LOCK_MS;

        if ((isAtTarget && inputIsSilent) || timedOut) {
          if (timedOut && !isAtTarget) {
            window.scrollTo({ behavior: "auto", top: targetScrollTop });
          }

          lockedRef.current = false;
          wheelDeltaRef.current = 0;
          return;
        }

        settleFrameRef.current = requestAnimationFrame(check);
      };

      settleFrameRef.current = requestAnimationFrame(check);
    };

    const resetInternalScrollPosition = (
      section: HTMLElement,
      direction: -1 | 1,
    ) => {
      if (!section.hasAttribute("data-internal-scroll-section")) {
        return;
      }

      section.scrollTop =
        direction === -1 ? section.scrollHeight - section.clientHeight : 0;
    };

    const unlockNativeBoundaryWhenSettled = (
      section: HTMLElement,
      targetScrollTop: number,
      isInternal: boolean,
    ) => {
      if (settleFrameRef.current) {
        cancelAnimationFrame(settleFrameRef.current);
      }

      const startedAt = performance.now();

      const check = () => {
        const now = performance.now();
        const currentScrollTop = isInternal ? section.scrollTop : window.scrollY;
        const isAtTarget =
          Math.abs(currentScrollTop - targetScrollTop) <=
          NATIVE_SECTION_BOUNDARY_EPSILON_PX;
        const inputIsSilent = now - lastInputAtRef.current >= INPUT_SILENCE_MS;
        const timedOut = now - startedAt >= MAX_SCROLL_LOCK_MS;

        if ((isAtTarget && inputIsSilent) || timedOut) {
          if (timedOut && !isAtTarget) {
            if (isInternal) {
              section.scrollTo({ behavior: "auto", top: targetScrollTop });
            } else {
              window.scrollTo({ behavior: "auto", top: targetScrollTop });
            }
          }

          lockedRef.current = false;
          wheelDeltaRef.current = 0;
          return;
        }

        settleFrameRef.current = requestAnimationFrame(check);
      };

      settleFrameRef.current = requestAnimationFrame(check);
    };

    const scrollNativeSectionToBoundary = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      const state = getNativeBoundaryState(section, direction);
      if (
        !section ||
        !state ||
        state.distance <= NATIVE_SECTION_BOUNDARY_EPSILON_PX
      ) {
        return false;
      }

      lockedRef.current = true;
      markInput();
      wheelDeltaRef.current = 0;

      const behavior = prefersReducedMotion ? "auto" : "smooth";
      if (state.isInternal) {
        section.scrollTo({ behavior, top: state.target });
      } else {
        window.scrollTo({ behavior, top: state.target });
      }

      unlockNativeBoundaryWhenSettled(section, state.target, state.isInternal);
      return true;
    };

    const scrollToIndex = (index: number, direction: -1 | 1) => {
      const sections = getSections();
      const target = sections[index];
      if (!target) {
        return;
      }

      resetInternalScrollPosition(target, direction);
      lockedRef.current = true;
      markInput();
      wheelDeltaRef.current = 0;
      window.scrollTo({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        top: getSectionScrollTop(target),
      });
      unlockWhenSettled(index);
    };

    const stepWithinSection = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      if (!section) {
        return false;
      }

      const stepEvent = new CustomEvent("fitness-space:section-step", {
        cancelable: true,
        detail: { direction } as SectionStepDetail,
      });

      const shouldContinueToNextSection = section.dispatchEvent(stepEvent);
      if (shouldContinueToNextSection) {
        return false;
      }

      lockedRef.current = true;
      wheelDeltaRef.current = 0;

      if (stepUnlockRef.current) {
        clearTimeout(stepUnlockRef.current);
      }

      if (stepEvent.detail.sameDirectionSilenceMs !== undefined) {
        clearSameDirectionSuppress();
        sameDirectionSuppressRef.current = {
          direction,
          maxMs: stepEvent.detail.sameDirectionMaxMs ?? 1200,
          resetTimer: null,
          silenceMs: stepEvent.detail.sameDirectionSilenceMs,
          startedAt: performance.now(),
        };
        scheduleSameDirectionSuppressClear();
      }

      const unlockDelay = prefersReducedMotion
        ? 0
        : stepEvent.detail.lockMs ?? INTERNAL_STEP_LOCK_MS;
      const inputSilenceMs = stepEvent.detail.silenceMs ?? INPUT_SILENCE_MS;

      const unlockWhenInputIsSilent = () => {
        const inputIsSilent =
          performance.now() - lastInputAtRef.current >= inputSilenceMs;

        if (inputIsSilent) {
          lockedRef.current = false;
          wheelDeltaRef.current = 0;
          return;
        }

        stepUnlockRef.current = setTimeout(
          unlockWhenInputIsSilent,
          inputSilenceMs,
        );
      };

      stepUnlockRef.current = setTimeout(unlockWhenInputIsSilent, unlockDelay);

      return true;
    };

    const moveBy = (direction: -1 | 1) => {
      if (lockedRef.current) {
        return;
      }

      if (shouldSuppressSameDirection(direction)) {
        return;
      }

      const sections = getSections();
      const currentIndex = getCurrentIndex();
      const currentSection = sections[currentIndex];
      const currentSectionIsNative = Boolean(
        currentSection?.hasAttribute("data-native-scroll-section"),
      );
      const currentSectionCanScrollNative = canScrollNativeSection(
        currentSection,
        direction,
      );

      if (
        currentSectionIsNative &&
        currentSectionCanScrollNative &&
        !isNearNativeBoundary(currentSection, direction)
      ) {
        scrollNativeSectionToBoundary(currentSection, direction);
        return;
      }

      const shouldTrySectionStep =
        !currentSectionIsNative ||
        !currentSectionCanScrollNative ||
        Boolean(currentSection?.hasAttribute("data-boundary-step-section"));
      const sectionStepped =
        shouldTrySectionStep && stepWithinSection(currentSection, direction);

      if (sectionStepped) {
        return;
      }

      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        sections.length - 1,
      );

      if (nextIndex !== currentIndex) {
        scrollToIndex(nextIndex, direction);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentSection = getSections()[getCurrentIndex()];

      if (
        !lockedRef.current &&
        canScrollNativeSection(currentSection, direction) &&
        !isNearNativeBoundary(currentSection, direction)
      ) {
        const wheelDeltaContinuesDirection =
          wheelDeltaRef.current === 0 ||
          (wheelDeltaRef.current > 0 ? 1 : -1) === direction;

        wheelDeltaRef.current = wheelDeltaContinuesDirection
          ? wheelDeltaRef.current + event.deltaY
          : event.deltaY;
        resetWheelDeltaSoon();

        if (
          Math.abs(wheelDeltaRef.current) >=
          FAST_NATIVE_BOUNDARY_WHEEL_THRESHOLD
        ) {
          event.preventDefault();
          scrollNativeSectionToBoundary(currentSection, direction);
          return;
        }

        markInput();
        markNativeWheelScroll();
        return;
      }

      if (nativeWheelScrollRef.current) {
        event.preventDefault();
        wheelDeltaRef.current = 0;
        markInput();
        markNativeWheelScroll();
        return;
      }

      event.preventDefault();
      markInput();

      const suppression = sameDirectionSuppressRef.current;
      if (suppression) {
        if (suppression.direction === direction) {
          const elapsed = performance.now() - suppression.startedAt;
          if (elapsed >= suppression.maxMs) {
            clearSameDirectionSuppress();
          } else {
            wheelDeltaRef.current = 0;
            scheduleSameDirectionSuppressClear();
            return;
          }
        } else {
          clearSameDirectionSuppress();
        }

        if (sameDirectionSuppressRef.current) {
          wheelDeltaRef.current = 0;
          scheduleSameDirectionSuppressClear();
          return;
        }
      }

      if (lockedRef.current) {
        return;
      }

      wheelDeltaRef.current += event.deltaY;
      resetWheelDeltaSoon();

      if (Math.abs(wheelDeltaRef.current) >= WHEEL_THRESHOLD) {
        const stepDirection = wheelDeltaRef.current > 0 ? 1 : -1;
        wheelDeltaRef.current = 0;
        moveBy(stepDirection);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      markInput();
      touchUsedNativeScrollRef.current = false;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchSectionRef.current =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-section]")
          : null;
      touchStartBoundaryRef.current = touchSectionRef.current
        ? {
            down: isNearNativeBoundary(touchSectionRef.current, 1),
            up: isNearNativeBoundary(touchSectionRef.current, -1),
          }
        : null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (lockedRef.current) {
        event.preventDefault();
        markInput();
        return;
      }

      if (touchStartYRef.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) {
        return;
      }

      const direction = touchStartYRef.current - currentY > 0 ? 1 : -1;
      const currentSection =
        touchSectionRef.current ?? getSections()[getCurrentIndex()];
      if (
        canScrollNativeSection(currentSection, direction) &&
        !isNearNativeBoundary(currentSection, direction)
      ) {
        touchUsedNativeScrollRef.current = true;
        markInput();
        return;
      }

      const delta = touchStartYRef.current - currentY;
      if (Math.abs(delta) > 8) {
        event.preventDefault();
        markInput();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const touchedSection = touchSectionRef.current;
      const startBoundary = touchStartBoundaryRef.current;
      const usedNativeScroll = touchUsedNativeScrollRef.current;
      touchStartYRef.current = null;
      touchSectionRef.current = null;
      touchStartBoundaryRef.current = null;
      touchUsedNativeScrollRef.current = false;

      if (startY === null) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) {
        return;
      }

      const delta = startY - endY;
      if (Math.abs(delta) >= TOUCH_THRESHOLD) {
        const direction = delta > 0 ? 1 : -1;
        const currentSection = touchedSection ?? getSections()[getCurrentIndex()];

        if (usedNativeScroll) {
          if (
            canScrollNativeSection(currentSection, direction) &&
            !isNearNativeBoundary(currentSection, direction)
          ) {
            scrollNativeSectionToBoundary(currentSection, direction);
          }

          return;
        }

        if (lockedRef.current) {
          return;
        }

        const isNativeSection = currentSection?.hasAttribute(
          "data-native-scroll-section",
        );
        const startedAtBoundary =
          direction === 1 ? startBoundary?.down : startBoundary?.up;
        if (isNativeSection && !startedAtBoundary) {
          return;
        }

        if (
          canScrollNativeSection(currentSection, direction) &&
          !isNearNativeBoundary(currentSection, direction)
        ) {
          return;
        }

        moveBy(direction);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const tagName = (event.target as HTMLElement | null)?.tagName;
      if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey)
      ) {
        const currentSection = getSections()[getCurrentIndex()];
        if (
          !lockedRef.current &&
          canScrollNativeSection(currentSection, 1) &&
          !isNearNativeBoundary(currentSection, 1)
        ) {
          event.preventDefault();
          scrollNativeSectionToBoundary(currentSection, 1);
          return;
        }

        event.preventDefault();
        markInput();
        moveBy(1);
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey)
      ) {
        const currentSection = getSections()[getCurrentIndex()];
        if (
          !lockedRef.current &&
          canScrollNativeSection(currentSection, -1) &&
          !isNearNativeBoundary(currentSection, -1)
        ) {
          event.preventDefault();
          scrollNativeSectionToBoundary(currentSection, -1);
          return;
        }

        event.preventDefault();
        markInput();
        moveBy(-1);
      }
    };

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a[href^='#']");
      const targetId = anchor?.getAttribute("href")?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      const targetSection = target?.closest<HTMLElement>("[data-section]");

      if (!targetSection) {
        return;
      }

      const sections = getSections();
      const targetIndex = sections.indexOf(targetSection);
      const currentIndex = getCurrentIndex();
      if (targetIndex === -1 || targetIndex === currentIndex) {
        return;
      }

      event.preventDefault();
      markInput();
      moveBy(targetIndex > currentIndex ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onAnchorClick);
      resetInteractionState();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="fitness-mobile-layout snap-y snap-mandatory">
      {children}
    </div>
  );
}
