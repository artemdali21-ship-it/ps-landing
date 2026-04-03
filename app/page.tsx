import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Examples from "@/components/sections/Examples";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

// dynamic({ ssr: false }) called from a Server Component — this is the
// correct pattern. Next.js will NOT render these on the server at all,
// so no hydration mismatch and no Framer Motion "non-static position" warning.
const ScrollStory = dynamic(
  () => import("@/components/sections/ScrollStory"),
  { ssr: false }
);

const ThreeLevels = dynamic(
  () => import("@/components/sections/ThreeLevels"),
  { ssr: false }
);

const FloatingObjects = dynamic(
  () => import("@/components/Objects3D"),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <FloatingObjects />
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
