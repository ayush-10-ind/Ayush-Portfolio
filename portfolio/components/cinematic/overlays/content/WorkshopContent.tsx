// overlays/content/WorkshopContent.tsx — 02 · THE WORKSHOP (mindset + skills)
import { skillGroups } from "@/lib/data/skills";

export default function WorkshopContent() {
  return (
    <>
      <p className="ovl-kicker" data-reveal data-delay="0.0">
        02 — The Workshop
      </p>
      <h2 className="ovl-title ovl-title--md" data-reveal data-delay="0.04">
        Mindset &amp; Craft
      </h2>
      <p className="ovl-body" data-reveal data-delay="0.1">
        Discipline over noise. A small, sharp stack — chosen for systems I can
        reason about end-to-end.
      </p>
      <div className="ovl-skillgrid" data-reveal data-delay="0.16">
        {skillGroups.map((g) => (
          <div key={g.domain} className="ovl-skillgroup">
            <span className="ovl-meta">{g.domain}</span>
            <p className="ovl-skills">{g.skills.map((s) => s.name).join(" · ")}</p>
          </div>
        ))}
      </div>
    </>
  );
}
