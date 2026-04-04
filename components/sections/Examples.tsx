"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  crimson:  "#C41230",
  espresso: "#1F1410",
  taupe:    "#8B7D6B",
  gold:     "#D2B68A",
  blue:     "#5B7B9A",
  green:    "#708C69",
  purple:   "#8B6FDB",
  amber:    "#E8A838",
  blueDark: "#3B7A9A",
};

// ─── DIAGRAM CONSTANTS ────────────────────────────────────────────────────────
const W = 900;
const H = 420;

const INP_W  = 152; const INP_X  = 0;
const LPAN_W = 108; const LPAN_X = 162;
const CORE_X = 280; const CORE_W = 232; const CORE_H = 288; const CORE_Y = (H - CORE_H) / 2; // ~66
const RPAN_W = 108; const RPAN_X = CORE_X + CORE_W + 10; // 522
const OUT_X  = RPAN_X + RPAN_W + 10; // 640
const OUT_W  = 152;

const NODE_H   = 52;
const NODE_GAP = 14;
const PANEL_H  = 52;
const PANEL_GAP = 10;

// 4 node positions (L3 layout, fixed for all levels)
function nodeY(i: number) {
  const total = 4 * NODE_H + 3 * NODE_GAP;
  const start = (H - total) / 2;
  return start + i * (NODE_H + NODE_GAP);
}
function nodeCY(i: number) { return nodeY(i) + NODE_H / 2; }

// Fan-in/out Y positions on core edges (4 slots, spread across core height)
const FAN_Y = [CORE_Y + 52, CORE_Y + 112, CORE_Y + 172, CORE_Y + 232];

// Left panels — 3 positions (Memory, Knowledge, Training)
function lpanY(i: number) {
  const total = 3 * PANEL_H + 2 * PANEL_GAP;
  const start = (H - total) / 2;
  return start + i * (PANEL_H + PANEL_GAP);
}
function lpanCY(i: number) { return lpanY(i) + PANEL_H / 2; }

// Right panels — 2 positions
function rpanY(i: number) {
  const total = 2 * PANEL_H + 1 * PANEL_GAP;
  const start = (H - total) / 2;
  return start + i * (PANEL_H + PANEL_GAP);
}
function rpanCY(i: number) { return rpanY(i) + PANEL_H / 2; }

// Bezier paths
function pathIn(ni: number) {
  const x1 = INP_X + INP_W; const y1 = nodeCY(ni);
  const x2 = CORE_X;        const y2 = FAN_Y[ni];
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}
function pathOut(ni: number) {
  const x1 = CORE_X + CORE_W; const y1 = FAN_Y[ni];
  const x2 = OUT_X;            const y2 = nodeCY(ni);
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}

const NODE_COLORS = [C.crimson, C.purple, C.blueDark, C.amber];

// 6 core layers
const LAYER_H  = 30;
const LAYER_GAP = 6;
const CORE_INNER_Y = CORE_Y + 32;
function layerY(i: number) { return CORE_INNER_Y + 6 + i * (LAYER_H + LAYER_GAP); }

const LAYERS = [
  { color: C.taupe,    label: "Приём и распознавание", sub: "голос→текст, OCR, парсинг" },
  { color: C.blue,     label: "Контекст",              sub: "кто, что, зачем, история" },
  { color: C.gold,     label: "Выбор маршрута",        sub: "сценарий, модель, fallback" },
  { color: C.crimson,  label: "Логика обработки",      sub: "несколько шагов, не один вызов" },
  { color: C.green,    label: "Контроль качества",     sub: "двойная проверка, стандарты" },
  { color: C.espresso, label: "Готовый результат",     sub: "формат, бренд, канал" },
];

// Input node data
const INPUTS = [
  { label: "Текст",    sub: "сообщения",          color: C.crimson,  minLevel: 1 },
  { label: "Голос",   sub: "аудио, звонки",       color: C.purple,   minLevel: 2 },
  { label: "Файл",    sub: "PDF, DOCX, XLS",       color: C.blueDark, minLevel: 2 },
  { label: "API / CRM", sub: "внешние системы",   color: C.amber,    minLevel: 3 },
];

// Output node data
const OUTPUTS = [
  { label: "Квалифицированный результат", color: C.crimson,  minLevel: 1 },
  { label: "Отчёт + статус",             color: C.purple,   minLevel: 2 },
  { label: "Задачи в CRM",               color: C.blueDark, minLevel: 2 },
  { label: "Экспертное заключение",      color: C.amber,    minLevel: 3 },
];

