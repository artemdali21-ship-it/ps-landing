"use client";

// Direct client-component imports — no dynamic() needed since each component
// already has "use client" and handles its own SSR concerns via useEffect.
// This eliminates stale chunk references from previous dynamic() registrations.

export { default as ScrollStory } from "@/components/sections/ScrollStory";
export { default as ThreeLevels } from "@/components/sections/ThreeLevels";
export { default as FloatingObjects } from "@/components/Objects3D";
