"use client";

import type { RankedGame, ScenarioId } from "@/lib/types";

type GameCardProps = {
  game: RankedGame;
  index?: number;
  scenarioId?: ScenarioId;
  onClick: (game: RankedGame) => void;
};

export function GameCard({ game, index = 0, scenarioId, onClick }: GameCardProps) {
  const badge = getGameBadge(game, index, scenarioId);
  const title = getWireframeTitle(game, index, scenarioId);
  const prizeLabel = getPrizeLabel(game, index, scenarioId);

  return (
    <button
      aria-label={`Open ${game.title}`}
      className="relative h-[142px] w-[113px] shrink-0 overflow-hidden rounded-lg bg-[#8c96a1] text-center text-white"
      onClick={() => onClick(game)}
      type="button"
    >
      {badge ? (
        <div className="absolute inset-x-0 top-0 flex h-5 items-center justify-center gap-1 rounded-t-lg bg-[#4a5259] px-2 text-[0.62rem] text-white">
          {badge === "yes Exclusive" ? <span className="font-black">yes</span> : null}
          <span>{badge.replace("yes ", "")}</span>
        </div>
      ) : null}

      <div className="flex h-full items-center justify-center px-4 pb-6 pt-6">
        <p className="text-[1rem] font-normal italic leading-5 text-white">{title}</p>
      </div>

      {prizeLabel ? (
        <div className="absolute inset-x-0 bottom-0 flex h-6 items-center justify-center rounded-b-lg bg-white/50 px-2">
          <p className="truncate text-[0.86rem] font-normal italic leading-none text-black">
            {prizeLabel}
          </p>
        </div>
      ) : null}
    </button>
  );
}

function getGameBadge(game: RankedGame, index: number, scenarioId?: ScenarioId) {
  if (usesTieredWireframeCards(scenarioId)) {
    return [0, 4, 6, 8].includes(index) ? "yes Exclusive" : undefined;
  }

  if (game.isExclusive || index === 0) {
    return "yes Exclusive";
  }

  return undefined;
}

function getWireframeTitle(game: RankedGame, index: number, scenarioId?: ScenarioId) {
  if (usesTieredWireframeCards(scenarioId)) {
    const tieredLabels = [
      "Exclusive Tier 1 Game",
      "Top Local-Market Games",
      "Top Global Game",
      "Top Global Table Game",
      "Exclusive Tier2 Game",
      "New Game",
      "Exclusive Tier2 Game",
      "Tier 2 Game",
      "Exclusive Tier2 Game",
      "Tier 2 Game",
    ];

    return tieredLabels[index] ?? "Tier 2 Game";
  }

  if (game.isExclusive || index === 0) {
    return "Exclusive Tier 1 Game";
  }

  if (game.isRecentlyPlayed) {
    return `Recently Played Game ${index}`;
  }

  if (game.isJackpotLinked) {
    return "Linked Pool Game";
  }

  if (index === 1) {
    return "Top Local-Market Games";
  }

  if (game.category === "table" || game.category === "live") {
    return "Top Global Game";
  }

  return game.isNew ? "New Game" : "Tier 2 Game";
}

function getPrizeLabel(game: RankedGame, index: number, scenarioId?: ScenarioId) {
  if (usesTieredWireframeCards(scenarioId)) {
    return [0, 1, 5, 7, 8].includes(index) ? "DKK 2,434.32" : undefined;
  }

  if (game.mockPrizeLabel || game.isJackpotLinked || game.isExclusive) {
    return "DKK 2,434.32";
  }

  return undefined;
}

function usesTieredWireframeCards(scenarioId?: ScenarioId) {
  return scenarioId === "new-player" || scenarioId === "jackpot-event-available";
}
