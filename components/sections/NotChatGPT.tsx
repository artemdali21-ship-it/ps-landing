"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NotChatGPT() {
  return (
    <section
      id="not-chatgpt"
      style={{
        background: "#FAF6F0",
        /* Desktop: compact padding so everything fits in one viewport */
        padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 5vw, 5rem)",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>

        {/* Sphere image — full natural proportions, no crop */}
        <motion.div
          style={{ width: "100%", marginBottom: "clamp(1rem, 2.5vw, 2rem)", borderRadius: 12, overflow: "hidden" }}
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
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </motion.div>

        {/* Text block */}
        <motion.div
          style={{ maxWidth: 700 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2
            style={{
              fontFamily: "Satoshi, system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              lineHeight: 1.1,
              textTransform: "uppercase",
              marginBottom: "clamp(0.75rem, 1.5vw, 1.25rem)",
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
              fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)",
              color: "#1F1410",
              marginBottom: "clamp(0.5rem, 1vw, 0.875rem)",
              lineHeight: 1.6,
            }}
          >
            Не чат-бот. Не набор промптов.{" "}
            <br className="md:hidden" />
            Не AI-обёртка над API.
          </p>

          <p
            style={{
              fontFamily: "Outfit, system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)",
              color: "#5A4D40",
              marginBottom: "clamp(0.5rem, 1vw, 0.875rem)",
              lineHeight: 1.7,
            }}
          >
            Каждая система —{" "}
            <strong style={{ color: "#C41230", fontWeight: 700 }}>
              инженерная конструкция
            </strong>
            <br className="md:hidden" />
            {" "}с логикой, памятью, маршрутизацией и контролем качества.
          </p>

          <p
            style={{
              fontFamily: "Outfit, system-ui, sans-serif",
              fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)",
              color: "#1F1410",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ fontWeight: 700 }}>Работает внутри Вашего процесса</strong>{" "}
            и даёт{" "}
            <br className="md:hidden" />
            не просто ответ, а{" "}
            <strong style={{ color: "#C41230", fontWeight: 700 }}>
              рабочий результат.
            </strong>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
