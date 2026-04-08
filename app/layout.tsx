import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit-var",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk-var",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono-var",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
  weight: ["300", "400", "500"],
});

const SITE_URL = "https://polishchuk-ai-systems.ru";

export const metadata: Metadata = {
  title: "Polishchuk AI Systems — AI-системы, которые работают",
  description:
    "Освобождаем время для того, что действительно важно. Не начинайте с решения — начните с результата.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Polishchuk AI Systems",
    description: "Освобождаем время для того, что действительно важно.",
    images: [
      {
        url: `${SITE_URL}/og-bg.webp?v=2`,
        width: 1200,
        height: 630,
        alt: "Polishchuk AI Systems",
      },
    ],
    type: "website",
    url: SITE_URL,
    locale: "ru_RU",
    siteName: "Polishchuk AI Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polishchuk AI Systems",
    description: "Освобождаем время для того, что действительно важно.",
    images: [`${SITE_URL}/og-bg.webp?v=2`],
  },
  icons: {
    icon: "/Fly.png",
    apple: "/Fly.png",
  },
};

export const viewport = { themeColor: "#FAF6F0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Preload hero scenes for fast LCP */}
        <link rel="preload" as="image" href="/images/scenes/1-desktop.webp" media="(min-width: 768px)" />
        <link rel="preload" as="image" href="/images/scenes/1-mobile.webp" media="(max-width: 767px)" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
        {/* Preload hero scenes — LCP images, критически важно для PageSpeed */}
        <link rel="preload" as="image" href="/images/scenes/1-desktop.webp" media="(min-width: 768px)" />
        <link rel="preload" as="image" href="/images/scenes/1-mobile.webp" media="(max-width: 767px)" />
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { background-color: #FAF6F0; color: #1F1410; margin: 0; }

          :root {
            --color-beige: #FAF6F0;
            --color-surface: #F3ECE2;
            --color-border: #D4C8B8;
            --color-crimson: #C41230;
            --color-stone: #D4C8B8;
            --color-taupe: #8A7B6B;
            --color-espresso: #1F1410;
            --color-sand: #F3ECE2;
          }

          .grain-overlay {
            position: fixed; inset: 0; pointer-events: none; z-index: 100;
            opacity: 0.025;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 128px;
          }

          .h1 {
            font-family: 'Satoshi', var(--font-outfit-var), sans-serif;
            font-weight: 900; font-size: clamp(1.75rem, 8vw, 5rem);
            line-height: 1.05; color: #1F1410;
            text-transform: uppercase; letter-spacing: -0.02em;
          }
          .h2 {
            font-family: 'Satoshi', var(--font-outfit-var), sans-serif;
            font-weight: 900; font-size: clamp(1.8rem, 4vw, 3.5rem);
            line-height: 1.1; color: #1F1410;
            text-transform: uppercase; letter-spacing: -0.01em;
          }
          .h3 {
            font-family: 'Satoshi', var(--font-outfit-var), sans-serif;
            font-weight: 700; color: #1F1410;
            font-size: clamp(24px, 3vw, 36px); line-height: 1.2;
          }
          .eyebrow {
            font-family: var(--font-space-grotesk-var), sans-serif;
            font-weight: 500; font-size: 0.7rem;
            text-transform: uppercase; letter-spacing: 0.18em; color: #8A7B6B;
          }
          .btn-primary {
            display: inline-block; background: #C41230; color: #FAF6F0;
            font-family: var(--font-space-grotesk-var), sans-serif;
            font-weight: 600; font-size: 0.7rem;
            text-transform: uppercase; letter-spacing: 0.15em;
            padding: 0.875rem 2rem; border-radius: 2px; transition: all 0.2s ease;
            text-decoration: none;
          }
          .btn-primary:hover { background: #D42040; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(196,18,48,0.25); }
          .btn-ghost {
            display: inline-block; background: transparent; color: #1F1410;
            font-family: var(--font-space-grotesk-var), sans-serif;
            font-weight: 600; font-size: 0.7rem;
            text-transform: uppercase; letter-spacing: 0.15em;
            padding: 0.875rem 2rem; border-radius: 2px;
            border: 1px solid #D4C8B8; transition: all 0.2s ease;
            text-decoration: none;
          }
          .btn-ghost:hover { border-color: #1F1410; }
          .section-padding { padding: 7rem 1.25rem; }
          @media (min-width: 768px) { .section-padding { padding: 9rem 5rem; } }
          .card { background: #F3ECE2; border: 1px solid #D4C8B8; border-radius: 2px; padding: 2rem; }
          .micro-phrase {
            font-family: var(--font-space-grotesk-var), sans-serif;
            font-weight: 500; font-size: 0.8rem;
            text-transform: uppercase; letter-spacing: 0.12em; color: #8A7B6B;
          }
          .glass-section {
            background: rgba(250,246,240,0.88);
            backdrop-filter: blur(24px) saturate(160%);
            -webkit-backdrop-filter: blur(24px) saturate(160%);
          }
          .glass-card {
            background: rgba(255,255,255,0.45);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255,255,255,0.70);
            box-shadow: 0 8px 32px rgba(31,20,16,0.08), inset 0 1px 0 rgba(255,255,255,0.6);
            border-radius: 4px;
          }
          .glass-card-dark {
            background: rgba(31,20,16,0.55);
            backdrop-filter: blur(20px) saturate(160%);
            -webkit-backdrop-filter: blur(20px) saturate(160%);
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
            border-radius: 4px;
          }

          /* Tailwind color utilities needed */
          .text-crimson { color: #C41230 !important; }
          .text-taupe { color: #8A7B6B !important; }
          .text-espresso { color: #1F1410 !important; }
          .text-beige { color: #FAF6F0 !important; }
          .bg-crimson { background-color: #C41230 !important; }
          .bg-surface { background-color: #F3ECE2 !important; }
          .bg-stone { background-color: #D4C8B8 !important; }
          .border-stone { border-color: #D4C8B8 !important; }
          .bg-stone\\/20 { background-color: rgba(212,200,184,0.20) !important; }
          .border-stone\\/30 { border-color: rgba(212,200,184,0.30) !important; }
        ` }} />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable} antialiased`}
        style={{ backgroundColor: "#FAF6F0", color: "#1F1410" }}
      >
        {children}
      </body>
    </html>
  );
}
