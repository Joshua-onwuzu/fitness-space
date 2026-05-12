"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type FadeInOnScrollProps = {
  children: ReactNode;
  className?: string;
  initialVisible?: boolean;
};

export function FadeInOnScroll({
  children,
  className = "",
  initialVisible = false,
}: FadeInOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion || initialVisible ? "visible" : undefined}
      className={className}
      initial={initialVisible ? "visible" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
          y: prefersReducedMotion ? 0 : 18,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.62,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      viewport={{ amount: 0.72, once: false }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}
