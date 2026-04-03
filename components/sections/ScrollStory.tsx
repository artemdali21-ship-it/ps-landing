"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const scenes = [
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.png-1hL8GTC70jCdoMKljCmmsPNQO5KOft.jpeg",
    label: "СЕЙЧАС",
    headline: "Рутина пожирает время",
    sub: "Ваши лучшие люди делают то, что можно автоматизировать.",
    alt: "Офис с хаосом из бумаг, красная дверь в центре",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.png-Cdo7NfQE9XwFcXQpws6zDSyA5kHUT7.jpeg",
    label: "ПЕРЕХОД",
    headline: "Процессы начинают выстраиваться",
    sub: "Первые системы берут рутину на себя.",
    alt: "Офис становится чище, бумаг меньше",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.png-Q9FSmlZXt6GTnmYvhT0NFEh6N9X30K.jpeg",
    label: "СИСТЕМА",
    headline: "AI работает. Дверь приоткрыта.",
    sub: "Данные в порядке, задачи решаются автоматически.",
    alt: "Чистый офис с открытой дверью и цифровыми оверлеями",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.png-w4ends69OL62yTe6SSjC9DbJkqRGqx.jpeg",
    label: "ПРОРЫВ",
    headline: "Пространство разрывается.",
    sub: "Через дверь видно другой мир — тот, где вы занимаетесь главным.",
    alt: "Офис с красной дверью в лес, стены прорваны природой",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6g.png-jTDmESN0LahUgylbruygyn43c9l1yj.jpeg",
    label: "РЕЗУЛЬТАТ",
    headline: "Освобождаем время для того, что важно.",
    sub: "Не начинайте с решения. Начните с результата.",
    alt: "Человек медитирует в цветочном поле, цифровые схемы растворяются",
    isFinal: true,
  },
];

function Scene({
  scene,
  index,
  total,
  scrollYProgress,
}: {
  scene: (typeof scenes)[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, mid, end - 0.05, end],
    [0, 1, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [start, end], [1.06, 1]);
  const textY = useTransform(scrollYProgress, [start, end], [30, -30]);

  return (
    <motion.div
      className="absolute inset-0 flex items-end"
      style={{ opacity }}
      aria-hidden={index !== 0}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${scene.img}")`,
          scale,
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />

      {/* Text block */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-20 pb-16 md:pb-20 max-w-3xl"
        style={{ y: textY }}
      >
        <p className="font-space-grotesk font-medium text-xs tracking-widest uppercase text-crimson mb-3">
          {scene.label}
        </p>
        <h2
          className="font-outfit font-black text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          {scene.headline}
        </h2>
        <p className="font-inter font-light text-white/80 text-lg leading-relaxed max-w-xl">
          {scene.sub}
        </p>
        {scene.isFinal && (
          <a
            href="#services"
            className="mt-8 inline-block font-space-grotesk font-medium text-sm uppercase tracking-widest px-8 py-3 bg-crimson text-white hover:bg-crimson/90 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            Разобрать кейс
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

// Progress indicator dots
function Dots({ total, scrollYProgress }: { total: number; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const start = i / total;
        const end = (i + 1) / total;
        const opacity = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.3, 1, 0.3]);
        const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.7, 1, 0.7]);
        return (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white"
            style={{ opacity, scale }}
          />
        );
      })}
    </div>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = scenes.length;

  return (
    // Tall scroll container — height = 100vh × scenes
    <div
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* All scenes stacked, driven by scroll */}
        {scenes.map((scene, i) => (
          <Scene
            key={scene.label}
            scene={scene}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Progress dots */}
        <Dots total={total} scrollYProgress={scrollYProgress} />

        {/* Scene counter */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-1.5">
            {scenes.map((_, i) => {
              const start = i / total;
              const end = (i + 1) / total;
              const scaleX = useTransform(scrollYProgress, [start, end], [0, 1]);
              return (
                <div key={i} className="w-8 h-0.5 bg-white/20 overflow-hidden">
                  <motion.div className="h-full bg-white origin-left" style={{ scaleX }} />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
