"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  crimson:  "#C41230",
  espresso: "#1F1410",
  taupe:    "#8A7B6B",
  gold:     "#D2B68A",
  blue:     "#5B7B9A",
  green:    "#708C69",
  purple:   "#8B6FDB",
  amber:    "#E8A838",
};

// ─── DIAGRAM CONSTANTS ───────────────────────────────────────────────────────
const W = 900;
const H = 480;

const INP_W  = 150;
const LPAN_W = 108;
const CORE_W = 234;
const CORE_H = 300;
const RPAN_W = 108;
const OUT_W  = 150;

// Total content width = 150+10+108+10+234+10+108+10+150 = 790
// Slight right-of-center shift for visual balance with bg image
const INP_X  = 75;
const LPAN_X = INP_X + INP_W + 10;
const CORE_X = LPAN_X + LPAN_W + 10;
const RPAN_X = CORE_X + CORE_W + 10;
const OUT_X  = RPAN_X + RPAN_W + 10;
const CORE_Y = (H - CORE_H) / 2;

const NODE_H    = 54;
const NODE_GAP  = 12;
const PANEL_H   = 52;
const PANEL_GAP = 10;

function nodeY(i: number) {
  const total = 4 * NODE_H + 3 * NODE_GAP;
  return (H - total) / 2 + i * (NODE_H + NODE_GAP);
}
function nodeCY(i: number) { return nodeY(i) + NODE_H / 2; }

const FAN_Y = [0, 1, 2, 3].map(i => CORE_Y + 55 + i * 56);

function lpanY(i: number) {
  const total = 3 * PANEL_H + 2 * PANEL_GAP;
  return (H - total) / 2 + i * (PANEL_H + PANEL_GAP);
}
function lpanCY(i: number) { return lpanY(i) + PANEL_H / 2; }

function rpanY(i: number) {
  const total = 2 * PANEL_H + PANEL_GAP;
  return (H - total) / 2 + i * (PANEL_H + PANEL_GAP);
}
function rpanCY(i: number) { return rpanY(i) + PANEL_H / 2; }

function pathIn(ni: number) {
  const x1 = INP_X + INP_W; const y1 = nodeCY(ni);
  const x2 = CORE_X; const y2 = FAN_Y[ni];
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}
function pathOut(ni: number) {
  const x1 = CORE_X + CORE_W; const y1 = FAN_Y[ni];
  const x2 = OUT_X; const y2 = nodeCY(ni);
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}

const NODE_COLORS = [C.crimson, C.purple, C.blue, C.amber];

const LAYERS = [
  { color: C.taupe,    label: "Приём и распознавание", sub: "голос→текст, OCR, парсинг" },
  { color: C.blue,     label: "Контекст",              sub: "кто, что, зачем, история" },
  { color: C.gold,     label: "Выбор маршрута",        sub: "сценарий, модель, резерв" },
  { color: C.crimson,  label: "Логика обработки",      sub: "несколько шагов, не один вызов" },
  { color: C.green,    label: "Контроль качества",     sub: "двойная проверка, стандарты" },
  { color: C.espresso, label: "Готовый результат",     sub: "формат, бренд, канал" },
];

const INPUTS = [
  { label: "Текст",      sub: "сообщения",         color: C.crimson, minLevel: 1 },
  { label: "Голос",     sub: "аудио, звонки",      color: C.purple,  minLevel: 2 },
  { label: "Файл",      sub: "PDF, DOCX, XLS",     color: C.blue,    minLevel: 2 },
  { label: "API / CRM", sub: "внешние системы",    color: C.amber,   minLevel: 3 },
];

const OUTPUTS: { lines: string[]; color: string; minLevel: number }[] = [
  { lines: ["Квалифицированный", "результат"], color: C.green,   minLevel: 1 },
  { lines: ["Отчёт + статус"],                  color: C.amber,   minLevel: 2 },
  { lines: ["Задачи в CRM"],                    color: C.blue,    minLevel: 2 },
  { lines: ["Экспертное заключение"],           color: C.purple,  minLevel: 3 },
];

const LEVEL_EXAMPLES: Record<number, string> = {
  1: "Например: квалификация лидов, протоколирование встреч, обработка входящих",
  2: "Например: система продаж, HR-скрининг, документооборот",
  3: "Например: экспертная оценка, поддержка решений, аналитика",
};

