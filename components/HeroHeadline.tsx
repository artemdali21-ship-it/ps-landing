"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Parallax via native scroll listener writing directly to ref.style.transform.
// No useScroll(), no MotionValue in style prop — Framer Motion never runs
// its scroll-offset detection, so "non-static position" warning is impossible.
export default function HeroHeadline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (ref.current) {
        ref.current.style.transform = `translateY(${-(window.scrollY * 0.09)}px)`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} style={{ willChange: "transform" }}>
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
