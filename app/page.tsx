import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import ThreeLevels from "@/components/sections/ThreeLevels";
import Examples from "@/components/sections/Examples";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <ThreeLevels />
      <Examples />
      <Process />
      <FinalCTA />
      <Footer />
    </main>
  );
}
