"use client";

import { useEffect } from "react";

export default function ScrollInertia({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let current = window.scrollY;
    let target = window.scrollY;
    let rafId: number;
    let running = false;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(
        0,
        Math.min(target, document.body.scrollHeight - window.innerHeight)
      );
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    }

    function loop() {
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        current = target;
        running = false;
        return;
      }
      current += diff * 0.1;
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
