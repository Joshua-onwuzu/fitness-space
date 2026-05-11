import { absoluteUrl, siteConfig } from "./site";

export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${siteConfig.siteUrl}/#organization`,
        "@type": "Organization",
        description:
          "Fitness Space builds AI-assisted nutrition, fitness, and accountability systems around Nigerian food, African meals, and sustainable weight loss habits.",
        logo: absoluteUrl("/figma/logo.png"),
        name: siteConfig.brandName,
        url: siteConfig.siteUrl,
      },
      {
        "@id": `${siteConfig.siteUrl}/#website`,
        "@type": "WebSite",
        about: [
          "AI nutrition coach",
          "AI fitness coach",
          "Nigerian food weight loss",
          "African meal tracking",
          "fitness accountability",
        ],
        description: siteConfig.description,
        inLanguage: "en",
        name: siteConfig.brandName,
        publisher: {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
        url: siteConfig.siteUrl,
      },
      {
        "@id": `${siteConfig.siteUrl}/#bibi`,
        "@type": "SoftwareApplication",
        applicationCategory: siteConfig.appCategory,
        audience: {
          "@type": "Audience",
          audienceType: siteConfig.audience,
        },
        description:
          "Bibi is the Fitness Space AI nutrition and fitness coach that helps users balance Nigerian meals, follow daily home workouts, track fasting and habits, and build accountability.",
        image: absoluteUrl(siteConfig.defaultImage),
        isAccessibleForFree: true,
        name: siteConfig.productName,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          description:
            "14-day free trial; standard subscription is ₦5,000 per month.",
          price: "0",
          priceCurrency: "NGN",
          url: siteConfig.signupUrl,
        },
        operatingSystem: "Web",
        publisher: {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
        url: siteConfig.siteUrl,
      },
    ],
  };
}
