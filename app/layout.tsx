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

export const metadata: Metadata = {
  title: "Robert Mitchell | Senior Software Engineer",
  description: "Senior Software Engineer with 3+ years of experience building and scaling consumer and B2B web applications. Specialized in React, React Native, and Next.js.",
  keywords: ["Software Engineer", "React", "Next.js", "TypeScript", "Full Stack Developer", "Charleston SC"],
  authors: [{ name: "Robert Mitchell" }],
  openGraph: {
    title: "Robert Mitchell | Senior Software Engineer",
    description: "Senior Software Engineer specializing in React, React Native, and Next.js",
    type: "website",
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
