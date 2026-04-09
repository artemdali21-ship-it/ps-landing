"use client";
// v3 — Folders UI
import { useState, useEffect, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

const ICONS: Record<string, ReactElement> = {
  Filter: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  FileCheck: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 15 11 17 15 13" />
    </svg>
  ),
  FileEdit: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="10" y1="12" x2="14" y2="12" />
      <line x1="10" y1="16" x2="14" y2="16" />
      <line x1="10" y1="8" x2="12" y2="8" />
    </svg>
  ),
  ArrowUpDown: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 11 21 7 17 3" />
      <line x1="21" y1="7" x2="9" y2="7" />
      <polyline points="7 13 3 17 7 21" />
      <line x1="3" y1="17" x2="15" y2="17" />
    </svg>
  ),
  FileText: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <line x1="8" y1="9" x2="10" y2="9" />
    </svg>
  ),
  TrendingUp: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Users: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ListChecks: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <polyline points="3 6 4 7 6 5" />
      <polyline points="3 12 4 13 6 11" />
      <polyline points="3 18 4 19 6 17" />
    </svg>
  ),
  FolderOpen: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  RefreshCw: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Award: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  GitBranch: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  LineChart: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="3" x2="3" y2="21" />
      <line x1="3" y1="21" x2="21" y2="21" />
      <polyline points="7 14 11 10 15 13 19 7" />
    </svg>
  ),
  Brain: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    </svg>
  ),
  Layers: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEVELS = [
  {
    title: "Микросистемы",
    price: "от 150 000 ₽",
    timeline: "1–2 недели",
    description: "Одна задача. Один точный результат.",
    number: "01",
    accentColor: "#4A9B6F",
    sideCardBg: "/images/cards/L11.webp",
    cards: [
      { position: "center",  label: "Микросистемы", sublabel: "01", iconName: "Filter", image: "/images/cards/L1.webp" },
      { position: "left-1",  label: "Итоги встречи",         sublabel: "Авто-протокол", iconName: "FileCheck" },
      { position: "left-2",  label: "Черновик КП",           sublabel: "Из брифа",      iconName: "FileEdit" },
      { position: "right-1", label: "Сортировка входящих",   sublabel: "Приоритеты",    iconName: "ArrowUpDown" },
      { position: "right-2", label: "Типовой документ",      sublabel: "Шаблон",        iconName: "FileText" },
    ],
    examples: [
      "Квалификация входящих",
      "Итоги встречи + next steps",
      "Черновик КП из брифа",
      "Генерация типового документа",
    ],
  },
  {
    title: "Рабочие системы",
    price: "от 300 000 ₽",
    timeline: "2–4 недели",
    description: "Связанный процесс от входа до результата.",
    number: "02",
    accentColor: "#C41230",
    sideCardBg: "/images/cards/L22.webp",
    cards: [
      { position: "center",  label: "Рабочие системы", sublabel: "02", iconName: "TrendingUp", image: "/images/cards/L2.webp" },
      { position: "left-1",  label: "HR-скрининг",          sublabel: "100 → shortlist",  iconName: "Users" },
      { position: "left-2",  label: "Встреча → задачи",     sublabel: "Протокол",         iconName: "ListChecks" },
      { position: "right-1", label: "Документооборот",      sublabel: "Авто-поток",       iconName: "FolderOpen" },
      { position: "right-2", label: "Контур сопровождения", sublabel: "Follow-up",        iconName: "RefreshCw" },
    ],
    examples: [
      "Лид → квалификация → CRM → менеджер → отчёт",
      "Бриф → КП → follow-up → статус сделки",
      "100 резюме → shortlist → HR работает с релевантными",
      "Встреча → повестка → запись → задачи",
    ],
  },
  {
    title: "Экспертные системы",
    price: "от 700 000 ₽",
    timeline: "4–12 недель",
    description: "Там, где важны контекст, проверка и цена ошибки.",
    number: "03",
    accentColor: "#C9A84C",
    sideCardBg: "/images/cards/L33.webp",
    cards: [
      { position: "center",  label: "Экспертные системы", sublabel: "03", iconName: "Award", image: "/images/cards/L3.webp" },
      { position: "left-1",  label: "Система принятия решений",  sublabel: "С памятью",       iconName: "GitBranch" },
      { position: "left-2",  label: "Аналитика с прогнозом",     sublabel: "Мультифакторная", iconName: "LineChart" },
      { position: "right-1", label: "Контекстная система",       sublabel: "Под отрасль",     iconName: "Brain" },
      { position: "right-2", label: "Вертикальная архитектура",  sublabel: "Полный цикл",     iconName: "Layers" },
    ],
    examples: [
      "Сметы и расчёты с десятками переменных",
      "Системы принятия решений с памятью",
      "Вертикальные архитектуры под отрасль",
    ],
  },
];

