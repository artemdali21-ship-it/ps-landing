"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function WhatWeDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-sand" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <h2 className="h2">
            Убираем рутину. Снижаем шум. Делаем процесс управляемым.
          </h2>

          <div className="flex flex-col gap-5 font-inter font-light text-taupe text-lg leading-relaxed">
            <p>
              Повторяющиеся задачи работают сами. Люди занимаются тем, для чего
              нужны люди.
            </p>
            <p>
              Входящие, документы, знания, решения — каждый процесс получает
              логику, память и контроль.
            </p>
          </div>

          {/* Accent block with breathing border */}
          <motion.div
            className="mt-4 p-8 md:p-12 border-l-4 bg-beige rounded-r-[10px] text-left"
            style={{ borderColor: "#C41230" }}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {/* Breathing left accent dot */}
            <motion.span
              className="inline-block w-2 h-2 rounded-full bg-crimson mb-4"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="h3 text-espresso">
              Вам не нужно понимать как устроена система.{" "}
              <span className="text-crimson">Вам нужно чтобы она работала.</span>
            </p>
          </motion.div>

          {/* Micro-phrase divider */}
          <p className="micro-phrase pt-4">Снаружи — просто. Внутри — глубоко.</p>
        </motion.div>
      </div>
    </section>
  );
}
