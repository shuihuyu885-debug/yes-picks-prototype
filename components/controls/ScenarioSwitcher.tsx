"use client";

import { clsx } from "clsx";
import type { Scenario, ScenarioId } from "@/lib/types";

type ScenarioSwitcherProps = {
  activeScenario: ScenarioId;
  scenarios: Scenario[];
  onChange: (scenario: ScenarioId) => void;
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
          const isActive = scenario.id === activeScenario;

          return (
            <button
              key={scenario.id}
              className={clsx(
                "min-h-11 rounded-lg border px-3 py-3 text-left text-sm transition",
                isActive
                  ? "border-yes-green bg-yes-green text-yes-ink"
                  : "border-yes-line bg-yes-ink text-yes-mist hover:border-yes-teal",
              )}
              onClick={() => onChange(scenario.id)}
              type="button"
            >
              <span className="block font-semibold">{scenario.title}</span>
              <span className={clsx("mt-1 block text-xs", isActive ? "text-yes-ink" : "text-yes-muted")}>
                {scenario.layoutMode}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
