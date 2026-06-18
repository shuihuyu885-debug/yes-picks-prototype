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
import { games } from "@/data/games";
import { rankGames } from "@/data/ranking";
import { scenarios } from "@/data/scenarios";
import { decideHero } from "@/lib/heroDecision";
import type { ScenarioKey } from "@/lib/types";

export default function Home() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("new-player");
  const scenario = scenarios.find((item) => item.key === scenarioKey) ?? scenarios[0];

  const rankedGames = useMemo(() => rankGames(games, scenario), [scenario]);
  const hero = useMemo(() => decideHero(scenario, rankedGames), [scenario, rankedGames]);

  return (
    <main className="min-h-dvh px-4 py-6 text-yes-mist sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[25rem_1fr] lg:items-start">
        <section aria-label="iPhone-sized lobby preview" className="mx-auto w-full max-w-[25rem]">
          <PhoneShell>
            <LobbyHeader />
            <YesPicksLane hero={hero} scenario={scenario}>
              {hero.kind !== "none" ? <RewardTile hero={hero} /> : null}
              <div className="grid grid-cols-2 gap-3">
                {rankedGames.slice(0, 6).map((game, index) => (
                  <GameTile key={game.id} game={game} rank={index + 1} />
                ))}
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
              A clean foundation for showing how Yes Picks can change its hero tile,
              ordering and content mix across player, event and business states.
            </p>
          </div>

          <ScenarioSwitcher
            activeScenario={scenarioKey}
            scenarios={scenarios}
            onChange={setScenarioKey}
          />
          <LogicPanel hero={hero} rankedGames={rankedGames} scenario={scenario} />
        </section>
      </div>
    </main>
  );
}
