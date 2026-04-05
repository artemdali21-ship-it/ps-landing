"use client";

import { motion, useMotionValue, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

// Scroll progress targets for each section (fraction of total scroll distance)
const NAV_LINKS = [
  { label: "Услуги",   id: "services", pct: 0.23 },  // WhatWeDo  show=0.23
  { label: "Форматы",  id: "formats",  pct: 0.45 },  // ThreeLevels show=0.45
  { label: "Процесс",  id: "process",  pct: 0.72 },  // Examples  show=0.72
];

function scrollToSection(pct: number) {
  const spacer = document.getElementById("scroll-spacer");
  if (!spacer) return;
  // Total scrollable distance = spacer height − viewport height (matches page.tsx logic)
  const total = spacer.offsetHeight - window.innerHeight;
  window.scrollTo({ top: Math.max(0, pct * total), behavior: "smooth" });
}

export default function Navbar() {
  const scrollY   = useMotionValue(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() { scrollY.set(window.scrollY); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  // Close menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const borderOpacity   = useTransform(scrollY, [0, 60], [0, 1]);
  const bgOpacity       = useTransform(scrollY, [0, 60], [0.82, 0.97]);
  const backgroundColor = useMotionTemplate`rgba(250, 246, 240, ${bgOpacity})`;
  const borderBottom    = useMotionTemplate`1px solid rgba(212, 200, 184, ${borderOpacity})`;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ backgroundColor, borderBottom }}
      >
        <div className="flex items-center justify-between px-5 md:px-20 py-5">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none" style={{ textDecoration: "none" }}>
            <span className="font-outfit font-black text-xl text-espresso" style={{ fontFamily: "Satoshi, system-ui, sans-serif", fontWeight: 900 }}>
              Polishchuk<span className="text-crimson">.</span>
            </span>
            <span className="text-crimson font-space-grotesk font-semibold text-xs tracking-widest uppercase" style={{ letterSpacing: "0.18em", marginTop: 1 }}>
              Ai Systems
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, id, pct }) => (
              <button
                key={id}
                onClick={() => scrollToSection(pct)}
                className="font-space-grotesk font-medium text-xs uppercase tracking-widest text-taupe hover:text-crimson transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right side: CTA + burger */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="bg-crimson text-beige font-space-grotesk font-semibold uppercase text-xs tracking-widest px-4 md:px-6 py-2.5 rounded-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,18,48,0.25)] transition-all duration-200"
              style={{ letterSpacing: "0.12em" }}
              onClick={() => setOpen(false)}
            >
              <span className="hidden sm:inline">Разобрать кейс</span>
              <span className="sm:hidden">Кейс</span>
            </a>

            {/* Burger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-sm"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
            >
              <motion.span
                className="block w-5 h-px bg-espresso origin-center"
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-px bg-espresso origin-center"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-px bg-espresso origin-center"
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(31,20,16,0.55)", backdropFilter: "blur(8px)" }}
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="absolute top-[72px] left-4 right-4 rounded-xl overflow-hidden"
              style={{ background: "rgba(250,246,240,0.97)", border: "1px solid rgba(212,200,184,0.8)" }}
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {NAV_LINKS.map(({ label, id, pct }, i) => (
                <button
                  key={id}
                  onClick={() => { scrollToSection(pct); setOpen(false); }}
                  className="flex items-center justify-between w-full px-6 py-4 font-space-grotesk font-semibold text-sm uppercase tracking-widest text-espresso hover:text-crimson hover:bg-stone/30 transition-colors duration-150 bg-transparent border-none cursor-pointer"
                  style={{
                    borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(212,200,184,0.5)" : "none",
                    letterSpacing: "0.14em",
                  }}
                >
                  {label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
