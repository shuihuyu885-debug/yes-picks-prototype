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
    <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
      <p className="px-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Scenarios</p>
      <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenario;

          return (
            <button
              key={scenario.id}
              aria-pressed={isActive}
              className={clsx(
                "flex min-h-9 items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-left text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700",
                isActive
                  ? "border-violet-700 bg-violet-700 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-300 hover:bg-violet-50",
              )}
              onClick={() => onChange(scenario.id)}
              type="button"
            >
              <span>{scenarioLabels[scenario.id]}</span>
              {isActive ? (
                <span className="rounded-full bg-white px-1.5 py-0.5 text-[0.58rem] font-black uppercase tracking-normal text-violet-700">
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
