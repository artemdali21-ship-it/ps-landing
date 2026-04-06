"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * useMagneticHover — притягивает элемент к курсору на ±maxOffset px.
 * Работает только на десктопе (pointer: fine).
 * Returns { ref, x, y, onMouseMove, onMouseLeave } для motion.element.
 */
export function useMagneticHover(maxOffset = 7) {
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 300, damping: 22, mass: 0.6 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Only apply on pointer:fine (mouse) devices
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * maxOffset;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * maxOffset;
      rawX.set(dx);
      rawY.set(dy);
    },
    [rawX, rawY, maxOffset]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}
