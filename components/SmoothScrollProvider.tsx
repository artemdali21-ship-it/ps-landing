"use client";

import { useEffect } from "react";

// Native smooth scroll provider — no external deps
// Uses a JS-based lerp scroll loop for inertia effect
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let current = window.scrollY;
    let target = window.scrollY;
    let rafId: number;
    let ticking = false;

    const ease = 0.1;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
      if (!ticking) {
        rafId = requestAnimationFrame(loop);
        ticking = true;
      }
    }

    function loop() {
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        current = target;
        ticking = false;
        return;
      }
      current += diff * ease;
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
