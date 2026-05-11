import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site";

type PrimaryCtaProps = {
  children?: ReactNode;
  className?: string;
  variant?: "orange" | "white";
};

export function PrimaryCta({
  children = "Meet Bibi - It's Free",
  className = "",
  variant = "white",
}: PrimaryCtaProps) {
  return (
    <a
      aria-label="Start free with Bibi, the Fitness Space AI coach"
      className={`inline-flex items-center justify-center rounded-[7px] text-center font-semibold capitalize leading-normal transition ${
        variant === "orange"
          ? "bg-[#f54900] text-white hover:bg-[#ff6420]"
          : "bg-white text-black hover:bg-white/90"
      } ${className}`}
      data-analytics-event="primary_cta_click"
      data-cta-destination={siteConfig.signupUrl}
      href={siteConfig.signupUrl}
    >
      {children}
    </a>
  );
}