// ─── LAYER ICONS (inline SVG) ────────────────────────────────────────────────
function LayerIconSvg({ idx, color }: { idx: number; color: string }) {
  const s = { stroke: color, strokeWidth: "1.4", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" aria-hidden="true">
      {idx === 0 && <><path d="M7 1.5a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-5 0V4A2.5 2.5 0 0 1 7 1.5z" {...s}/><path d="M3.5 8.5A3.5 3.5 0 0 0 10.5 8.5" {...s}/><line x1="7" y1="12" x2="7" y2="14" {...s}/></>}
      {idx === 1 && <><line x1="2" y1="3" x2="12" y2="3" {...s}/><line x1="2" y1="7" x2="9" y2="7" {...s}/><line x1="2" y1="11" x2="6" y2="11" {...s}/></>}
      {idx === 2 && <><line x1="7" y1="1" x2="7" y2="5.5" {...s}/><line x1="7" y1="5.5" x2="2" y2="12" {...s}/><line x1="7" y1="5.5" x2="12" y2="12" {...s}/></>}
      {idx === 3 && <><rect x="2.5" y="2.5" width="9" height="9" rx="1.5" {...s}/><line x1="5" y1="7" x2="9" y2="7" {...s}/><line x1="7" y1="5" x2="7" y2="9" {...s}/></>}
      {idx === 4 && <path d="M2 7.5L5.5 11L12 3" {...s}/>}
      {idx === 5 && <><line x1="2" y1="7" x2="11.5" y2="7" {...s}/><path d="M8 3.5L12 7L8 10.5" {...s}/></>}
    </svg>
  );
}

// ─── SVG FLOW PATH ───────────────────────────────────────────────────────────
function FlowPath({ d, color, show, delay = 0 }: { d: string; color: string; show: boolean; delay?: number }) {
  return (
    <g>
      <motion.path d={d} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.15"
        initial={{ pathLength: 0 }} animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }} />
      {show && (
        <motion.path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
          strokeDasharray="5 16"
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          animate={{ strokeDashoffset: -21, opacity: 0.65 }}
          transition={{
            strokeDashoffset: { duration: 1.3, repeat: Infinity, ease: "linear", delay },
            opacity: { duration: 0.35, delay },
          }} />
      )}
    </g>
  );
}

function DashLink({ x1, y1, x2, y2, show }: { x1: number; y1: number; x2: number; y2: number; show: boolean }) {
  return (
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="4 6"
      initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3 }} />
  );
}

// ─── LIQUID GLASS CORE ────────────────────────────────────────────────────��──
const CARD_W = 216;
const CARD_H = 44;
const CARD_GAP = 5;

