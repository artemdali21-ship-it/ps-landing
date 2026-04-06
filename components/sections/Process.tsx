"use client";

import { motion } from "framer-motion";

// Splits text into word spans with staggered entrance
function WordStagger({
  text,
  color,
  delayOffset = 0,
}: {
  text: string;
  color: string;
  delayOffset?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ color, display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.45,
            delay: delayOffset + i * 0.07,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      className="section-padding"
      style={{ background: "transparent" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <p
            className="font-outfit font-black uppercase leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.45)",
            }}
          >
            <WordStagger text="СИСТЕМА ДОЛЖНА" color="#ffffff" delayOffset={0} />
            <WordStagger text="МЕНЯТЬ РЕАЛЬНОСТЬ." color="#C41230" delayOffset={0.14} />
            <br />
            <WordStagger text="ИНАЧЕ ЭТО ИНТЕРФЕЙС." color="#ffffff" delayOffset={0.42} />
          </p>
        </div>
      </div>
    </section>
  );
}
