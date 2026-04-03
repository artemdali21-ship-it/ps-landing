"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="section-padding text-center relative overflow-hidden"
      style={{ backgroundColor: "#EDE5D5" }}
    >
      {/* Breathing background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 0.04, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle at 50% 50%, #C41230 0%, transparent 70%)" }}
      />

      <motion.div
        className="max-w-2xl mx-auto flex flex-col items-center gap-8 relative z-10"
      >
        <motion.h2
          className="h2"
          style={{ y: headlineY, opacity: headlineOpacity }}
        >
          Начнём с результата.
        </motion.h2>

        <motion.p
          className="font-inter font-light text-taupe text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Покажите 2–3 реальных задачи — мы скажем какой формат, сколько стоит
          и что можно проверить пилотом.
        </motion.p>

        <motion.div
          className="flex flex-row gap-4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <motion.a
            href="https://t.me/spaces_love"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary relative overflow-visible"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(196,18,48,0)",
                "0 0 0 10px rgba(196,18,48,0.12)",
                "0 0 0 20px rgba(196,18,48,0)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          >
            Telegram
          </motion.a>
          <a href="mailto:a.polishchuk21@yandex.com" className="btn-ghost text-center">
            Email
          </a>
        </motion.div>

        <motion.p
          className="font-inter font-light text-taupe text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          30 минут. Без обязательств.
        </motion.p>
      </motion.div>
    </section>
  );
}
