import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = "https://rishichoubey.dev"; // TODO: replace

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rishi Choubey — Senior Frontend Engineer (React · Next.js · Accessibility)",
    template: "%s — Rishi Choubey",
  },
  description:
    "Senior frontend engineer in Jabalpur, India. 4+ years building fast, accessible React & Next.js products. Ask my AI assistant anything about my work.",
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "Accessibility",
    "WCAG",
    "Web Performance",
    "Senior Frontend",
    "India",
  ],
  authors: [{ name: "Rishi Choubey" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Rishi Choubey — Senior Frontend Engineer",
    description:
      "React, Next.js, and accessibility specialist. Explore my work or chat with my AI stand-in.",
    siteName: "Rishi Choubey",
  },
  twitter: { card: "summary_large_image", creator: "@rishichoubey" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipLink />
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
