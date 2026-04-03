"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── SVG LAYOUT ───────────────────────────────────────────────────────────────
const W = 880;
const H = 380;
const NW = 162; // node width
const NH = 42;  // node height
const CR = 62;  // core radius
const CX = W / 2;
const CY = H / 2;

const ROWS = [
  { in: "Email / Мессенджеры", out: "Квалификация лидов",   color: "#C41230" },
  { in: "Документы & Брифы",   out: "Summary + Next Steps", color: "#8B6FDB" },
  { in: "Встречи / Zoom",      out: "Черновик КП",          color: "#3B9BC5" },
  { in: "CRM / Задачи",        out: "Отчёт / Статус",       color: "#E8A838" },
];

const N = ROWS.length;
const NODE_GAP = 22;
const totalH = N * NH + (N - 1) * NODE_GAP;
const startY = (H - totalH) / 2;
const rowCY = (i: number) => startY + i * (NH + NODE_GAP) + NH / 2;

function inPath(i: number) {
  const x1 = NW, y1 = rowCY(i);
  const x2 = CX - CR, y2 = CY;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}

function outPath(i: number) {
  const x1 = CX + CR, y1 = CY;
  const x2 = W - NW, y2 = rowCY(i);
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function AIFlowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ background: "#110D08", position: "relative", overflow: "hidden" }}
      className="section-padding"
    >
      {/* subtle grain */}
      <div className="grain-overlay" style={{ opacity: 0.4 }} />

      {/* crimson ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,18,48,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ─── HEADER ─────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow mb-4" style={{ color: "#C41230" }}>
            Архитектура системы
          </p>
          <h2
            className="h2 mb-5"
            style={{ color: "#ffffff", textShadow: "0 2px 32px rgba(0,0,0,0.5)" }}
          >
            Как это работает
          </h2>
          <p
            className="font-inter font-light text-lg max-w-lg mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Данные поступают — система обрабатывает — результат готов.
            <br />Без участия человека на каждом шаге.
          </p>
        </motion.div>

        {/* ─── DIAGRAM ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 16,
            padding: "36px 24px 28px",
          }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            style={{ maxHeight: 400, display: "block" }}
            aria-hidden="true"
          >
            <defs>
              {/* Radial gradient for core fill */}
              <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C41230" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#C41230" stopOpacity="0.04" />
              </radialGradient>
            </defs>

            {/* ── CONNECTIONS ─────────────────────────────────────────────── */}
            {ROWS.map((row, i) => (
              <g key={i}>
                {/* Static ghost path (drawn in) */}
                <motion.path
                  d={inPath(i)}
                  fill="none"
                  stroke={row.color}
                  strokeWidth="1"
                  strokeOpacity="0.18"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                />
                <motion.path
                  d={outPath(i)}
                  fill="none"
                  stroke={row.color}
                  strokeWidth="1"
                  strokeOpacity="0.18"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: "easeOut" }}
                />

                {/* Flowing dashes — input side */}
                {inView && (
                  <motion.path
                    d={inPath(i)}
                    fill="none"
                    stroke={row.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5 16"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: -21, opacity: 0.75 }}
                    transition={{
                      strokeDashoffset: {
                        duration: 1.1 + i * 0.15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.22,
                      },
                      opacity: { duration: 0.5, delay: 0.7 + i * 0.1 },
                    }}
                  />
                )}

                {/* Flowing dashes — output side */}
                {inView && (
                  <motion.path
                    d={outPath(i)}
                    fill="none"
                    stroke={row.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5 16"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: -21, opacity: 0.75 }}
                    transition={{
                      strokeDashoffset: {
                        duration: 1.1 + i * 0.15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.55 + i * 0.22,
                      },
                      opacity: { duration: 0.5, delay: 0.9 + i * 0.1 },
                    }}
                  />
                )}

                {/* Port dots */}
                <motion.circle
                  cx={NW}
                  cy={rowCY(i)}
                  r={4}
                  fill={row.color}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                />
                <motion.circle
                  cx={W - NW}
                  cy={rowCY(i)}
                  r={4}
                  fill={row.color}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                />
              </g>
            ))}

            {/* ── INPUT NODES ─────────────────────────────────────────────── */}
            {ROWS.map((row, i) => (
              <motion.g
                key={`in-${i}`}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.09, ease: "easeOut" }}
              >
                <rect
                  x={0}
                  y={startY + i * (NH + NODE_GAP)}
                  width={NW}
                  height={NH}
                  rx={8}
                  fill="rgba(255,255,255,0.05)"
                  stroke={row.color}
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
                {/* Left color accent */}
                <rect
                  x={0}
                  y={startY + i * (NH + NODE_GAP)}
                  width={3}
                  height={NH}
                  rx={2}
                  fill={row.color}
                  opacity="0.7"
                />
                <text
                  x={NW / 2 + 4}
                  y={rowCY(i)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.80)"
                  fontSize="11.5"
                  fontFamily="Inter, sans-serif"
                  fontWeight="300"
                >
                  {row.in}
                </text>
              </motion.g>
            ))}

            {/* ── OUTPUT NODES ────────────────────────────────────────────── */}
            {ROWS.map((row, i) => (
              <motion.g
                key={`out-${i}`}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.5 + i * 0.09, ease: "easeOut" }}
              >
                <rect
                  x={W - NW}
                  y={startY + i * (NH + NODE_GAP)}
                  width={NW}
                  height={NH}
                  rx={8}
                  fill="rgba(255,255,255,0.05)"
                  stroke={row.color}
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
                {/* Right color accent */}
                <rect
                  x={W - 3}
                  y={startY + i * (NH + NODE_GAP)}
                  width={3}
                  height={NH}
                  rx={2}
                  fill={row.color}
                  opacity="0.7"
                />
                <text
                  x={W - NW / 2 - 4}
                  y={rowCY(i)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.80)"
                  fontSize="11.5"
                  fontFamily="Inter, sans-serif"
                  fontWeight="300"
                >
                  {row.out}
                </text>
              </motion.g>
            ))}

            {/* ── AI CORE ─────────────────────────────────────────────────── */}
            <motion.g
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: "fill-box" }}
            >
              {/* Pulsing outer ring */}
              {inView && (
                <motion.circle
                  cx={CX}
                  cy={CY}
                  r={CR + 14}
                  fill="none"
                  stroke="#C41230"
                  strokeWidth="1"
                  animate={{ r: [CR + 10, CR + 22, CR + 10], opacity: [0.25, 0, 0.25] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Second ring */}
              <circle
                cx={CX}
                cy={CY}
                r={CR + 4}
                fill="none"
                stroke="#C41230"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />

              {/* Core fill */}
              <circle cx={CX} cy={CY} r={CR} fill="url(#core-grad)" />

              {/* Core border */}
              <circle cx={CX} cy={CY} r={CR} fill="none" stroke="#C41230" strokeWidth="1.2" strokeOpacity="0.7" />

              {/* Label */}
              <text
                x={CX}
                y={CY - 9}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize="15"
                fontFamily="'Space Grotesk', sans-serif"
                fontWeight="700"
                letterSpacing="3"
              >
                AI
              </text>
              <text
                x={CX}
                y={CY + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="9"
                fontFamily="Inter, sans-serif"
                fontWeight="300"
                letterSpacing="2.5"
              >
                СИСТЕМА
              </text>
            </motion.g>

            {/* ── COLUMN LABELS ───────────────────────────────────────────── */}
            <motion.text
              x={NW / 2}
              y={H - 6}
              textAnchor="middle"
              fill="rgba(255,255,255,0.22)"
              fontSize="9"
              fontFamily="Inter, sans-serif"
              letterSpacing="2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              ВХОДЯЩИЕ
            </motion.text>
            <motion.text
              x={W - NW / 2}
              y={H - 6}
              textAnchor="middle"
              fill="rgba(255,255,255,0.22)"
              fontSize="9"
              fontFamily="Inter, sans-serif"
              letterSpacing="2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              РЕЗУЛЬТАТ
            </motion.text>
          </svg>
        </motion.div>

        {/* ─── FOOTER NOTE ────────────────────────────────────────────────── */}
        <motion.p
          className="text-center mt-10 font-space-grotesk font-medium text-sm tracking-wide"
          style={{ color: "rgba(255,255,255,0.30)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Каждый поток настраивается под ваш процесс. Схема — ваша.
        </motion.p>
      </div>
    </section>
  );
}
