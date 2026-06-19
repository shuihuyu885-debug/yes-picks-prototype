"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
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
  highlighted?: boolean;
  scenarioId: ScenarioId;
  onInfoClick: (heroType: HeroType, scenario: Scenario) => void;
  onCtaClick: (heroType: HeroType, scenario: Scenario) => void;
  onGameClick: (game: RankedGame) => void;
};

export function YesPicksLane({
  highlighted = false,
  scenarioId,
  onInfoClick,
  onCtaClick,
  onGameClick,
}: YesPicksLaneProps) {
  const scenario = getScenarioById(scenarioId);
  const heroDecision = getHeroDecision(scenario);
  const heroGame = getHeroGameForScenario(scenarioId);
  const supportingGames = getOrderedSupportingGames(
    scenario,
    getSupportingGamesForScenario(scenarioId),
  ).slice(0, 10);
  const heroTileGame = heroDecision.heroType !== "none" ? heroGame : undefined;
  const hasHero = heroDecision.heroType !== "none";

  return (
    <section
      aria-labelledby="yes-picks-heading"
      className={clsx(
        "relative rounded-lg transition-shadow duration-200",
        highlighted &&
          "z-10 outline outline-4 outline-offset-4 outline-red-500 shadow-[0_0_0_9999px_rgba(15,23,42,0.16),0_0_26px_rgba(239,68,68,0.5)]",
      )}
      data-annotation-target="yes-picks-lane"
    >
      <div className="space-y-[13px]">
        <div>
          <h2
            id="yes-picks-heading"
            className="text-[1.28rem] font-medium leading-[1.15] tracking-normal text-[#5d5a88]"
          >
            <span className="font-black">Yes</span> Picks
          </h2>
        </div>

        <div className="scrollbar-none -mx-5 overflow-x-auto px-[11px] pb-1">
          <div className="grid w-max grid-flow-col grid-rows-[142px_142px] gap-[6px]">
            {hasHero ? (
              <motion.div
                key={`${scenario.id}-${heroDecision.heroType}`}
                animate={{ opacity: 1, y: 0 }}
                className={
                  heroDecision.heroType === "jackpot-pool"
                    ? "row-span-2 h-[290px] w-[470px]"
                    : "row-span-2 h-[290px] w-[231px]"
                }
                initial={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <HeroTile
                  game={heroTileGame}
                  heroDecision={heroDecision}
                  onCtaClick={() => onCtaClick(heroDecision.heroType, scenario)}
                  onInfoClick={() => onInfoClick(heroDecision.heroType, scenario)}
                />
              </motion.div>
            ) : null}

            {supportingGames.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                index={index}
                scenarioId={scenario.id}
                onClick={onGameClick}
              />
            ))}
          </div>
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
