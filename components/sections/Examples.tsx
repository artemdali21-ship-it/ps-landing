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

// ─── SVG LAYOUT ──────────────────────────────────────────────────────────────
const W = 900;
const H = 440;

const INP_W  = 150;
const LPAN_W = 108;
const CORE_W = 234;
const CORE_H = 300;
const RPAN_W = 108;
const OUT_W  = 154;

const LPAN_X = INP_W + 10;            // 160
const CORE_X = LPAN_X + LPAN_W + 10;  // 278
const RPAN_X = CORE_X + CORE_W + 10;  // 522
const OUT_X  = RPAN_X + RPAN_W + 10;  // 640

const CORE_Y = (H - CORE_H) / 2;      // 70

const NODE_H   = 54;
const NODE_GAP = 12;
const PANEL_H  = 52;
const PANEL_GAP = 10;
const LAYER_H  = 28;
const ARROW_H  = 10;  // space between layers for connector arrow

// Node Y positions — fixed at 4-node (L3) layout
function nodeY(i: number) {
  const total = 4 * NODE_H + 3 * NODE_GAP;
  const start = (H - total) / 2;
  return start + i * (NODE_H + NODE_GAP);
}
function nodeCY(i: number) { return nodeY(i) + NODE_H / 2; }

// Fan points where connections enter/leave core edges (evenly spread across core height)
const FAN_Y = [0, 1, 2, 3].map(i => CORE_Y + 55 + i * 58); // [125, 183, 241, 299]

// Left panels — 3 positions (L3 layout)
function lpanY(i: number) {
  const total = 3 * PANEL_H + 2 * PANEL_GAP;
  const start = (H - total) / 2;
  return start + i * (PANEL_H + PANEL_GAP);
}
function lpanCY(i: number) { return lpanY(i) + PANEL_H / 2; }

// Right panels — 2 positions
function rpanY(i: number) {
  const total = 2 * PANEL_H + PANEL_GAP;
  const start = (H - total) / 2;
  return start + i * (PANEL_H + PANEL_GAP);
}
function rpanCY(i: number) { return rpanY(i) + PANEL_H / 2; }

// Layer Y inside core (with ARROW_H between each)
function layerY(i: number) { return CORE_Y + 34 + i * (LAYER_H + ARROW_H); }

// Bezier paths
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
  { label: "Текст",     sub: "сообщения",         color: C.crimson, minLevel: 1 },
  { label: "Голос",    sub: "аудио, звонки",      color: C.purple,  minLevel: 2 },
  { label: "Файл",     sub: "PDF, DOCX, XLS",     color: C.blue,    minLevel: 2 },
  { label: "API / CRM",sub: "внешние системы",    color: C.amber,   minLevel: 3 },
];

// output labels as string arrays (multi-line support)
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

