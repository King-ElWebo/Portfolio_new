import type { Translations } from "~/i18n/translations";
import { CapabilityLayers } from "./CapabilityLayers";
import "~/styles/capabilities.css";

interface CapabilitiesProps {
  t: Translations;
}

export function Capabilities({ t }: CapabilitiesProps) {
  const copy = t.capabilities;

  return (
    <section
      className="capabilities-editorial max-w-7xl"
      id="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="capabilities-editorial-intro">
        <div>
          <h2 className="capabilities-editorial-heading" id="capabilities-heading">
            {copy.headline}
          </h2>
          <p className="capabilities-editorial-subline">{copy.subline}</p>
        </div>
        <CapabilityLayers labels={copy.visual} />
      </div>

      <div className="capabilities-editorial-columns">
        {copy.rows.map((capability) => (
          <article
            className="capability-column"
            key={capability.id}
            aria-labelledby={"capability-" + capability.id}
          >
            <h3 className="capability-column-title" id={"capability-" + capability.id}>
              {capability.title}
            </h3>
            <p className="capability-column-description">{capability.description}</p>
            <ul className="capability-column-examples" role="list">
              {capability.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
