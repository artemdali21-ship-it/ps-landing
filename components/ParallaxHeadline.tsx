"use client";
// v2 — no MotionValue in style prop, no useScroll, no Framer scroll detection
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * ParallaxHeadline — scroll-driven parallax WITHOUT MotionValue in style prop.
 *
 * Framer Motion triggers "non-static position" warning when a MotionValue
 * is passed as style.y — it internally checks the container's CSS position.
 *
 * Fix: read scrollY manually in useEffect and write to the DOM element
 * directly via ref, bypassing Framer Motion's scroll detection entirely.
 */
export default function ParallaxHeadline() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!wrapperRef.current) return;
      const y = -(window.scrollY * 0.09);
      wrapperRef.current.style.transform = `translateY(${y}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapperRef} style={{ willChange: "transform" }}>
      <motion.h1
        className="font-outfit font-black uppercase tracking-tight leading-none"
        style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {"ОСВОБОЖДАЕМ ВРЕМЯ"}<br />
        {"ДЛЯ ТОГО, ЧТО"}<br />
        {"ДЕЙСТВИТЕЛЬНО"}<br />
        <motion.span
          className="text-crimson inline-block"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {"ВАЖНО."}
        </motion.span>
      </motion.h1>
    </div>
  );
}
