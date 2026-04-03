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

export const metadata: Metadata = {
  title: "Polishchuk Systems — AI-системы, которые работают",
  description:
    "Проектируем, строим и внедряем AI-системы для бизнеса. Микросистемы, рабочие системы, экспертные системы. От 150 000 ₽.",
  openGraph: {
    title: "Polishchuk Systems — AI-системы, которые работают",
    description:
      "Освобождаем время для того, что действительно важно. Не начинайте с решения — начните с результата.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  themeColor: "#FAF6F0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
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
