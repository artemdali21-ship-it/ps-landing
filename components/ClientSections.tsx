"use client";

import dynamic from "next/dynamic";

// ssr: false is only allowed inside Client Components — never in Server Components (page.tsx)
export const ScrollStory = dynamic(
  () => import("@/components/sections/ScrollStory"),
  { ssr: false, loading: () => <div style={{ height: "100vh" }} /> }
);

export const ThreeLevels = dynamic(
  () => import("@/components/sections/ThreeLevels"),
  { ssr: false, loading: () => <div style={{ minHeight: "600px" }} /> }
);
