import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Detections } from "@/components/Detections";
import { Stats } from "@/components/Stats";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { Technology } from "@/components/Technology";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="relative">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Detections />
        <Stats />
        <PlatformShowcase />
        <Technology />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
