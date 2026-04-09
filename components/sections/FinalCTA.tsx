"use client";

import { motion } from "framer-motion";
import { useMagneticHover } from "@/hooks/useMagneticHover";

export default function FinalCTA() {
  const magnetic = useMagneticHover(7);
  return (
    <section
      id="cta"
      className="text-center relative overflow-hidden"
      style={{ background: "transparent", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(5rem, 12vh, 17rem)", paddingBottom: "clamp(2rem, 5vh, 4rem)", paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
    >
      {/* Subtle crimson breathing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 0.07, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle at 50% 40%, #C41230 0%, transparent 65%)" }}
      />

      <motion.div
        className="max-w-2xl mx-auto flex flex-col items-center gap-8 relative z-10"
      >
        <motion.h2
          className="h2"
          style={{ color: "#ffffff", textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          Начнём с результата.
        </motion.h2>

        <motion.p
          className="font-inter font-light text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 1px 20px rgba(0,0,0,0.5)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Покажите 2–3 реальных задачи — мы скажем, какой формат, сколько стоит<br />
          и что можно проверить пилотом.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <motion.a
            ref={magnetic.ref as React.Ref<HTMLAnchorElement>}
            href="https://t.me/spaces_love"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary relative overflow-visible"
            style={{ x: magnetic.x, y: magnetic.y }}
            onMouseMove={magnetic.onMouseMove as React.MouseEventHandler<HTMLAnchorElement>}
            onMouseLeave={magnetic.onMouseLeave}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(196,18,48,0)",
                "0 0 0 10px rgba(196,18,48,0.12)",
                "0 0 0 20px rgba(196,18,48,0)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          >
            Telegram
          </motion.a>
          <a href="mailto:a.polishchuk21@yandex.com" className="btn-ghost text-center" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.45)" }}>
            Email
          </a>
        </motion.div>

        <motion.p
          className="font-inter font-light text-sm"
          style={{ color: "rgba(255,255,255,0.42)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          30 минут. Без обязательств.
        </motion.p>

      </motion.div>

      {/* Privacy disclaimer — anchored to bottom of section, near the pillow */}
      <motion.p
        className="font-inter font-light"
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vh, 3rem)",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "11px",
          color: "rgba(255,255,255,0.47)",
          maxWidth: "420px",
          margin: "0 auto",
          lineHeight: "1.5",
          padding: "0 1.25rem",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        При обращении вы передаёте контактные данные и содержание запроса для ответа
        и обсуждения проекта.{" "}
        <a href="/legal/privacy-policy" className="underline hover:opacity-75 transition-opacity" style={{ color: "rgba(255,255,255,0.55)" }}>
          Политика конфиденциальности
        </a>.
      </motion.p>
    </section>
  );
}
