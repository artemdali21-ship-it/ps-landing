"use client";

import { motion } from "framer-motion";

export default function Process() {
  return (
    <section
      id="process"
      className="section-padding"
      style={{ background: "transparent" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="font-outfit font-black uppercase leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.45)",
            }}
          >
            <span style={{ color: "#ffffff" }}>СИСТЕМА ДОЛЖНА </span>
            <span style={{ color: "#C41230" }}>МЕНЯТЬ РЕАЛЬНОСТЬ.</span>
            <br />
            <span style={{ color: "#ffffff" }}>ИНАЧЕ ЭТО ИНТЕРФЕЙС.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
