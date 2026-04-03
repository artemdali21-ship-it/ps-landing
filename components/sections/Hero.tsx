"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useState, useEffect } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();

  const bgColor = useTransform(scrollY, [0, 700], ["#FAF6F0", "#F2E8D4"]);
  const eyebrowY = useTransform(scrollY, [0, 700], [0, -30]);
  const headlineY = useTransform(scrollY, [0, 700], [0, -65]);
  const subtitleY = useTransform(scrollY, [0, 700], [0, -100]);
  const ctaY = useTransform(scrollY, [0, 700], [0, -130]);
  const lineScaleX = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <motion.section
      className="relative min-h-screen pt-32 pb-24 px-5 md:px-20 flex items-center overflow-hidden"
      style={mounted ? { backgroundColor: bgColor } : { backgroundColor: "#FAF6F0" }}
    >
      {mounted && (
        <motion.div
          className="absolute bottom-12 left-5 md:left-20 h-px bg-crimson/30 origin-left"
          style={{ scaleX: lineScaleX, width: "clamp(120px, 30vw, 320px)" }}
        />
      )}

      <div className="w-full max-w-5xl flex flex-col gap-8">

        <motion.div style={mounted ? { y: eyebrowY } : {}}>
          <motion.p
            className="eyebrow"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            AI Systems Consultancy
          </motion.p>
        </motion.div>

        <motion.div style={mounted ? { y: headlineY } : {}}>
          <motion.h1
            className="font-outfit font-black uppercase tracking-tight leading-none"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            suppressHydrationWarning
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {"ОСВОБОЖДАЕМ ВРЕМЯ"}<br />
            {"ДЛЯ ТОГО, ЧТО"}<br />
            {"ДЕЙСТВИТЕЛЬНО"}<br />
            <motion.span
              className="text-crimson inline-block"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {"ВАЖНО."}
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.div style={mounted ? { y: subtitleY } : {}} className="flex flex-col gap-5">
          <motion.p
            className="font-inter font-light text-taupe text-xl leading-relaxed max-w-2xl"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {"AI-системы, которые работают."}
          </motion.p>

          <motion.p
            className="font-space-grotesk font-medium text-crimson text-base"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {"Не начинайте с решения. Начните с результата."}
          </motion.p>
        </motion.div>

        <motion.div style={mounted ? { y: ctaY } : {}} className="flex flex-col gap-4">
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <a href="#cta" className="btn-primary text-center">
              {"Разобрать кейс"}
            </a>
          </motion.div>

          <motion.p
            className="font-inter font-light text-taupe text-sm leading-relaxed max-w-sm"
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {"Покажите 2–3 реальных задачи — мы скажем что можно собрать, сколько стоит и с чего начать."}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
