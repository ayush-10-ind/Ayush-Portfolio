// app/page.tsx — Spatial Football Experience Root Composition
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SpatialResumeStudio from "@/components/resume/SpatialResumeStudio";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import AssistantPanel from "@/components/assistant/AssistantPanel";
import CustomCursor from "@/components/ui/CustomCursor";
import FootballJourney from "@/components/spatial/FootballJourney";
import SmoothScrollProvider from "@/components/spatial/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Persistent Spatial Football & Tactical Chalk Path */}
      <FootballJourney />

      {/* Fixed Navigation & Match Progress Line */}
      <Navigation />

      {/* Main Spatial Journey Scenes */}
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <SpatialResumeStudio />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* Intelligent Research Assistant Panel */}
      <AssistantPanel />
    </SmoothScrollProvider>
  );
}