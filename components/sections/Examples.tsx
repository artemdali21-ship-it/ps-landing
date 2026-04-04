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

const LPAN_X = INP_W + 10;
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
  const x1 = INP_W; const y1 = nodeCY(ni);
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
  { color: C.gold,     label: "Выбор маршрута",        sub: "сценарий, модель, fallback" },
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
  { lines: ["Квалифицированный", "результат"], color: C.crimson, minLevel: 1 },
  { lines: ["Отчёт + статус"],                  color: C.purple,  minLevel: 2 },
  { lines: ["Задачи в CRM"],                    color: C.blue,    minLevel: 2 },
  { lines: ["Экспертное заключение"],           color: C.amber,   minLevel: 3 },
];

const LEVEL_EXAMPLES: Record<number, string> = {
  1: "Например: квалификация лидов, протоколирование встреч, обработка входящих",
  2: "Например: система продаж, HR-скрининг, документооборот",
  3: "Например: экспертная оценка, decision support, аналитика",
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

// ─── LIQUID GLASS CORE ───────────────────────────────────────────────────────
const CARD_W = 216;
const CARD_H = 44;
const CARD_GAP = 5;

function Core3D({ level }: { level: number }) {
  const lv = (n: number) => level >= n;
  return (
    <div style={{ position: "absolute", left: CORE_X, top: CORE_Y, width: CORE_W, height: CORE_H, overflow: "visible" }}>
      {/* Header */}
      <div style={{ textAlign: "center", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.65)", fontFamily: "Inter,sans-serif", marginBottom: 8, paddingTop: 4 }}>
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
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.93)", fontFamily: "Inter,sans-serif", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
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
        position: "absolute", left: 0, top: nodeY(i), width: INP_W, height: NODE_H,
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        border: `1px solid rgba(255,255,255,0.7)`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 9,
        boxShadow: `0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 10px 0 12px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, x: -10 }} animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
      whileHover={{ background: "rgba(255,255,255,0.88)", boxShadow: `0 0 0 1.5px ${color}55, 0 6px 22px rgba(0,0,0,0.10)` }}
      transition={{ duration: 0.3, delay: i * 0.06 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.espresso, fontFamily: "Inter,sans-serif", lineHeight: 1.2 }}>{label}</div>
      <div style={{ fontSize: 9.5, color: C.taupe, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
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
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        border: `1px solid rgba(255,255,255,0.7)`,
        borderRight: `3px solid ${color}`,
        borderRadius: 9,
        boxShadow: `0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 12px 0 10px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, x: 10 }} animate={{ opacity: show ? 1 : 0, x: show ? 0 : 10 }}
      whileHover={{ background: "rgba(255,255,255,0.88)", boxShadow: `0 0 0 1.5px ${color}55, 0 6px 22px rgba(0,0,0,0.10)` }}
      transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}>
      {lines.map((line, li) => (
        <div key={li} style={{ fontSize: multi ? 10.5 : 12, fontWeight: 700, color: C.espresso, fontFamily: "Inter,sans-serif", lineHeight: 1.25 }}>{line}</div>
      ))}
    </motion.div>
  );
}

