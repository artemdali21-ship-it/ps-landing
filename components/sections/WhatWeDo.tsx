"use client";

import { motion } from "framer-motion";

export default function WhatWeDo() {
  return (
    <section className="glass-section min-h-screen flex items-center section-padding">
      <div className="w-full max-w-4xl mx-auto">
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
          className="h2 mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Убираем рутину. Снижаем шум. Делаем процесс управляемым.
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
            Вам не нужно понимать как устроена система.{" "}
            <span className="text-crimson">Вам нужно чтобы она работала.</span>
          </p>
          <p className="micro-phrase mt-4">Снаружи — просто. Внутри — глубоко.</p>
        </motion.div>
      </div>
    </section>
  );
}
