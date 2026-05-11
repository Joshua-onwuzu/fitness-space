const fallbackSiteUrl = "https://fitnessspace.app";

function normalizeUrl(value: string | undefined, fallback: string) {
  const rawValue = value?.trim() || fallback;
  return rawValue.replace(/\/+$/, "");
}

export const siteConfig = {
  appCategory: "HealthApplication",
  audience:
    "Nigeria-first women and African diaspora users who want sustainable weight loss with familiar foods.",
  brandName: "Fitness Space",
  defaultImage: "/figma/coach.png",
  description:
    "Fitness Space is a Nigerian food-aware AI weight loss app with Bibi, an AI nutrition and fitness coach for meals, workouts, fasting, habits, and accountability.",
  keywords: [
    "AI nutrition coach",
    "AI fitness coach",
    "AI meal planner",
    "AI weight loss coach",
    "personalized weight loss app",
    "fitness accountability app",
    "meal planning app for Nigerian food",
    "Nigerian weight loss app",
    "African food calorie tracker",
    "AI meal tracker for African food",
  ],
  productName: "Bibi",
  signupUrl: normalizeUrl(
    process.env.NEXT_PUBLIC_SIGNUP_URL,
    `${normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, fallbackSiteUrl)}/signup`,
  ),
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, fallbackSiteUrl),
  title:
    "Fitness Space | Bibi AI Nutrition Coach For Nigerian Weight Loss",
} as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
