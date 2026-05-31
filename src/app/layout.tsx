import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./Providers";

const siteName = "Fitness Space";
const tagline =
  "Your System for Healthy Living, Sustainable Weight Loss & Long-Term Wellness";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.getfitness.space";
const ogImage = "/og-image.png";

export const metadata: Metadata = {
  title: siteName,
  description: tagline,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteName,
    description: tagline,
    url: siteUrl,
    siteName,
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1536,
        height: 1024,
        alt: `${siteName}: ${tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: tagline,
    images: [
      {
        url: ogImage,
        alt: `${siteName}: ${tagline}`,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/figma/logo.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
