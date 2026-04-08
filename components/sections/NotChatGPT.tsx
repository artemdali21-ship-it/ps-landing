"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NotChatGPT() {
  return (
    <section
      id="not-chatgpt"
      className="section-padding"
      style={{ background: "#FAF6F0" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Sphere image */}
        <motion.div
          className="w-full mb-10 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxHeight: 420 }}
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
          {/* Heading — mobile: hard break after "ЭТО НЕ" */}
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
            <br className="block" />
            <span style={{ color: "#C41230" }}>«ВНЕДРЕНИЕ CHATGPT».</span>
          </h2>

          {/* First paragraph — bold */}
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
            <br className="md:hidden" />
            Не AI-обёртка над API.
          </p>

          {/* Second paragraph */}
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
            <br className="md:hidden" />
            с логикой, памятью, маршрутизацией и контролем качества.
          </p>

          {/* Third paragraph */}
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
    </section>
  );
}
