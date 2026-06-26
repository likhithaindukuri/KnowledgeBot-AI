import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProjectOverview from "../components/ProjectOverview";
import PlatformAssistant from "../components/PlatformAssistant";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProjectOverview />
      <Footer />
      <PlatformAssistant />
    </div>
  );
}
