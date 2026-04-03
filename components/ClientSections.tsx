"use client";

import dynamic from "next/dynamic";

// ssr: false is only allowed inside Client Components
const ScrollStory = dynamic(() => import("@/components/sections/ScrollStory"), { ssr: false });
const ThreeLevels = dynamic(() => import("@/components/sections/ThreeLevels"), { ssr: false });

export { ScrollStory, ThreeLevels };
