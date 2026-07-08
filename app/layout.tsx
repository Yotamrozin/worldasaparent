import type { Metadata, Viewport } from "next";
import "../src/styles/index.css";

export const metadata: Metadata = {
  title: "The World as a Parent",
  description:
    "Explore The World as a Parent, a visually engaging one-page website featuring smooth animations, interactive elements, and curated content for parents.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
