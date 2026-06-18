"use client";

import { useMemo, useState } from "react";
import { ScenarioSwitcher } from "@/components/controls/ScenarioSwitcher";
import { PrototypeShell } from "@/components/layout/PrototypeShell";
import { MobileLobby } from "@/components/lobby/MobileLobby";
import { PhoneFrame } from "@/components/lobby/PhoneFrame";
import { ScenarioInspectorPanel } from "@/components/panels/ScenarioInspectorPanel";
import { StrategyOverviewPanel } from "@/components/panels/StrategyOverviewPanel";
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
      inspectorPanel={
        <ScenarioInspectorPanel hero={hero} rankedGames={rankedGames} scenario={scenario} />
      }
      previewPanel={
        <div className="mx-auto flex min-w-[440px] max-w-[520px] flex-col items-center">
          <div className="w-full">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-yes-green">
              Scenario Preview
            </p>
            <div className="mt-3">
              <ScenarioSwitcher
                activeScenario={activeScenario}
                onChange={setActiveScenario}
                scenarios={scenarios}
              />
            </div>
          </div>

          <div className="mt-6 flex w-full justify-center">
            <PhoneFrame>
              <MobileLobby scenarioId={activeScenario} />
            </PhoneFrame>
          </div>
        </div>
      }
      strategyPanel={<StrategyOverviewPanel />}
    />
  );
}
