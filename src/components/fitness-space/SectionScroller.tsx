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
const DESKTOP_SECTION_SCROLL_MS = 240;
const DESKTOP_POST_LOCK_WHEEL_SUPPRESS_SILENCE_MS = 88;
const DESKTOP_POST_LOCK_WHEEL_SUPPRESS_MAX_MS = 720;
const DESKTOP_STEP_HANDOFF_WHEEL_SUPPRESS_SILENCE_MS = 80;
const DESKTOP_STEP_HANDOFF_WHEEL_SUPPRESS_MAX_MS = 1200;
const DESKTOP_POST_LOCK_NEW_GESTURE_DELTA_RISE = 12;
const DESKTOP_POST_LOCK_NEW_GESTURE_MIN_MS = 140;
const MOBILE_LAYOUT_PADDING_PX = 0;
const WHEEL_THRESHOLD = 32;
const DESKTOP_SAME_DIRECTION_CHANGE_RELEASE_MIN_MS = 96;
const DESKTOP_SAME_DIRECTION_CHANGE_RELEASE_DELTA = WHEEL_THRESHOLD;
const DESKTOP_SAME_DIRECTION_REPEAT_RELEASE_MIN_MS = 140;
const DESKTOP_SAME_DIRECTION_REPEAT_RELEASE_DELTA = WHEEL_THRESHOLD;
const DESKTOP_SAME_DIRECTION_REPEAT_RELEASE_DELTA_RISE = 12;
const TOUCH_THRESHOLD = 48;
const TOUCH_MOVE_STEP_THRESHOLD = 36;
const NATIVE_BOUNDARY_RELEASE_MS = 1400;
const NATIVE_SECTION_BOUNDARY_EPSILON_PX = 2;
const NATIVE_SECTION_END_BUFFER_PX = 32;
const NATIVE_SECTION_NEAR_BOUNDARY_PX = 72;
const POST_LOCK_WHEEL_SUPPRESS_MAX_MS = 320;

type SectionStepDetail = {
  direction: -1 | 1;
  sameDirectionMaxMs?: number;
  lockMs?: number;
  sameDirectionSilenceMs?: number;
  silenceMs?: number;
  suppressDirectionChanges?: boolean;
};

type WheelMomentumState = {
  direction: -1 | 1;
  lastDeltaAbs: number;
  lastAt: number;
};

type PostLockWheelSuppressState = WheelMomentumState & {
  maxMs: number;
  reason: string | null;
  resetTimer: ReturnType<typeof setTimeout> | null;
  sectionId: string | null;
  startedAt: number;
  silenceMs: number;
};

