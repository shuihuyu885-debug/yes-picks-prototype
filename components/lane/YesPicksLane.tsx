"use client";

import { GameCard } from "@/components/cards/GameCard";
import { HeroTile } from "@/components/cards/HeroTile";
import {
  getHeroGameForScenario,
  getScenarioById,
  getSupportingGamesForScenario,
} from "@/data/ranking";
import { getHeroDecision } from "@/lib/heroDecision";
import type { HeroType, RankedGame, Scenario, ScenarioId } from "@/lib/types";

type YesPicksLaneProps = {
  scenarioId: ScenarioId;
  onInfoClick: (heroType: HeroType, scenario: Scenario) => void;
  onCtaClick: (heroType: HeroType, scenario: Scenario) => void;
  onGameClick: (game: RankedGame) => void;
};

export function YesPicksLane({
  scenarioId,
  onInfoClick,
  onCtaClick,
  onGameClick,
}: YesPicksLaneProps) {
  const scenario = getScenarioById(scenarioId);
  const heroDecision = getHeroDecision(scenario);
  const heroGame = getHeroGameForScenario(scenarioId);
  const supportingGames = getOrderedSupportingGames(scenario, getSupportingGamesForScenario(scenarioId));
  const heroTileGame = heroDecision.heroType !== "none" ? heroGame : undefined;
  const hasHero = heroDecision.heroType !== "none";

  return (
    <section aria-labelledby="yes-picks-heading" className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
            Dynamic lane
          </p>
          <h2 id="yes-picks-heading" className="text-xl font-bold tracking-normal text-slate-950">
            Yes Picks
          </h2>
        </div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          {heroDecision.layoutMode === "hero-carousel" ? "Hero carousel" : "Balanced"}
        </span>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid w-max grid-flow-col grid-rows-[104px_104px] gap-2.5">
          {hasHero ? (
            <div className="row-span-2 h-[220px] w-[204px]">
              <HeroTile
                game={heroTileGame}
                heroDecision={heroDecision}
                onCtaClick={() => onCtaClick(heroDecision.heroType, scenario)}
                onInfoClick={() => onInfoClick(heroDecision.heroType, scenario)}
              />
            </div>
          ) : null}

          {supportingGames.map((game) => (
            <GameCard key={game.id} game={game} onClick={onGameClick} />
          ))}
        </div>
      </div>
    </section>
  );
}

function getOrderedSupportingGames(scenario: Scenario, games: RankedGame[]) {
  if (scenario.id === "jackpot-event-available") {
    // Jackpot pool support cards surface games from the same pool before filling the lane.
    return [...games].sort((a, b) => {
      const aInPool = a.jackpotPoolId === scenario.jackpotPoolId;
      const bInPool = b.jackpotPoolId === scenario.jackpotPoolId;

      if (aInPool !== bInPool) {
        return aInPool ? -1 : 1;
      }

      return b.score - a.score || a.title.localeCompare(b.title);
    });
  }

  if (scenario.id === "daily-picks-available") {
    // Daily Picks stays as a reward hero; supporting cards remain normal eligible games.
    return [...games].sort((a, b) => {
      if (a.isRecentlyPlayed !== b.isRecentlyPlayed) {
        return a.isRecentlyPlayed ? -1 : 1;
      }

      return b.score - a.score || a.title.localeCompare(b.title);
    });
  }

  if (scenario.layoutMode !== "balanced-carousel" || scenario.playerType !== "returning") {
    return games;
  }

  return [...games].sort((a, b) => {
    if (a.isRecentlyPlayed !== b.isRecentlyPlayed) {
      return a.isRecentlyPlayed ? -1 : 1;
    }

    return b.score - a.score || a.title.localeCompare(b.title);
  });
}
