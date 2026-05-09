import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
