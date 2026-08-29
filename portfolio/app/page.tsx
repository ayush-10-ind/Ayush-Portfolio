// app/page.tsx — Interactive Animated Film & Spatial Portfolio Composition
import Navigation from "@/components/sections/Navigation";
import CinematicStage from "@/components/cinematic/CinematicStage";
import AssistantPanel from "@/components/assistant/AssistantPanel";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/spatial/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Fixed Navigation & Coordinate Index */}
      <Navigation />

      {/* Main Continuous Cinematic Stage */}
      <main id="main-content" className="relative">
        <CinematicStage />
      </main>

      {/* Grounded Research Archive Assistant */}
      <AssistantPanel />
    </SmoothScrollProvider>
  );
}