// ─── Card position configs ─────────────────────────────────────────────────────

type CardState = {
  rotate: number;
  translateX: number;
  translateY: number;
  scale: number;
  zIndex: number;
};

const COLLAPSED: CardState[] = [
  { rotate:  0,   translateX:   0,  translateY: 0,  scale: 1.00, zIndex: 5 },
  { rotate: -6,   translateX: -12,  translateY: 4,  scale: 0.94, zIndex: 4 },
  { rotate: -12,  translateX: -22,  translateY: 8,  scale: 0.88, zIndex: 3 },
  { rotate:  6,   translateX:  12,  translateY: 4,  scale: 0.94, zIndex: 4 },
  { rotate:  12,  translateX:  22,  translateY: 8,  scale: 0.88, zIndex: 3 },
];

const EXPANDED: CardState[] = [
  { rotate:  0,   translateX:    0,  translateY: -16, scale: 1.04, zIndex: 5 },
  { rotate: -5,   translateX:  -88,  translateY:  -8, scale: 0.92, zIndex: 4 },
  { rotate: -10,  translateX: -152,  translateY:   0, scale: 0.84, zIndex: 3 },
  { rotate:  5,   translateX:   88,  translateY:  -8, scale: 0.92, zIndex: 4 },
  { rotate:  10,  translateX:  152,  translateY:   0, scale: 0.84, zIndex: 3 },
];

// ─── MiniCard ─────────────────────────────────────────────────────────────────

interface CardData {
  position: string;
  label: string;
  sublabel: string;
  iconName: string;
  image?: string | null;
}

