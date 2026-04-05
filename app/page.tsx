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
  // Scene 1 — crumpled papers, varied sizes: small bg → mid foreground
  { src: "/images/objects/--------------2026-04-03---10-43-02.webp",
    enter:0.00, end:0.03, exitS:0.09, exit:0.14, w:48,
    pos:{top:"14%",right:"22%"}, py:-60, fy:8, fd:3.8, fdl:0.0 },
  { src: "/images/objects/--------------2026-04-03---10-43-22.webp",
    enter:0.01, end:0.04, exitS:0.09, exit:0.14, w:62,
    pos:{bottom:"24%",left:"8%"}, py:-80, fy:11, fd:4.6, fdl:0.8 },
  { src: "/images/objects/--------------2026-04-03---10-43-44.webp",
    enter:0.01, end:0.04, exitS:0.10, exit:0.14, w:38,
    pos:{bottom:"14%",right:"30%"}, py:-50, fy:6, fd:5.2, fdl:1.6 },
  { src: "/images/objects/--------------2026-04-03---10-43-19.webp",
    enter:0.02, end:0.06, exitS:0.10, exit:0.14, w:88,
    pos:{top:"52%",right:"7%"}, py:-110, fy:13, fd:3.4, fdl:2.4 },
  // Scene 2 — marble head + coral: appear during WhatWeDo, exit before ThreeLevels starts
  { src: "/images/objects/img-4774.webp",
    enter:0.15, end:0.21, exitS:0.36, exit:0.42, w:153,
    pos:{top:"10%",right:"6%"}, py:-100, fy:12, fd:4.2, fdl:0.3 },
  { src: "/images/objects/img-4791.webp",
    enter:0.16, end:0.22, exitS:0.37, exit:0.43, w:72,
    pos:{bottom:"16%",left:"10%"}, py:-70, fy:16, fd:3.6, fdl:1.2 },
  // ThreeLevels (on s2) — crystal cube: enter before ThreeLevels section, exit WITH s2 (0.53)
  { src: "/images/objects/img-4792.webp",
    enter:0.37, end:0.43, exitS:0.49, exit:0.53, w:160,
    pos:{top:"18%",left:"5%"}, py:-80, fy:14, fd:4.0, fdl:0.6 },
  // Scene 5 (door-holes): robot + butterfly — enter when s5 settles (0.90), hold until 0.95
  { src: "/images/objects/img-4780.webp",
    enter:0.90, end:0.91, exitS:0.95, exit:0.97, w:250,
    pos:{bottom:"28%",right:"6%"}, py:-90, fy:14, fd:3.9, fdl:0.5 },
  { src: "/images/objects/img-4500.webp",
    enter:0.91, end:0.92, exitS:0.95, exit:0.97, w:148,
    pos:{top:"18%",left:"7%"}, py:-55, fy:20, fd:3.2, fdl:0.9 },
];

