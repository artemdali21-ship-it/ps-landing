"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen pt-32 pb-24 px-5 md:px-20 flex items-center overflow-hidden"
      style={{ backgroundColor: "#FAF6F0" }}
    >
      <div className="w-full max-w-5xl flex flex-col gap-8">

        <motion.p className="eyebrow" custom={0} variants={fadeUp} initial="hidden" animate="show">
          AI Systems Consultancy
        </motion.p>

        <motion.h1
          className="h1"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {"ОСВОБОЖДАЕМ ВРЕМЯ"}<br />
          {"ДЛЯ ТОГО, ЧТО"}<br />
          {"ДЕЙСТВИТЕЛЬНО"}<br />
          <span className="text-crimson">{"ВАЖНО."}</span>
        </motion.h1>

        <motion.div className="flex flex-col gap-5" custom={2} variants={fadeUp} initial="hidden" animate="show">
          <p className="font-sans font-light text-taupe text-xl leading-relaxed max-w-2xl">
            {"AI-системы, которые работают."}
          </p>
          <p className="font-sans font-medium text-crimson text-base">
            {"Не начинайте с решения. Начните с результата."}
          </p>
        </motion.div>

        <motion.div className="flex flex-col gap-4" custom={3} variants={fadeUp} initial="hidden" animate="show">
          <a href="#cta" className="btn-primary text-center w-fit">
            {"Разобрать кейс"}
          </a>
          <p suppressHydrationWarning className="font-sans font-light text-taupe text-sm leading-relaxed max-w-sm">
            {[
              "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 2\u20133 ",
              "\u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447\u0438 \u2014 ",
              "\u043C\u044B \u0441\u043A\u0430\u0436\u0435\u043C \u0447\u0442\u043E \u043C\u043E\u0436\u043D\u043E ",
              "\u0441\u043E\u0431\u0440\u0430\u0442\u044C, \u0441\u043A\u043E\u043B\u044C\u043A\u043E ",
              "\u0441\u0442\u043E\u0438\u0442 \u0438 \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C.",
            ].join("")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
