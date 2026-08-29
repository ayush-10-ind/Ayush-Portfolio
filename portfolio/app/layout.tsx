import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#080B10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayush-portfolio.vercel.app";

export const metadata: Metadata = {
  title: "Ayush Trivedi Ã¢â‚¬â€ Software Engineer & CS Student",
  description:
    "Personal portfolio & 3D interactive spatial resume of Ayush Trivedi. Computer Science student at NIET Greater Noida (8.4 CGPA), Java & Spring Boot developer, and Explainable AI (XAI) researcher.",
  keywords: [
    "Ayush Trivedi",
    "Software Engineer",
    "Computer Science",
    "NIET Greater Noida",
    "Java",
    "Python",
    "Spring Boot",
    "Explainable AI",
    "AgniPress",
    "Full-Stack Developer",
  ],
  authors: [{ name: "Ayush Trivedi", url: siteUrl }],
  creator: "Ayush Trivedi",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Ayush Trivedi Ã¢â‚¬â€ Software Engineer & CS Student",
    description:
      "Interactive 3D spatial developer portfolio showcasing AgniPress full-stack publishing platform, Explainable AI research, verified credentials, and grounded portfolio intelligence.",
    siteName: "Ayush Trivedi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Trivedi Ã¢â‚¬â€ Software Engineer & CS Student",
    description:
      "Interactive 3D developer portfolio and spatial resume of Ayush Trivedi. Java, Spring Boot, Python, and Explainable AI research.",
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
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}