// ─── LAYER ICON (small SVG shape per processing step) ────────────────────────
function LayerIcon({ idx, x, y, color }: { idx: number; x: number; y: number; color: string }) {
  const p = { stroke: color, strokeWidth: "1.2", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none", opacity: 0.85 };
  switch (idx) {
    case 0: return <g><path d={`M${x+5} ${y} a2.5 2.5 0 0 1 0 5`} {...p}/><path d={`M${x+2} ${y+3} a3 3 0 0 0 6 0`} {...p}/><line x1={x+5} y1={y+6} x2={x+5} y2={y+9} {...p}/></g>;
    case 1: return <g><line x1={x} y1={y+1.5} x2={x+10} y2={y+1.5} {...p}/><line x1={x} y1={y+5} x2={x+7.5} y2={y+5} {...p}/><line x1={x} y1={y+8.5} x2={x+5} y2={y+8.5} {...p}/></g>;
    case 2: return <g><line x1={x+5} y1={y} x2={x+5} y2={y+4} {...p}/><line x1={x+5} y1={y+4} x2={x+1} y2={y+9} {...p}/><line x1={x+5} y1={y+4} x2={x+9} y2={y+9} {...p}/></g>;
    case 3: return <g><rect x={x+1} y={y+1} width={8} height={8} rx={1.5} {...p}/><line x1={x+3} y1={y+5} x2={x+7} y2={y+5} {...p}/><line x1={x+5} y1={y+3} x2={x+5} y2={y+7} {...p}/></g>;
    case 4: return <g><path d={`M${x+1} ${y+5} L${x+4} ${y+8.5} L${x+9} ${y+1.5}`} {...p}/></g>;
    case 5: return <g><line x1={x} y1={y+5} x2={x+8.5} y2={y+5} {...p}/><path d={`M${x+5} ${y+2} L${x+8.5} ${y+5} L${x+5} ${y+8}`} {...p}/></g>;
    default: return null;
  }
}

// ─── ANIMATED FLOW PATH ───────────────────────────────────────────────────────
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

// ─── INPUT NODE ───────────────────────────────────────────────────────────────
function InNode({ i, show }: { i: number; show: boolean }) {
  const { color, label, sub } = INPUTS[i];
  const x = 0; const y = nodeY(i); const w = INP_W; const h = NODE_H;
  return (
    <motion.g initial={{ opacity: 0, x: -12 }} animate={{ opacity: show ? 1 : 0, x: show ? 0 : -12 }}
      whileHover={{ filter: `drop-shadow(0px 0px 8px ${color}80)` }}
      transition={{ duration: 0.3, delay: i * 0.06 }}
      style={{ cursor: "pointer" }}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill="white" stroke={color} strokeWidth="1.2" strokeOpacity="0.55" />
      <rect x={x} y={y} width={3} height={h} rx={1.5} fill={color} opacity="0.85" />
      <text x={x+14} y={y+h/2-(sub?7:0)} fill={C.espresso} fontSize="11.5" fontFamily="Inter,sans-serif" fontWeight="500" dominantBaseline="middle">{label}</text>
      <text x={x+14} y={y+h/2+8}         fill={C.taupe}    fontSize="9"    fontFamily="Inter,sans-serif" fontWeight="300" dominantBaseline="middle">{sub}</text>
      <circle cx={x+w} cy={y+h/2} r={4} fill={color} />
    </motion.g>
  );
}

// ─── OUTPUT NODE ──────────────────────────────────────────────────────────────
function OutNode({ i, show }: { i: number; show: boolean }) {
  const { lines, color } = OUTPUTS[i];
  const x = OUT_X; const y = nodeY(i); const w = OUT_W; const h = NODE_H;
  const multiLine = lines.length > 1;
  return (
    <motion.g initial={{ opacity: 0, x: 12 }} animate={{ opacity: show ? 1 : 0, x: show ? 0 : 12 }}
      whileHover={{ filter: `drop-shadow(0px 0px 8px ${color}80)` }}
      transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
      style={{ cursor: "pointer" }}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill="white" stroke={color} strokeWidth="1.2" strokeOpacity="0.55" />
      <rect x={x+w-3} y={y} width={3} height={h} rx={1.5} fill={color} opacity="0.85" />
      <circle cx={x} cy={y+h/2} r={4} fill={color} />
      {multiLine ? (
        <>
          <text x={x+10} y={y+h/2-7}  fill={C.espresso} fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="500" dominantBaseline="middle">{lines[0]}</text>
          <text x={x+10} y={y+h/2+7}  fill={C.espresso} fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="500" dominantBaseline="middle">{lines[1]}</text>
        </>
      ) : (
        <text x={x+10} y={y+h/2}     fill={C.espresso} fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="500" dominantBaseline="middle">{lines[0]}</text>
      )}
    </motion.g>
  );
}

// ─── LEFT PANEL ───────────────────────────────────────────────────────────────
function LeftPanel({ yi, label, sub, accent, show, delay = 0 }: {
  yi: number; label: string; sub: string; accent?: string; show: boolean; delay?: number;
}) {
  const x = LPAN_X; const y = lpanY(yi); const w = LPAN_W; const h = PANEL_H;
  const bColor = accent ?? "rgba(0,0,0,0.12)";
  return (
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      whileHover={{ filter: `drop-shadow(0px 0px 6px ${bColor}60)` }}
      transition={{ duration: 0.3, delay }}
      style={{ cursor: "pointer" }}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="white" stroke={bColor} strokeWidth={accent ? "1.5" : "0.8"} />
      <text x={x+w/2} y={y+h/2-7} fill={C.espresso} fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle" dominantBaseline="middle">{label}</text>
      <text x={x+w/2} y={y+h/2+7} fill={C.taupe}    fontSize="8"   fontFamily="Inter,sans-serif" fontWeight="300" textAnchor="middle" dominantBaseline="middle">{sub}</text>
    </motion.g>
  );
}

// ─── RIGHT PANEL ──────────────────────────────────────────────────────────────
function RightPanel({ i, label, sub, show, delay = 0 }: {
  i: number; label: string; sub: string; show: boolean; delay?: number;
}) {
  const x = RPAN_X; const y = rpanY(i); const w = RPAN_W; const h = PANEL_H;
  return (
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      transition={{ duration: 0.3, delay }}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="white" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
      <text x={x+w/2} y={y+h/2-7} fill={C.espresso} fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle" dominantBaseline="middle">{label}</text>
      <text x={x+w/2} y={y+h/2+7} fill={C.taupe}    fontSize="8"   fontFamily="Inter,sans-serif" fontWeight="300" textAnchor="middle" dominantBaseline="middle">{sub}</text>
    </motion.g>
  );
}

// ─── DASHED PANEL LINK ────────────────────────────────────────────────────────
function DashLink({ x1, y1, x2, y2, show }: { x1: number; y1: number; x2: number; y2: number; show: boolean }) {
  return (
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="4 6"
      initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3 }} />
  );
}

