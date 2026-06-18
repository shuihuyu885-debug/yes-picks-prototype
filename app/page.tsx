"use client";

import { useMemo, useState } from "react";
import { ScenarioSwitcher } from "@/components/controls/ScenarioSwitcher";
import { PrototypeShell } from "@/components/layout/PrototypeShell";
import { MobileLobby } from "@/components/lobby/MobileLobby";
import { PhoneFrame } from "@/components/lobby/PhoneFrame";
import { CompactConfigSummary } from "@/components/panels/CompactConfigSummary";
import { CurrentStateSummary } from "@/components/panels/CurrentStateSummary";
import { HypothesisCard } from "@/components/panels/HypothesisCard";
import { ReviewTabs } from "@/components/panels/ReviewTabs";
import { WalkthroughPanel } from "@/components/panels/WalkthroughPanel";
import { getGamesForScenario, getScenarioById } from "@/data/ranking";
import { scenarios } from "@/data/scenarios";
import { getHeroDecision } from "@/lib/heroDecision";
import type { ScenarioId } from "@/lib/types";

export default function Home() {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("new-player");
  const [walkthroughEnabled, setWalkthroughEnabled] = useState(true);
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
        <div className="space-y-3">
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-black tracking-normal text-yes-mist">
                Yes Picks Prototype
              </h1>
              <p className="mt-1 text-sm font-semibold text-yes-green">
                Dynamic state-based casino carousel
              </p>
              <p className="mt-1 text-sm leading-5 text-yes-muted">
                The phone preview shows how the Yes Picks carousel changes by player state and
                event signal.
              </p>
            </div>

            <ScenarioSwitcher
              activeScenario={activeScenario}
              onChange={setActiveScenario}
              scenarios={scenarios}
            />
          </div>

          <CurrentStateSummary hero={hero} scenario={scenario} />
          <HypothesisCard />
          <CompactConfigSummary hero={hero} scenario={scenario} />
          <WalkthroughPanel enabled={walkthroughEnabled} onToggle={setWalkthroughEnabled} />
          <ReviewTabs hero={hero} rankedGames={rankedGames} scenario={scenario} />
        </div>
      }
    />
  );
}
