"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-beige/90 backdrop-blur-md"
      style={{ borderBottom: "1px solid #EDE5D8" }}
    >
      <div className="flex items-center justify-between px-5 md:px-20 py-5">
        {/* Logo */}
        <Link href="/" className="font-outfit font-black text-xl text-espresso">
          Polishchuk<span className="text-crimson">.</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Услуги", "Примеры", "Процесс"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-space-grotesk font-medium text-xs uppercase tracking-widest text-taupe hover:text-crimson transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          className="bg-crimson text-beige font-space-grotesk font-semibold uppercase text-xs tracking-widest px-6 py-2.5 rounded-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,18,48,0.25)] hover:bg-crimson-light transition-all duration-200"
          style={{ letterSpacing: "0.12em" }}
        >
          Разобрать кейс
        </a>
      </div>
    </motion.nav>
  );
}
