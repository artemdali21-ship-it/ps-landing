import Navbar from "@/components/Navbar";
import { ScrollStory, ThreeLevels } from "@/components/ClientSections";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Examples from "@/components/sections/Examples";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
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
