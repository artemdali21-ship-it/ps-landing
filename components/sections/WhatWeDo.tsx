"use client";

import { motion } from "framer-motion";

export default function WhatWeDo() {
  return (
    <section id="whatwedo" className="glass-section min-h-screen flex items-center section-padding">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── LEFT: text (+ mobile heart behind) ────────────────────── */}
          <div style={{ position: "relative" }}>
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Что мы делаем
            </motion.p>

            <motion.h2
              className="mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "Satoshi, system-ui, sans-serif",
                fontWeight: 700,
                lineHeight: 1.15,
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              }}
            >
              Создаём <span className="text-crimson">AI-системы для бизнеса,</span>{" "}
              встроенные в Ваши процессы, работающие
              на Ваших данных и дающие{" "}
              <span className="text-crimson">предсказуемый результат.</span>
            </motion.h2>

            {/* Mobile heart — behind text, only on mobile */}
            <motion.img
              src="/images/objects/img-4781.webp"
              alt=""
              className="md:hidden"
              style={{
                position: "absolute",
                right: -30,
                top: "50%",
                transform: "translateY(-50%)",
                width: "55%",
                maxWidth: 240,
                height: "auto",
                opacity: 0.18,
                mixBlendMode: "multiply",
                filter: "blur(1px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="mt-16 md:mt-12 pt-10 border-t border-stone"
              style={{ position: "relative", zIndex: 1 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-outfit font-medium text-espresso text-xl leading-relaxed max-w-lg">
                Вам не нужно понимать,{" "}
                <br className="md:hidden" />
                как устроена система.<br />
                <span className="text-crimson">Вам нужно, чтобы она работала.</span>
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D heart with flowers ───────────────────────────── */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          >
            <motion.img
              src="/images/objects/img-4781.webp"
              alt=""
              style={{
                width: "88%",
                maxWidth: 380,
                height: "auto",
                display: "block",
                mixBlendMode: "multiply",
                filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))",
              }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
