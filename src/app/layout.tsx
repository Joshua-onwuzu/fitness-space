import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  applicationName: siteConfig.brandName,
  category: "health and fitness",
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: "Bibi, the Fitness Space AI nutrition and fitness coach",
        height: 1448,
        url: absoluteUrl(siteConfig.defaultImage),
        width: 1086,
      },
    ],
    locale: "en_NG",
    siteName: siteConfig.brandName,
    title: siteConfig.title,
    type: "website",
    url: siteConfig.siteUrl,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: siteConfig.title,
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.defaultImage)],
    title: siteConfig.title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
