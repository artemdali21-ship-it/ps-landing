"use client";
// v3 — no useScroll, pure useMotionValue + scroll listener

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const scenes = [
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.png-1hL8GTC70jCdoMKljCmmsPNQO5KOft.jpeg",
    label: "СЕЙЧАС",
    headline: "РУТИНА ПОЖИРАЕТ ВРЕМЯ",
    sub: "Ваши лучшие люди делают то, что можно автоматизировать.",
    alt: "Офис с хаосом из бумаг, красная дверь в центре",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.png-Cdo7NfQE9XwFcXQpws6zDSyA5kHUT7.jpeg",
    label: "ПЕРЕХОД",
    headline: "ПРОЦЕССЫ НАЧИНАЮТ ВЫСТРАИВАТЬСЯ",
    sub: "Первые системы берут рутину на себя.",
    alt: "Офис становится чище, бумаг меньше",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.png-Q9FSmlZXt6GTnmYvhT0NFEh6N9X30K.jpeg",
    label: "СИСТЕМА",
    headline: "AI РАБОТАЕТ. ДВЕРЬ ПРИОТКРЫТА.",
    sub: "Данные в порядке, задачи решаются автоматически.",
    alt: "Чистый офис с открытой дверью и цифровыми оверлеями",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.png-w4ends69OL62yTe6SSjC9DbJkqRGqx.jpeg",
    label: "ПРОРЫВ",
    headline: "ПРОСТРАНСТВО РАЗРЫВАЕТСЯ.",
    sub: "Через дверь видно другой мир — тот, где вы занимаетесь главным.",
    alt: "Офис с красной дверью в лес, стены прорваны природой",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6g.png-jTDmESN0LahUgylbruygyn43c9l1yj.jpeg",
    label: "РЕЗУЛЬТАТ",
    headline: "ОСВОБОЖДАЕМ ВРЕМЯ ДЛЯ ТОГО, ЧТО ВАЖНО.",
    sub: "Не начинайте с решения. Начните с результата.",
    alt: "Человек медитирует в цветочном поле, цифровые схемы растворяются",
    isFinal: true,
  },
];

// Each scene fades in/out based on scroll progress
function Scene({
  scene,
  index,
  total,
  progress,
}: {
  scene: (typeof scenes)[0];
  index: number;
  total: number;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.01),
      start + 0.04,
      end - 0.04,
      Math.min(1, end + 0.01),
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [1.06, 1.0]);
  const textY = useTransform(progress, [start, end], [24, -24]);

  return (
    <motion.div
      className="absolute inset-0 flex items-end"
      style={{ opacity }}
    >
      {/* Background image with subtle Ken Burns */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${scene.img}")`, scale }}
      />
      {/* Dark gradient bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
      {/* Text */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-20 pb-16 md:pb-20 max-w-3xl"
        style={{ y: textY }}
      >
        <p className="font-space-grotesk font-medium text-xs tracking-widest uppercase text-crimson mb-3">
          {scene.label}
        </p>
        <h2
          className="font-sans font-black text-white leading-tight mb-4 uppercase"
          style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
        >
          {scene.headline}
        </h2>
        <p className="font-sans font-light text-white/80 text-lg leading-relaxed max-w-xl">
          {scene.sub}
        </p>
        {scene.isFinal && (
          <a
            href="#services"
            className="mt-8 inline-block font-space-grotesk font-medium text-sm uppercase tracking-widest px-8 py-3 bg-crimson text-white hover:bg-crimson/90 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            {"Разобрать кейс"}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const dotOpacity = useTransform(progress, [start, mid, end], [0.3, 1, 0.3]);
  const dotScale = useTransform(progress, [start, mid, end], [0.7, 1.2, 0.7]);
  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-white"
      style={{ opacity: dotOpacity, scale: dotScale }}
    />
  );
}

function Bar({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const scaleX = useTransform(progress, [start, end], [0, 1]);
  return (
    <div className="w-8 h-px bg-white/25 overflow-hidden">
      <motion.div className="h-full bg-white origin-left" style={{ scaleX }} />
    </div>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const total = scenes.length;

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const height = el.offsetHeight - window.innerHeight;
      if (height <= 0) return;
      progress.set(Math.min(1, Math.max(0, (window.scrollY - top) / height)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  return (
    <div ref={containerRef} style={{ height: `${total * 100}vh`, position: "relative" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {scenes.map((scene, i) => (
          <Scene key={scene.label} scene={scene} index={i} total={total} progress={progress} />
        ))}

        {/* Nav dots — right side */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {scenes.map((_, i) => (
            <Dot key={i} index={i} total={total} progress={progress} />
          ))}
        </div>

        {/* Progress bars — top center */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {scenes.map((_, i) => (
            <Bar key={i} index={i} total={total} progress={progress} />
          ))}
        </div>

      </div>
    </div>
  );
}
