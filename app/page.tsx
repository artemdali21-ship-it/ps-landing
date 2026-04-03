"use client";

import { useRef, useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import WhatWeDo from "@/components/sections/WhatWeDo";
import ThreeLevels from "@/components/sections/ThreeLevels";
import Examples from "@/components/sections/Examples";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

// ─── OBJECTS ──────────────────────────────────────────────────────────────────
type ObjCfg = {
  src: string; enter: number; end: number; exitS: number; exit: number;
  w: number; pos: { top?: string; bottom?: string; left?: string; right?: string };
  py: number; fy: number; fd: number; fdl: number;
};

const OBJECTS: ObjCfg[] = [
  // Scene 1 — crumpled paper objects (appear 0-15%)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4774-oBMuMFCVCHTaUTFBz0gD9GKcBIqJnO.webp",
    enter:0.00, end:0.03, exitS:0.09, exit:0.14, w:95,
    pos:{top:"10%",right:"9%"}, py:-120, fy:14, fd:3.2, fdl:0.0 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4791-xKbzMXSBl8AJbnuFjRKiW4Nf7dSLZY.webp",
    enter:0.01, end:0.04, exitS:0.10, exit:0.14, w:70,
    pos:{bottom:"22%",left:"5%"}, py:-90, fy:9, fd:4.8, fdl:1.0 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4780-oBMuMFCVCHTaUTFBz0gD9GKcBIqJnO.webp",
    enter:0.01, end:0.04, exitS:0.10, exit:0.14, w:55,
    pos:{bottom:"9%",right:"25%"}, py:-70, fy:7, fd:5.6, fdl:2.0 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4500-xKbzMXSBl8AJbnuFjRKiW4Nf7dSLZY.webp",
    enter:0.02, end:0.05, exitS:0.11, exit:0.15, w:82,
    pos:{top:"56%",right:"21%"}, py:-105, fy:11, fd:4.2, fdl:3.0 },
  // Scene 2 — marble head + coral (appear 12-35%)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4774-oBMuMFCVCHTaUTFBz0gD9GKcBIqJnO.webp",
    enter:0.12, end:0.18, exitS:0.28, exit:0.35, w:150,
    pos:{top:"10%",right:"7%"}, py:-120, fy:13, fd:4.5, fdl:0.2 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4791-xKbzMXSBl8AJbnuFjRKiW4Nf7dSLZY.webp",
    enter:0.14, end:0.20, exitS:0.30, exit:0.36, w:110,
    pos:{bottom:"14%",left:"7%"}, py:-100, fy:18, fd:3.6, fdl:1.1 },
  // Scene 4 — robot hand (appear 48-68%)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4780-oBMuMFCVCHTaUTFBz0gD9GKcBIqJnO.webp",
    enter:0.48, end:0.54, exitS:0.63, exit:0.68, w:140,
    pos:{bottom:"11%",right:"8%"}, py:-110, fy:15, fd:4.0, fdl:0.4 },
  // Scene 5 — butterfly (appear 64-85%)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4500-xKbzMXSBl8AJbnuFjRKiW4Nf7dSLZY.webp",
    enter:0.64, end:0.70, exitS:0.80, exit:0.85, w:165,
    pos:{top:"20%",right:"9%"}, py:-55, fy:22, fd:3.4, fdl:0.8 },
];

