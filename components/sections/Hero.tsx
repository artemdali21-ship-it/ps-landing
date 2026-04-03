"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroObject = dynamic(() => import("@/components/3d/HeroObject"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full" style={{ backgroundColor: "rgba(196,18,48,0.1)" }} />
    </div>
  ),
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  // Scroll-triggered warm background: beige (#FAF6F0) → warmer sand (#F5EDD8)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#FAF6F0", "#F2E8D4"]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen pt-24 pb-20 px-5 md:px-20 flex items-start"
      style={{ backgroundColor: bgColor }}
      onMouseMove={handleMouseMove}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text column */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="eyebrow"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            AI Systems Consultancy
          </motion.p>

          <motion.h1
            className="h1"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Освобождаем время для того, что действительно важно.
          </motion.h1>

          <motion.p
            className="font-inter font-light text-taupe text-lg leading-relaxed max-w-md"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            AI-системы, которые работают.
          </motion.p>

          <motion.p
            className="font-space-grotesk font-medium text-crimson text-base"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Не начинайте с решения. Начните с результата.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-2"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <a href="#cta" className="btn-primary text-center">
              Разобрать кейс
            </a>
          </motion.div>

          <motion.p
            className="font-inter font-light text-taupe text-sm leading-relaxed max-w-xs"
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Покажите 2–3 реальных задачи — мы скажем что можно собрать, сколько
            стоит и с чего начать.
          </motion.p>
        </div>

        {/* 3D column */}
        <motion.div
          className="h-[400px] md:h-[560px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <HeroObject mouseX={mouse.x} mouseY={mouse.y} />
        </motion.div>
      </div>
    </motion.section>
  );
}
