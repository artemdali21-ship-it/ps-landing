"use client";
// v3 — proper spatial distribution, depth, no useScroll

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Papers — scattered chaos, appear in first 35% of page scroll
// Each has a distinct position: left/right/top/bottom, varying sizes for depth illusion
const PAPERS = [
  // Far-left, high — large, blurry (feels close)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.44-d7LWc5xENHhM617BOTPsFN8BB6dUW0.png",
    alt: "Crumpled brown paper", size: 220, x: "4%", y: "8%", delay: 0, dur: 7, rot: -14, fy: 22, blur: 0 },
  // Right side, mid-height — medium
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.33-tOrYpKo8TrXLpxrZrSKgpj744woPri.png",
    alt: "Yellow paper ball", size: 160, x: "80%", y: "10%", delay: 0.9, dur: 8, rot: 22, fy: 16, blur: 0 },
  // Centre-right, below fold — small (distance)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.22-MOn01q5QVnHwn4ju1WTipr7FSP4s8t.png",
    alt: "Lined crumpled paper", size: 110, x: "58%", y: "68%", delay: 1.5, dur: 9, rot: -7, fy: 12, blur: 1 },
  // Left, lower — medium
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.02-80Y7YzQy4lc4jZEmbvwA7MOiinlBtE.png",
    alt: "Notebook page", size: 145, x: "18%", y: "62%", delay: 2.1, dur: 6.5, rot: 17, fy: 18, blur: 0 },
  // Far right, very small (deep background)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-03%20%D0%B2%2010.43.19-wKwiyxuK56gn5DdtvUxltkappZvNXf.png",
    alt: "Newspaper ball", size: 85, x: "88%", y: "52%", delay: 0.4, dur: 11, rot: -20, fy: 10, blur: 2 },
];

// Marble head — centrepiece at 28–55% scroll, right side, large
const HEAD = {
  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4774-8Q2F0adp4ZFgZU7fYabeenn8h8omqk.png",
  alt: "Marble fragmented head", size: 420, x: "64%", y: "8%", delay: 0, dur: 12, rot: 5, fy: 28, blur: 0,
};

// Robots — spread across full screen in final 50% of scroll
const ROBOTS = [
  // Top-left, large — butterfly
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4500-z6ecRxAWAL3Qs5yWulSSpAXYNjczo3.png",
    alt: "Chrome butterfly", size: 300, x: "2%", y: "5%", delay: 0, dur: 10, rot: -8, fy: 32, blur: 0 },
  // Right, upper-mid — robotic heart, medium
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4781-zhqumx5nwXXHXxvyo8QEJfWKDfdWDd.png",
    alt: "Robotic heart cherry blossom", size: 200, x: "78%", y: "8%", delay: 1.3, dur: 13, rot: 10, fy: 24, blur: 0 },
  // Centre-bottom, small (distance)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4780-xGf99NqLPRpYQbgWEXPDQElR1rzyOx.png",
    alt: "Robot hand flower", size: 130, x: "42%", y: "62%", delay: 0.7, dur: 9, rot: -4, fy: 16, blur: 1 },
  // Right-lower, large cube
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4793-RuToXTbYuhAzDcnci9hP2NDeqEBPGb.png",
    alt: "Metallic cube", size: 280, x: "68%", y: "50%", delay: 2.0, dur: 14, rot: 16, fy: 30, blur: 0 },
  // Left-mid, medium
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4792-3yG2hF2y89XtcmP3UzMAGGOzoSJW7s.png",
    alt: "Green crystal cube", size: 180, x: "12%", y: "42%", delay: 2.5, dur: 11, rot: -13, fy: 20, blur: 0 },
  // Far-right bottom, tiny (deepest background)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4791-puETQVQVOw0ERcszFP2hmHxoXIHkER.png",
    alt: "Crystal flower island", size: 95, x: "85%", y: "72%", delay: 1.0, dur: 10, rot: 20, fy: 12, blur: 2 },
];

type ObjData = {
  src: string; alt: string; size: number;
  x: string; y: string; delay: number; dur: number;
  rot: number; fy: number; blur: number;
};

function FloatItem({
  src, alt, size, x, y, delay, dur, rot, fy, blur,
  enterAt, exitAt,
  scrollProgress,
}: ObjData & {
  enterAt: number;
  exitAt: number;
  scrollProgress: ReturnType<typeof useMotionValue<number>>;
}) {
  const outerRef = useRef<HTMLDivElement>(null);

  const fadeIn = Math.min(enterAt + 0.05, exitAt);
  const fadeOut = Math.max(exitAt - 0.05, enterAt);

  const opacity = useTransform(
    scrollProgress,
    [enterAt, fadeIn, fadeOut, exitAt],
    [0, 1, 1, 0]
  );

  // Write parallax directly to DOM — no MotionValue in style prop,
  // so Framer Motion never runs its scroll-detection/container check.
  useEffect(() => {
    return scrollProgress.on("change", (v) => {
      if (!outerRef.current) return;
      const range = exitAt - enterAt;
      const local = range > 0 ? (v - enterAt) / range : 0;
      const py = local * -80 + 20;
      outerRef.current.style.transform = `translateY(${py}px) rotate(${rot}deg)`;
    });
  }, [scrollProgress, enterAt, exitAt, rot]);

  return (
    <motion.div
      ref={outerRef}
      className="absolute pointer-events-none select-none"
      style={{
        left: x,
        top: y,
        width: size,
        opacity,
        rotate: rot,
        transform: `translateY(20px) rotate(${rot}deg)`,
      }}
    >
      <motion.div
        style={{
          filter: blur > 0
            ? `drop-shadow(0 24px 48px rgba(0,0,0,0.2)) blur(${blur}px)`
            : "drop-shadow(0 24px 48px rgba(0,0,0,0.2))",
        }}
        animate={{ y: [0, -fy, 0] }}
        transition={{
          y: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={size} height={size} className="w-full h-auto" draggable={false} />
      </motion.div>
    </motion.div>
  );
}

export default function Objects3D() {
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      scrollProgress.set(window.scrollY / max);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Phase 1: Papers (0 – 35%) */}
      {PAPERS.map((obj, i) => (
        <FloatItem key={`p${i}`} {...obj} enterAt={0} exitAt={0.35} scrollProgress={scrollProgress} />
      ))}

      {/* Phase 2: Marble Head (28 – 58%) */}
      <FloatItem {...HEAD} enterAt={0.28} exitAt={0.58} scrollProgress={scrollProgress} />

      {/* Phase 3: Robots (50 – 100%), staggered entry */}
      {ROBOTS.map((obj, i) => (
        <FloatItem
          key={`r${i}`}
          {...obj}
          enterAt={0.50 + i * 0.03}
          exitAt={1.0}
          scrollProgress={scrollProgress}
        />
      ))}
    </div>
  );
}
