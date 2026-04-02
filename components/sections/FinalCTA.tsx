"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cta"
      className="section-padding bg-sand text-center"
      ref={ref}
    >
      <motion.div
        className="max-w-2xl mx-auto flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="h2">Начнём с результата.</h2>

        <p className="font-inter font-light text-taupe text-lg leading-relaxed">
          Покажите 2–3 реальных задачи — мы скажем какой формат, сколько стоит
          и что можно проверить пилотом.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <a
            href="https://t.me/polishchuk_systems"
            className="btn-primary text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
          <a href="mailto:hi@polishchuk.systems" className="btn-ghost text-center">
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
