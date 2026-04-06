"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * ScrollProgressBar — тонкая 2px линия crimson вдоль верхнего края navbar.
 * Работает на любом лейауте: читает window.scrollY напрямую.
 * На десктопе скролл принадлежит <html>, на мобайле — тоже.
 */
export default function ScrollProgressBar() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = window.scrollY;
      const total = el.scrollHeight - el.clientHeight;
      scrollY.set(total > 0 ? scrolled / total : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  const scaleX = useTransform(scrollY, [0, 1], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "#C41230",
        scaleX,
        transformOrigin: "left center",
        zIndex: 60,
      }}
    />
  );
}
