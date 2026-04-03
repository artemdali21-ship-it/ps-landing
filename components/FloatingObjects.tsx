"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * FloatingObjects — full-page fixed overlay.
 * Uses useMotionValue + scroll event instead of useScroll()
 * to avoid the "non-static position" Framer Motion warning.
 *
 * Objects appear in three phases driven by window scroll progress (0–1):
 *   Phase 1 (0–32%):  Papers / бумажки   → Hero chaos zone
 *   Phase 2 (28–55%): Marble head         → ThreeLevels / clarity transition
 *   Phase 3 (50–100%): Robotic objects    → Process / CTA / end of page
 */

// Object catalogue — three phases
const PAPERS = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.44-d7LWc5xENHhM617BOTPsFN8BB6dUW0.png",
    alt: "Crumpled brown paper",
    size: 180,
    x: "8%", y: "18%", delay: 0, duration: 6,
    rotate: -12, floatY: 18,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.33-tOrYpKo8TrXLpxrZrSKgpj744woPri.png",
    alt: "Yellow crumpled paper ball",
    size: 140,
    x: "78%", y: "12%", delay: 0.8, duration: 7,
    rotate: 20, floatY: 14,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.22-MOn01q5QVnHwn4ju1WTipr7FSP4s8t.png",
    alt: "Yellow lined crumpled paper",
    size: 160,
    x: "60%", y: "72%", delay: 1.4, duration: 8,
    rotate: -8, floatY: 20,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.02-80Y7YzQy4lc4jZEmbvwA7MOiinlBtE.png",
    alt: "Crumpled notebook page",
    size: 150,
    x: "22%", y: "65%", delay: 2, duration: 6.5,
    rotate: 15, floatY: 16,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.19-wKwiyxuK56gn5DdtvUxltkappZvNXf.png",
    alt: "Crumpled newspaper",
    size: 170,
    x: "45%", y: "30%", delay: 0.5, duration: 9,
    rotate: -18, floatY: 22,
  },
];

const HEAD = {
  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4774-8Q2F0adp4ZFgZU7fYabeenn8h8omqk.png",
  alt: "Marble fragmented head sculpture",
  size: 340,
  x: "72%", y: "20%", delay: 0, duration: 10,
  rotate: 6, floatY: 24,
};

const ROBOTS = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4500-z6ecRxAWAL3Qs5yWulSSpAXYNjczo3.png",
    alt: "Chrome robotic butterfly",
    size: 260,
    x: "82%", y: "10%", delay: 0, duration: 9,
    rotate: -10, floatY: 30,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4781-zhqumx5nwXXHXxvyo8QEJfWKDfdWDd.png",
    alt: "Robotic heart with cherry blossoms",
    size: 220,
    x: "5%", y: "25%", delay: 1.2, duration: 11,
    rotate: 8, floatY: 26,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4780-xGf99NqLPRpYQbgWEXPDQElR1rzyOx.png",
    alt: "Robot hand holding flower",
    size: 200,
    x: "48%", y: "55%", delay: 0.6, duration: 8,
    rotate: -5, floatY: 20,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4793-RuToXTbYuhAzDcnci9hP2NDeqEBPGb.png",
    alt: "Metallic cube matrix",
    size: 240,
    x: "70%", y: "60%", delay: 1.8, duration: 12,
    rotate: 14, floatY: 28,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4792-3yG2hF2y89XtcmP3UzMAGGOzoSJW7s.png",
    alt: "Green crystal tree cube",
    size: 200,
    x: "20%", y: "70%", delay: 2.2, duration: 10,
    rotate: -12, floatY: 22,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4791-puETQVQVOw0ERcszFP2hmHxoXIHkER.png",
    alt: "Crystal flower rock island",
    size: 220,
    x: "88%", y: "40%", delay: 0.9, duration: 9.5,
    rotate: 18, floatY: 25,
  },
];

// Individual floating object — scroll-driven opacity + parallax
function FloatItem({
  src, alt, size, x, y, delay, duration, rotate, floatY,
  enterAt, exitAt, scrollProgress,
}: {
  src: string; alt: string; size: number;
  x: string; y: string; delay: number; duration: number;
  rotate: number; floatY: number;
  enterAt: number; exitAt: number;
  scrollProgress: ReturnType<typeof useMotionValue<number>>;
}) {
  const opacity = useTransform(
    scrollProgress,
    [enterAt, enterAt + 0.04, exitAt - 0.04, exitAt],
    [0, 1, 1, 0]
  );
  const parallaxY = useTransform(scrollProgress, [enterAt, exitAt], [40, -40]);

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: x,
        top: y,
        width: size,
        opacity,
        y: parallaxY,
        rotate,
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.18))",
      }}
      animate={{ y: [0, -floatY, 0] }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={size} height={size} className="w-full h-auto" />
    </motion.div>
  );
}

export default function FloatingObjects() {
  // Manual scroll progress via MotionValue — avoids useScroll() "non-static container" warning
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      scrollProgress.set(window.scrollY / maxScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  return (
    // Fixed overlay covering full page, pointer-events-none so it doesn't block clicks
    <div
      className="fixed inset-0 z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* === Phase 1: Papers === scroll 0–0.32 */}
      {PAPERS.map((obj, i) => (
        <FloatItem
          key={`paper-${i}`}
          {...obj}
          enterAt={0}
          exitAt={0.32}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* === Phase 2: Marble Head === scroll 0.28–0.55 */}
      <FloatItem
        {...HEAD}
        enterAt={0.28}
        exitAt={0.55}
        scrollProgress={scrollProgress}
      />

      {/* === Phase 3: Robotic objects === scroll 0.50–1.0 */}
      {ROBOTS.map((obj, i) => (
        <FloatItem
          key={`robot-${i}`}
          {...obj}
          enterAt={0.50 + i * 0.005}
          exitAt={1.0}
          scrollProgress={scrollProgress}
        />
      ))}
    </div>
  );
}