// ─── SCENE COMPONENT ─────────────────────────────────────────────────────────
function Scene({ src, opacity, scale, first, className = "" }: {
  src: string; opacity: MotionValue<number>; scale: MotionValue<number>;
  first?: boolean; className?: string;
}) {
  return (
    <motion.div
      className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${className}`}
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

// ─── SECTION OVERLAY — fades in/out, OR snaps instantly (snap=true) ─────────
function SectionOverlay({ p, enter, show, hide, exit, slideY = 0, snap = false, children }: {
  p: MotionValue<number>;
  enter: number; show: number; hide: number; exit: number;
  slideY?: number;
  snap?: boolean;
  children: ReactNode;
}) {
  const opacity = useTransform(p, [enter, show, hide, exit], [0, 1, 1, 0]);
  const y       = useTransform(p, [enter, show, hide, exit], [slideY, 0, 0, -slideY]);
  const divRef  = useRef<HTMLDivElement>(null);

  // snap mode — toggle display (no opacity fade, solid background stays solid)
  useMotionValueEvent(p, "change", (v) => {
    if (!divRef.current) return;
    if (snap) {
      const visible = v >= enter && v <= exit;
      divRef.current.style.display        = visible ? "block" : "none";
      divRef.current.style.pointerEvents  = visible ? "auto"  : "none";
    } else {
      divRef.current.style.pointerEvents = opacity.get() > 0.05 ? "auto" : "none";
    }
  });

  if (snap) {
    return (
      <div
        ref={divRef}
        className="absolute inset-0"
        style={{ display: "none", pointerEvents: "none" }}
      >
        <div style={{ pointerEvents: "auto", height: "100%", overflowY: "auto", WebkitOverflowScrolling: "touch" as const }}>{children}</div>
      </div>
    );
  }

  // Outer wrapper: pointer-events:none so wheel events pass through to window.
  // Inner wrapper: pointer-events:auto so clicks still work inside sections.
  return (
    <motion.div
      ref={divRef}
      className="absolute inset-0"
      style={{ opacity, y, pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto", height: "100%", overflowY: "auto", WebkitOverflowScrolling: "touch" as const }}>{children}</div>
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

  // ─── SCENE OPACITY / SCALE — SEQUENTIAL (no overlap between scenes) ─────
  // Rule: next scene starts exactly when previous one finishes → zero crossfade mud
  const s1Op = useTransform(p, [0.00, 0.09, 0.14], [1, 1, 0]);   // exits at 0.14
  const s1Sc = useTransform(p, [0.00, 0.14], [1.00, 1.08]);

  // s2 holds through BOTH WhatWeDo (0.20-0.30) AND ThreeLevels (0.42-0.53)
  // Clean office (s3) must NOT be visible before ThreeLevels is done
  const s2Op = useTransform(p, [0.14, 0.20, 0.43, 0.53], [0, 1, 1, 0]); // full 0.20-0.43
  const s2Sc = useTransform(p, [0.14, 0.53], [1.00, 1.06]);

  // s3 (clean office) — appears ONLY after ThreeLevels exits (0.53). Visual reward.
  const s3Op = useTransform(p, [0.53, 0.57, 0.62, 0.65], [0, 1, 1, 0]); // full 0.57-0.62
  const s3Sc = useTransform(p, [0.53, 0.65], [1.00, 1.04]);

  // Scene 4 — door: enters when clean office exits (0.65), holds while Examples shows
  const s4Op = useTransform(p, [0.65, 0.69, 0.77, 0.84], [0, 1, 1, 0]); // full 0.69-0.77
  const s4Sc = useTransform(p, [0.65, 0.84], [1.00, 1.07]);

  // Scene 5 — door with holes: enters after sphere exits (0.87), holds long for Process text
  const s5Op = useTransform(p, [0.87, 0.90, 0.96, 0.99], [0, 1, 1, 0]);
  const s5Sc = useTransform(p, [0.87, 0.99], [1.00, 1.06]);

  // Scene 6 — meditation: enters after s5 exits, holds for FinalCTA
  const s6Op = useTransform(p, [0.97, 1.00], [0, 1]);
  const s6Sc = useTransform(p, [0.97, 1.00], [1.02, 1.00]);


  // ─── HERO TEXT ───────────────────────────────────────────────────────────
  const heroOp = useTransform(p, [0.00, 0.06, 0.09], [1, 1, 0]);
  const heroY  = useTransform(p, [0.00, 0.09], [0, -50]);
  const hintOp = useTransform(p, [0.00, 0.03], [1, 0]);


  return (
    <>
      <Navbar />

      {/* ── FIXED SCENE LAYER — beige base so gap between scenes shows clean ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", backgroundColor: "#FAF6F0" }}>
        <div className="grain-overlay" />

        {/* Scenes */}
        <Scene src="/images/scenes/1-desktop.webp" opacity={s1Op} scale={s1Sc} first />
        <Scene src="/images/scenes/2-desktop.webp" opacity={s2Op} scale={s2Sc} />
        <Scene src="/images/scenes/3-desktop.webp" opacity={s3Op} scale={s3Sc} />
        <Scene src="/images/scenes/4-desktop.webp" opacity={s4Op} scale={s4Sc} />
        <Scene src="/images/scenes/5-desktop.webp" opacity={s5Op} scale={s5Sc} />
        <Scene src="/images/scenes/6g-desktop.webp" opacity={s6Op} scale={s6Sc} className="scene-meditation" />

        {/* 3D floating objects */}
        {OBJECTS.map((cfg, i) => (
          <Obj key={i} cfg={cfg} p={p} />
        ))}

        {/* Hero text — scene 1 */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-5 md:px-20 pointer-events-none"
          style={{ opacity: heroOp, y: heroY, paddingTop: "80px" }}
        >
          <h1
            className="h1 mb-8 max-w-3xl"
            style={{ color: "#ffffff", textShadow: "0 2px 32px rgba(0,0,0,0.35)" }}
          >
            Освобождаем время<br />
            для того, что<br />
            действительно{" "}
            <span style={{ color: "#C41230" }}>важно.</span>
          </h1>
          <p
            className="font-outfit font-light text-xl leading-relaxed max-w-xl mb-4"
            style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 1px 12px rgba(0,0,0,0.3)" }}
          >
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
        {/* WhatWeDo — appears only after s2 fully visible (0.20) */}
        <SectionOverlay p={p} enter={0.20} show={0.23} hide={0.28} exit={0.30}>
          <WhatWeDo />
        </SectionOverlay>
        {/* ThreeLevels — on s2 background (s2 holds until 0.53 exactly for this) */}
        <SectionOverlay p={p} enter={0.42} show={0.45} hide={0.50} exit={0.53}>
          <ThreeLevels />
        </SectionOverlay>
        {/* Examples — enters WITH s4 (0.65) so digital-screens scene never shows alone */}
        <SectionOverlay p={p} enter={0.65} show={0.69} hide={0.77} exit={0.81}>
          <Examples />
        </SectionOverlay>
        {/* Sphere / девушка — beige gap after s4 exits (0.84): full image, no crop */}
        <SectionOverlay p={p} enter={0.84} show={0.85} hide={0.86} exit={0.87}>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "72px clamp(1.25rem, 4vw, 3rem) 2rem",
            overflowY: "auto",
          }}>
            <div style={{
              width: "100%", maxWidth: 1100,
              background: "#FAF6F0",
              border: "1px solid rgba(212,200,184,0.5)",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 8px 60px rgba(31,20,16,0.14)",
            }}>
              {/* Full image — height:auto so nothing is cut */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ai-sphere.jpg"
                alt="AI система"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* Text below image */}
              <div style={{ padding: "1.5rem 2rem 2rem" }}>
                <p style={{
                  fontFamily: "var(--font-space-grotesk-var), sans-serif",
                  fontWeight: 600, fontSize: "0.65rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#C41230", margin: "0 0 0.5rem",
                }}>
                  AI-системы, которые работают
                </p>
                <h2 className="h2" style={{ margin: 0, fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}>
                  Работает в процессе,<br />а не в презентации.
                </h2>
              </div>
            </div>
          </div>
        </SectionOverlay>

        {/* Process — enters with s5 settled, holds long, exits before s5 fades */}
        <SectionOverlay p={p} enter={0.90} show={0.91} hide={0.96} exit={0.98}>
          <Process />
        </SectionOverlay>
      </div>

      {/* ── SCROLL SPACER — pointer-events:none so it doesn't block fixed layer ── */}
      {/* 1600vh: each section gets ~255vh. FinalCTA enters at p≈0.933, all overlays exit by 0.92 */}
      <div id="scroll-spacer" ref={ref} style={{ height: "1600vh", position: "relative", pointerEvents: "none" }} />

      {/* ── FINAL SCREEN — no margin-top overlap so animation runs clean to p=1.0 ── */}
      <div
        id="cta"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <FinalCTA />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
