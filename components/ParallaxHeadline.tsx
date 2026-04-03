"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// This component uses useScroll — must only run on the client.
// Loaded via dynamic({ ssr: false }) from Hero.tsx to prevent hydration mismatch.
export default function ParallaxHeadline() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -65]);

  return (
    <motion.div style={{ y }}>
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
    </motion.div>
  );
}
