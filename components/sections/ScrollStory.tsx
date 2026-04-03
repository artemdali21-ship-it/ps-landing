"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// 6 scenes — background images cycle one by one during sticky scroll
const scenes = [
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.png-1hL8GTC70jCdoMKljCmmsPNQO5KOft.jpeg",
    label: "СЕЙЧАС",
    headline: "ВАШИ ЛЮДИ\nДЕЛАЮТ НЕ ТО",
    sub: "Повторяющиеся задачи занимают время тех, кто должен думать, а не заполнять.",
    alt: "Офис с хаосом из бумаг",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.png-Cdo7NfQE9XwFcXQpws6zDSyA5kHUT7.jpeg",
    label: "РЕШЕНИЕ",
    headline: "УБИРАЕМ РУТИНУ.\nСНИЖАЕМ ШУМ.",
    sub: "Входящие, документы, квалификация — каждый процесс получает логику и память.",
    alt: "Офис становится чище",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.png-Q9FSmlZXt6GTnmYvhT0NFEh6N9X30K.jpeg",
    label: "КАК МЫ РАБОТАЕМ",
    headline: "ТРИ УРОВНЯ\nAI-СИСТЕМ",
    sub: "Микросистема закрывает одну задачу. Рабочая система ведёт процесс. Экспертная — принимает решения.",
    alt: "Чистый офис с открытой дверью",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.png-Wd0lFYmU4OQ8m6e5Y7YfPalfPl5ADo.jpeg",
    label: "ПРИМЕРЫ",
    headline: "ВХОДЯЩИЕ.\nДОКУМЕНТЫ.\nЗНАНИЯ.",
    sub: "Лиды фильтруются автоматически. Типовые документы собираются за минуты. Экспертиза доступна в нужный момент.",
    alt: "Птичий вид на город",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.png-w4ends69OL62yTe6SSjC9DbJkqRGqx.jpeg",
    label: "ПРОЦЕСС",
    headline: "РАЗБИРАЕМ.\nСОБИРАЕМ.\nРАБОТАЕТ.",
    sub: "Вы показываете процесс и результат. Мы находим где система даёт эффект. 30 минут — и архитектура готова.",
    alt: "Офис с красной дверью",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6g.png-jTDmESN0LahUgylbruygyn43c9l1yj.jpeg",
    label: "РЕЗУЛЬТАТ",
    headline: "ОСВОБОЖДАЕМ ВРЕМЯ\nДЛЯ ГЛАВНОГО.",
    sub: "Не начинайте с решения. Начните с результата.",
    alt: "Человек в цветочном поле",
    isFinal: true,
  },
];

type MV = ReturnType<typeof useMotionValue<number>>;

// Each scene fades in/out purely via opacity — background stays sticky behind text
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
  // Each scene owns 1/total of the scroll range
  const start = index / total;
  const end = (index + 1) / total;
  const fadeLen = 0.03; // 3% of total range for fade in/out

  const opacity = useTransform(
    prog,
    [start, start + fadeLen, end - fadeLen, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(prog, [start, end], [1.04, 1.0]);

  const textRef = useRef<HTMLDivElement>(null);

  // Parallax text — write directly to DOM, no MotionValue in style prop
  useEffect(() => {
    return prog.on("change", (v) => {
      if (!textRef.current) return;
      const range = end - start;
      const local = range > 0 ? Math.min(1, Math.max(0, (v - start) / range)) : 0;
      const ty = 30 - local * 60;
      textRef.current.style.transform = `translateY(${ty}px)`;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prog, start, end]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity }}
    >
      {/* Background image with subtle Ken Burns */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${scene.img}")`, scale }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

      {/* Text block */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-20 pb-20 md:pb-28 max-w-3xl"
        style={{ willChange: "transform", transform: "translateY(30px)" }}
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
            whiteSpace: "pre-line",
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
            className="mt-8 inline-block text-sm uppercase tracking-widest px-8 py-4 bg-crimson text-white hover:bg-crimson-light transition-colors"
            style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, borderRadius: "2px" }}
          >
            Разобрать кейс
          </a>
        )}
      </div>
    </motion.div>
  );
}

// Progress indicator dots
function Dot({ index, total, prog }: { index: number; total: number; prog: MV }) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const opacity = useTransform(prog, [start, mid, end], [0.25, 1, 0.25]);
  const scale = useTransform(prog, [start, mid, end], [0.6, 1.4, 0.6]);
  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-white"
      style={{ opacity, scale }}
    />
  );
}

// Top progress bar per scene
function Bar({ index, total, prog }: { index: number; total: number; prog: MV }) {
  const start = index / total;
  const end = (index + 1) / total;
  const scaleX = useTransform(prog, [start, end], [0, 1]);
  return (
    <div className="h-px bg-white/20 overflow-hidden" style={{ width: "28px" }}>
      <motion.div className="h-full bg-white origin-left" style={{ scaleX }} />
    </div>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prog = useMotionValue(0);
  const total = scenes.length;

  useEffect(() => {
    function update() {
      const el = containerRef.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const raw = (window.scrollY - el.offsetTop) / range;
      prog.set(Math.min(1, Math.max(0, raw)));
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [prog]);

  return (
    // tall container — scroll height = 100vh per scene
    <div ref={containerRef} style={{ height: `${total * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {scenes.map((scene, i) => (
          <Scene key={scene.label} scene={scene} index={i} total={total} prog={prog} />
        ))}

        {/* Side dots */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {scenes.map((_, i) => (
            <Dot key={i} index={i} total={total} prog={prog} />
          ))}
        </div>

        {/* Top progress bars */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {scenes.map((_, i) => (
            <Bar key={i} index={i} total={total} prog={prog} />
          ))}
        </div>
      </div>
    </div>
  );
}
