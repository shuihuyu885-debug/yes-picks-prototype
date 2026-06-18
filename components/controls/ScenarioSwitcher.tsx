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
  "balanced-carousel": "Balanced Carousel",
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
              aria-pressed={isActive}
              className={clsx(
                "min-h-11 rounded-lg border px-3 py-3 text-left text-sm font-semibold transition",
                isActive
                  ? "border-yes-green bg-yes-green text-yes-ink"
                  : "border-yes-line bg-yes-ink text-yes-mist hover:border-yes-teal",
              )}
              onClick={() => onChange(scenario.id)}
              type="button"
            >
              {scenarioLabels[scenario.id]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