function LPanel({ yi, label, sub, accent, show, delay = 0 }: { yi: number; label: string; sub: string; accent?: string; show: boolean; delay?: number }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: LPAN_X, top: lpanY(yi), width: LPAN_W, height: PANEL_H,
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        border: accent ? `1.5px solid ${accent}88` : "1px solid rgba(255,255,255,0.65)",
        borderTop: "1px solid rgba(255,255,255,0.75)",
        borderRadius: 8,
        boxShadow: `0 3px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "0 8px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      whileHover={{ background: "rgba(255,255,255,0.82)", boxShadow: `0 0 0 1.5px ${accent ?? "rgba(255,255,255,0.9)"}` }}
      transition={{ duration: 0.3, delay }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.espresso, fontFamily: "Inter,sans-serif" }}>{label}</div>
      <div style={{ fontSize: 8.5, color: C.taupe, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
    </motion.div>
  );
}

function RPanel({ i, label, sub, show, delay = 0 }: { i: number; label: string; sub: string; show: boolean; delay?: number }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: RPAN_X, top: rpanY(i), width: RPAN_W, height: PANEL_H,
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        border: "1px solid rgba(255,255,255,0.65)",
        borderTop: "1px solid rgba(255,255,255,0.75)",
        borderRadius: 8,
        boxShadow: `0 3px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "0 8px", cursor: "pointer", overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      whileHover={{ background: "rgba(255,255,255,0.82)" }}
      transition={{ duration: 0.3, delay }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.espresso, fontFamily: "Inter,sans-serif" }}>{label}</div>
      <div style={{ fontSize: 8.5, color: C.taupe, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
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
        {INPUTS.map((inp, i)  => lv(inp.minLevel)  && <circle key={`pdi${i}`} cx={INP_W}         cy={nodeCY(i)}  r={4} fill={inp.color} />)}
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
function MobileDiagram({ level }: { level: number }) {
  const lv = (n: number) => level >= n;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {INPUTS.map((inp, i) => lv(inp.minLevel) && (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          style={{ border: `1px solid ${inp.color}55`, borderLeft: `3px solid ${inp.color}`, borderRadius: 7, padding: "8px 12px", background: "white" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.espresso, fontFamily: "Inter,sans-serif" }}>{inp.label}</div>
          <div style={{ fontSize: 10, color: C.taupe, fontFamily: "Inter,sans-serif" }}>{inp.sub}</div>
        </motion.div>
      ))}
      <div style={{ textAlign: "center", color: C.taupe, fontSize: 16 }}>↓</div>
      <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: "10px", background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ textAlign: "center", color: C.taupe, fontSize: 9, letterSpacing: 2, marginBottom: 8 }}>ЯДРО СИСТЕМЫ</div>
        {LAYERS.map((layer, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: i === 5 ? "rgba(31,20,16,0.04)" : "rgba(0,0,0,0.01)", borderRadius: 5, padding: "5px 8px", border: "0.5px solid rgba(0,0,0,0.06)" }}>
              <div style={{ width: 4, height: 18, borderRadius: 2, background: layer.color, flexShrink: 0 }} />
              <LayerIconSvg idx={i} color={layer.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.espresso, fontFamily: "Inter,sans-serif" }}>{layer.label}</div>
                {i === 4 && lv(3) && <span style={{ border: `0.8px solid ${C.crimson}`, borderRadius: 99, padding: "1px 5px", fontSize: 7.5, color: C.crimson, marginLeft: 4 }}>Human review</span>}
              </div>
            </div>
            {i < 5 && <div style={{ textAlign: "left", paddingLeft: 12, color: LAYERS[i+1].color, fontSize: 10, opacity: 0.45 }}>↓</div>}
          </div>
        ))}
      </div>
      {lv(2) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Память", "Знания", ...(lv(3) ? ["Обучение"] : [])].map(label => (
            <div key={label} style={{ border: `1px solid ${label === "Обучение" ? C.crimson + "88" : "rgba(0,0,0,0.15)"}`, borderRadius: 6, padding: "5px 10px", fontSize: 10, color: C.espresso, background: "white" }}>{label}</div>
          ))}
        </motion.div>
      )}
      <div style={{ textAlign: "center", color: C.taupe, fontSize: 16 }}>↓</div>
      {OUTPUTS.map((out, i) => lv(out.minLevel) && (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          style={{ border: `1px solid ${out.color}55`, borderRight: `3px solid ${out.color}`, borderRadius: 7, padding: "8px 12px", background: "white", textAlign: "right" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.espresso, fontFamily: "Inter,sans-serif" }}>{out.lines.join(" ")}</div>
        </motion.div>
      ))}
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
  { icon: <IFlag/>,  label: "Адаптация РФ" },
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
    <section id="examples" className="section-padding" style={{ background: "#FAF6F0" }}>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow mb-3" style={{ color: C.crimson }}>Архитектура системы</p>
          <h2 className="h2 mb-3" style={{ color: C.espresso }}>Как это работает</h2>
          <p className="font-inter font-light text-lg" style={{ color: C.taupe }}>Снаружи просто. Внутри — инженерия.</p>
        </motion.div>

        {/* LEVEL SWITCHER */}
        <div className="flex gap-2 mb-8">
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

        {/* DIAGRAM */}
        <motion.div layout transition={{ duration: 0.4 }}
          style={{
            /* ─ Background image slot ─────────────────────────────────────────
               Replace the gradient with your image:
               backgroundImage: "url('/images/diagram-bg.jpg')"
               ─────────────────────────────────────────────────────────────── */
            backgroundImage: "url('/images/diagram-bg.jpg'), linear-gradient(135deg, #1a1035 0%, #0d2a4a 40%, #1a2810 70%, #2a1010 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 18,
            padding: "28px 20px 20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            overflowX: "auto",
            position: "relative",
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

        {/* FOUNDATION */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(31,20,16,0.08)" }}>
          {FOUNDATIONS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2" style={{ color: C.taupe }}>
              {icon}
              <span className="font-inter font-light text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* TECH STACK */}
        <div className="text-center mt-5 space-y-1">
          <p className="font-inter font-light text-xs" style={{ color: C.taupe }}>
            <span style={{ color: C.espresso, fontWeight: 600 }}>Core:</span> n8n · Supabase · Claude
          </p>
          <p className="font-inter font-light text-xs" style={{ color: C.taupe }}>
            <span style={{ color: C.espresso, fontWeight: 600 }}>РФ:</span> YandexGPT · Gigachat · YandexCloud · Selectel · VK Cloud
          </p>
          <p className="font-inter font-light text-xs mt-1" style={{ color: "rgba(31,20,16,0.3)" }}>Данные под вашим контролем</p>
        </div>

        {/* AI SPHERE IMAGE */}
        <motion.div className="mt-12" style={{ borderRadius: 20, overflow: "hidden" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
          <img src="/images/ai-sphere.jpg" alt="AI система — архитектура обработки данных"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 20 }} />
        </motion.div>

        {/* FINAL PHRASE */}
        <motion.p className="micro-phrase text-center mt-10" style={{ color: C.taupe }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.3 }}>
          Работает в процессе, а не в презентации.
        </motion.p>

      </div>
    </section>
  );
}
