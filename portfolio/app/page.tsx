import Navigation from "@/components/sections/Navigation";
import CinematicStage from "@/components/cinematic/CinematicStage";
import AssistantPanel from "@/components/assistant/AssistantPanel";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--color-paper-base)] text-[var(--color-ink-primary)]">
      <CustomCursor />
      <Navigation />
      <CinematicStage />
      <AssistantPanel />
    </main>
  );
}