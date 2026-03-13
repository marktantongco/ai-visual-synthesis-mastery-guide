import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* ─── SEO Metadata ───────────────────────────────────────────────────── */
const BASE_URL = "https://ai-visual-synthesis.vercel.app"; // update when custom domain deployed

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "AI Visual Synthesis Mastery — Complete 2026 Guide",
    template: "%s | AI Visual Synthesis",
  },

  description:
    "Master AI image generation in 2026. Interactive guide to Midjourney, DALL·E 3, Stable Diffusion, Flux.1 — with 80+ prompt templates, technique breakdowns, and the 6-layer AI Practitioner Skills Framework.",

  keywords: [
    "AI image generation",
    "visual synthesis",
    "prompt engineering",
    "Midjourney guide",
    "DALL·E 3",
    "Stable Diffusion tutorial",
    "Flux.1",
    "AI art techniques",
    "LoRA training",
    "ControlNet",
    "AI practitioner 2026",
    "text to image",
    "generative AI art",
    "AI photo realistic",
    "prompt templates",
  ],

  authors: [{ name: "AI Visual Synthesis" }],
  creator: "AI Visual Synthesis",
  publisher: "AI Visual Synthesis",

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

  /* ─── Open Graph ─────────────────────────────────────────────────── */
  openGraph: {
    title: "AI Visual Synthesis Mastery — Complete 2026 Guide",
    description:
      "Master AI image generation: Midjourney, DALL·E 3, Stable Diffusion, Flux.1. 80+ prompts. 6-layer Skills Framework. Interactive learning tools.",
    url: BASE_URL,
    siteName: "AI Visual Synthesis",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Visual Synthesis Mastery Guide 2026",
      },
    ],
  },

  /* ─── Twitter / X Card ───────────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: "AI Visual Synthesis Mastery — 2026 Guide",
    description:
      "The complete interactive guide to AI image generation. Midjourney, DALL·E 3, Stable Diffusion, Flux.1 + 80 prompt templates.",
    images: ["/og-image.png"],
    creator: "@aivisualsynth",
  },

  /* ─── Canonical + Alt langs ─────────────────────────────────────── */
  alternates: {
    canonical: BASE_URL,
  },

  /* ─── App / PWA ──────────────────────────────────────────────────── */
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },

  /* ─── Verification (add tokens from Google Search Console) ──────── */
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  // },
};

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AI Visual Synthesis",
  url: BASE_URL,
  description:
    "Complete interactive guide to AI image generation, visual synthesis, and prompt engineering.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Visual Synthesis Mastery",
  description:
    "The 2026 AI Practitioner Skills Framework: a 6-layer competency path from prompt engineering to agent orchestration.",
  provider: {
    "@type": "Organization",
    name: "AI Visual Synthesis",
    url: BASE_URL,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    isAccessibleForFree: true,
  },
};

/* ─── Root Layout ────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-dark-900 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
