"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NotChatGPT() {
  return (
    <section
      id="not-chatgpt"
      className="section-padding"
      style={{ background: "#FAF6F0", height: "100%", display: "flex", alignItems: "center" }}
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* ── DESKTOP: 2-column side-by-side ── */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left — image */}
          <motion.div
            className="rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ boxShadow: "0 16px 64px rgba(31,20,16,0.14)" }}
          >
            <Image
              src="/images/ai-sphere.webp"
              alt="AI система"
              width={1200}
              height={630}
              className="w-full object-cover"
              style={{ objectPosition: "center", display: "block" }}
            />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <h2
              style={{
                fontFamily: "Satoshi, system-ui, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 3.2vw, 3rem)",
                lineHeight: 1.1,
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              ЭТО НЕ{" "}
              <br />
              <span style={{ color: "#C41230" }}>«ВНЕДРЕНИЕ CHATGPT».</span>
            </h2>

            <p
              style={{
                fontFamily: "Outfit, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                color: "#1F1410",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              Не чат-бот. Не набор промптов. Не AI-обёртка над API.
            </p>

            <p
              style={{
                fontFamily: "Outfit, system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                color: "#8A7B6B",
                marginBottom: "1rem",
                lineHeight: 1.7,
              }}
            >
              Каждая система —{" "}
              <strong style={{ color: "#C41230", fontWeight: 700 }}>
                инженерная конструкция
              </strong>{" "}
              с логикой, памятью, маршрутизацией и контролем качества.
            </p>

            <p
              style={{
                fontFamily: "Outfit, system-ui, sans-serif",
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                color: "#1F1410",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ fontWeight: 700 }}>Работает внутри Вашего процесса</strong>{" "}
              и{" "}
              <strong style={{ color: "#C41230", fontWeight: 700 }}>
                даёт рабочий результат.
              </strong>
            </p>
          </motion.div>
        </div>

        {/* ── MOBILE: stacked ── */}
        <div className="md:hidden">
          {/* Sphere image */}
          <motion.div
            className="w-full mb-8 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/ai-sphere.webp"
              alt="AI система"
              width={1200}
              height={630}
              className="w-full object-cover"
              style={{ objectPosition: "center" }}
            />
          </motion.div>

          {/* Text block */}
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2
              style={{
                fontFamily: "Satoshi, system-ui, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              ЭТО НЕ{" "}
              <br />
              <span style={{ color: "#C41230" }}>«ВНЕДРЕНИЕ CHATGPT».</span>
            </h2>

            <p
              style={{
                fontFamily: "Outfit, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "#1F1410",
                marginBottom: "1.25rem",
                lineHeight: 1.6,
              }}
            >
              Не чат-бот. Не набор промптов.{" "}
              <br />
              Не AI-обёртка над API.
            </p>

            <p
              style={{
                fontFamily: "Outfit, system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "#8A7B6B",
                marginBottom: "1.25rem",
                lineHeight: 1.7,
              }}
            >
              Каждая система —{" "}
              <strong style={{ color: "#C41230", fontWeight: 700 }}>
                инженерная конструкция
              </strong>{" "}
              <br />
              с логикой, памятью, маршрутизацией и контролем качества.
            </p>

            <p
              style={{
                fontFamily: "Outfit, system-ui, sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "#1F1410",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ fontWeight: 700 }}>Работает внутри Вашего процесса</strong>{" "}
              и{" "}
              <strong style={{ color: "#C41230", fontWeight: 700 }}>
                даёт рабочий результат.
              </strong>
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
