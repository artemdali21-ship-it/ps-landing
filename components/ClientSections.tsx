"use client";

import dynamic from "next/dynamic";

// All three components use client-only scroll APIs.
// ssr: false prevents SSR hydration mismatches and "non-static position" warnings.
export const ScrollStory = dynamic(
  () => import("@/components/sections/ScrollStory"),
  { ssr: false }
);

export const ThreeLevels = dynamic(
  () => import("@/components/sections/ThreeLevels"),
  { ssr: false }
);

export const FloatingObjects = dynamic(
  () => import("@/components/Objects3D"),
  { ssr: false }
);
