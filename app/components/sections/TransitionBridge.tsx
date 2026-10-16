import type { Translations } from "~/i18n/translations";

interface TransitionBridgeProps {
  t: Translations;
}

export function TransitionBridge({ t }: TransitionBridgeProps) {
  return (
    <div className="transition-bridge-wrap">
      <div className="typographic-bridge" aria-hidden="true">
        <div className="max-w-7xl">
          <h2 className="bridge-giant-text">{t.bridge.heading}</h2>
        </div>
      </div>
    </div>
  );
}
