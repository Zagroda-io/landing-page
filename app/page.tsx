import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Roadmap } from "@/components/Roadmap";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { Security } from "@/components/Security";
import { Survey } from "@/components/Survey";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
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
        <Roadmap />
        <PlatformShowcase />
        <Security />
        <Survey />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
