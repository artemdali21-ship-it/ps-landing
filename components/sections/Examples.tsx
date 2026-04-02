"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const cases = [
  {
    title: "ВХОДЯЩИЕ И ПРОДАЖИ",
    before:
      "Лиды теряются, менеджеры тратят время на всё подряд, квалификация хаотична.",
    after:
      "Система фильтрует, собирает данные, передаёт команде только то с чем стоит работать.",
  },
  {
    title: "ДОКУМЕНТЫ И ПРОЦЕССЫ",
    before:
      "Типовые документы собираются вручную, часы на повторяющиеся действия.",
    after:
      "Система собирает вводные, формирует первую версию, сокращает рутину до минут.",
  },
  {
    title: "ЗНАНИЯ КОМПАНИИ",
    before:
      "Экспертиза в головах, новый человек долго входит, команда переспрашивает.",
    after: "Знания доступны, структурированы, полезны в нужный момент.",
  },
];

export default function Examples() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="примеры" className="section-padding bg-sand" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="h2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Как это выглядит
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="card flex flex-col gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <p className="eyebrow">{c.title}</p>

              {/* Before */}
              <div>
                <p className="font-space-grotesk font-medium text-xs uppercase tracking-widest text-stone mb-2">
                  Было
                </p>
                <p className="font-inter font-light text-taupe text-base leading-relaxed">
                  {c.before}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-stone" />
                <span className="text-crimson text-xl">↓</span>
                <div className="flex-1 h-px bg-stone" />
              </div>

              {/* After */}
              <div>
                <p className="font-space-grotesk font-medium text-xs uppercase tracking-widest text-crimson mb-2">
                  Стало
                </p>
                <p className="font-inter font-light text-espresso text-base leading-relaxed">
                  {c.after}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="micro-phrase text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Работает в процессе, а не в презентации.
        </motion.p>
      </div>
    </section>
  );
}
