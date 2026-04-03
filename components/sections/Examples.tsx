"use client";

import { motion } from "framer-motion";

// Minimal SVG icons per case
function IconSales() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="20" width="6" height="10" rx="1" fill="#C41230" opacity="0.25"/>
      <rect x="11" y="14" width="6" height="16" rx="1" fill="#C41230" opacity="0.5"/>
      <rect x="20" y="6" width="6" height="24" rx="1" fill="#C41230"/>
      <path d="M6 16L13 10L20 13L28 4" stroke="#C41230" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="28" cy="4" r="2" fill="#C41230"/>
    </svg>
  );
}

function IconDocs() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="2" width="16" height="20" rx="2" stroke="#C41230" strokeWidth="1.5"/>
      <rect x="10" y="24" width="16" height="6" rx="2" fill="#C41230" opacity="0.2" stroke="#C41230" strokeWidth="1.5"/>
      <path d="M10 8h8M10 12h6M10 16h4" stroke="#C41230" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 7l3 3-3 3" stroke="#C41230" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconKnowledge() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="10" r="6" stroke="#C41230" strokeWidth="1.5"/>
      <circle cx="7" cy="24" r="4" stroke="#C41230" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="25" cy="24" r="4" stroke="#C41230" strokeWidth="1.5" opacity="0.4"/>
      <path d="M10 20L16 16L22 20" stroke="#C41230" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const cases = [
  {
    title: "ВХОДЯЩИЕ И ПРОДАЖИ",
    icon: <IconSales />,
    before:
      "Лиды теряются, менеджеры тратят время на всё подряд, квалификация хаотична.",
    after:
      "Система фильтрует, собирает данные, передаёт команде только то с чем стоит работать.",
  },
  {
    title: "ДОКУМЕНТЫ И ПРОЦЕССЫ",
    icon: <IconDocs />,
    before:
      "Типовые документы собираются вручную, часы на повторяющиеся действия.",
    after:
      "Система собирает вводные, формирует первую версию, сокращает рутину до минут.",
  },
  {
    title: "ЗНАНИЯ КОМПАНИИ",
    icon: <IconKnowledge />,
    before:
      "Экспертиза в головах, новый человек долго входит, команда переспрашивает.",
    after: "Знания доступны, структурированы, полезны в нужный момент.",
  },
];

export default function Examples() {
  return (
    <section id="примеры" className="section-padding bg-sand">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="h2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center">
                {c.icon}
              </div>

              <p className="eyebrow">{c.title}</p>

              {/* Before */}
              <div>
                <p className="font-space-grotesk font-medium text-xs uppercase tracking-widest mb-2" style={{ color: "#8A7B6B" }}>
                  Было
                </p>
                <p className="font-inter font-light text-base leading-relaxed" style={{ color: "#8A7B6B" }}>
                  {c.before}
                </p>
              </div>

              {/* Arrow divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-stone" />
                <span className="text-crimson text-xl" aria-hidden="true">↓</span>
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Работает в процессе, а не в презентации.
        </motion.p>
      </div>
    </section>
  );
}
