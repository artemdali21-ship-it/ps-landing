"use client";

import { useEffect, useRef, useState } from "react";

const scenes = [
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.png-1hL8GTC70jCdoMKljCmmsPNQO5KOft.jpeg",
    label: "СЕЙЧАС",
    headline: ["ВАШИ ЛЮДИ", "ДЕЛАЮТ НЕ ТО"],
    sub: "Повторяющиеся задачи занимают время тех, кто должен думать, а не заполнять.",
    alt: "Офис с хаосом из бумаг",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.png-Cdo7NfQE9XwFcXQpws6zDSyA5kHUT7.jpeg",
    label: "РЕШЕНИЕ",
    headline: ["УБИРАЕМ РУТИНУ.", "СНИЖАЕМ ШУМ."],
    sub: "Входящие, документы, квалификация — каждый процесс получает логику и память.",
    alt: "Офис становится чище",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.png-Q9FSmlZXt6GTnmYvhT0NFEh6N9X30K.jpeg",
    label: "КАК МЫ РАБОТАЕМ",
    headline: ["ТРИ УРОВНЯ", "AI-СИСТЕМ"],
    sub: "Микросистема закрывает одну задачу. Рабочая система ведёт процесс. Экспертная — принимает решения.",
    alt: "Чистый офис с открытой дверью",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.png-Wd0lFYmU4OQ8m6e5Y7YfPalfPl5ADo.jpeg",
    label: "ПРИМЕРЫ",
    headline: ["ВХОДЯЩИЕ.", "ДОКУМЕНТЫ.", "ЗНАНИЯ."],
    sub: "Лиды фильтруются автоматически. Типовые документы собираются за минуты. Экспертиза — в нужный момент.",
    alt: "Птичий вид на город",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.png-w4ends69OL62yTe6SSjC9DbJkqRGqx.jpeg",
    label: "ПРОЦЕСС",
    headline: ["РАЗБИРАЕМ.", "СОБИРАЕМ.", "РАБОТАЕТ."],
    sub: "Покажите процесс и результат. Мы скажем где система даёт эффект. 30 минут — архитектура готова.",
    alt: "Офис с красной дверью",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6g.png-jTDmESN0LahUgylbruygyn43c9l1yj.jpeg",
    label: "РЕЗУЛЬТАТ",
    headline: ["ОСВОБОЖДАЕМ ВРЕМЯ", "ДЛЯ ГЛАВНОГО."],
    sub: "Не начинайте с решения. Начните с результата.",
    alt: "Человек в цветочном поле",
    isFinal: true,
  },
];

export default function ScrollStory() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Drive active scene from scroll position
  useEffect(() => {
    function onScroll() {
      const el = wrapperRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      // Become visible once wrapper enters viewport
      if (top < window.innerHeight) setVisible(true);
      const scrolled = window.scrollY - el.offsetTop;
      const sectionH = window.innerHeight;
      const idx = Math.min(
        scenes.length - 1,
        Math.max(0, Math.floor(scrolled / sectionH))
      );
      setActive(idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Total height = one viewport per scene
    <div
      ref={wrapperRef}
      style={{ height: `${scenes.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* All background images stacked, only active one visible */}
        {scenes.map((scene, i) => (
          <div
            key={scene.img}
            aria-hidden={i !== active}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${scene.img}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)",
              willChange: "opacity, transform",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
            zIndex: 1,
          }}
        />

        {/* Text content — only active scene text visible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "flex-end",
            padding: "0 clamp(24px, 8vw, 80px) clamp(48px, 8vh, 96px)",
          }}
        >
          {scenes.map((scene, i) => (
            <div
              key={scene.label}
              style={{
                position: "absolute",
                left: "clamp(24px, 8vw, 80px)",
                right: "clamp(24px, 8vw, 80px)",
                bottom: "clamp(48px, 8vh, 96px)",
                maxWidth: "680px",
                opacity: i === active && visible ? 1 : 0,
                transform: i === active && visible ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s",
                willChange: "opacity, transform",
              }}
            >
              {/* Label */}
              <p
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#C41230",
                  marginBottom: "12px",
                }}
              >
                {scene.label}
              </p>

              {/* Headline */}
              <h2
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "#fff",
                  marginBottom: "16px",
                }}
              >
                {scene.headline.map((line, li) => (
                  <span key={li} style={{ display: "block" }}>{line}</span>
                ))}
              </h2>

              {/* Sub */}
              <p
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: "520px",
                }}
              >
                {scene.sub}
              </p>

              {/* Final CTA */}
              {scene.isFinal && (
                <a
                  href="#cta"
                  style={{
                    display: "inline-block",
                    marginTop: "28px",
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#fff",
                    backgroundColor: "#C41230",
                    padding: "14px 36px",
                    borderRadius: "2px",
                    textDecoration: "none",
                    transition: "background-color 0.2s",
                  }}
                >
                  Разобрать кейс
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Progress dots — right side */}
        <div
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {scenes.map((_, i) => (
            <div
              key={i}
              style={{
                width: "6px",
                height: i === active ? "20px" : "6px",
                borderRadius: "3px",
                backgroundColor: i === active ? "#C41230" : "rgba(255,255,255,0.4)",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          ))}
        </div>

        {/* Scene counter — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(48px, 8vh, 96px)",
            right: "clamp(24px, 4vw, 48px)",
            zIndex: 10,
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
