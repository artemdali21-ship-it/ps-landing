"use client";
// v2
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
const levels = [
  {
    number: "01",
    tier: "МИКРОСИСТЕМЫ",
    priceLabel: "от",
    priceValue: 150000,
    priceSuffix: " ₽",
    timeline: "1–2 недели",
    description: "Одна задача. Один понятный результат.",
    items: [
      "Квалификация входящих",
      "Summary встречи + next steps",
      "Бриф → черновик КП",
      "Генерация типового документа",
    ],
  },
  {
    number: "02",
    tier: "РАБОЧИЕ СИСТЕМЫ",
    priceLabel: "от",
    priceValue: 300000,
    priceSuffix: " ₽",
    timeline: "2–4 недели",
    description: "Система ведёт процесс от входа до результата.",
    items: [
      "Лид → квалификация → CRM → менеджер → отчёт",
      "Бриф → КП → follow-up → статус сделки",
      "100 резюме → shortlist → HR работает с релевантными",
      "Встреча → Zoom → адженда → запись → summary",
    ],
  },
  {
    number: "03",
    tier: "ЭКСПЕРТНЫЕ СИСТЕМЫ",
    priceLabel: "от",
    priceValue: 700000,
    priceSuffix: " ₽",
    timeline: "4–12 недель",
    description: "\u0422\u0430\u043c \u0433\u0434\u0435 \u043e\u0448\u0438\u0431\u043a\u0430 \u0441\u0442\u043e\u0438\u0442 \u0434\u043e\u0440\u043e\u0436\u0435 \u0447\u0435\u043c \u0441\u0438\u0441\u0442\u0435\u043c\u0430.",
    items: [
      "Сметы и расчёты с десятками переменных",
      "Системы принятия решений с памятью",
      "Вертикальные архитектуры под отрасль",
    ],
  },
];

function useCountUp(target: number, inView: boolean, duration = 1.2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

function PriceCounter({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, inView, 1.4);

  return (
    <p ref={ref} className="font-space-mono font-bold text-2xl text-espresso mb-1">
      {label}&nbsp;{count.toLocaleString("ru-RU")}
      {suffix}
    </p>
  );
}

// Entrance directions per card
const cardVariants = [
  { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, y: 50 },  show: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, x: 50 },  show: { opacity: 1, x: 0 } },
];

export default function ThreeLevels() {
  const headerRef = useRef(null);

  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto">

        {/* Header with whileInView entrance — no scroll container needed */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="h2 mb-4">{"Три уровня AI-систем"}</h2>
          <p className="font-inter font-light text-taupe text-lg max-w-xl mx-auto leading-relaxed">
            {"Одни закрывают одну задачу. Другие становятся частью процесса. Третьи — основой экспертной системы."}
          </p>
          <motion.p
            className="font-space-grotesk font-medium text-crimson mt-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {"Уровень определяется масштабом результата, не бюджетом."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level, i) => (
            <motion.div
              key={level.number}
              className="relative overflow-hidden group"
              style={{
                backgroundColor: "#F3ECE2",
                borderRadius: "10px",
                padding: "32px",
                border: "1px solid #D4C8B8",
              }}
              initial={cardVariants[i].hidden}
              whileInView={cardVariants[i].show}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 50px rgba(0,0,0,0.10)",
              }}
            >
              {/* Hover accent border */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-crimson"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ originY: 0 }}
              />

              {/* Ghost number */}
              <span className="absolute top-4 right-6 font-space-mono font-bold text-7xl text-espresso/[0.06] select-none leading-none">
                {level.number}
              </span>

              <p className="eyebrow mb-3">{level.tier}</p>

              <PriceCounter
                value={level.priceValue}
                label={level.priceLabel}
                suffix={level.priceSuffix}
              />

              <p className="font-inter font-light text-taupe text-sm mb-4">
                {level.timeline}
              </p>

              <div className="h-px bg-stone mb-4" />

              <p suppressHydrationWarning className="font-inter font-light text-espresso text-base mb-5 leading-relaxed">
                {level.description}
              </p>

              <ul className="flex flex-col gap-2.5" suppressHydrationWarning>
                {level.items.map((item) => (
                  <li
                    key={item}
                    className="font-inter font-light text-taupe text-sm flex gap-2 leading-snug"
                    suppressHydrationWarning
                  >
                    <span className="text-crimson mt-0.5 flex-shrink-0" aria-hidden>{"·"}</span>
                    <span suppressHydrationWarning>{String(item)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