const LEVEL_EXAMPLES: Record<number, string> = {
  1: "Например: квалификация лидов, протоколирование встреч, обработка входящих",
  2: "Например: система продаж, HR-скрининг, документооборот",
  3: "Например: экспертная оценка, decision support, аналитика",
};

// ─── INLINE ICONS (Lucide-style) ─────────────────────────────────────────────
const ICON_PROPS = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IMsg()  { return <svg {...ICON_PROPS}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }
function IMic()  { return <svg {...ICON_PROPS}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>; }
function IFile() { return <svg {...ICON_PROPS}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>; }
function ILink() { return <svg {...ICON_PROPS}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>; }
function ILock() { return <svg {...ICON_PROPS} width={15} height={15}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>; }
function IKey()  { return <svg {...ICON_PROPS} width={15} height={15}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>; }
function IFlag() { return <svg {...ICON_PROPS} width={15} height={15}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>; }
function IPhone(){ return <svg {...ICON_PROPS} width={15} height={15}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>; }
const INPUT_ICONS = [<IMsg key={0}/>, <IMic key={1}/>, <IFile key={2}/>, <ILink key={3}/>];

// ─── SVG PRIMITIVES ──────────────────────────────────────────────────────────
function FlowPath({ d, color, show, delay = 0 }: { d: string; color: string; show: boolean; delay?: number }) {
  return (
    <g>
      <motion.path d={d} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }} />
      {show && (
        <motion.path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
          strokeDasharray="5 16"
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          animate={{ strokeDashoffset: -21, opacity: 0.75 }}
          transition={{
            strokeDashoffset: { duration: 1.3, repeat: Infinity, ease: "linear", delay },
            opacity: { duration: 0.3, delay },
          }} />
      )}
    </g>
  );
}

function DashedLine({ x1, y1, x2, y2, show }: { x1: number; y1: number; x2: number; y2: number; show: boolean }) {
  return (
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4 6"
      initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3 }} />
  );
}

// fade-in wrapper for SVG groups
function FadeG({ show, delay = 0, children }: { show: boolean; delay?: number; children: React.ReactNode }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}>
      {children}
    </motion.g>
  );
}

// Input node
function InNode({ i, show }: { i: number; show: boolean }) {
  const x = INP_X; const y = nodeY(i); const w = INP_W; const h = NODE_H;
  const color = NODE_COLORS[i];
  return (
    <FadeG show={show} delay={i * 0.07}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill="rgba(255,255,255,0.055)" stroke={color} strokeWidth="1" strokeOpacity="0.45" />
      <rect x={x} y={y} width={3} height={h} rx={1.5} fill={color} opacity="0.8" />
      <text x={x + 14} y={y + h / 2 - (INPUTS[i].sub ? 7 : 0)} fill="rgba(255,255,255,0.88)" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="400" dominantBaseline="middle">{INPUTS[i].label}</text>
      <text x={x + 14} y={y + h / 2 + 8} fill="rgba(255,255,255,0.38)" fontSize="8.5" fontFamily="Inter, sans-serif" fontWeight="300" dominantBaseline="middle">{INPUTS[i].sub}</text>
      <circle cx={x + w} cy={y + h / 2} r={3.5} fill={color} />
    </FadeG>
  );
}

// Output node
function OutNode({ i, show }: { i: number; show: boolean }) {
  const x = OUT_X; const y = nodeY(i); const w = OUT_W; const h = NODE_H;
  const color = NODE_COLORS[i];
  return (
    <FadeG show={show} delay={i * 0.07}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill="rgba(255,255,255,0.055)" stroke={color} strokeWidth="1" strokeOpacity="0.45" />
      <rect x={x + w - 3} y={y} width={3} height={h} rx={1.5} fill={color} opacity="0.8" />
      <circle cx={x} cy={y + h / 2} r={3.5} fill={color} />
      <text x={x + 12} y={y + h / 2} fill="rgba(255,255,255,0.88)" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="400" dominantBaseline="middle">{OUTPUTS[i].label}</text>
    </FadeG>
  );
}

// Side panel
function SidePanel({ x, yi, w, label, sub, accent, show, delay = 0 }: {
  x: number; yi: number; w: number; label: string; sub: string; accent?: string; show: boolean; delay?: number;
}) {
  const y = lpanY(yi); const h = PANEL_H;
  const bColor = accent ? accent : "rgba(255,255,255,0.18)";
  return (
    <FadeG show={show} delay={delay}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="rgba(255,255,255,0.04)" stroke={bColor} strokeWidth={accent ? "1.2" : "0.75"} />
      <text x={x + w / 2} y={y + h / 2 - 7} fill="rgba(255,255,255,0.78)" fontSize="9.5" fontFamily="Inter, sans-serif" fontWeight="500" textAnchor="middle" dominantBaseline="middle">{label}</text>
      <text x={x + w / 2} y={y + h / 2 + 7} fill="rgba(255,255,255,0.36)" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="300" textAnchor="middle" dominantBaseline="middle">{sub}</text>
    </FadeG>
  );
}

