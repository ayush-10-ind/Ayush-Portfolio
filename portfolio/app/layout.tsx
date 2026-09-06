import type { Metadata, Viewport } from "next";
// Self-hosted fonts (no build-time network dependency).
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ayush-portfolio.vercel.app";

export const metadata: Metadata = {
  title: "Ayush Trivedi — Software Engineer & CS Student",
  description:
    "An interactive animated film about Ayush Trivedi — Computer Science student at NIET Greater Noida (8.4 CGPA), Java & Spring Boot developer, and Explainable AI researcher. Travel through his world.",
  keywords: [
    "Ayush Trivedi",
    "Software Engineer",
    "Computer Science",
    "NIET Greater Noida",
    "Java",
    "Spring Boot",
    "Python",
    "Explainable AI",
    "AgniPress",
  ],
  authors: [{ name: "Ayush Trivedi", url: siteUrl }],
  creator: "Ayush Trivedi",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Ayush Trivedi — Software Engineer & CS Student",
    description:
      "A cinematic 3D journey through Ayush Trivedi's world: AgniPress full-stack engine, Explainable AI research, verified credentials, and a grounded archive.",
    siteName: "Ayush Trivedi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Trivedi — Software Engineer & CS Student",
    description:
      "A cinematic 3D journey through Ayush Trivedi's engineering world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
