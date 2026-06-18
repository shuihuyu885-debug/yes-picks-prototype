"use client";

import { useMemo, useState } from "react";
import { ScenarioSwitcher } from "@/components/controls/ScenarioSwitcher";
import { PrototypeShell } from "@/components/layout/PrototypeShell";
import { MobileLobby } from "@/components/lobby/MobileLobby";
import { PhoneFrame } from "@/components/lobby/PhoneFrame";
import { LogicPanel } from "@/components/panels/LogicPanel";
import { getGamesForScenario, getScenarioById } from "@/data/ranking";
import { scenarios } from "@/data/scenarios";
import { getHeroDecision } from "@/lib/heroDecision";
import type { ScenarioId } from "@/lib/types";

export default function Home() {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("new-player");
  const scenario = useMemo(() => getScenarioById(activeScenario), [activeScenario]);
  const hero = useMemo(() => getHeroDecision(scenario), [scenario]);
  const rankedGames = useMemo(() => getGamesForScenario(activeScenario), [activeScenario]);

  return (
    <PrototypeShell
      phonePreview={
        <PhoneFrame>
          <MobileLobby scenarioId={activeScenario} />
        </PhoneFrame>
      }
      sidePanel={
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">
              yes-picks-prototype
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              Wireframe alignment
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              The phone preview stays close to the grey-box lobby wireframe. Scenario logic,
              ranking notes and compliance assumptions live here outside the player-facing UI.
            </p>
          </div>

          <ScenarioSwitcher
            activeScenario={activeScenario}
            onChange={setActiveScenario}
            scenarios={scenarios}
          />

          <LogicPanel hero={hero} rankedGames={rankedGames} scenario={scenario} />
        </div>
      }
    />
  );
}
