"use client";

import dynamic from "next/dynamic";

// ssr: false — these components use client-only scroll APIs
export const ScrollStory = dynamic(
  () => import("@/components/sections/ScrollStory"),
  { ssr: false }
);

export const ThreeLevels = dynamic(
  () => import("@/components/sections/ThreeLevels"),
  { ssr: false }
);