// Right panel (uses rpanY)
function RPanelNode({ i, label, sub, show, delay = 0 }: { i: number; label: string; sub: string; show: boolean; delay?: number }) {
  const x = RPAN_X; const y = rpanY(i); const w = RPAN_W; const h = PANEL_H;
  return (
    <FadeG show={show} delay={delay}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
      <text x={x + w / 2} y={y + h / 2 - 7} fill="rgba(255,255,255,0.78)" fontSize="9.5" fontFamily="Inter, sans-serif" fontWeight="500" textAnchor="middle" dominantBaseline="middle">{label}</text>
      <text x={x + w / 2} y={y + h / 2 + 7} fill="rgba(255,255,255,0.36)" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="300" textAnchor="middle" dominantBaseline="middle">{sub}</text>
    </FadeG>
  );
}

// ─── DESKTOP SVG DIAGRAM ──────────────────────────────────────────────────────
function DesktopDiagram({ level }: { level: number }) {
  const lv = (n: number) => level >= n;

  // Learning loop path (L3): from bottom of last output → arc down → back to Training panel
  const loopPath = `M ${OUT_X + OUT_W / 2} ${nodeY(3) + NODE_H} C ${OUT_X + OUT_W / 2} ${H + 30} ${LPAN_X + LPAN_W / 2} ${H + 30} ${LPAN_X + LPAN_W / 2} ${lpanY(2) + PANEL_H}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: 420 }} aria-hidden="true">

      {/* ── CONNECTIONS: inputs → core ── */}
      {INPUTS.map((inp, i) => (
        <FlowPath key={`in-${i}`} d={pathIn(i)} color={inp.color} show={lv(inp.minLevel)} delay={i * 0.08} />
      ))}

      {/* ── CONNECTIONS: core → outputs ── */}
      {OUTPUTS.map((out, i) => (
        <FlowPath key={`out-${i}`} d={pathOut(i)} color={out.color} show={lv(out.minLevel)} delay={0.1 + i * 0.08} />
      ))}

      {/* ── DASHED: left panels ↔ core ── */}
      {lv(2) && <DashedLine x1={LPAN_X + LPAN_W} y1={lpanCY(0)} x2={CORE_X} y2={lpanCY(0)} show={lv(2)} />}
      {lv(2) && <DashedLine x1={LPAN_X + LPAN_W} y1={lpanCY(1)} x2={CORE_X} y2={lpanCY(1)} show={lv(2)} />}
      {lv(3) && <DashedLine x1={LPAN_X + LPAN_W} y1={lpanCY(2)} x2={CORE_X} y2={lpanCY(2)} show={lv(3)} />}

      {/* ── DASHED: core ↔ right panels ── */}
      {lv(2) && <DashedLine x1={CORE_X + CORE_W} y1={rpanCY(0)} x2={RPAN_X} y2={rpanCY(0)} show={lv(2)} />}
      {lv(2) && <DashedLine x1={CORE_X + CORE_W} y1={rpanCY(1)} x2={RPAN_X} y2={rpanCY(1)} show={lv(2)} />}

      {/* ── LEARNING LOOP (L3) ── */}
      {lv(3) && (
        <>
          <motion.path d={loopPath} fill="none" stroke={C.crimson} strokeWidth="1.2"
            strokeDasharray="5 8" strokeOpacity="0.6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }} />
          <motion.path d={loopPath} fill="none" stroke={C.crimson} strokeWidth="2"
            strokeLinecap="round" strokeDasharray="4 18"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: -22, opacity: 0.7 }}
            transition={{
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.4 },
            }} />
          <text x={(OUT_X + OUT_W / 2 + LPAN_X + LPAN_W / 2) / 2} y={H + 18}
            fill={C.crimson} fontSize="8" fontFamily="Inter, sans-serif" fontWeight="300"
            textAnchor="middle" opacity="0.6">петля обучения</text>
        </>
      )}

      {/* ── CORE CONTAINER ── */}
      <rect x={CORE_X} y={CORE_Y} width={CORE_W} height={CORE_H} rx={10}
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      {/* Core header */}
      <text x={CORE_X + CORE_W / 2} y={CORE_Y + 17} fill="rgba(255,255,255,0.35)" fontSize="9"
        fontFamily="Inter, sans-serif" fontWeight="400" letterSpacing="2" textAnchor="middle">
        ЯДРО СИСТЕМЫ
      </text>
      <line x1={CORE_X + 10} y1={CORE_Y + 27} x2={CORE_X + CORE_W - 10} y2={CORE_Y + 27}
        stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Core layers */}
      {LAYERS.map((layer, i) => {
        const y = layerY(i);
        const isLast = i === 5;
        return (
          <g key={i}>
            <rect x={CORE_X + 8} y={y} width={CORE_W - 16} height={LAYER_H} rx={4}
              fill={isLast ? "rgba(31,20,16,0.6)" : "rgba(255,255,255,0.03)"}
              stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            {/* Color accent strip */}
            <rect x={CORE_X + 12} y={y + 6} width={4} height={LAYER_H - 12} rx={2} fill={layer.color} opacity="0.9" />
            <text x={CORE_X + 22} y={y + LAYER_H / 2 - 6} fill="rgba(255,255,255,0.85)"
              fontSize="9.5" fontFamily="Inter, sans-serif" fontWeight="500" dominantBaseline="middle">
              {layer.label}
            </text>
            <text x={CORE_X + 22} y={y + LAYER_H / 2 + 7} fill="rgba(255,255,255,0.35)"
              fontSize="8" fontFamily="Inter, sans-serif" fontWeight="300" dominantBaseline="middle">
              {layer.sub}
            </text>
            {/* Human review badge on layer 4, L3 only */}
            {i === 4 && lv(3) && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.2 }}>
                <rect x={CORE_X + CORE_W - 82} y={y + 9} width={68} height={13} rx={6.5}
                  fill="none" stroke={C.crimson} strokeWidth="0.85" />
                <text x={CORE_X + CORE_W - 48} y={y + 15.5} fill={C.crimson} fontSize="7.5"
                  fontFamily="Inter, sans-serif" textAnchor="middle" dominantBaseline="middle">
                  Human review
                </text>
              </motion.g>
            )}
          </g>
        );
      })}

      {/* ── INPUT NODES ── */}
      {INPUTS.map((inp, i) => <InNode key={i} i={i} show={lv(inp.minLevel)} />)}

      {/* ── OUTPUT NODES ── */}
      {OUTPUTS.map((out, i) => <OutNode key={i} i={i} show={lv(out.minLevel)} />)}

      {/* ── LEFT PANELS ── */}
      <SidePanel x={LPAN_X} yi={0} w={LPAN_W} label="Память"   sub="история, состояние" show={lv(2)} delay={0.1} />
      <SidePanel x={LPAN_X} yi={1} w={LPAN_W} label="Знания"   sub="правила, домен"      show={lv(2)} delay={0.18} />
      <SidePanel x={LPAN_X} yi={2} w={LPAN_W} label="Обучение" sub="ошибки → улучшение"  accent={C.crimson} show={lv(3)} delay={0.26} />

      {/* ── RIGHT PANELS ── */}
      <RPanelNode i={0} label="Прозрачность"      sub="статус, история решений"    show={lv(2)} delay={0.1} />
      <RPanelNode i={1} label="Стандарты системы" sub="версионированная логика"     show={lv(2)} delay={0.18} />

      {/* Channels label (L2+) */}
      {lv(2) && (
        <motion.text x={INP_X + 2} y={H - 6} fill="rgba(255,255,255,0.25)" fontSize="8"
          fontFamily="Inter, sans-serif" fontWeight="300"
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

  const inputItems = INPUTS.filter((_, i) => lv(INPUTS[i].minLevel));
  const outputItems = OUTPUTS.filter((_, i) => lv(OUTPUTS[i].minLevel));

  return (
    <div className="flex flex-col gap-3">
      {/* Inputs */}
      <div className="flex flex-col gap-2">
        {inputItems.map((inp, i) => (
          <motion.div key={inp.label}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            style={{ border: `1px solid ${inp.color}55`, borderLeft: `3px solid ${inp.color}`, borderRadius: 7, padding: "8px 12px", background: "rgba(255,255,255,0.04)", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ color: inp.color, flexShrink: 0 }}>{INPUT_ICONS[INPUTS.indexOf(inp)]}</span>
            <div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 500 }}>{inp.label}</div>
              <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 10 }}>{inp.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Arrow */}
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: 18, lineHeight: 1 }}>↓</div>

      {/* Core */}
      <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "12px 10px 10px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 2, marginBottom: 8 }}>ЯДРО СИСТЕМЫ</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {LAYERS.map((layer, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: i === 5 ? "rgba(31,20,16,0.5)" : "rgba(255,255,255,0.03)", borderRadius: 5, padding: "5px 8px", border: "0.5px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: 4, height: 18, borderRadius: 2, background: layer.color, flexShrink: 0 }} />
              <div>
                <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 10.5, fontWeight: 500 }}>{layer.label}</div>
                {i === 4 && lv(3) && (
                  <span style={{ border: `0.8px solid ${C.crimson}`, borderRadius: 99, padding: "1px 5px", fontSize: 8, color: C.crimson, marginLeft: 4 }}>Human review</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side pills (L2+) */}
      {lv(2) && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Память", "Знания", ...(lv(3) ? ["Обучение"] : [])].map(label => (
            <div key={label} style={{ border: `1px solid ${label === "Обучение" ? C.crimson + "88" : "rgba(255,255,255,0.2)"}`, borderRadius: 6, padding: "5px 10px", fontSize: 10, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.03)" }}>{label}</div>
          ))}
        </motion.div>
      )}

      {/* Arrow */}
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: 18, lineHeight: 1 }}>↓</div>

      {/* Outputs */}
      <div className="flex flex-col gap-2">
        {outputItems.map((out, i) => (
          <motion.div key={out.label}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            style={{ border: `1px solid ${out.color}55`, borderRight: `3px solid ${out.color}`, borderRadius: 7, padding: "8px 12px", background: "rgba(255,255,255,0.04)", textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 11, fontWeight: 400 }}>{out.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── FOUNDATION ROW ───────────────────────────────────────────────────────────
const FOUNDATIONS = [
  { icon: <ILock />, label: "Безопасность" },
  { icon: <IKey />,  label: "Контроль доступа" },
  { icon: <IFlag />, label: "Адаптация РФ" },
  { icon: <IPhone />, label: "Мультиканальность" },
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
    <section id="examples" className="section-padding" style={{ background: "#110D08" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          <p className="eyebrow mb-3" style={{ color: C.crimson }}>Архитектура</p>
          <h2 className="h2 mb-3" style={{ color: "#ffffff", textShadow: "0 2px 32px rgba(0,0,0,0.5)" }}>
            Как это работает
          </h2>
          <p className="font-inter font-light text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            Снаружи просто. Внутри — инженерия.
          </p>
        </motion.div>

        {/* ── LEVEL SWITCHER ── */}
        <div className="flex gap-2 mb-8" role="group" aria-label="Уровень системы">
          {LEVELS.map(({ n, label, sub }) => {
            const active = level === n;
            return (
              <button key={n} onClick={() => setLevel(n)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  border: `1px solid ${active ? C.crimson : "rgba(255,255,255,0.2)"}`,
                  background: active ? C.crimson : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1,
                }}>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: 1 }}>{label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 10, opacity: active ? 0.75 : 0.5 }}>{sub}</span>
              </button>
            );
          })}
        </div>

        {/* ── DIAGRAM CONTAINER ── */}
        <motion.div
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "28px 20px 20px" }}
          layout transition={{ duration: 0.4, ease: "easeInOut" }}>
          {/* Desktop */}
          <div className="hidden md:block">
            <DesktopDiagram level={level} />
          </div>
          {/* Mobile */}
          <div className="md:hidden">
            <MobileDiagram level={level} />
          </div>
        </motion.div>

        {/* ── DYNAMIC EXAMPLE TEXT ── */}
        <div className="text-center mt-6" style={{ minHeight: 24 }}>
          <AnimatePresence mode="wait">
            <motion.p key={level}
              className="font-inter font-light italic text-sm"
              style={{ color: "rgba(255,255,255,0.35)" }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}>
              {LEVEL_EXAMPLES[level]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── FOUNDATION ROW ── */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {FOUNDATIONS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.42)" }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{icon}</span>
              <span className="font-inter font-light text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* ── TECH STACK ── */}
        <div className="text-center mt-6 space-y-1">
          <p className="font-inter font-light text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Core:</span> n8n · Supabase · Claude
          </p>
          <p className="font-inter font-light text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>РФ:</span> YandexGPT · Gigachat · YandexCloud · Selectel · VK Cloud
          </p>
          <p className="font-inter font-light text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            Данные под вашим контролем
          </p>
        </div>

        {/* ── 3D OBJECT PLACEHOLDER ── */}
        <div id="hero-3d-object" style={{ height: 1 }} />

        {/* ── FINAL PHRASE ── */}
        <motion.p
          className="micro-phrase text-center mt-10"
          style={{ color: "rgba(255,255,255,0.28)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          Работает в процессе, а не в презентации.
        </motion.p>

      </div>
    </section>
  );
}