function Core3D({ level }: { level: number }) {
  const lv = (n: number) => level >= n;
  return (
    <div style={{ position: "absolute", left: CORE_X, top: CORE_Y, width: CORE_W, height: CORE_H, overflow: "visible" }}>
      {/* Header */}
      <div style={{ textAlign: "center", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.65)", fontFamily: "Space Grotesk,sans-serif", marginBottom: 8, paddingTop: 4 }}>
        ЯДРО СИСТЕМЫ
      </div>

      {/* Flat Liquid Glass stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: CARD_GAP, width: CARD_W, margin: "0 auto" }}>
        {LAYERS.map((layer, i) => (
          <motion.div key={i}
            style={{
              width: CARD_W,
              height: CARD_H,
              /* Liquid Glass base */
              background: "rgba(255,255,255,0.13)",
              backdropFilter: "blur(22px) saturate(160%)",
              WebkitBackdropFilter: "blur(22px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.42)",
              borderTop: "1px solid rgba(255,255,255,0.68)",
              borderRadius: 11,
              boxShadow: "0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "0 9px 0 10px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              background: "rgba(255,255,255,0.24)",
              boxShadow: `0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 1px ${layer.color}66`,
              scale: 1.025,
            }}
            transition={{ duration: 0.32, delay: i * 0.055 }}
          >
            {/* Top-half shimmer highlight */}
            <div style={{
              position: "absolute", inset: 0, bottom: "50%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 100%)",
              borderRadius: "11px 11px 0 0",
              pointerEvents: "none",
            }} />

            {/* Colour strip */}
            <div style={{ width: 3, borderRadius: 2, background: layer.color, opacity: 0.95, alignSelf: "stretch", margin: "9px 0", flexShrink: 0 }} />

            {/* Icon */}
            <div style={{ flexShrink: 0 }}>
              <LayerIconSvg idx={i} color={layer.color} />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.93)", fontFamily: "Space Grotesk,sans-serif", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                {layer.label}
              </div>
              <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.58)", fontFamily: "Inter,sans-serif", marginTop: 1, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {layer.sub}
              </div>
            </div>

            {/* Human review badge */}
            {i === 4 && lv(3) && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.3 }}
                style={{ border: "0.8px solid rgba(255,255,255,0.55)", borderRadius: 99, padding: "1px 5px", fontSize: 7, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "Inter,sans-serif", background: "rgba(255,255,255,0.12)" }}>
                Human review
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── HTML NODE COMPONENTS ────────────────────────────────────────────────────
function InNode({ i, show }: { i: number; show: boolean }) {
  const { color, label, sub } = INPUTS[i];
  return (
    <motion.div
      style={{
        position: "absolute", left: INP_X, top: nodeY(i), width: INP_W, height: NODE_H,
        background: "rgba(100,110,125,0.38)",
        backdropFilter: "blur(20px) saturate(80%)",
        WebkitBackdropFilter: "blur(20px) saturate(80%)",
        border: `1px solid rgba(255,255,255,0.22)`,
        borderLeft: `3px solid ${color}`,
        borderTop: `1px solid rgba(255,255,255,0.32)`,
        borderRadius: 9,
        boxShadow: `0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 10px 0 12px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, x: -10 }} animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
      whileHover={{ background: "rgba(120,132,148,0.52)", boxShadow: `0 0 0 1.5px ${color}66, 0 6px 24px rgba(0,0,0,0.22)` }}
      transition={{ duration: 0.3, delay: i * 0.06 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "Space Grotesk,sans-serif", lineHeight: 1.2, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{label}</div>
      <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.52)", fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
    </motion.div>
  );
}

function OutNode({ i, show }: { i: number; show: boolean }) {
  const { lines, color } = OUTPUTS[i];
  const multi = lines.length > 1;
  return (
    <motion.div
      style={{
        position: "absolute", left: OUT_X, top: nodeY(i), width: OUT_W, height: NODE_H,
        background: "rgba(100,110,125,0.38)",
        backdropFilter: "blur(20px) saturate(80%)",
        WebkitBackdropFilter: "blur(20px) saturate(80%)",
        border: `1px solid rgba(255,255,255,0.22)`,
        borderRight: `3px solid ${color}`,
        borderTop: `1px solid rgba(255,255,255,0.32)`,
        borderRadius: 9,
        boxShadow: `0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 12px 0 10px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, x: 10 }} animate={{ opacity: show ? 1 : 0, x: show ? 0 : 10 }}
      whileHover={{ background: "rgba(120,132,148,0.52)", boxShadow: `0 0 0 1.5px ${color}66, 0 6px 24px rgba(0,0,0,0.22)` }}
      transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}>
      {lines.map((line, li) => (
        <div key={li} style={{ fontSize: multi ? 10.5 : 12, fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.25, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{line}</div>
      ))}
    </motion.div>
  );
}

function LPanel({ yi, label, sub, accent, show, delay = 0 }: { yi: number; label: string; sub: string; accent?: string; show: boolean; delay?: number }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: LPAN_X, top: lpanY(yi), width: LPAN_W, height: PANEL_H,
        background: "rgba(100,110,125,0.38)",
        backdropFilter: "blur(20px) saturate(80%)",
        WebkitBackdropFilter: "blur(20px) saturate(80%)",
        border: accent ? `1.5px solid ${accent}88` : "1px solid rgba(255,255,255,0.20)",
        borderTop: accent ? `1.5px solid ${accent}88` : "1px solid rgba(255,255,255,0.30)",
        borderRadius: 8,
        boxShadow: `0 3px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "0 8px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      whileHover={{ background: "rgba(120,132,148,0.52)", boxShadow: `0 0 0 1.5px ${accent ?? "rgba(255,255,255,0.35)"}` }}
      transition={{ duration: 0.3, delay }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.90)", fontFamily: "Space Grotesk,sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{label}</div>
      <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.50)", fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
    </motion.div>
  );
}

function RPanel({ i, label, sub, show, delay = 0 }: { i: number; label: string; sub: string; show: boolean; delay?: number }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: RPAN_X, top: rpanY(i), width: RPAN_W, height: PANEL_H,
        background: "rgba(100,110,125,0.38)",
        backdropFilter: "blur(20px) saturate(80%)",
        WebkitBackdropFilter: "blur(20px) saturate(80%)",
        border: "1px solid rgba(255,255,255,0.20)",
        borderTop: "1px solid rgba(255,255,255,0.30)",
        borderRadius: 8,
        boxShadow: `0 3px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "0 8px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      whileHover={{ background: "rgba(120,132,148,0.52)" }}
      transition={{ duration: 0.3, delay }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.90)", fontFamily: "Space Grotesk,sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{label}</div>
      <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.50)", fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
    </motion.div>
  );
}

