"use client";

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
    description: "Там где ошибка стоит дороже чем система.",
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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

function PriceCounter({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, inView, 1.4);

  return (
    <p ref={ref} className="font-space-mono font-bold text-2xl text-espresso mb-1">
      {label}&nbsp;{count.toLocaleString("ru-RU")}{suffix}
    </p>
  );
}

export default function ThreeLevels() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="h2 mb-4">Три уровня AI-систем</h2>
          <p className="font-inter font-light text-taupe text-lg max-w-xl mx-auto leading-relaxed">
            Одни закрывают одну задачу. Другие становятся частью процесса.
            Третьи — основой экспертной системы.
          </p>
          <p className="font-space-grotesk font-medium text-crimson mt-4">
            Уровень определяется масштабом результата, не бюджетом.
          </p>
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
                transition: "all 0.3s",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{
                y: -4,
                boxShadow: "0 16px 40px rgba(0,0,0,0.09)",
              }}
            >
              {/* Hover accent border left */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-crimson"
                initial={{ scaleY: 0, originY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />

              {/* Ghost number */}
              <span className="absolute top-4 right-6 font-space-mono font-bold text-7xl text-espresso/[0.07] select-none leading-none">
                {level.number}
              </span>

              {/* Tier */}
              <p className="eyebrow mb-3">{level.tier}</p>

              {/* Price — animated counter */}
              <PriceCounter
                value={level.priceValue}
                label={level.priceLabel}
                suffix={level.priceSuffix}
              />

              {/* Timeline */}
              <p className="font-inter font-light text-taupe text-sm mb-4">
                {level.timeline}
              </p>

              {/* Divider */}
              <div className="h-px bg-stone mb-4" />

              {/* Description */}
              <p className="font-inter font-light text-espresso text-base mb-5 leading-relaxed">
                {level.description}
              </p>

              {/* List */}
              <ul className="flex flex-col gap-2.5">
                {level.items.map((item) => (
                  <li
                    key={item}
                    className="font-inter font-light text-taupe text-sm flex gap-2 leading-snug"
                  >
                    <span className="text-crimson mt-0.5 flex-shrink-0">·</span>
                    {item}
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
