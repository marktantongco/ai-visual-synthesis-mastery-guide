import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Visual Synthesis Mastery Guide 2026",
  description: "A comprehensive knowledge base for AI practitioners seeking production-grade consistency through physics-first visual engineering. Master technical prompt engineering, optical physics, photographic literacy, and more.",
  keywords: [
    "AI Visual Synthesis", 
    "Prompt Engineering", 
    "Physics-First",
    "Midjourney", 
    "Stable Diffusion", 
    "DALL-E",
    "Flux",
    "Photorealism",
    "AI Art",
    "Visual Engineering",
    "Lighting Ratios",
    "Focal Length",
    "Subsurface Scattering"
  ],
  authors: [{ name: "AI Visual Synthesis Guide" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "AI Visual Synthesis Mastery Guide 2026",
    description: "Physics-First Visual Engineering - Think Periodic Table, Not Textbook",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Visual Synthesis Mastery Guide 2026",
    description: "Physics-First Visual Engineering - Think Periodic Table, Not Textbook",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0A] text-white`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
