"use client";

import type { RankedGame } from "@/lib/types";

type GameCardProps = {
  game: RankedGame;
  onClick: (game: RankedGame) => void;
};

export function GameCard({ game, onClick }: GameCardProps) {
  const badge = getGameBadge(game);

  return (
    <button
      aria-label={`Open ${game.title}`}
      className="group flex h-[104px] w-[108px] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-violet-300"
      onClick={() => onClick(game)}
      type="button"
    >
      <div className="relative h-11 shrink-0 bg-gradient-to-br from-slate-200 via-slate-100 to-violet-100">
        <div className="absolute inset-2 rounded-lg border border-white/80 bg-white/35" />
        {badge ? (
          <span className="absolute left-1.5 top-1.5 max-w-[94px] truncate rounded-full bg-white/95 px-1.5 py-0.5 text-[0.62rem] font-bold leading-none text-violet-700 shadow-sm">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-2 py-1.5">
        <p className="text-[0.68rem] font-semibold uppercase leading-3 text-slate-500">
          {game.category}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[0.78rem] font-bold leading-[0.95rem] text-slate-950">
          {game.title}
        </p>
        <div className="mt-auto flex items-center justify-between gap-1">
          <p className="truncate text-[0.68rem] font-medium leading-3 text-slate-500">
            {game.mockPrizeLabel ?? game.provider}
          </p>
        </div>
      </div>
    </button>
  );
}

function getGameBadge(game: RankedGame) {
  if (game.isRecentlyPlayed) {
    return "Recently Played";
  }

  if (game.isExclusive) {
    return "Yes Exclusive";
  }

  if (game.isNew) {
    return "New";
  }

  if (game.isJackpotLinked) {
    return "Jackpot Linked";
  }

  return undefined;
}
