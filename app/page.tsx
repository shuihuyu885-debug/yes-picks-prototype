"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { GameTile } from "@/components/cards/GameTile";
import { RewardTile } from "@/components/cards/RewardTile";
import { ScenarioSwitcher } from "@/components/controls/ScenarioSwitcher";
import { LogicPanel } from "@/components/panels/LogicPanel";
import { LobbyHeader } from "@/components/lobby/LobbyHeader";
import { PhoneShell } from "@/components/layout/PhoneShell";
import { YesPicksLane } from "@/components/lane/YesPicksLane";
import {
  getGamesForScenario,
  getHeroGameForScenario,
  getScenarioById,
  getSupportingGamesForScenario,
} from "@/data/ranking";
import { scenarios } from "@/data/scenarios";
import { getHeroDecision } from "@/lib/heroDecision";
import type { ScenarioId } from "@/lib/types";

export default function Home() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("new-player");
  const scenario = useMemo(() => getScenarioById(scenarioId), [scenarioId]);

  const laneGames = useMemo(() => getGamesForScenario(scenarioId), [scenarioId]);
  const supportingGames = useMemo(() => getSupportingGamesForScenario(scenarioId), [scenarioId]);
  const heroGame = useMemo(() => getHeroGameForScenario(scenarioId), [scenarioId]);
  const hero = useMemo(() => getHeroDecision(scenario), [scenario]);

  return (
    <main className="min-h-dvh px-4 py-6 text-yes-mist sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[440px_1fr] lg:items-start">
        <section aria-label="iPhone 16 Pro Max lobby preview" className="mx-auto w-full max-w-[440px]">
          <PhoneShell>
            <LobbyHeader />
            <YesPicksLane hero={hero} scenario={scenario}>
              <div className="overflow-x-auto pb-2">
                <div className="grid grid-flow-col grid-rows-2 gap-3">
                  {hero.heroType !== "none" ? (
                    <div className="row-span-2 w-72">
                      <RewardTile hero={hero} heroGame={heroGame} />
                    </div>
                  ) : null}
                  {supportingGames.slice(0, 8).map((game, index) => (
                    <div key={game.id} className="w-40">
                      <GameTile game={game} rank={index + 1} />
                    </div>
                  ))}
                </div>
              </div>
            </YesPicksLane>
            <div className="mt-5 rounded-lg border border-yes-line bg-yes-panel/70 p-3">
              <div className="flex items-start gap-2 text-xs leading-5 text-yes-muted">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-yes-green" />
                <p>
                  Denmark assumptions: responsible-gambling guardrails stay visible, bonuses are
                  restricted, and crash games are excluded.
                </p>
              </div>
            </div>
          </PhoneShell>
        </section>

        <section aria-label="Prototype controls and logic" className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yes-green">
              yes-picks-prototype
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-yes-mist sm:text-4xl">
              Configurable casino lobby lane
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-yes-muted">
              A data-model foundation for showing how Yes Picks changes its first carousel item,
              ordering and content mix across player, event and business states.
            </p>
          </div>

          <ScenarioSwitcher
            activeScenario={scenarioId}
            scenarios={scenarios}
            onChange={setScenarioId}
          />
          <LogicPanel hero={hero} rankedGames={laneGames} scenario={scenario} />
        </section>
      </div>
    </main>
  );
}
