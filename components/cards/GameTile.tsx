import { CircleDollarSign } from "lucide-react";
import type { RankedGame } from "@/lib/types";
import { formatDkk } from "@/lib/format";

type GameTileProps = {
  game: RankedGame;
  rank: number;
};

export function GameTile({ game, rank }: GameTileProps) {
  return (
    <article className="min-h-40 rounded-lg border border-yes-line bg-yes-panel p-3">
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-full bg-yes-ink px-2 py-1 text-[0.68rem] font-medium uppercase text-yes-muted">
          #{rank}
        </span>
        <CircleDollarSign aria-hidden="true" className="h-4 w-4 text-yes-gold" />
      </div>
      <div className="mt-7">
        <p className="text-xs uppercase tracking-[0.12em] text-yes-muted">{game.category}</p>
        <h4 className="mt-1 text-sm font-semibold leading-5 text-yes-mist">{game.title}</h4>
        <p className="mt-1 text-xs text-yes-muted">{game.provider}</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-yes-line pt-3 text-xs text-yes-muted">
        <span>From {formatDkk(game.minStakeDkk)}</span>
        <span>{game.score} pts</span>
      </div>
    </article>
  );
}
