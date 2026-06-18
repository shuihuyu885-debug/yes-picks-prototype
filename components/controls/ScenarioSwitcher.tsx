"use client";

import { clsx } from "clsx";
import type { Scenario, ScenarioKey } from "@/lib/types";

type ScenarioSwitcherProps = {
  activeScenario: ScenarioKey;
  scenarios: Scenario[];
  onChange: (scenario: ScenarioKey) => void;
};

export function ScenarioSwitcher({
  activeScenario,
  scenarios,
  onChange,
}: ScenarioSwitcherProps) {
  return (
    <div className="rounded-lg border border-yes-line bg-yes-panel p-3">
      <p className="px-1 text-sm font-semibold text-yes-mist">Scenarios</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {scenarios.map((scenario) => {
          const isActive = scenario.key === activeScenario;

          return (
            <button
              key={scenario.key}
              className={clsx(
                "min-h-11 rounded-lg border px-3 py-3 text-left text-sm transition",
                isActive
                  ? "border-yes-green bg-yes-green text-yes-ink"
                  : "border-yes-line bg-yes-ink text-yes-mist hover:border-yes-teal",
              )}
              onClick={() => onChange(scenario.key)}
              type="button"
            >
              <span className="block font-semibold">{scenario.label}</span>
              <span className={clsx("mt-1 block text-xs", isActive ? "text-yes-ink" : "text-yes-muted")}>
                {scenario.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
