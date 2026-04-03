"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// Isolated parallax wrapper — only mounts on client, avoids SSR/hydration mismatch
function ParallaxLayer({
  speed,
  children,
  className,
}: {
  speed: number;
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, speed]);
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-24 px-5 md:px-20 flex items-center overflow-hidden"
      style={{ backgroundColor: "#FAF6F0" }}
    >
      <div className="w-full max-w-5xl flex flex-col gap-8">

        {mounted ? (
          <ParallaxLayer speed={-30}>
            <motion.p className="eyebrow" custom={0} variants={fadeUp} initial="hidden" animate="show">
              AI Systems Consultancy
            </motion.p>
          </ParallaxLayer>
        ) : (
          <motion.p className="eyebrow" custom={0} variants={fadeUp} initial="hidden" animate="show">
            AI Systems Consultancy
          </motion.p>
        )}

        {mounted ? (
          <ParallaxLayer speed={-65}>
            <motion.h1
              className="font-outfit font-black uppercase tracking-tight leading-none"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
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
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {"ВАЖНО."}
              </motion.span>
            </motion.h1>
          </ParallaxLayer>
        ) : (
          <motion.h1
            className="font-outfit font-black uppercase tracking-tight leading-none"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {"ОСВОБОЖДАЕМ ВРЕМЯ"}<br />
            {"ДЛЯ ТОГО, ЧТО"}<br />
            {"ДЕЙСТВИТЕЛЬНО"}<br />
            <span className="text-crimson">{"ВАЖНО."}</span>
          </motion.h1>
        )}

        {mounted ? (
          <ParallaxLayer speed={-100} className="flex flex-col gap-5">
            <motion.p
              className="font-inter font-light text-taupe text-xl leading-relaxed max-w-2xl"
              custom={2} variants={fadeUp} initial="hidden" animate="show"
            >
              {"AI-системы, которые работают."}
            </motion.p>
            <motion.p
              className="font-space-grotesk font-medium text-crimson text-base"
              custom={3} variants={fadeUp} initial="hidden" animate="show"
            >
              {"Не начинайте с решения. Начните с результата."}
            </motion.p>
          </ParallaxLayer>
        ) : (
          <div className="flex flex-col gap-5">
            <p className="font-inter font-light text-taupe text-xl leading-relaxed max-w-2xl">
              {"AI-системы, которые работают."}
            </p>
            <p className="font-space-grotesk font-medium text-crimson text-base">
              {"Не начинайте с решения. Начните с результата."}
            </p>
          </div>
        )}

        <motion.div className="flex flex-col gap-4" custom={4} variants={fadeUp} initial="hidden" animate="show">
          <a href="#cta" className="btn-primary text-center w-fit">
            {"Разобрать кейс"}
          </a>
          <p className="font-inter font-light text-taupe text-sm leading-relaxed max-w-sm">
            {"Покажите 2–3 реальных задачи — мы скажем что можно собрать, сколько стоит и с чего начать."}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
