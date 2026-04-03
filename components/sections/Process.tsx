"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      id="process"
      className="section-padding"
      style={{ background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Progress connector — desktop */}
        <div className="hidden md:flex justify-around mb-10 relative">
          <div
            className="absolute top-3 h-px"
            style={{
              left: "calc(16.66% + 16px)",
              right: "calc(16.66% + 16px)",
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <motion.div
            className="absolute top-3 h-px origin-left"
            style={{
              left: "calc(16.66% + 16px)",
              right: "calc(16.66% + 16px)",
              background: "#C41230",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeInOut" }}
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.2 }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", borderColor: "#C41230" }}
              >
                <div className="w-2 h-2 rounded-full bg-crimson" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Steps — Liquid Glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 12,
                padding: "32px 28px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Ghost number */}
              <span
                className="font-space-mono font-bold leading-none select-none"
                style={{ fontSize: 64, color: "rgba(255,255,255,0.08)" }}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3
                className="font-outfit font-bold text-2xl"
                style={{ color: "#ffffff" }}
              >
                {step.title}
              </h3>

              {/* Crimson divider */}
              <div style={{ width: 32, height: 2, background: "#C41230", borderRadius: 1 }} />

              {/* Body */}
              <p
                className="font-inter font-light text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {step.body}
              </p>

              {step.detail && (
                <p
                  className="font-space-grotesk font-medium text-sm"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {step.detail}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-space-grotesk font-medium text-sm tracking-wide mt-14 text-center"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Проектируем под процесс. Не продаём шаблон.
        </motion.p>
      </div>
    </section>
  );
}
