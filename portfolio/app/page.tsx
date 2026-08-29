// app/page.tsx — Main portfolio page (SPA composition)
// Composes all sections in correct order.
// Section components render the full experience.

import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import AssistantPanel from "@/components/assistant/AssistantPanel";

export default function Home() {
  return (
    <>
      {/* Fixed navigation — section-aware */}
      <Navigation />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* AI Assistant — slide-in panel, does not dominate layout */}
      <AssistantPanel />
    </>
  );
}