function MiniCard({
  card,
  index,
  isOpen,
  accentColor,
  sideCardBg,
}: {
  card: CardData;
  index: number;
  isOpen: boolean;
  accentColor: string;
  sideCardBg?: string;
}) {
  const isCenter = index === 0;
  const state = isOpen ? EXPANDED[index] : COLLAPSED[index];

  return (
    <motion.div
      animate={{
        rotate: state.rotate,
        x: state.translateX,
        y: state.translateY,
        scale: state.scale,
        zIndex: state.zIndex,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        marginLeft: isCenter ? -80 : -60,
        width: isCenter ? 160 : 120,
        height: isCenter ? 200 : 160,
        background: "#FAF6F0",
        backgroundImage: (!isCenter && sideCardBg) ? `url(${sideCardBg})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 12,
        border: (isCenter && card.image) ? "none" : "1px solid rgba(212,200,184,0.6)",
        boxShadow: "0 8px 32px rgba(31,20,16,0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: (isCenter && card.image) ? 0 : "12px 10px",
        overflow: (isCenter && card.image) ? "hidden" : "visible",
        userSelect: "none",
        zIndex: state.zIndex,
        transformOrigin: "bottom center",
      }}
    >
      {card.image ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt={card.label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {isCenter && (
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px 10px 12px",
              background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
              borderRadius: "0 0 10px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>
                {card.label}
              </span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
                {card.sublabel}
              </span>
            </div>
          )}
        </div>
      ) : (
        <>
          <span style={{ color: accentColor, display: "flex", flexShrink: 0 }}>
            {ICONS[card.iconName] ?? ICONS["FileText"]}
          </span>
          <span
            style={{
              fontSize: isCenter ? 11 : 9,
              fontWeight: 700,
              color: "#1F1410",
              textAlign: "center",
              lineHeight: 1.3,
              letterSpacing: 0.2,
            }}
          >
            {card.label}
          </span>
          <span
            style={{
              fontSize: isCenter ? 9 : 8,
              color: "rgba(31,20,16,0.45)",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {card.sublabel}
          </span>
        </>
      )}
    </motion.div>
  );
}

// ─── FolderCard ───────────────────────────────────────────────────────────────

interface Level {
  title: string;
  price: string;
  timeline: string;
  description: string;
  number: string;
  accentColor: string;
  sideCardBg?: string;
  cards: CardData[];
  examples: string[];
}

function FolderCard({ level }: { level: Level }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.div
      onHoverStart={() => !isMobile && setIsOpen(true)}
      onHoverEnd={() => !isMobile && setIsOpen(false)}
      onClick={() => isMobile && setIsOpen((o) => !o)}
      animate={{
        boxShadow: isOpen
          ? "0 12px 48px rgba(0,0,0,0.14)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        border: isOpen
          ? "1px solid rgba(196,18,48,0.18)"
          : "1px solid rgba(0,0,0,0.07)",
      }}
      transition={{ duration: 0.2 }}
      style={{
        background: "rgba(250,246,240,0.9)",
        borderRadius: 16,
        padding: 20,
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Fan of 5 mini-cards */}
      <div style={{ height: 180, position: "relative", marginBottom: 16 }}>
        {level.cards.map((card, i) => (
          <MiniCard
            key={i}
            card={card}
            index={i}
            isOpen={isOpen}
            accentColor={level.accentColor}
            sideCardBg={level.sideCardBg}
          />
        ))}
      </div>

      {/* Folder info */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: "#8A7B6B",
            letterSpacing: 2,
            fontFamily: "monospace",
            fontWeight: 600,
          }}
        >
          {level.number}
        </span>
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#1F1410",
            marginTop: 4,
            lineHeight: 1.2,
          }}
        >
          {level.title}
        </h3>
        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#C41230",
            marginTop: 6,
          }}
        >
          {level.price}
        </p>
        <p style={{ fontSize: 12, color: "#8A7B6B", marginTop: 2 }}>
          {level.timeline}
        </p>
        <p
          style={{
            fontSize: 14,
            color: "#1F1410",
            marginTop: 12,
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {level.description}
        </p>

        {/* Examples — animate in/out */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ marginTop: 16, listStyle: "none", padding: 0, overflow: "hidden" }}
            >
              {level.examples.map((ex, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                  style={{
                    fontSize: 12,
                    color: "#8A7B6B",
                    padding: "3px 0",
                    display: "flex",
                    gap: 6,
                    alignItems: "flex-start",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: level.accentColor, flexShrink: 0 }}>—</span>
                  {ex}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle accent line at bottom */}
      <motion.div
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 28,
          right: 28,
          height: 2,
          background: level.accentColor,
          borderRadius: 1,
          transformOrigin: "left center",
        }}
      />
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ThreeLevels() {
  return (
    <section id="services" className="section-padding" style={{ paddingTop: "4rem", paddingBottom: "3rem", background: "#FAF6F0" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header — kept exactly as original */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="h2 mb-4">
            Три уровня{" "}
            <br className="md:hidden" />
            AI-систем
          </h2>
          <p className="font-inter font-light text-taupe text-lg max-w-xl mx-auto leading-relaxed">
            Одни закрывают одну задачу.{" "}
            <br className="md:hidden" />
            Другие становятся частью процесса.{" "}
            <br className="md:hidden" />
            Третьи — основой экспертной системы.
          </p>
          <motion.p
            className="font-space-grotesk font-medium text-crimson mt-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {"Уровень определяется масштабом результата, не бюджетом."}
          </motion.p>
        </motion.div>

        {/* Folders UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {LEVELS.map((level, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <FolderCard level={level} />
            </motion.div>
          ))}
        </div>

        {/* Intermediate CTA */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#cta"
            className="font-space-grotesk font-semibold uppercase text-xs tracking-widest px-8 py-3 rounded-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: "1.5px solid #C41230",
              color: "#C41230",
              letterSpacing: "0.14em",
              background: "transparent",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(196,18,48,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Обсудить задачу
          </a>
        </motion.div>

      </div>
    </section>
  );
}