// ─── DESKTOP SVG DIAGRAM ─────────────────────────────────────────────────────
function DesktopDiagram({ level }: { level: number }) {
  const lv = (n: number) => level >= n;

  // Learning loop: last output bottom → arc down → Training panel bottom
  const loopStartX = OUT_X + OUT_W / 2;
  const loopStartY = nodeY(3) + NODE_H;
  const loopEndX   = LPAN_X + LPAN_W / 2;
  const loopEndY   = lpanY(2) + PANEL_H;
  const loopPath   = `M ${loopStartX} ${loopStartY} C ${loopStartX} 425 ${loopEndX} 425 ${loopEndX} ${loopEndY}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: 440 }} aria-hidden="true">
      {/* ── INPUT → CORE connections ── */}
      {INPUTS.map((inp, i) => (
        <FlowPath key={`in${i}`} d={pathIn(i)} color={inp.color} show={lv(inp.minLevel)} delay={i*0.07} />
      ))}

      {/* ── CORE → OUTPUT connections ── */}
      {OUTPUTS.map((out, i) => (
        <FlowPath key={`out${i}`} d={pathOut(i)} color={out.color} show={lv(out.minLevel)} delay={0.1+i*0.07} />
      ))}

      {/* ── DASHED panel links ── */}
      {lv(2) && <DashLink x1={LPAN_X+LPAN_W} y1={lpanCY(0)} x2={CORE_X} y2={lpanCY(0)} show />}
      {lv(2) && <DashLink x1={LPAN_X+LPAN_W} y1={lpanCY(1)} x2={CORE_X} y2={lpanCY(1)} show />}
      {lv(3) && <DashLink x1={LPAN_X+LPAN_W} y1={lpanCY(2)} x2={CORE_X} y2={lpanCY(2)} show />}
      {lv(2) && <DashLink x1={CORE_X+CORE_W} y1={rpanCY(0)} x2={RPAN_X} y2={rpanCY(0)} show />}
      {lv(2) && <DashLink x1={CORE_X+CORE_W} y1={rpanCY(1)} x2={RPAN_X} y2={rpanCY(1)} show />}

      {/* ── LEARNING LOOP (L3) ── */}
      {lv(3) && (
        <g>
          <motion.path d={loopPath} fill="none" stroke={C.crimson} strokeWidth="1.2"
            strokeDasharray="5 8" strokeOpacity="0.45"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
          <motion.path d={loopPath} fill="none" stroke={C.crimson} strokeWidth="2"
            strokeLinecap="round" strokeDasharray="4 18"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: -22, opacity: 0.6 }}
            transition={{
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.4 },
            }} />
          <text x={(loopStartX + loopEndX) / 2} y={429} fill={C.crimson} fontSize="8"
            fontFamily="Inter,sans-serif" fontWeight="300" textAnchor="middle" opacity="0.55">
            петля обучения
          </text>
        </g>
      )}

      {/* ── CORE CONTAINER ── */}
      <rect x={CORE_X} y={CORE_Y} width={CORE_W} height={CORE_H} rx={10}
        fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1"
        style={{ filter: "drop-shadow(0px 2px 12px rgba(0,0,0,0.07))" }} />
      <text x={CORE_X+CORE_W/2} y={CORE_Y+18} fill={C.taupe} fontSize="8.5"
        fontFamily="Inter,sans-serif" fontWeight="400" letterSpacing="2" textAnchor="middle">
        ЯДРО СИСТЕМЫ
      </text>
      <line x1={CORE_X+12} y1={CORE_Y+28} x2={CORE_X+CORE_W-12} y2={CORE_Y+28}
        stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

      {/* ── CORE LAYERS with icons + inter-layer arrows ── */}
      {LAYERS.map((layer, i) => {
        const ly = layerY(i);
        const ay = ly + LAYER_H; // arrow start Y
        const isLast = i === 5;
        return (
          <g key={i}>
            {/* Layer row */}
            <rect x={CORE_X+8} y={ly} width={CORE_W-16} height={LAYER_H} rx={4}
              fill={isLast ? "rgba(31,20,16,0.04)" : "rgba(0,0,0,0.015)"}
              stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            {/* Color strip */}
            <rect x={CORE_X+12} y={ly+5} width={4} height={LAYER_H-10} rx={2} fill={layer.color} opacity="0.9" />
            {/* Icon (12x12, centered vertically in layer) */}
            <LayerIcon idx={i} x={CORE_X+21} y={ly+(LAYER_H-10)/2} color={layer.color} />
            {/* Label */}
            <text x={CORE_X+38} y={ly+LAYER_H/2-6} fill={C.espresso}
              fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600" dominantBaseline="middle">
              {layer.label}
            </text>
            <text x={CORE_X+38} y={ly+LAYER_H/2+7} fill={C.taupe}
              fontSize="8" fontFamily="Inter,sans-serif" fontWeight="300" dominantBaseline="middle">
              {layer.sub}
            </text>
            {/* Human review badge on layer 4 at L3 */}
            {i === 4 && lv(3) && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.2 }}>
                <rect x={CORE_X+CORE_W-82} y={ly+8} width={68} height={13} rx={6.5}
                  fill="none" stroke={C.crimson} strokeWidth="0.85" />
                <text x={CORE_X+CORE_W-48} y={ly+14.5} fill={C.crimson} fontSize="7.5"
                  fontFamily="Inter,sans-serif" textAnchor="middle" dominantBaseline="middle">
                  Human review
                </text>
              </motion.g>
            )}
            {/* Inter-layer connector arrow (not after last layer) */}
            {!isLast && (
              <g opacity="0.4">
                <line x1={CORE_X+14} y1={ay} x2={CORE_X+14} y2={ay+ARROW_H-2}
                  stroke={LAYERS[i+1].color} strokeWidth="1" />
                <path d={`M${CORE_X+11} ${ay+ARROW_H-4} L${CORE_X+14} ${ay+ARROW_H-1} L${CORE_X+17} ${ay+ARROW_H-4}`}
                  fill="none" stroke={LAYERS[i+1].color} strokeWidth="1" strokeLinecap="round" />
              </g>
            )}
          </g>
        );
      })}

      {/* ── LEFT PANELS ── */}
      <LeftPanel yi={0} label="Память"   sub="история, состояние" show={lv(2)} delay={0.10} />
      <LeftPanel yi={1} label="Знания"   sub="правила, домен"      show={lv(2)} delay={0.17} />
      <LeftPanel yi={2} label="Обучение" sub="ошибки → улучшение"  accent={C.crimson} show={lv(3)} delay={0.24} />

      {/* ── RIGHT PANELS ── */}
      <RightPanel i={0} label="Прозрачность"      sub="статус, история решений" show={lv(2)} delay={0.10} />
      <RightPanel i={1} label="Стандарты системы" sub="версионированная логика"  show={lv(2)} delay={0.17} />

      {/* ── INPUT NODES ── */}
      {INPUTS.map((_, i) => <InNode key={i} i={i} show={lv(INPUTS[i].minLevel)} />)}

      {/* ── OUTPUT NODES ── */}
      {OUTPUTS.map((_, i) => <OutNode key={i} i={i} show={lv(OUTPUTS[i].minLevel)} />)}

      {/* Channels label */}
      {lv(2) && (
        <motion.text x={2} y={H-4} fill={C.taupe} fontSize="8"
          fontFamily="Inter,sans-serif" fontWeight="300"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
          Каналы: TG · VK · Max · Email · Сайт
        </motion.text>
      )}
    </svg>
  );
}

// ─── MOBILE DIAGRAM ───────────────────────────────────────────────────────────
function MobileDiagram({ level }: { level: number }) {
  const lv = (n: number) => level >= n;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Inputs */}
      {INPUTS.map((inp, i) => lv(inp.minLevel) && (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          style={{ border: `1px solid ${inp.color}55`, borderLeft: `3px solid ${inp.color}`, borderRadius: 7,
            padding: "8px 12px", background: "white", display: "flex", gap: 10, alignItems: "center" }}>
          <div>
            <div style={{ color: C.espresso, fontSize: 12, fontWeight: 600 }}>{inp.label}</div>
            <div style={{ color: C.taupe,    fontSize: 10 }}>{inp.sub}</div>
          </div>
        </motion.div>
      ))}
      <div style={{ textAlign: "center", color: C.taupe, fontSize: 16 }}>↓</div>
      {/* Core */}
      <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: "12px 10px 10px", background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ textAlign: "center", color: C.taupe, fontSize: 9, letterSpacing: 2, marginBottom: 8 }}>ЯДРО СИСТЕМЫ</div>
        {LAYERS.map((layer, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: i===5 ? "rgba(31,20,16,0.04)" : "rgba(0,0,0,0.01)", borderRadius: 5, padding: "5px 8px", border: "0.5px solid rgba(0,0,0,0.06)" }}>
              <div style={{ width: 4, height: 18, borderRadius: 2, background: layer.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: C.espresso, fontSize: 10.5, fontWeight: 600 }}>{layer.label}</div>
                <div style={{ color: C.taupe,    fontSize: 8.5 }}>{layer.sub}</div>
              </div>
              {i === 4 && lv(3) && (
                <span style={{ border: `0.8px solid ${C.crimson}`, borderRadius: 99, padding: "1px 5px", fontSize: 8, color: C.crimson }}>Human review</span>
              )}
            </div>
            {i < 5 && <div style={{ textAlign: "left", paddingLeft: 14, color: LAYERS[i+1].color, fontSize: 10, lineHeight: "10px", opacity: 0.5 }}>↓</div>}
          </div>
        ))}
      </div>
      {/* Side pills */}
      {lv(2) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Память", "Знания", ...(lv(3) ? ["Обучение"] : [])].map(label => (
            <div key={label} style={{ border: `1px solid ${label === "Обучение" ? C.crimson + "88" : "rgba(0,0,0,0.15)"}`, borderRadius: 6, padding: "5px 10px", fontSize: 10, color: C.espresso, background: "white" }}>{label}</div>
          ))}
        </motion.div>
      )}
      <div style={{ textAlign: "center", color: C.taupe, fontSize: 16 }}>↓</div>
      {/* Outputs */}
      {OUTPUTS.map((out, i) => lv(out.minLevel) && (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          style={{ border: `1px solid ${out.color}55`, borderRight: `3px solid ${out.color}`, borderRadius: 7,
            padding: "8px 12px", background: "white", textAlign: "right" }}>
          <div style={{ color: C.espresso, fontSize: 11, fontWeight: 600 }}>{out.lines.join(" ")}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── FOUNDATION ICONS ─────────────────────────────────────────────────────────
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
  const lv = (n: number) => level >= n;

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          <p className="eyebrow mb-3" style={{ color: C.crimson }}>Архитектура</p>
          <h2 className="h2 mb-3" style={{ color: C.espresso }}>
            Как это работает
          </h2>
          <p className="font-inter font-light text-lg" style={{ color: C.taupe }}>
            Снаружи просто. Внутри — инженерия.
          </p>
        </motion.div>

        {/* LEVEL SWITCHER */}
        <div className="flex gap-2 mb-8" role="group">
          {LEVELS.map(({ n, label, sub }) => {
            const active = level === n;
            return (
              <button key={n} onClick={() => setLevel(n)}
                style={{
                  padding: "8px 18px", borderRadius: 7, cursor: "pointer",
                  border: `1.5px solid ${active ? C.crimson : "rgba(31,20,16,0.2)"}`,
                  background: active ? C.crimson : "transparent",
                  color: active ? "#fff" : C.espresso,
                  transition: "all 0.2s ease",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1,
                }}>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>{label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 10, opacity: active ? 0.8 : 0.5 }}>{sub}</span>
              </button>
            );
          })}
        </div>

        {/* DIAGRAM */}
        <motion.div layout transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16,
            padding: "28px 20px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
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
            <motion.p key={level} className="font-inter font-light italic text-sm"
              style={{ color: C.taupe }}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}>
              {LEVEL_EXAMPLES[level]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* FOUNDATION ROW */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 pt-8"
          style={{ borderTop: `1px solid rgba(31,20,16,0.08)` }}>
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
          <p className="font-inter font-light text-xs mt-1" style={{ color: "rgba(31,20,16,0.3)" }}>
            Данные под вашим контролем
          </p>
        </div>

        {/* AI SPHERE IMAGE */}
        <motion.div
          className="mt-12"
          style={{ borderRadius: 20, overflow: "hidden", position: "relative" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/images/ai-sphere.jpg"
            alt="AI система — интеллектуальный центр обработки данных"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 20 }}
          />
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
