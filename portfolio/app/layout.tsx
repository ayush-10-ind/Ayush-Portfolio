import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F1E8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = "https://ayush-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ayush Trivedi — Where Creativity Meets Code",
  description:
    "An interactive hand-drawn 3D walkthrough portfolio of Ayush Trivedi — Computer Science student at NIET Gr. Noida (8.4 CGPA), Java 21/Spring Boot 3 engineer (AgniPress), and Explainable AI researcher.",
  keywords: [
    "Ayush Trivedi",
    "Software Engineer",
    "Java Developer",
    "Spring Boot 3",
    "AgniPress",
    "Explainable AI",
    "NIET Greater Noida",
  ],
  authors: [{ name: "Ayush Trivedi" }],
  creator: "Ayush Trivedi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Ayush Trivedi — Where Creativity Meets Code",
    description:
      "A hand-drawn 3D storyboard journey through Ayush Trivedi's engineering world.",
    siteName: "Ayush Trivedi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Trivedi — Where Creativity Meets Code",
    description:
      "A hand-drawn 3D storyboard journey through Ayush Trivedi's engineering world.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[#F5F1E8] text-[#1A1D20] antialiased selection:bg-[#F7EDE8] selection:text-[#D96B43]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}