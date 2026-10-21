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
        <h2 className="capabilities-editorial-heading" id="capabilities-heading">
          {copy.headline.lead}{" "}
          <em>{copy.headline.accent}</em>
        </h2>
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
              {capability.title.lead}{" "}
              <span className="capability-column-title-rest">{capability.title.rest}</span>
            </h3>
            <p className="capability-column-description">{capability.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
