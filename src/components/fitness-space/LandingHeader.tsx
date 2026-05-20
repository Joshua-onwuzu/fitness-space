"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { assets } from "./data";
import { WHATSAPP_LINK } from "./lib/constants";
import { getAgreementState, subscribeToAgreementState } from "./lib/agreement-store";

type LandingHeaderProps = {
  className?: string;
  mobileFlow?: boolean;
};

export function LandingHeader({
  className = "",
  mobileFlow = false,
}: LandingHeaderProps) {
  const positionClass = mobileFlow
    ? "relative z-50 w-full py-4"
    : "absolute left-1/2 top-0 z-50 w-full -translate-x-1/2 px-[25px] py-4 sm:fixed sm:px-6 lg:w-[1179.5px] lg:px-10";
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
  useEffect(() => {
    // Set initial state
    const initialState = getAgreementState();
    setIsButtonEnabled(initialState.terms && initialState.privacy);
    
    // Subscribe to changes
    const unsubscribe = subscribeToAgreementState((state) => {
      setIsButtonEnabled(state.terms && state.privacy);
    });
    
    return unsubscribe;
  }, []);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isButtonEnabled) {
      e.preventDefault();
      // Optional: Show a toast/notification message
      const event = new CustomEvent('fitness-space:agreement-required', {
        detail: { message: 'Please agree to Terms of Use and Privacy Policy first' }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <header className={`${positionClass} ${className}`}>
      <div className="mx-auto flex w-full items-center justify-between gap-4">
        <a aria-label="Fitness Space home" className="block" href="#hero">
          <Image
            alt="Fitness Space"
            className="h-auto w-[118px] max-sm:w-[141px] sm:w-[160px] lg:w-[200px]"
            height={201}
            priority
            src={assets.logo}
            width={1733}
          />
        </a>

        <a
          className={`rounded-[7px] bg-white px-3 py-2 text-xs font-semibold capitalize text-black transition ${
            isButtonEnabled 
              ? "hover:bg-white/90 cursor-pointer" 
              : "opacity-50 cursor-not-allowed"
          } max-sm:px-[11px] max-sm:text-sm sm:text-sm`}
          href={isButtonEnabled ? WHATSAPP_LINK : undefined}
          onClick={handleClick}
          style={{ pointerEvents: isButtonEnabled ? "auto" : "none" }}
        >
          Meet Bibi — It&apos;s Free
        </a>
      </div>
    </header>
  );
}