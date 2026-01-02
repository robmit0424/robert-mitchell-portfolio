import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { SpaceDust } from "@/components/effects/SpaceDust";
import { GlobalContactModal } from "@/components/ui/GlobalContactModal";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://robertmitchell.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Robert Mitchell | Senior Software Engineer",
    template: "%s | Robert Mitchell",
  },
  description:
    "Senior Software Engineer with 3+ years of experience building and scaling consumer and B2B web applications. Specialized in React, React Native, and Next.js with a track record of shipping features used by 50,000+ monthly users.",
  keywords: [
    "Robert Mitchell",
    "Software Engineer",
    "Senior Software Engineer",
    "React Developer",
    "React Native Developer",
    "Next.js Developer",
    "TypeScript",
    "Full Stack Developer",
    "Frontend Engineer",
    "Charleston SC",
    "Web Developer",
  ],
  authors: [{ name: "Robert Mitchell", url: siteUrl }],
  creator: "Robert Mitchell",
  publisher: "Robert Mitchell",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Robert Mitchell Portfolio",
    title: "Robert Mitchell | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in React, React Native, and Next.js. Building and scaling web applications used by 50,000+ monthly users.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Mitchell | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in React, React Native, and Next.js. Building web apps used by 50,000+ monthly users.",
    creator: "@robmit0424",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <LoadingProvider>
          <ContactModalProvider>
            <SpaceDust />
            {children}
            <GlobalContactModal />
          </ContactModalProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
