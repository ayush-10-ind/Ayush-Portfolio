// overlays/content/HorizonContent.tsx — 06 · THE HORIZON (contact)
import { profile } from "@/lib/data/profile";

export default function HorizonContent() {
  return (
    <>
      <p className="ovl-kicker" data-reveal data-delay="0.0">
        06 — The Horizon
      </p>
      <h2 className="ovl-title ovl-title--md" data-reveal data-delay="0.04">
        Let&apos;s build something
      </h2>
      <p className="ovl-body" data-reveal data-delay="0.1">
        {profile.availability}
      </p>
      <div className="ovl-contact" data-reveal data-delay="0.16">
        <a className="ovl-link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="ovl-link" href="tel:+918303155683">
          +91 8303155683
        </a>
        <a className="ovl-link" href="/Ayush_Trivedi_Resume.pdf" target="_blank" rel="noopener noreferrer">
          Résumé PDF
        </a>
        <span className="ovl-meta">
          GitHub · LinkedIn
        </span>
      </div>
      <p className="ovl-easteregg" data-reveal data-delay="0.24">
        NOTHING HAPPENED.
      </p>
    </>
  );
}
