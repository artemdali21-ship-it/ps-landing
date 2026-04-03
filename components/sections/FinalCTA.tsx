"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="section-padding text-center"
      style={{ backgroundColor: "#EDE5D5" }}
    >
      <motion.div
        className="max-w-2xl mx-auto flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="h2">Начнём с результата.</h2>

        <p className="font-inter font-light text-taupe text-lg leading-relaxed">
          Покажите 2–3 реальных задачи — мы скажем какой формат, сколько стоит
          и что можно проверить пилотом.
        </p>

        {/* Buttons row */}
        <div className="flex flex-row gap-4 pt-2">
          {/* Primary CTA with pulse */}
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
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            Telegram
          </motion.a>
          <a href="mailto:a.polishchuk21@yandex.com" className="btn-ghost text-center">
            Email
          </a>
        </div>

        <p className="font-inter font-light text-taupe text-sm">
          30 минут. Без обязательств.
        </p>
      </motion.div>
    </section>
  );
}
