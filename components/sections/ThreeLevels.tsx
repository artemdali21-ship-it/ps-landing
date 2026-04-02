"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const levels = [
  {
    number: "01",
    tier: "МИКРОСИСТЕМЫ",
    price: "от 150 000 ₽",
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
    price: "от 300 000 ₽",
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
    price: "от 700 000 ₽",
    timeline: "4–12 недель",
    description: "Там где ошибка стоит дороже чем система.",
    items: [
      "Сметы и расчёты с десятками переменных",
      "Системы принятия решений с памятью",
      "Вертикальные архитектуры под отрасль",
    ],
  },
];

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
              className="card relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            >
              {/* Ghost number */}
              <span className="absolute top-4 right-6 font-space-mono font-bold text-7xl text-espresso/[0.08] select-none leading-none">
                {level.number}
              </span>

              {/* Tier */}
              <p className="eyebrow mb-3">{level.tier}</p>

              {/* Price */}
              <p className="font-space-mono font-bold text-2xl text-espresso mb-1">
                {level.price}
              </p>

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
