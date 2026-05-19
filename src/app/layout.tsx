import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Fitness space",
  description:
    "Bibi is the AI coach from Fitness Space for sustainable weight loss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}