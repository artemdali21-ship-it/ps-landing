"use client";

import { motion, useInView } from "framer-motion";
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

        {/* Progress connector — desktop only */}
        <div className="hidden md:block relative mb-12">
          <div className="absolute top-3 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-stone" />
          {/* Animated fill */}
          <motion.div
            className="absolute top-3 left-[calc(16.66%+16px)] h-px bg-crimson origin-left"
            style={{ right: "calc(16.66% + 16px)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeInOut" }}
          />
          {/* Dots */}
          <div className="flex justify-around">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.2, ease: "easeOut" }}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  style={{
                    backgroundColor: "#FAF6F0",
                    borderColor: "#C41230",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-crimson" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: "easeOut" }}
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
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Проектируем под процесс. Не продаём шаблон.
        </motion.p>
      </div>
    </section>
  );
}
