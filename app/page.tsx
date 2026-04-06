"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
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
      divRef.current.style.pointerEvents = opacity.get() > 0.02 ? "auto" : "none";
    }
  });

  if (snap) {
    return (
      <div
        ref={divRef}
        className="absolute inset-0"
        style={{ display: "none", pointerEvents: "none" }}
      >
        <div style={{ pointerEvents: "auto", height: "100%", overflow: "hidden" }}>{children}</div>
      </div>
    );
  }

  // Desktop only: overflow:hidden clips content cleanly within the fixed layer.
  // Mobile uses MobileLayout (normal scroll), so this code path is desktop-only.
  return (
    <motion.div
      ref={divRef}
      className="absolute inset-0"
      style={{ opacity, y, pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto", height: "100%", overflow: "hidden" }}>{children}</div>
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

// ─── JS PARALLAX BG — Золотые швы #1: transform:translate3d, not CSS fixed ────
// background-attachment:fixed breaks iOS Safari. Use real <img> + JS scroll.
function ParallaxBg({ src, factor = 0.35, overlay, objectPosition = "center" }: {
  src: string; factor?: number; overlay?: string; objectPosition?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const update = () => {
      if (!imgRef.current || !boxRef.current) return;
      const rect = boxRef.current.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * factor;
      imgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, [factor]);

  return (
    <div ref={boxRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt=""
        style={{ position: "absolute", top: "-12%", left: 0, width: "100%", height: "124%", objectFit: "cover", objectPosition, willChange: "transform" }} />
      {overlay && <div style={{ position: "absolute", inset: 0, background: overlay }} />}
    </div>
  );
}

// ─── MOBILE LAYOUT — normal document flow, no fixed/scroll-story ─────────────
function MobileLayout() {
  return (
    <>
      <Navbar />

      {/* Hero — scene 1, JS parallax */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "88px 1.25rem 3rem" }}>
        <ParallaxBg src="/images/scenes/1-mobile.webp" overlay="rgba(0,0,0,0.15)" />
        <div className="grain-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />
        {/* Floating crumpled paper — hero top right */}
        <motion.img src="/images/objects/--------------2026-04-03---10-43-19.webp" alt=""
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          style={{ position: "absolute", top: "16%", right: "5%", width: "22%", maxWidth: 90, zIndex: 2, pointerEvents: "none", opacity: 0.82, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.35))" }} />
        {/* Floating crumpled paper — bottom left */}
        <motion.img src="/images/objects/--------------2026-04-03---10-43-02.webp" alt=""
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          style={{ position: "absolute", bottom: "18%", left: "4%", width: "16%", maxWidth: 65, zIndex: 2, pointerEvents: "none", opacity: 0.75, filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.3))" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="h1 mb-6 max-w-lg" style={{ color: "#ffffff", textShadow: "0 2px 32px rgba(0,0,0,0.35)" }}>
            Освобождаем время<br />для того, что<br />действительно{" "}
            <span style={{ color: "#C41230" }}>важно.</span>
          </h1>
          <p className="font-outfit font-light text-lg leading-relaxed max-w-sm mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>
            AI-системы, которые работают.
          </p>
          <p className="font-space-grotesk font-medium text-crimson text-xs uppercase tracking-widest mb-8">
            Не начинайте с решения. Начните с результата.
          </p>
          <a href="#cta" className="btn-primary self-start">Разобрать кейс</a>
        </div>
      </section>

      {/* Scene 2 — interior/office visual break before WhatWeDo */}
      <div style={{ position: "relative", height: "50vw", minHeight: "200px", maxHeight: "340px" }}>
        <ParallaxBg src="/images/scenes/2-mobile.webp" factor={0.3} />
        {/* Floating marble head — right side */}
        <motion.img src="/images/objects/img-4774.webp" alt=""
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          style={{ position: "absolute", top: "8%", right: "-2%", width: "38%", maxWidth: 140, zIndex: 2, pointerEvents: "none", opacity: 0.9, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))" }} />
        {/* Floating coral — bottom left */}
        <motion.img src="/images/objects/img-4791.webp" alt=""
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          style={{ position: "absolute", bottom: "6%", left: "5%", width: "24%", maxWidth: 88, zIndex: 2, pointerEvents: "none", opacity: 0.85, filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))" }} />
      </div>

      <WhatWeDo />
      <ThreeLevels />

      {/* Scene 3 — clean office visual break before Examples */}
      <div style={{ position: "relative", height: "50vw", minHeight: "200px", maxHeight: "300px" }}>
        <ParallaxBg src="/images/scenes/3-mobile.webp" factor={0.3} />
        {/* Floating crystal cube — left side */}
        <motion.img src="/images/objects/img-4792.webp" alt=""
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ position: "absolute", top: "6%", left: "-3%", width: "40%", maxWidth: 150, zIndex: 2, pointerEvents: "none", opacity: 0.88, filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.4))" }} />
      </div>

      <Examples />

      {/* Scene 4 — clean office with door, no floating objects (порядок в офисе) */}
      <div style={{ position: "relative", height: "45vw", minHeight: "180px", maxHeight: "280px" }}>
        <ParallaxBg src="/images/scenes/4-mobile.webp" factor={0.3} />
      </div>

      {/* Sphere card — ai-sphere.jpg glass card (same as desktop) */}
      <div style={{ background: "#FAF6F0", padding: "2rem 1.25rem" }}>
        <div style={{ width: "100%", maxWidth: 480, margin: "0 auto", background: "#FAF6F0", border: "1px solid rgba(212,200,184,0.5)", borderRadius: 6, overflow: "hidden", boxShadow: "0 8px 40px rgba(31,20,16,0.12)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ai-sphere.jpg" alt="AI система" style={{ width: "100%", height: "auto", display: "block" }} />
          <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
            <h2 className="h2" style={{ margin: 0, fontSize: "clamp(1.2rem, 4vw, 1.6rem)", textTransform: "uppercase", lineHeight: 1.2 }}>
              <span style={{ color: "#C41230" }}>Работает в процессе,</span><br />а не в презентации.
            </h2>
          </div>
        </div>
      </div>

      {/* Process — scene 5, JS parallax + 3D objects */}
      <section style={{ position: "relative", padding: "5rem 1.25rem", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ParallaxBg src="/images/scenes/5-mobile.webp" overlay="rgba(10,6,4,0.55)" />
        <div className="grain-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />
        {/* 3D object — robot arm, bottom right, floating */}
        <motion.img src="/images/objects/img-4780.webp" alt=""
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          style={{ position: "absolute", bottom: "8%", right: "-4%", width: "52%", maxWidth: 240, zIndex: 2, pointerEvents: "none", opacity: 0.92, filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))" }} />
        {/* 3D object — butterfly, top left, floating */}
        <motion.img src="/images/objects/img-4500.webp" alt=""
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{ position: "absolute", top: "6%", left: "-2%", width: "38%", maxWidth: 160, zIndex: 2, pointerEvents: "none", opacity: 0.88, filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.45))" }} />
        <p className="font-outfit font-black uppercase leading-tight tracking-tight text-center"
          style={{ position: "relative", zIndex: 3, fontSize: "clamp(1.8rem, 6vw, 3rem)", color: "#ffffff", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
          СИСТЕМА ДОЛЖНА{" "}
          <span style={{ color: "#C41230" }}>МЕНЯТЬ РЕАЛЬНОСТЬ.</span>
          <br />ИНАЧЕ ЭТО ИНТЕРФЕЙС.
        </p>
      </section>

      {/* CTA — scene 6g (meditation), JS parallax — objectPosition shows person */}
      <div id="cta-wrapper" style={{ position: "relative" }}>
        <ParallaxBg src="/images/scenes/6g-desktop.webp" overlay="rgba(20,12,8,0.45)" factor={0.25} objectPosition="62% center" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <FinalCTA />
        </div>
      </div>

      <Footer />
    </>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // All hooks done — now safe to branch
  if (isMobile) return <MobileLayout />;

  return (
    <>
      <Navbar />

      {/* ── FIXED SCENE LAYER — overflow:hidden clips scaled scenes only ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", backgroundColor: "#FAF6F0" }}>
        <div className="grain-overlay" />
        <Scene src="/images/scenes/1-desktop.webp" opacity={s1Op} scale={s1Sc} first />
        <Scene src="/images/scenes/2-desktop.webp" opacity={s2Op} scale={s2Sc} />
        <Scene src="/images/scenes/3-desktop.webp" opacity={s3Op} scale={s3Sc} />
        <Scene src="/images/scenes/4-desktop.webp" opacity={s4Op} scale={s4Sc} />
        <Scene src="/images/scenes/5-desktop.webp" opacity={s5Op} scale={s5Sc} />
        <Scene src="/images/scenes/6g-desktop.webp" opacity={s6Op} scale={s6Sc} className="scene-meditation" />
        {OBJECTS.map((cfg, i) => <Obj key={i} cfg={cfg} p={p} />)}

        {/* Hero text */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-5 md:px-20 pointer-events-none"
          style={{ opacity: heroOp, y: heroY, paddingTop: "80px" }}
        >
          <h1 className="h1 mb-8 max-w-3xl" style={{ color: "#ffffff", textShadow: "0 2px 32px rgba(0,0,0,0.35)" }}>
            Освобождаем время<br />
            для того, что<br />
            действительно{" "}
            <span style={{ color: "#C41230" }}>важно.</span>
          </h1>
          <p className="font-outfit font-light text-xl leading-relaxed max-w-xl mb-4" style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 1px 12px rgba(0,0,0,0.3)" }}>
            AI-системы, которые работают.
          </p>
          <p className="font-space-grotesk font-medium text-crimson text-sm uppercase tracking-widest mb-10">
            Не начинайте с решения. Начните с результата.
          </p>
          <div className="pointer-events-auto">
            <a href="#cta" className="btn-primary">Разобрать кейс</a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" style={{ opacity: hintOp }}>
          <span className="eyebrow">scroll</span>
          <motion.div className="w-px h-10 bg-taupe/40" animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </div>

      {/* ── FIXED OVERLAY LAYER — NO overflow:hidden so sections scroll on mobile ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        {/* WhatWeDo */}
        <SectionOverlay p={p} enter={0.20} show={0.23} hide={0.28} exit={0.30}>
          <WhatWeDo />
        </SectionOverlay>
        {/* ThreeLevels */}
        <SectionOverlay p={p} enter={0.42} show={0.45} hide={0.50} exit={0.53}>
          <ThreeLevels />
        </SectionOverlay>
        {/* Examples */}
        <SectionOverlay p={p} enter={0.65} show={0.69} hide={0.77} exit={0.81}>
          <Examples />
        </SectionOverlay>
        {/* Sphere — beige gap after s4 exits, holds until Process begins */}
        <SectionOverlay p={p} enter={0.84} show={0.85} hide={0.90} exit={0.92}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "72px clamp(1.25rem, 4vw, 3rem) 2rem", overflowY: "auto" }}>
            <div style={{ width: "100%", maxWidth: 1100, background: "#FAF6F0", border: "1px solid rgba(212,200,184,0.5)", borderRadius: 6, overflow: "hidden", boxShadow: "0 8px 60px rgba(31,20,16,0.14)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ai-sphere.jpg" alt="AI система" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "1.5rem 2rem 2rem" }}>
                <h2 className="h2" style={{ margin: 0, fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", textTransform: "uppercase", lineHeight: 1.2 }}>
                  <span style={{ color: "#C41230" }}>Работает в процессе,</span><br />а не в презентации.
                </h2>
              </div>
            </div>
          </div>
        </SectionOverlay>
        {/* Process */}
        <SectionOverlay p={p} enter={0.90} show={0.91} hide={0.96} exit={0.98}>
          <Process />
        </SectionOverlay>
      </div>

      {/* ── SCROLL SPACER ── */}
      <div id="scroll-spacer" ref={ref} style={{ height: "1600vh", position: "relative", pointerEvents: "none" }} />

      {/* ── FINAL SCREEN ── */}
      <div id="cta" style={{ position: "relative", zIndex: 2, marginTop: 0, minHeight: "auto" }}>
        <FinalCTA />
      </div>

      <Footer />
    </>
  );
}
