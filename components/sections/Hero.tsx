"use client";
// hero-v5
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const bgColor = useTransform(scrollY, [0, 600], ["#FAF6F0", "#F2E8D4"]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-24 px-5 md:px-20 flex items-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <motion.p
          className="eyebrow"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          AI Systems Consultancy
        </motion.p>

        <motion.h1
          className="font-outfit font-black uppercase tracking-tight leading-none"
          style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          ОСВОБОЖДАЕМ ВРЕМЯ<br />
          ДЛЯ ТОГО, ЧТО<br />
          <span className="text-crimson">ВАЖНО.</span>
        </motion.h1>

        <motion.p
          className="font-inter font-light text-taupe text-xl leading-relaxed max-w-2xl"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          AI-системы, которые работают.
        </motion.p>

        <motion.p
          className="font-space-grotesk font-medium text-crimson text-base"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Не начинайте с решения. Начните с результата.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 pt-2"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <a href="#cta" className="btn-primary text-center">
            Разобрать кейс
          </a>
        </motion.div>

        <motion.p
          className="font-inter font-light text-taupe text-sm leading-relaxed max-w-sm"
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Покажите 2–3 реальных задачи — мы скажем что можно собрать, сколько
          стоит и с чего начать.
        </motion.p>
      </div>
    </motion.section>
  );
}