export function SectionScroller({ children }: SectionScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const restoreInstantScrollBehaviorRef = useRef<(() => void) | null>(null);
  const settleFrameRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchSectionRef = useRef<HTMLElement | null>(null);
  const touchStartBoundaryRef = useRef<{
    down: boolean;
    up: boolean;
  } | null>(null);
  const touchBoundaryReleaseRef = useRef<{
    direction: -1 | 1;
    expiresAt: number;
    section: HTMLElement;
  } | null>(null);
  const touchSteppedRef = useRef(false);
  const touchUsedNativeScrollRef = useRef(false);
  const lastInputAtRef = useRef(0);
  const postLockWheelSuppressRef =
    useRef<PostLockWheelSuppressState | null>(null);
  const stepUnlockRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockedWheelMomentumRef = useRef<WheelMomentumState | null>(null);
  const sameDirectionSuppressRef = useRef<{
    direction: -1 | 1;
    lastDeltaAbs: number;
    maxMs: number;
    resetTimer: ReturnType<typeof setTimeout> | null;
    sectionId: string | null;
    silenceMs: number;
    startedAt: number;
    suppressDirectionChanges: boolean;
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

    const isMobileLayout = () =>
      window.matchMedia("(max-width: 639px)").matches;

    const isDesktopLayout = () => !isMobileLayout();

    const isNativeScrollSection = (
      section: HTMLElement | undefined,
    ) =>
      Boolean(
        section &&
          (section.hasAttribute("data-native-scroll-section") ||
            section.offsetHeight > getViewportHeight() + 2),
      );

    const getScrollContainer = () =>
      isMobileLayout() ? containerRef.current : null;

    const getViewportHeight = () =>
      getScrollContainer()?.clientHeight ??
      window.visualViewport?.height ??
      window.innerHeight;

    const getViewportScrollTop = () =>
      getScrollContainer()?.scrollTop ?? window.scrollY;

    const getViewportMaxScrollTop = () => {
      const scrollContainer = getScrollContainer();
      if (scrollContainer) {
        return Math.max(
          scrollContainer.scrollHeight - scrollContainer.clientHeight,
          0,
        );
      }

      return Math.max(
        Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
        ) - getViewportHeight(),
        0,
      );
    };

    const getMobileLayoutOffset = () =>
      isMobileLayout() ? MOBILE_LAYOUT_PADDING_PX : 0;

    const getSectionScrollTop = (section: HTMLElement) =>
      Math.max(section.offsetTop - getMobileLayoutOffset(), 0);

    const clearForcedInstantScrollBehavior = () => {
      restoreInstantScrollBehaviorRef.current?.();
    };

    const forceWindowInstantScrollBehavior = () => {
      clearForcedInstantScrollBehavior();

      const root = document.documentElement;
      const body = document.body;
      const previousRootInline = root.style.scrollBehavior;
      const previousBodyInline = body.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      body.style.scrollBehavior = "auto";

      const restore = () => {
        root.style.scrollBehavior = previousRootInline;
        body.style.scrollBehavior = previousBodyInline;

        if (restoreInstantScrollBehaviorRef.current === restore) {
          restoreInstantScrollBehaviorRef.current = null;
        }
      };

      restoreInstantScrollBehaviorRef.current = restore;

      return { restore };
    };

    const scrollWindowToInstant = (top: number) => {
      window.scrollTo(0, top);
    };

    const scrollViewportTo = (
      top: number,
      behavior: ScrollBehavior = "smooth",
    ) => {
      const scrollContainer = getScrollContainer();

      if (scrollContainer) {
        scrollContainer.scrollTo({ behavior, top });
        return;
      }

      if (
        behavior === "smooth" &&
        isDesktopLayout() &&
        !prefersReducedMotion
      ) {
        if (scrollAnimationFrameRef.current) {
          cancelAnimationFrame(scrollAnimationFrameRef.current);
          scrollAnimationFrameRef.current = null;
        }

        const instantScrollBehavior = forceWindowInstantScrollBehavior();
        const startedAt = performance.now();
        const startTop = window.scrollY;
        const distance = top - startTop;

        const animate = (now: number) => {
          const progress = Math.min(
            (now - startedAt) / DESKTOP_SECTION_SCROLL_MS,
            1,
          );
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          scrollWindowToInstant(startTop + distance * easedProgress);

          if (progress < 1) {
            scrollAnimationFrameRef.current =
              requestAnimationFrame(animate);
            return;
          }

          scrollWindowToInstant(top);
          instantScrollBehavior.restore();
          scrollAnimationFrameRef.current = null;
        };

        scrollAnimationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (behavior === "auto" && isDesktopLayout()) {
        const instantScrollBehavior = forceWindowInstantScrollBehavior();
        scrollWindowToInstant(top);
        instantScrollBehavior.restore();
        return;
      }

      window.scrollTo({ behavior, top });
    };

    const getCurrentIndex = () => {
      const sections = getSections();
      if (!sections.length) {
        return 0;
      }

      const thresholdY =
        getViewportScrollTop() +
        getMobileLayoutOffset() +
        Math.min(getViewportHeight() * 0.45, 280);
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
          getViewportScrollTop() - getSectionScrollTop(sections[closestIndex]),
        );
        const sectionDistance = Math.abs(
          getViewportScrollTop() - getSectionScrollTop(section),
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

      if (!isNativeScrollSection(section)) {
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
      const rawMaxScrollY =
        Math.max(
          sectionBottom - getViewportHeight() + getMobileLayoutOffset(),
          sectionTop,
        ) +
        NATIVE_SECTION_END_BUFFER_PX;
      const viewportMaxScrollTop = getViewportMaxScrollTop();
      const maxScrollY = Math.min(rawMaxScrollY, viewportMaxScrollTop);
      const minScrollY = Math.min(sectionTop, viewportMaxScrollTop);

      if (direction === 1) {
        return (
          getViewportScrollTop() <
          maxScrollY - NATIVE_SECTION_BOUNDARY_EPSILON_PX
        );
      }

      return (
        getViewportScrollTop() >
        minScrollY + NATIVE_SECTION_BOUNDARY_EPSILON_PX
      );
    };

    const getNativeBoundaryState = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      if (!section) {
        return null;
      }

      if (!isNativeScrollSection(section)) {
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
      const rawMaxScrollY =
        Math.max(
          sectionBottom - getViewportHeight() + getMobileLayoutOffset(),
          sectionTop,
        ) +
        NATIVE_SECTION_END_BUFFER_PX;
      const viewportMaxScrollTop = getViewportMaxScrollTop();
      const maxScrollY = Math.min(rawMaxScrollY, viewportMaxScrollTop);
      const minScrollY = Math.min(sectionTop, viewportMaxScrollTop);
      const target = direction === 1 ? maxScrollY : minScrollY;

      return {
        distance: Math.abs(target - getViewportScrollTop()),
        isInternal: false,
        maxScrollY,
        minScrollY,
        rawMaxScrollY,
        target,
        viewportMaxScrollTop,
      };
    };

    const isNearNativeBoundary = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      const state = getNativeBoundaryState(section, direction);
      return Boolean(
        isNativeScrollSection(section) &&
          state &&
          state.distance <= NATIVE_SECTION_NEAR_BOUNDARY_PX,
      );
    };

    const markNativeBoundaryRelease = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      if (!section || !isNativeScrollSection(section)) {
        return;
      }

      touchBoundaryReleaseRef.current = {
        direction,
        expiresAt: performance.now() + NATIVE_BOUNDARY_RELEASE_MS,
        section,
      };
    };

    const hasNativeBoundaryRelease = (
      section: HTMLElement | undefined,
      direction: -1 | 1,
    ) => {
      const release = touchBoundaryReleaseRef.current;
      if (!release) {
        return false;
      }

      if (release.expiresAt < performance.now()) {
        touchBoundaryReleaseRef.current = null;
        return false;
      }

      const matches =
        release.section === section && release.direction === direction;
      if (!matches && release.direction !== direction) {
        touchBoundaryReleaseRef.current = null;
      }

      return matches;
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

    const clearSameDirectionSuppress = () => {
      if (sameDirectionSuppressRef.current?.resetTimer) {
        clearTimeout(sameDirectionSuppressRef.current.resetTimer);
      }

      sameDirectionSuppressRef.current = null;
    };

    const clearPostLockWheelSuppress = () => {
      if (postLockWheelSuppressRef.current?.resetTimer) {
        clearTimeout(postLockWheelSuppressRef.current.resetTimer);
      }

      postLockWheelSuppressRef.current = null;
    };

    const resetInteractionState = () => {
      lockedRef.current = false;
      touchStartYRef.current = null;
      touchSectionRef.current = null;
      touchStartBoundaryRef.current = null;
      touchBoundaryReleaseRef.current = null;
      touchSteppedRef.current = false;
      touchUsedNativeScrollRef.current = false;
      lockedWheelMomentumRef.current = null;
      wheelDeltaRef.current = 0;

      if (settleFrameRef.current) {
        cancelAnimationFrame(settleFrameRef.current);
        settleFrameRef.current = null;
      }

      if (scrollAnimationFrameRef.current) {
        cancelAnimationFrame(scrollAnimationFrameRef.current);
        scrollAnimationFrameRef.current = null;
      }
      clearForcedInstantScrollBehavior();

      if (wheelResetRef.current) {
        clearTimeout(wheelResetRef.current);
        wheelResetRef.current = null;
      }

      if (stepUnlockRef.current) {
        clearTimeout(stepUnlockRef.current);
        stepUnlockRef.current = null;
      }

      clearSameDirectionSuppress();
      clearPostLockWheelSuppress();
    };

    const schedulePostLockWheelSuppressClear = () => {
      const suppression = postLockWheelSuppressRef.current;
      if (!suppression) {
        return;
      }

      if (suppression.resetTimer) {
        clearTimeout(suppression.resetTimer);
      }

      const now = performance.now();
      const silenceMs = suppression.silenceMs;
      const suppressMaxMs = suppression.maxMs;
      const wheelAgeMs = now - suppression.lastAt;
      const suppressAgeMs = now - suppression.startedAt;

      if (suppressAgeMs >= suppressMaxMs) {
        clearPostLockWheelSuppress();
        return;
      }

      const clearDelay = Math.max(
        Math.min(
          silenceMs - wheelAgeMs,
          suppressMaxMs - suppressAgeMs,
        ),
        0,
      );

      suppression.resetTimer = setTimeout(() => {
        if (postLockWheelSuppressRef.current !== suppression) {
          return;
        }

        const now = performance.now();
        const silenceMs = suppression.silenceMs;
        const suppressMaxMs = suppression.maxMs;

        if (now - suppression.startedAt >= suppressMaxMs) {
          clearPostLockWheelSuppress();
          return;
        }

        if (now - suppression.lastAt >= silenceMs) {
          clearPostLockWheelSuppress();
          return;
        }

        schedulePostLockWheelSuppressClear();
      }, clearDelay);
    };

    const startPostLockWheelSuppress = (
      options: {
        maxMs?: number;
        reason?: string;
        section?: HTMLElement | null;
        silenceMs?: number;
      } = {},
    ) => {
      const momentum = lockedWheelMomentumRef.current;
      lockedWheelMomentumRef.current = null;

      if (!momentum) {
        return;
      }

      if (isDesktopLayout() && sameDirectionSuppressRef.current) {
        return;
      }

      const wheelAgeMs = performance.now() - momentum.lastAt;
      const defaultSilenceMs = isDesktopLayout()
        ? DESKTOP_POST_LOCK_WHEEL_SUPPRESS_SILENCE_MS
        : INPUT_SILENCE_MS;
      const defaultMaxMs = isDesktopLayout()
        ? DESKTOP_POST_LOCK_WHEEL_SUPPRESS_MAX_MS
        : POST_LOCK_WHEEL_SUPPRESS_MAX_MS;
      const silenceMs = options.silenceMs ?? defaultSilenceMs;
      const maxMs = options.maxMs ?? defaultMaxMs;
      const staleWheelMs = silenceMs;
      if (wheelAgeMs >= staleWheelMs) {
        return;
      }

      clearPostLockWheelSuppress();
      postLockWheelSuppressRef.current = {
        direction: momentum.direction,
        lastDeltaAbs: momentum.lastDeltaAbs,
        lastAt: momentum.lastAt,
        maxMs,
        reason: options.reason ?? null,
        resetTimer: null,
        sectionId: options.section?.id || null,
        startedAt: performance.now(),
        silenceMs,
      };

      schedulePostLockWheelSuppressClear();
    };

    const shouldSuppressPostLockWheel = (
      direction: -1 | 1,
      deltaY: number,
    ) => {
      const suppression = postLockWheelSuppressRef.current;
      if (!suppression) {
        return false;
      }

      const now = performance.now();
      const deltaAbs = Math.abs(deltaY);
      const silenceMs = suppression.silenceMs;
      const suppressMaxMs = suppression.maxMs;

      if (suppression.direction !== direction) {
        clearPostLockWheelSuppress();
        return false;
      }

      if (now - suppression.lastAt >= silenceMs) {
        clearPostLockWheelSuppress();
        return false;
      }

      if (now - suppression.startedAt >= suppressMaxMs) {
        clearPostLockWheelSuppress();
        return false;
      }

      if (isDesktopLayout()) {
        const elapsedMs = now - suppression.startedAt;
        const deltaRise = deltaAbs - suppression.lastDeltaAbs;

        if (
          elapsedMs >= DESKTOP_POST_LOCK_NEW_GESTURE_MIN_MS &&
          deltaRise >= DESKTOP_POST_LOCK_NEW_GESTURE_DELTA_RISE
        ) {
          clearPostLockWheelSuppress();
          return false;
        }
      }

      suppression.lastDeltaAbs = deltaAbs;
      suppression.lastAt = now;
      schedulePostLockWheelSuppressClear();
      return true;
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

    const activateSameDirectionSuppressAfterLock = () => {
      const suppression = sameDirectionSuppressRef.current;
      if (!suppression) {
        return;
      }

      const lockedMomentum = lockedWheelMomentumRef.current;
      suppression.lastDeltaAbs =
        lockedMomentum?.direction === suppression.direction
          ? lockedMomentum.lastDeltaAbs
          : 0;
      suppression.startedAt = performance.now();
      scheduleSameDirectionSuppressClear();
    };

    const shouldReleaseSameDirectionForDirectionChange = (
      suppression: NonNullable<typeof sameDirectionSuppressRef.current>,
      direction: -1 | 1,
      deltaY: number | null,
      elapsed: number,
    ) => {
      if (
        suppression.direction === direction ||
        !suppression.suppressDirectionChanges ||
        deltaY === null
      ) {
        return false;
      }

      return (
        elapsed >= DESKTOP_SAME_DIRECTION_CHANGE_RELEASE_MIN_MS &&
        Math.abs(deltaY) >= DESKTOP_SAME_DIRECTION_CHANGE_RELEASE_DELTA
      );
    };

    const shouldReleaseSameDirectionForRepeatGesture = (
      suppression: NonNullable<typeof sameDirectionSuppressRef.current>,
      direction: -1 | 1,
      deltaY: number | null,
      elapsed: number,
    ) => {
      if (suppression.direction !== direction || deltaY === null) {
        return false;
      }

      const deltaAbs = Math.abs(deltaY);
      const deltaRise = deltaAbs - suppression.lastDeltaAbs;

      return (
        elapsed >= DESKTOP_SAME_DIRECTION_REPEAT_RELEASE_MIN_MS &&
        deltaAbs >= DESKTOP_SAME_DIRECTION_REPEAT_RELEASE_DELTA &&
        deltaRise >= DESKTOP_SAME_DIRECTION_REPEAT_RELEASE_DELTA_RISE
      );
    };

    const shouldSuppressSameDirection = (
      direction: -1 | 1,
      deltaY: number | null = null,
    ) => {
      const suppression = sameDirectionSuppressRef.current;
      if (!suppression) {
        return false;
      }

      const elapsed = performance.now() - suppression.startedAt;
      if (elapsed >= suppression.maxMs) {
        clearSameDirectionSuppress();
        return false;
      }

      if (suppression.direction !== direction) {
        if (
          shouldReleaseSameDirectionForDirectionChange(
            suppression,
            direction,
            deltaY,
            elapsed,
          ) &&
          deltaY !== null
        ) {
          clearSameDirectionSuppress();
          return false;
        }

        if (suppression.suppressDirectionChanges) {
          scheduleSameDirectionSuppressClear();
          return true;
        }

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
        const isAtTarget =
          Math.abs(getViewportScrollTop() - targetScrollTop) <= 2;
        const inputIsSilent =
          isDesktopLayout() ||
          now - lastInputAtRef.current >= INPUT_SILENCE_MS;
        const timedOut = now - startedAt >= MAX_SCROLL_LOCK_MS;

        if ((isAtTarget && inputIsSilent) || timedOut) {
          if (timedOut && !isAtTarget) {
            scrollViewportTo(targetScrollTop, "auto");
          }

          if (
            isDesktopLayout() &&
            target.hasAttribute("data-desktop-step-section")
          ) {
            startPostLockWheelSuppress({
              maxMs: DESKTOP_STEP_HANDOFF_WHEEL_SUPPRESS_MAX_MS,
              reason: "desktop-step-section-handoff",
              section: target,
              silenceMs: DESKTOP_STEP_HANDOFF_WHEEL_SUPPRESS_SILENCE_MS,
            });
          } else {
            startPostLockWheelSuppress({
              section: target,
            });
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

      const targetScrollTop =
        direction === -1 ? section.scrollHeight - section.clientHeight : 0;

      section.scrollTop =
        targetScrollTop;
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
        const currentScrollTop = isInternal
          ? section.scrollTop
          : getViewportScrollTop();
        const isAtTarget =
          Math.abs(currentScrollTop - targetScrollTop) <=
          NATIVE_SECTION_BOUNDARY_EPSILON_PX;
        const inputIsSilent =
          isDesktopLayout() ||
          now - lastInputAtRef.current >= INPUT_SILENCE_MS;
        const timedOut = now - startedAt >= MAX_SCROLL_LOCK_MS;

        if ((isAtTarget && inputIsSilent) || timedOut) {
          if (timedOut && !isAtTarget) {
            if (isInternal) {
              section.scrollTo({ behavior: "auto", top: targetScrollTop });
            } else {
              scrollViewportTo(targetScrollTop, "auto");
            }
          }

          startPostLockWheelSuppress({
            maxMs: NATIVE_BOUNDARY_RELEASE_MS,
            reason: isInternal ? "native-internal-boundary" : "native-boundary",
            section,
            silenceMs: DESKTOP_POST_LOCK_WHEEL_SUPPRESS_SILENCE_MS,
          });
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
      lockedWheelMomentumRef.current = null;
      markInput();
      wheelDeltaRef.current = 0;

      const behavior = prefersReducedMotion ? "auto" : "smooth";

      if (state.isInternal) {
        section.scrollTo({ behavior, top: state.target });
      } else {
        scrollViewportTo(state.target, behavior);
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
      lockedWheelMomentumRef.current = null;
      markInput();
      wheelDeltaRef.current = 0;
      const targetScrollTop = getSectionScrollTop(target);
      const behavior = prefersReducedMotion ? "auto" : "smooth";
      scrollViewportTo(
        targetScrollTop,
        behavior,
      );
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
      lockedWheelMomentumRef.current = null;
      wheelDeltaRef.current = 0;

      if (stepUnlockRef.current) {
        clearTimeout(stepUnlockRef.current);
      }

      if (stepEvent.detail.sameDirectionSilenceMs !== undefined) {
        clearSameDirectionSuppress();
        sameDirectionSuppressRef.current = {
          direction,
          lastDeltaAbs: 0,
          maxMs: stepEvent.detail.sameDirectionMaxMs ?? 1200,
          resetTimer: null,
          sectionId: section.id || null,
          silenceMs: stepEvent.detail.sameDirectionSilenceMs,
          startedAt: performance.now(),
          suppressDirectionChanges: Boolean(
            stepEvent.detail.suppressDirectionChanges,
          ),
        };
      }

      const unlockDelay = prefersReducedMotion
        ? 0
        : stepEvent.detail.lockMs ?? INTERNAL_STEP_LOCK_MS;
      const inputSilenceMs = stepEvent.detail.silenceMs ?? INPUT_SILENCE_MS;

      const unlockWhenInputIsSilent = () => {
        const inputIsSilent =
          isDesktopLayout() ||
          performance.now() - lastInputAtRef.current >= inputSilenceMs;

        if (inputIsSilent) {
          activateSameDirectionSuppressAfterLock();
          if (
            isDesktopLayout() &&
            section.hasAttribute("data-desktop-step-section")
          ) {
            startPostLockWheelSuppress({
              maxMs: DESKTOP_STEP_HANDOFF_WHEEL_SUPPRESS_MAX_MS,
              reason: "desktop-step-section-step",
              section,
              silenceMs: DESKTOP_STEP_HANDOFF_WHEEL_SUPPRESS_SILENCE_MS,
            });
          } else {
            startPostLockWheelSuppress({
              reason: "section-step",
              section,
            });
          }
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
      const currentSectionIsNative = isNativeScrollSection(currentSection);
      const currentSectionCanScrollNative = canScrollNativeSection(
        currentSection,
        direction,
      );

      if (
        currentSectionIsNative &&
        currentSectionCanScrollNative
      ) {
        scrollNativeSectionToBoundary(currentSection, direction);
        return;
      }

      const shouldTrySectionStep =
        !currentSectionIsNative ||
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
        return;
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      event.preventDefault();

      if (lockedRef.current) {
        wheelDeltaRef.current = 0;
        lockedWheelMomentumRef.current = {
          direction,
          lastDeltaAbs: Math.abs(event.deltaY),
          lastAt: performance.now(),
        };

        return;
      }

      if (shouldSuppressPostLockWheel(direction, event.deltaY)) {
        wheelDeltaRef.current = 0;
        return;
      }

      markInput();

      const suppression = sameDirectionSuppressRef.current;
      if (suppression) {
        const elapsed = performance.now() - suppression.startedAt;
        if (elapsed >= suppression.maxMs) {
          clearSameDirectionSuppress();
        } else if (suppression.direction !== direction) {
          if (
            shouldReleaseSameDirectionForDirectionChange(
              suppression,
              direction,
              event.deltaY,
              elapsed,
            )
          ) {
            clearSameDirectionSuppress();
          } else if (suppression.suppressDirectionChanges) {
            wheelDeltaRef.current = 0;
            scheduleSameDirectionSuppressClear();
            return;
          } else {
            clearSameDirectionSuppress();
          }
        } else if (
          shouldReleaseSameDirectionForRepeatGesture(
            suppression,
            direction,
          event.deltaY,
          elapsed,
        )
      ) {
          clearSameDirectionSuppress();
        } else {
          suppression.lastDeltaAbs = Math.abs(event.deltaY);
          wheelDeltaRef.current = 0;
          scheduleSameDirectionSuppressClear();
          return;
        }
      }

      wheelDeltaRef.current += event.deltaY;
      resetWheelDeltaSoon();

      if (Math.abs(wheelDeltaRef.current) >= WHEEL_THRESHOLD) {
        const stepDirection = wheelDeltaRef.current > 0 ? 1 : -1;
        wheelDeltaRef.current = 0;
        moveBy(stepDirection);
        return;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      markInput();
      touchSteppedRef.current = false;
      touchUsedNativeScrollRef.current = false;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      const touchedSection =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-section]")
          : null;
      touchSectionRef.current = touchedSection;

      const downNear = touchedSection
        ? isNearNativeBoundary(touchedSection, 1)
        : false;
      const downRelease =
        touchedSection && !downNear
          ? hasNativeBoundaryRelease(touchedSection, 1)
          : false;
      const upNear = touchedSection
        ? isNearNativeBoundary(touchedSection, -1)
        : false;
      const upRelease =
        touchedSection && !upNear
          ? hasNativeBoundaryRelease(touchedSection, -1)
          : false;

      touchStartBoundaryRef.current = touchedSection
        ? {
            down: downNear || downRelease,
            up: upNear || upRelease,
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
      const delta = touchStartYRef.current - currentY;
      const currentSection =
        touchSectionRef.current ?? getSections()[getCurrentIndex()];
      const canNativeScroll = canScrollNativeSection(currentSection, direction);
      const nearNativeBoundary = isNearNativeBoundary(
        currentSection,
        direction,
      );

      if (canNativeScroll && !nearNativeBoundary) {
        touchUsedNativeScrollRef.current = true;
        markInput();
        return;
      }

      if (Math.abs(delta) > 8) {
        event.preventDefault();
        markInput();
      }

      if (
        Math.abs(delta) < TOUCH_MOVE_STEP_THRESHOLD ||
        touchSteppedRef.current
      ) {
        return;
      }

      if (touchUsedNativeScrollRef.current) {
        markNativeBoundaryRelease(currentSection, direction);
        return;
      }

      const isNativeSection = isNativeScrollSection(currentSection);
      const startedAtBoundary =
        direction === 1
          ? touchStartBoundaryRef.current?.down
          : touchStartBoundaryRef.current?.up;

      if (isNativeSection && !startedAtBoundary && !nearNativeBoundary) {
        return;
      }

      touchSteppedRef.current = true;
      moveBy(direction);
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
        if (touchSteppedRef.current) {
          return;
        }

        const direction = delta > 0 ? 1 : -1;
        const currentSection =
          touchedSection ?? getSections()[getCurrentIndex()];
        const canNativeScroll = canScrollNativeSection(
          currentSection,
          direction,
        );
        const nearNativeBoundary = isNearNativeBoundary(
          currentSection,
          direction,
        );

        if (usedNativeScroll) {
          if (canNativeScroll && !nearNativeBoundary) {
            scrollNativeSectionToBoundary(currentSection, direction);
          }

          markNativeBoundaryRelease(currentSection, direction);
          return;
        }

        if (lockedRef.current) {
          return;
        }

        const isNativeSection = isNativeScrollSection(currentSection);
        const startedAtBoundary =
          direction === 1 ? startBoundary?.down : startBoundary?.up;
        const hasRelease =
          isNativeSection && !startedAtBoundary
            ? hasNativeBoundaryRelease(currentSection, direction)
            : false;
        if (
          isNativeSection &&
          !startedAtBoundary &&
          !hasRelease
        ) {
          return;
        }

        if (canNativeScroll && !nearNativeBoundary) {
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
          canScrollNativeSection(currentSection, 1)
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
          canScrollNativeSection(currentSection, -1)
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

    const scrollEventTarget = containerRef.current ?? window;
    const captureListenerOptions = { capture: true };
    const wheelListener = onWheel as EventListener;
    const touchStartListener = onTouchStart as EventListener;
    const touchMoveListener = onTouchMove as EventListener;
    const touchEndListener = onTouchEnd as EventListener;

    scrollEventTarget.addEventListener("wheel", wheelListener, {
      passive: false,
    });
    scrollEventTarget.addEventListener("touchstart", touchStartListener, {
      capture: true,
      passive: true,
    });
    scrollEventTarget.addEventListener("touchmove", touchMoveListener, {
      capture: true,
      passive: false,
    });
    scrollEventTarget.addEventListener("touchend", touchEndListener, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onAnchorClick);

    return () => {
      scrollEventTarget.removeEventListener("wheel", wheelListener);
      scrollEventTarget.removeEventListener(
        "touchstart",
        touchStartListener,
        captureListenerOptions,
      );
      scrollEventTarget.removeEventListener(
        "touchmove",
        touchMoveListener,
        captureListenerOptions,
      );
      scrollEventTarget.removeEventListener(
        "touchend",
        touchEndListener,
        captureListenerOptions,
      );
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
