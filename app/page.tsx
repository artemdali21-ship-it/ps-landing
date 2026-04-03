// Server Component — no dynamic() here, ssr:false lives in ClientSections.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Examples from "@/components/sections/Examples";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import { ScrollStory, ThreeLevels } from "@/components/ClientSections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ScrollStory />
      <WhatWeDo />
      <ThreeLevels />
      <Examples />
      <Process />
      <FinalCTA />
      <Footer />
    </main>
  );
}
