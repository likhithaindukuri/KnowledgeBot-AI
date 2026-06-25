import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import { CtaSection } from "../components/DemoSection";
import PlatformAssistant from "../components/PlatformAssistant";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CtaSection />
      <Footer />
      <PlatformAssistant />
    </div>
  );
}
