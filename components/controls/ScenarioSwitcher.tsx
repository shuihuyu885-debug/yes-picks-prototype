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
    <div className="rounded-lg border border-yes-line bg-yes-panel p-2.5">
      <p className="px-1 text-xs font-bold uppercase tracking-[0.12em] text-yes-muted">Scenarios</p>
      <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenario;

          return (
            <button
              key={scenario.id}
              aria-pressed={isActive}
              className={clsx(
                "flex min-h-9 items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-left text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yes-green",
                isActive
                  ? "border-yes-green bg-yes-green text-yes-ink"
                  : "border-yes-line bg-yes-ink text-yes-mist hover:border-yes-teal",
              )}
              onClick={() => onChange(scenario.id)}
              type="button"
            >
              <span>{scenarioLabels[scenario.id]}</span>
              {isActive ? (
                <span className="rounded-full bg-yes-ink px-1.5 py-0.5 text-[0.58rem] font-black uppercase tracking-normal text-yes-green">
                  Active
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
