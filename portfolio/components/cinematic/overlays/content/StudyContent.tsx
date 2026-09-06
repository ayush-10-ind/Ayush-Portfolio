// overlays/content/StudyContent.tsx — 01 · THE STUDY (identity)
import { profile } from "@/lib/data/profile";

export default function StudyContent() {
  return (
    <>
      <p className="ovl-kicker" data-reveal data-delay="0.0">
        01 — The Study
      </p>
      <h2 className="ovl-title ovl-title--md" data-reveal data-delay="0.04">
        Ayush Trivedi
      </h2>
      <p className="ovl-sub" data-reveal data-delay="0.09">
        {profile.tagline}
      </p>
      <p className="ovl-body" data-reveal data-delay="0.14">
        Computer Science &amp; Engineering student at NIET, Greater Noida.
        I build backend systems and study how machines explain their own
        decisions.
      </p>
      <ul className="ovl-facts" data-reveal data-delay="0.19">
        <li>NIET · Greater Noida</li>
        <li>8.4 CGPA</li>
        <li>Expected 2028</li>
      </ul>
    </>
  );
}
