// overlays/content/EngineContent.tsx — 03 · THE ENGINE (AgniPress)
import { projects } from "@/lib/data/projects";

const p = projects.find((x) => x.id === "agnipress")!;

export default function EngineContent() {
  return (
    <>
      <p className="ovl-kicker" data-reveal data-delay="0.0">
        03 — The Engine
      </p>
      <h2 className="ovl-title ovl-title--md" data-reveal data-delay="0.04">
        AgniPress
      </h2>
      <p className="ovl-sub" data-reveal data-delay="0.08">
        Full-stack publishing engine · Java 21 · Spring Boot 3
      </p>
      <p className="ovl-body" data-reveal data-delay="0.13">
        {p.problem}
      </p>
      <p className="ovl-body" data-reveal data-delay="0.18">
        {p.solution}
      </p>
      <div className="ovl-chips" data-reveal data-delay="0.24">
        {p.technologies.map((t) => (
          <span key={t} className="ovl-chip">
            {t}
          </span>
        ))}
      </div>
    </>
  );
}
