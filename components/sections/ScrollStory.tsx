"use client";
// v6 — no useScroll, pure useMotionValue + scroll listener

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
    headline: "ПРОЦЕССЫ ВЫСТРАИВАЮТСЯ",
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
    headline: "ОСВОБОЖДАЕМ ВРЕМЯ ДЛЯ ГЛАВНОГО.",
    sub: "Не начинайте с решения. Начните с результата.",
    alt: "Человек медитирует в цветочном поле, цифровые схемы растворяются",
    isFinal: true,
  },
];

type MV = ReturnType<typeof useMotionValue<number>>;

function Scene({
  scene,
  index,
  total,
  prog,
}: {
  scene: (typeof scenes)[0];
  index: number;
  total: number;
  prog: MV;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(prog, [start, start + 0.04, end - 0.04, end], [0, 1, 1, 0]);
  const scale = useTransform(prog, [start, end], [1.06, 1.0]);
  const textRef = useRef<HTMLDivElement>(null);

  // Write y directly to DOM to avoid Framer Motion scroll detection warning
  useEffect(() => {
    return prog.on("change", (v) => {
      if (!textRef.current) return;
      const local = total > 0 ? (v - start) / (end - start) : 0;
      const ty = 24 - local * 48;
      textRef.current.style.transform = `translateY(${ty}px)`;
    });
  }, [prog, start, end, total]);

  return (
    <motion.div className="absolute inset-0 flex items-end" style={{ opacity }}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${scene.img}")`, scale }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div
        ref={textRef}
        className="relative z-10 w-full px-6 md:px-20 pb-16 md:pb-24 max-w-3xl"
        style={{ transform: "translateY(24px)", willChange: "transform" }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500, color: "#C41230" }}
        >
          {scene.label}
        </p>
        <h2
          className="text-white leading-tight mb-4"
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 4rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          {scene.headline}
        </h2>
        <p
          className="text-white/80 text-lg leading-relaxed max-w-xl"
          style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 300 }}
        >
          {scene.sub}
        </p>
        {scene.isFinal && (
          <a
            href="#services"
            className="mt-8 inline-block text-sm uppercase tracking-widest px-8 py-3 bg-crimson text-white hover:bg-crimson/90 transition-colors"
            style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, borderRadius: "2px" }}
          >
            {"Разобрать кейс"}
          </a>
        )}
      </div>
    </motion.div>
  );
}

function Dot({ index, total, prog }: { index: number; total: number; prog: MV }) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const opacity = useTransform(prog, [start, mid, end], [0.3, 1, 0.3]);
  const scale = useTransform(prog, [start, mid, end], [0.7, 1.3, 0.7]);
  return <motion.div className="w-1.5 h-1.5 rounded-full bg-white" style={{ opacity, scale }} />;
}

function Bar({ index, total, prog }: { index: number; total: number; prog: MV }) {
  const start = index / total;
  const end = (index + 1) / total;
  const scaleX = useTransform(prog, [start, end], [0, 1]);
  return (
    <div className="w-8 h-px bg-white/20 overflow-hidden">
      <motion.div className="h-full bg-white origin-left" style={{ scaleX }} />
    </div>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prog = useMotionValue(0);

  useEffect(() => {
    function update() {
      const el = containerRef.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      prog.set(Math.min(1, Math.max(0, (window.scrollY - el.offsetTop) / range)));
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [prog]);

  const total = scenes.length;

  return (
    <div ref={containerRef} style={{ height: `${total * 100}vh`, position: "relative" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {scenes.map((scene, i) => (
          <Scene key={scene.label} scene={scene} index={i} total={total} prog={prog} />
        ))}

        {/* Side progress dots */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <Dot key={i} index={i} total={total} prog={prog} />
          ))}
        </div>

        {/* Top progress bars */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {scenes.map((_, i) => (
            <Bar key={i} index={i} total={total} prog={prog} />
          ))}
        </div>
      </div>
    </div>
  );
}
