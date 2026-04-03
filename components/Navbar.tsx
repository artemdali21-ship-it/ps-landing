"use client";

import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    function onScroll() { scrollY.set(window.scrollY); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 60], [0.82, 0.97]);

  const backgroundColor = useMotionTemplate`rgba(250, 246, 240, ${bgOpacity})`;
  const borderBottom = useMotionTemplate`1px solid rgba(212, 200, 184, ${borderOpacity})`;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor, borderBottom }}
    >
      <div className="flex items-center justify-between px-5 md:px-20 py-5">
        {/* Logo */}
        <Link href="/" className="font-outfit font-black text-xl text-espresso">
          Polishchuk<span className="text-crimson">.</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Услуги", id: "services" },
            { label: "Примеры", id: "examples" },
            { label: "Процесс", id: "process" },
          ].map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-space-grotesk font-medium text-xs uppercase tracking-widest text-taupe hover:text-crimson transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          className="bg-crimson text-beige font-space-grotesk font-semibold uppercase text-xs tracking-widest px-6 py-2.5 rounded-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,18,48,0.25)] transition-all duration-200"
          style={{ letterSpacing: "0.12em" }}
        >
          Разобрать кейс
        </a>
      </div>
    </motion.nav>
  );
}
