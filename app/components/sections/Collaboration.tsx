import type { Translations } from "~/i18n/translations";

interface CollaborationProps {
  t: Translations;
}

export function Collaboration({ t }: CollaborationProps) {
  const c = t.collaboration;

  return (
    <section className="collaboration-container" id="collaboration" aria-label={c.label}>
      <div className="collaboration-perspectives">
        <article className="collaboration-perspective collaboration-project" aria-labelledby="collaboration-project-heading">
          <h2 className="collaboration-role-heading" id="collaboration-project-heading">
            {c.project.headline.lead}{" "}<span>{c.project.headline.rest}</span>
          </h2>
          <ul className="collaboration-disciplines" role="list">
            {c.project.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}
          </ul>
          <p className="collaboration-description">{c.project.description}</p>
        </article>
        <article className="collaboration-perspective collaboration-team" aria-labelledby="collaboration-team-heading">
          <h2 className="collaboration-role-heading" id="collaboration-team-heading">
            {c.team.headline.lead}{" "}<em>{c.team.headline.rest}</em>
          </h2>
          <p className="collaboration-team-signature">
            <span>{c.team.signatureLead}</span>{" "}<strong>{t.header.brand}</strong>
          </p>
          <p className="collaboration-description">{c.team.description}</p>
        </article>
      </div>
    </section>
  );
}
