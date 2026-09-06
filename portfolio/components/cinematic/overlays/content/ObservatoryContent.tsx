// overlays/content/ObservatoryContent.tsx — 04 · THE OBSERVATORY (XAI)
import { projects } from "@/lib/data/projects";

const p = projects.find((x) => x.id === "explainable-ai-research")!;

export default function ObservatoryContent() {
  return (
    <>
      <p className="ovl-kicker" data-reveal data-delay="0.0">
        04 — The Observatory
      </p>
      <h2 className="ovl-title ovl-title--md" data-reveal data-delay="0.04">
        Explainable AI
      </h2>
      <p className="ovl-sub" data-reveal data-delay="0.08">
        Research · model interpretability
      </p>
      <p className="ovl-body" data-reveal data-delay="0.13">
        {p.problem}
      </p>
      <p className="ovl-body" data-reveal data-delay="0.18">
        {p.solution}
      </p>
      <p className="ovl-chain" data-reveal data-delay="0.24">
        MODEL → PREDICTION → FEATURES → ATTRIBUTION → EXPLANATION
      </p>
    </>
  );
}
