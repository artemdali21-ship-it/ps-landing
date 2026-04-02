"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Разбираем",
    body: "Вы показываете процесс и результат. Мы находим где система даёт результат.",
    detail: "30 минут.",
  },
  {
    number: "02",
    title: "Собираем",
    body: "Архитектура. Pilot. Реальные данные.",
    detail: null,
  },
  {
    number: "03",
    title: "Работает",
    body: "Внедрено, измерено, доработано.",
    detail: null,
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="процесс" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Number */}
              <span className="font-space-mono font-bold text-[64px] leading-none text-espresso/10">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="font-outfit font-bold text-2xl text-espresso">
                {step.title}
              </h3>

              {/* Divider */}
              <div className="h-px bg-stone w-12" />

              {/* Body */}
              <p className="font-inter font-light text-taupe text-base leading-relaxed">
                {step.body}
              </p>

              {step.detail && (
                <p className="font-space-grotesk font-medium text-sm text-espresso">
                  {step.detail}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-space-grotesk font-medium text-taupe text-sm tracking-wide mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Проектируем под процесс. Не продаём шаблон.
        </motion.p>
      </div>
    </section>
  );
}
