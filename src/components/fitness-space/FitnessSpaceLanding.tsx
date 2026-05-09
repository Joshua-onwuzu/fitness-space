import { LandingHeader } from "./LandingHeader";
import { SectionScroller } from "./SectionScroller";
import {
  BibiDifferentSection,
  BodyFoodSection,
  DataCoachCtaSection,
  DailySystemPointsSection,
  HealthScorePayoffSection,
  MealPlanFailureSection,
  PowerfulFeaturesSection,
  RemainingSystemSections,
  X2FrameworkSection,
} from "./continuation-sections";
import { HeroSection, IntroSection, StatementSection } from "./sections";

export function FitnessSpaceLanding() {
  return (
    <main className="bg-black text-white">
      <LandingHeader />
      <SectionScroller>
        <HeroSection />
        <StatementSection
          body={[
            "Not for your jollof rice. Not for your eba. Not for your budget or your schedule.",
            "You started strong and fell off. Not because you are the problem.",
          ]}
          firstLine="Every Diet You Have Tried"
          highlight="Someone Else"
          id="diet"
          secondLine="Was Built For"
          trailing="."
        />
        <StatementSection
          firstLine="Because The System Was"
          highlight="Today!"
          id="system"
          secondLine="Never Built For You. That Ends"
        />
        <IntroSection id="intro" />
        <BodyFoodSection />
        <DataCoachCtaSection />
        <PowerfulFeaturesSection />
        <X2FrameworkSection />
        <DailySystemPointsSection />
        <MealPlanFailureSection />
        <BibiDifferentSection />
        <HealthScorePayoffSection />
        <RemainingSystemSections />
      </SectionScroller>
    </main>
  );
}