// ─── SCENE COMPONENT ─────────────────────────────────────────────────────────
function Scene({ src, opacity, scale, first }: {
  src: string; opacity: MotionValue<number>; scale: MotionValue<number>; first?: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${src})`, opacity, scale }}
      initial={first ? { opacity: 1 } : { opacity: 0 }}
    />
  );
}

// ─── OBJECT COMPONENT ────────────────────────────────────────────────────────
function Obj({ cfg, p }: { cfg: ObjCfg; p: MotionValue<number> }) {
  const opacity = useTransform(p, [cfg.enter, cfg.end, cfg.exitS, cfg.exit], [0, 1, 1, 0]);
  const y = useTransform(p, [0, 1], [0, cfg.py]);
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ ...cfg.pos, width: cfg.w, opacity, y }}
    >
      <motion.img
        src={cfg.src}
        alt=""
        width={cfg.w}
        className="w-full h-auto drop-shadow-2xl"
        animate={{ y: [0, -cfg.fy, 0] }}
        transition={{ duration: cfg.fd, repeat: Infinity, ease: "easeInOut", delay: cfg.fdl }}
      />
    </motion.div>
  );
}

// ─── SECTION OVERLAY — fades in, stays, fades out ────────────────────────────
function SectionOverlay({ p, enter, show, hide, exit, children }: {
  p: MotionValue<number>;
  enter: number; show: number; hide: number; exit: number;
  children: ReactNode;
}) {
  const opacity = useTransform(p, [enter, show, hide, exit], [0, 1, 1, 0]);
  const divRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(opacity, "change", (v) => {
    if (divRef.current) {
      divRef.current.style.pointerEvents = v > 0.05 ? "auto" : "none";
    }
  });

  return (
    <motion.div
      ref={divRef}
      className="absolute inset-0 overflow-y-auto"
      style={{ opacity, pointerEvents: "none" }}
    >
      {children}
    </motion.div>
  );
}

// ─── FINAL OVERLAY — fades in, never exits ────────────────────────────────────
function FinalOverlay({ p, enter, show, children }: {
  p: MotionValue<number>;
  enter: number; show: number;
  children: ReactNode;
}) {
  const opacity = useTransform(p, [enter, show], [0, 1]);
  const divRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(opacity, "change", (v) => {
    if (divRef.current) {
      divRef.current.style.pointerEvents = v > 0.05 ? "auto" : "none";
    }
  });

  return (
    <motion.div
      ref={divRef}
      className="absolute inset-0 overflow-y-auto"
      style={{ opacity, pointerEvents: "none" }}
    >
      {children}
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalScroll);
      p.set(progress);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [p]);

  // ─── SCENE OPACITY / SCALE ────────────────────────────────────────────────
  const s1Op = useTransform(p, [0.00, 0.09, 0.14], [1, 1, 0]);
  const s1Sc = useTransform(p, [0.00, 0.14], [1.00, 1.08]);

  const s2Op = useTransform(p, [0.11, 0.18, 0.29, 0.35], [0, 1, 1, 0]);
  const s2Sc = useTransform(p, [0.11, 0.35], [1.00, 1.06]);

  const s3Op = useTransform(p, [0.30, 0.37, 0.46, 0.52], [0, 1, 1, 0]);
  const s3Sc = useTransform(p, [0.30, 0.52], [1.00, 1.06]);

  const s4Op = useTransform(p, [0.47, 0.54, 0.63, 0.68], [0, 1, 1, 0]);
  const s4Sc = useTransform(p, [0.47, 0.68], [1.00, 1.05]);

  const s5Op = useTransform(p, [0.63, 0.70, 0.79, 0.84], [0, 1, 1, 0]);
  const s5Sc = useTransform(p, [0.63, 0.84], [1.00, 1.04]);

  const s6Op = useTransform(p, [0.80, 0.88], [0, 1]);
  const s6Sc = useTransform(p, [0.80, 1.00], [1.02, 1.00]);

  // ─── HERO TEXT ───────────────────────────────────────────────────────────
  const heroOp = useTransform(p, [0.00, 0.06, 0.11], [1, 1, 0]);
  const heroY  = useTransform(p, [0.00, 0.11], [0, -50]);
  const hintOp = useTransform(p, [0.00, 0.03], [1, 0]);

  return (
    <>
      <Navbar />
      <div className="grain-overlay" />

      {/* STORY ZONE — 1200vh */}
      <div ref={ref} style={{ height: "1200vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Scenes */}
          <Scene src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.png-1hL8GTC70jCdoMKljCmmsPNQO5KOft.jpeg" opacity={s1Op} scale={s1Sc} first />
          <Scene src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.png-Cdo7NfQE9XwFcXQpws6zDSyA5kHUT7.jpeg" opacity={s2Op} scale={s2Sc} />
          <Scene src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.png-Q9FSmlZXt6GTnmYvhT0NFEh6N9X30K.jpeg" opacity={s3Op} scale={s3Sc} />
          <Scene src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.png-Wd0lFYmU4OQ8m6e5Y7YfPalfPl5ADo.jpeg" opacity={s4Op} scale={s4Sc} />
          <Scene src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.png-w4ends69OL62yTe6SSjC9DbJkqRGqx.jpeg" opacity={s5Op} scale={s5Sc} />
          <Scene src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6g.png-jTDmESN0LahUgylbruygyn43c9l1yj.jpeg" opacity={s6Op} scale={s6Sc} />

          {/* 3D floating objects */}
          {OBJECTS.map((cfg, i) => (
            <Obj key={i} cfg={cfg} p={p} />
          ))}

          {/* Hero text — scene 1 */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center px-5 md:px-20 pointer-events-none"
            style={{ opacity: heroOp, y: heroY }}
          >
            <p className="eyebrow mb-6">AI Systems Consultancy</p>
            <h1 className="h1 mb-8 max-w-3xl">
              Освобождаем время<br />
              для того, что<br />
              действительно важно.
            </h1>
            <p className="font-outfit font-light text-taupe text-xl leading-relaxed max-w-xl mb-4">
              AI-системы, которые работают.
            </p>
            <p className="font-space-grotesk font-medium text-crimson text-sm uppercase tracking-widest mb-10">
              Не начинайте с решения. Начните с результата.
            </p>
            <div className="pointer-events-auto">
              <a href="#cta" className="btn-primary">
                Разобрать кейс
              </a>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: hintOp }}
          >
            <span className="eyebrow">scroll</span>
            <motion.div
              className="w-px h-10 bg-taupe/40"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Content overlays */}

          {/* Scene 2 → WhatWeDo */}
          <SectionOverlay p={p} enter={0.14} show={0.20} hide={0.28} exit={0.35}>
            <WhatWeDo />
          </SectionOverlay>

          {/* Scene 3 → ThreeLevels */}
          <SectionOverlay p={p} enter={0.31} show={0.37} hide={0.46} exit={0.52}>
            <ThreeLevels />
          </SectionOverlay>

          {/* Scene 4 → Examples */}
          <SectionOverlay p={p} enter={0.48} show={0.54} hide={0.63} exit={0.68}>
            <Examples />
          </SectionOverlay>

          {/* Scene 5 → Process */}
          <SectionOverlay p={p} enter={0.64} show={0.70} hide={0.79} exit={0.84}>
            <Process />
          </SectionOverlay>

          {/* Scene 6 → FinalCTA — stays */}
          <FinalOverlay p={p} enter={0.81} show={0.88}>
            <div id="cta">
              <FinalCTA />
            </div>
          </FinalOverlay>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
