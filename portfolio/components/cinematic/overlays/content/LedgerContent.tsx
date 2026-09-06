// overlays/content/LedgerContent.tsx — 05 · THE LEDGER (experience + education)
import { experiences, educationList, certifications } from "@/lib/data/experience";

export default function LedgerContent() {
  const exp = experiences[0];
  return (
    <>
      <p className="ovl-kicker" data-reveal data-delay="0.0">
        05 — The Ledger
      </p>
      <h2 className="ovl-title ovl-title--md" data-reveal data-delay="0.04">
        Experience &amp; Education
      </h2>

      <div className="ovl-record" data-reveal data-delay="0.1">
        <p className="ovl-meta">
          {exp.role} — {exp.company}
        </p>
        <p className="ovl-body">
          {exp.period.start} – {exp.period.end}
        </p>
        <p className="ovl-body">{exp.responsibilities[0]}</p>
      </div>

      {educationList.map((e) => (
        <div className="ovl-record" key={e.id} data-reveal data-delay="0.16">
          <p className="ovl-meta">
            {e.degree} — {e.institution}
          </p>
          <p className="ovl-body">
            {e.grade} · {e.period}
          </p>
        </div>
      ))}

      <div className="ovl-chips" data-reveal data-delay="0.22">
        {certifications.map((c) => (
          <span key={c.title} className="ovl-chip">
            {c.title}
          </span>
        ))}
      </div>
    </>
  );
}
