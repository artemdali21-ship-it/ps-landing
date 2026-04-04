"use client";

import { motion } from "framer-motion";

export default function WhatWeDo() {
  return (
    <section className="glass-section min-h-screen flex items-center section-padding">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── LEFT: text ─────────────────────────────────────────────── */}
          <div>
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
              className="h2 mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Убираем рутину. Снижаем шум.{" "}
              <span className="text-crimson">Делаем процесс управляемым.</span>
            </motion.h2>

            <div className="flex flex-col gap-5 font-outfit font-light text-taupe text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Повторяющиеся задачи работают сами. Люди занимаются тем, для чего нужны люди.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Входящие, документы, знания, решения — каждый процесс получает логику, память и контроль.
              </motion.p>
            </div>

            <motion.div
              className="mt-12 pt-10 border-t border-stone"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-outfit font-medium text-espresso text-xl leading-relaxed max-w-lg">
                Вам не нужно понимать как устроена система.<br />
                <span className="text-crimson">Вам нужно чтобы она работала.</span>
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