// ─── DESKTOP DIAGRAM ─────────────────────────────────────────────────────────
function DesktopDiagram({ level }: { level: number }) {
  const lv = (n: number) => level >= n;

  const loopSX = OUT_X + OUT_W / 2;
  const loopSY = nodeY(3) + NODE_H;
  const loopEX = LPAN_X + LPAN_W / 2;
  const loopEY = lpanY(2) + PANEL_H;
  const loopPath = `M ${loopSX} ${loopSY} C ${loopSX} ${H - 28} ${loopEX} ${H - 28} ${loopEX} ${loopEY}`;

  return (
    <div style={{ position: "relative", width: W, height: H, margin: "0 auto", overflow: "visible" }}>

      {/* ── SVG connections (z=0, pointer-events: none) ── */}
      <svg viewBox={`0 0 ${W} ${H}`}
        style={{ position: "absolute", left: 0, top: 0, width: W, height: H, pointerEvents: "none", zIndex: 0, overflow: "visible" }}
        aria-hidden="true">

        {/* Flow paths */}
        {INPUTS.map((inp, i)  => <FlowPath key={`i${i}`} d={pathIn(i)}  color={inp.color} show={lv(inp.minLevel)} delay={i*0.07} />)}
        {OUTPUTS.map((out, i) => <FlowPath key={`o${i}`} d={pathOut(i)} color={out.color} show={lv(out.minLevel)} delay={0.1+i*0.07} />)}

        {/* Dashed panel links */}
        {lv(2) && <><DashLink x1={LPAN_X+LPAN_W} y1={lpanCY(0)} x2={CORE_X} y2={lpanCY(0)} show /><DashLink x1={LPAN_X+LPAN_W} y1={lpanCY(1)} x2={CORE_X} y2={lpanCY(1)} show /></>}
        {lv(3) && <DashLink x1={LPAN_X+LPAN_W} y1={lpanCY(2)} x2={CORE_X} y2={lpanCY(2)} show />}
        {lv(2) && <><DashLink x1={CORE_X+CORE_W} y1={rpanCY(0)} x2={RPAN_X} y2={rpanCY(0)} show /><DashLink x1={CORE_X+CORE_W} y1={rpanCY(1)} x2={RPAN_X} y2={rpanCY(1)} show /></>}

        {/* Learning loop */}
        {lv(3) && <>
          <motion.path d={loopPath} fill="none" stroke={C.crimson} strokeWidth="1.2" strokeDasharray="5 8" strokeOpacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
          <motion.path d={loopPath} fill="none" stroke={C.crimson} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 18"
            initial={{ strokeDashoffset: 0, opacity: 0 }} animate={{ strokeDashoffset: -22, opacity: 0.55 }}
            transition={{ strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }} />
          <text x={(loopSX + loopEX) / 2} y={H - 6} fill={C.crimson} fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle" opacity="0.75">петля обучения</text>
        </>}

        {/* Port dots */}
        {INPUTS.map((inp, i)  => lv(inp.minLevel)  && <circle key={`pdi${i}`} cx={INP_X + INP_W} cy={nodeCY(i)}  r={4} fill={inp.color} />)}
        {OUTPUTS.map((out, i) => lv(out.minLevel)  && <circle key={`pdo${i}`} cx={OUT_X}          cy={nodeCY(i)}  r={4} fill={out.color} />)}
        {lv(2) && <><circle cx={LPAN_X+LPAN_W} cy={lpanCY(0)} r={3} fill="rgba(255,255,255,0.35)" /><circle cx={LPAN_X+LPAN_W} cy={lpanCY(1)} r={3} fill="rgba(255,255,255,0.35)" /></>}
        {lv(3) && <circle cx={LPAN_X+LPAN_W} cy={lpanCY(2)} r={3} fill={C.crimson} opacity={0.75} />}
        {lv(2) && <><circle cx={RPAN_X} cy={rpanCY(0)} r={3} fill="rgba(255,255,255,0.35)" /><circle cx={RPAN_X} cy={rpanCY(1)} r={3} fill="rgba(255,255,255,0.35)" /></>}

        {/* Channels label */}
        {lv(2) && <motion.text x={2} y={H - 4} fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="Inter,sans-serif"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Каналы: TG · VK · Max · Email · Сайт
        </motion.text>}
      </svg>

      {/* ── HTML elements (z=1) ── */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 1 }}>
        {INPUTS.map((_, i)  => <InNode key={i}  i={i} show={lv(INPUTS[i].minLevel)} />)}
        {OUTPUTS.map((_, i) => <OutNode key={i} i={i} show={lv(OUTPUTS[i].minLevel)} />)}

        <LPanel yi={0} label="Память"   sub="история, состояние" show={lv(2)} delay={0.10} />
        <LPanel yi={1} label="Знания"   sub="правила, домен"      show={lv(2)} delay={0.17} />
        <LPanel yi={2} label="Обучение" sub="ошибки → улучшение"  accent={C.crimson} show={lv(3)} delay={0.24} />

        <RPanel i={0} label="Прозрачность"      sub="статус, история решений" show={lv(2)} delay={0.10} />
        <RPanel i={1} label="Стандарты системы" sub="версионированная логика"  show={lv(2)} delay={0.17} />

        {/* 3D Core (z-index allows it to render above SVG) */}
        <Core3D level={level} />
      </div>
    </div>
  );
}

