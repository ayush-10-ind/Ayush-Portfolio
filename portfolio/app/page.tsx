// app/page.tsx — SPA Root Composition
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

export default function Home() {
  return (
    <>
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Fixed Navigation & Header */}
      <Navigation />

      {/* Main Content Sections */}
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <SpatialResumeStudio />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* Intelligent Assistant Panel */}
      <AssistantPanel />
    </>
  );
}