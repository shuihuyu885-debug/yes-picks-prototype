"use client";

import { clsx } from "clsx";
import type { Scenario, ScenarioId } from "@/lib/types";

type ScenarioSwitcherProps = {
  activeScenario: ScenarioId;
  scenarios: Scenario[];
  onChange: (scenario: ScenarioId) => void;
};

const scenarioLabels: Record<ScenarioId, string> = {
  "new-player": "New Player",
  "returning-player": "Returning Player",
  "daily-picks-available": "Daily Picks",
  "jackpot-event-available": "Jackpot Event",
};

export function ScenarioSwitcher({
  activeScenario,
  scenarios,
  onChange,
}: ScenarioSwitcherProps) {
  return (
    <div aria-label="Scenario controls" className="flex flex-wrap gap-2">
      {scenarios.map((scenario) => {
        const isActive = scenario.id === activeScenario;

        return (
          <button
            key={scenario.id}
            aria-pressed={isActive}
            className={clsx(
              "min-h-10 rounded-md border px-4 py-2 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yes-green",
              isActive
                ? "border-yes-green bg-yes-green text-yes-ink"
                : "border-yes-line bg-yes-panel text-yes-mist hover:border-yes-teal",
            )}
            onClick={() => onChange(scenario.id)}
            type="button"
          >
            {scenarioLabels[scenario.id]}
          </button>
        );
      })}
    </div>
  );
}