// ─── MOBILE DIAGRAM ───────────────────────────────────────────────────────────
const SMOKED: React.CSSProperties = {
  background: "rgba(100,110,125,0.38)",
  backdropFilter: "blur(18px) saturate(80%)",
  WebkitBackdropFilter: "blur(18px) saturate(80%)",
  border: "1px solid rgba(255,255,255,0.22)",
  borderTop: "1px solid rgba(255,255,255,0.30)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.16)",
};
const LIQUID: React.CSSProperties = {
  background: "rgba(255,255,255,0.13)",
  backdropFilter: "blur(22px) saturate(160%)",
  WebkitBackdropFilter: "blur(22px) saturate(160%)",
  border: "1px solid rgba(255,255,255,0.42)",
  borderTop: "1px solid rgba(255,255,255,0.68)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
};

// Animated flowing arrow for mobile
function MobileFlowArrow({ color = "rgba(255,255,255,0.35)", show = true }: { color?: string; show?: boolean }) {
  if (!show) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 28, position: "relative", overflow: "hidden" }}>
      <svg width="40" height="28" viewBox="0 0 40 28" style={{ overflow: "visible" }}>
        {/* Static line */}
        <line x1="20" y1="0" x2="20" y2="22" stroke={color} strokeWidth="1.5" strokeOpacity="0.35" />
        {/* Flowing dash */}
        <motion.line x1="20" y1="0" x2="20" y2="22"
          stroke={color} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="5 14"
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          animate={{ strokeDashoffset: -19, opacity: 0.75 }}
          transition={{ strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }}
        />
        {/* Arrowhead */}
        <motion.path d="M14 17 L20 24 L26 17" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.4 }} />
      </svg>
    </div>
  );
}

