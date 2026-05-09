"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type SectionScrollerProps = {
  children: ReactNode;
};

const MAX_SCROLL_LOCK_MS = 1800;
const INPUT_SILENCE_MS = 180;
const WHEEL_THRESHOLD = 36;
const TOUCH_THRESHOLD = 48;

export function SectionScroller({ children }: SectionScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const settleFrameRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const lastInputAtRef = useRef(0);
  const wheelDeltaRef = useRef(0);
  const wheelResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const getSections = () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>("[data-section]") ??
          [],
      );

    const getCurrentIndex = () => {
      const sections = getSections();
      if (!sections.length) {
        return 0;
      }

      return sections.reduce((closestIndex, section, index) => {
        const closestDistance = Math.abs(
          window.scrollY - sections[closestIndex].offsetTop,
        );
        const sectionDistance = Math.abs(window.scrollY - section.offsetTop);
        return sectionDistance < closestDistance ? index : closestIndex;
      }, 0);
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
        const isAtTarget = Math.abs(window.scrollY - target.offsetTop) <= 2;
        const inputIsSilent = now - lastInputAtRef.current >= INPUT_SILENCE_MS;
        const timedOut = now - startedAt >= MAX_SCROLL_LOCK_MS;

        if ((isAtTarget && inputIsSilent) || timedOut) {
          if (timedOut && !isAtTarget) {
            window.scrollTo({ behavior: "auto", top: target.offsetTop });
          }

          lockedRef.current = false;
          wheelDeltaRef.current = 0;
          return;
        }

        settleFrameRef.current = requestAnimationFrame(check);
      };

      settleFrameRef.current = requestAnimationFrame(check);
    };

    const scrollToIndex = (index: number) => {
      const sections = getSections();
      const target = sections[index];
      if (!target) {
        return;
      }

      lockedRef.current = true;
      markInput();
      wheelDeltaRef.current = 0;
      window.scrollTo({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        top: target.offsetTop,
      });
      unlockWhenSettled(index);
    };

    const moveBy = (direction: -1 | 1) => {
      if (lockedRef.current) {
        return;
      }

      const sections = getSections();
      const currentIndex = getCurrentIndex();
      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        sections.length - 1,
      );

      if (nextIndex !== currentIndex) {
        scrollToIndex(nextIndex);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) {
        return;
      }

      event.preventDefault();
      markInput();

      if (lockedRef.current) {
        return;
      }

      wheelDeltaRef.current += event.deltaY;
      resetWheelDeltaSoon();

      if (Math.abs(wheelDeltaRef.current) >= WHEEL_THRESHOLD) {
        const direction = wheelDeltaRef.current > 0 ? 1 : -1;
        wheelDeltaRef.current = 0;
        moveBy(direction);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      markInput();
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
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

      if (Math.abs(touchStartYRef.current - currentY) > 8) {
        event.preventDefault();
        markInput();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;

      if (startY === null) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) {
        return;
      }

      const delta = startY - endY;
      if (Math.abs(delta) >= TOUCH_THRESHOLD) {
        if (lockedRef.current) {
          return;
        }

        moveBy(delta > 0 ? 1 : -1);
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
        event.preventDefault();
        markInput();
        moveBy(1);
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey)
      ) {
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

      if (settleFrameRef.current) {
        cancelAnimationFrame(settleFrameRef.current);
      }

      if (wheelResetRef.current) {
        clearTimeout(wheelResetRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="snap-y snap-mandatory">
      {children}
    </div>
  );
}