function MobileDiagram({ level }: { level: number }) {
  const lv = (n: number) => level >= n;

  // Count visible inputs for arrow color
  const visibleInputs = INPUTS.filter(inp => lv(inp.minLevel));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── INPUTS ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {INPUTS.map((inp, i) => lv(inp.minLevel) && (
          <motion.div key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            whileTap={{ scale: 0.97, background: "rgba(130,142,158,0.55)" }}
            style={{ ...SMOKED, borderLeft: `3px solid ${inp.color}`, borderRadius: 9, padding: "8px 12px", overflow: "hidden", cursor: "pointer" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "Space Grotesk,sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{inp.label}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.50)", fontFamily: "Inter,sans-serif", marginTop: 1 }}>{inp.sub}</div>
          </motion.div>
        ))}
      </div>

      <MobileFlowArrow color={INPUTS[0].color} />

      {/* ── CORE (liquid glass wrapper) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ ...LIQUID, borderRadius: 14, padding: "12px 10px", overflow: "hidden" }}>
        <div style={{ textAlign: "center", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.60)", fontFamily: "Space Grotesk,sans-serif", marginBottom: 10 }}>
          ЯДРО СИСТЕМЫ
        </div>
        {LAYERS.map((layer, i) => (
          <div key={i}>
            <motion.div
              whileTap={{ scale: 0.98, background: "rgba(255,255,255,0.22)" }}
              style={{ display: "flex", alignItems: "center", gap: 7, ...LIQUID, borderRadius: 8, padding: "6px 9px", overflow: "hidden", position: "relative", cursor: "pointer" }}>
              {/* Shimmer */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%)", borderRadius: "8px 8px 0 0", pointerEvents: "none" }} />
              <div style={{ width: 3, height: 20, borderRadius: 2, background: layer.color, flexShrink: 0 }} />
              <LayerIconSvg idx={i} color={layer.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.93)", fontFamily: "Space Grotesk,sans-serif", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>{layer.label}</div>
                {i === 4 && lv(3) && (
                  <span style={{ border: "0.8px solid rgba(255,255,255,0.50)", borderRadius: 99, padding: "1px 5px", fontSize: 7.5, color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.12)", marginLeft: 4 }}>Human review</span>
                )}
              </div>
            </motion.div>
            {i < 5 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 10, height: 18 }}>
                <svg width="12" height="18" viewBox="0 0 12 18">
                  <line x1="6" y1="0" x2="6" y2="12" stroke={LAYERS[i+1].color} strokeWidth="1.2" strokeOpacity="0.4" />
                  <motion.line x1="6" y1="0" x2="6" y2="12"
                    stroke={LAYERS[i+1].color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 10"
                    animate={{ strokeDashoffset: [-14, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
                  />
                  <path d="M2 10 L6 15 L10 10" fill="none" stroke={LAYERS[i+1].color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* ── CONTEXT PILLS (L2+) ── */}
      {lv(2) && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
          {["Память", "Знания", ...(lv(3) ? ["Обучение"] : [])].map(label => (
            <motion.div key={label} whileTap={{ scale: 0.95 }}
              style={{
                ...SMOKED,
                border: `1px solid ${label === "Обучение" ? C.crimson + "99" : "rgba(255,255,255,0.22)"}`,
                borderRadius: 6, padding: "5px 10px", fontSize: 10,
                color: "rgba(255,255,255,0.82)", overflow: "hidden", cursor: "pointer",
              }}>{label}</motion.div>
          ))}
        </motion.div>
      )}

      <MobileFlowArrow color={OUTPUTS[0].color} />

      {/* ── OUTPUTS ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {OUTPUTS.map((out, i) => lv(out.minLevel) && (
          <motion.div key={i}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            whileTap={{ scale: 0.97, background: "rgba(130,142,158,0.55)" }}
            style={{ ...SMOKED, borderRight: `3px solid ${out.color}`, borderRadius: 9, padding: "8px 12px", textAlign: "right", overflow: "hidden", cursor: "pointer" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "Space Grotesk,sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{out.lines.join(" ")}</div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

// ─── FOUNDATION ICONS ────────────────────────────────────────────────────────
const IP = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function ILock()  { return <svg {...IP}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>; }
function IKey()   { return <svg {...IP}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>; }
function IFlag()  { return <svg {...IP}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>; }
function IPhone() { return <svg {...IP}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>; }
const FOUNDATIONS = [
  { icon: <ILock/>,  label: "Безопасность" },
  { icon: <IKey/>,   label: "Контроль доступа" },
  { icon: <IFlag/>,  label: "Локализация РФ" },
  { icon: <IPhone/>, label: "Мультиканальность" },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Examples() {
  const [level, setLevel] = useState(1);
  const LEVELS = [
    { n: 1, label: "L1", sub: "Сфокусированная" },
    { n: 2, label: "L2", sub: "Связанная" },
    { n: 3, label: "L3", sub: "Экспертная" },
  ];

  return (
    <section id="examples" style={{ background: "#FAF6F0", padding: "clamp(32px, 6vh, 72px) 1.25rem 0" }}>
      <div className="max-w-6xl mx-auto">

        {/* HEADER — relative so sphere can overflow into diagram zone */}
        <div style={{ position: "relative" }}>
          <div className="mb-4" style={{ maxWidth: "62%" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
              <p className="eyebrow mb-3" style={{ color: C.crimson }}>Архитектура системы</p>
              <h2 className="h2 mb-3" style={{ color: C.espresso }}>Как это работает</h2>
              <p className="font-inter font-light text-lg" style={{ color: C.taupe }}>Снаружи просто. Внутри — инженерия.</p>
            </motion.div>
          </div>

          {/* Floating 3D sphere — absolute, wires go BEHIND diagram (diagram z-index:2 > sphere z-index:1) */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              right: -24,
              top: -32,
              width: 310,
              /* Tall enough for wires to reach diagram behind it */
              height: 560,
              zIndex: 1,
              pointerEvents: "none",
            }}>
            {/* Crimson glow under globe */}
            <div className="sphere-glow" style={{
              position: "absolute",
              top: "4%", left: "10%", right: "10%", height: "38%",
              background: "radial-gradient(circle, rgba(196,18,48,0.28) 0%, rgba(210,182,138,0.10) 55%, transparent 80%)",
              borderRadius: "50%",
              filter: "blur(22px)",
            }} />
            <div className="sphere-float" style={{ width: "100%", height: "100%" }}>
              <img
                src="/images/sphere-3d.webp"
                alt="AI система — 3D визуализация"
                style={{
                  width: "100%", height: "100%", objectFit: "contain", objectPosition: "top center",
                  filter: "drop-shadow(0 16px 48px rgba(196,18,48,0.20)) drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* LEVEL SWITCHER — z-index:2 so wires go behind */}
        <div className="flex gap-2 mb-4" style={{ position: "relative", zIndex: 2 }}>
          {LEVELS.map(({ n, label, sub }) => {
            const active = level === n;
            return (
              <button key={n} onClick={() => setLevel(n)} style={{
                padding: "8px 18px", borderRadius: 7, cursor: "pointer",
                border: `1.5px solid ${active ? C.crimson : "rgba(31,20,16,0.2)"}`,
                background: active ? C.crimson : "transparent",
                color: active ? "#fff" : C.espresso,
                transition: "all 0.2s ease",
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1,
              }}>
                <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>{label}</span>
                <span style={{ fontFamily: "Inter,sans-serif", fontWeight: 300, fontSize: 10, opacity: active ? 0.8 : 0.5 }}>{sub}</span>
              </button>
            );
          })}
        </div>

        {/* DIAGRAM — z-index:2 so sphere wires go behind it */}
        <motion.div layout transition={{ duration: 0.4 }}
          style={{
            backgroundImage: "url('/images/diagram-bg.webp'), linear-gradient(135deg, #1a1035 0%, #0d2a4a 40%, #1a2810 70%, #2a1010 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 18,
            padding: "20px 20px 16px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            overflowX: "auto",
            position: "relative",
            zIndex: 2,
          }}>
          <div className="hidden md:block">
            <DesktopDiagram level={level} />
          </div>
          <div className="md:hidden">
            <MobileDiagram level={level} />
          </div>
        </motion.div>

        {/* DYNAMIC EXAMPLE */}
        <div className="text-center mt-5" style={{ minHeight: 22 }}>
          <AnimatePresence mode="wait">
            <motion.p key={level} className="font-inter font-light italic text-sm" style={{ color: C.taupe }}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}>
              {LEVEL_EXAMPLES[level]}
            </motion.p>
          </AnimatePresence>
        </div>


      {/* Foundation badges */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 pb-4">
        {FOUNDATIONS.map((f, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
            <span style={{ color: "#C41230" }}>{f.icon}</span>
            <span className="font-space-grotesk uppercase tracking-widest" style={{ fontSize: "0.65rem", color: "rgba(31,20,16,0.7)" }}>{f.label}</span>
          </div>
        ))}
      </div>

      </div>
    </section>
  );
}
