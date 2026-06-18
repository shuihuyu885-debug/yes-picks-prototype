import { Gift, Sparkles, Trophy } from "lucide-react";
import type { Game, HeroDecision } from "@/lib/types";

type RewardTileProps = {
  hero: HeroDecision;
  heroGame?: Game;
};

export function RewardTile({ hero, heroGame }: RewardTileProps) {
  const Icon =
    hero.heroType === "jackpot-pool" ? Trophy : hero.heroType === "featured-game" ? Sparkles : Gift;
  const title = hero.heroTitle ?? heroGame?.title ?? "Yes Picks";
  const copy = hero.safeCopy ?? [hero.heroCopy ?? heroGame?.whyLabel ?? hero.decisionReason];

  return (
    <article className="h-full min-h-72 rounded-lg border border-yes-green/40 bg-yes-green/10 p-4">
      <div className="flex gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-yes-green text-yes-ink">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-yes-green">
            First carousel item
          </p>
          <h4 className="mt-1 text-lg font-semibold tracking-normal text-yes-mist">
            {title}
          </h4>
          <ul className="mt-2 space-y-1 text-sm leading-6 text-yes-muted">
            {copy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            className="mt-4 min-h-11 rounded-full bg-yes-mist px-4 text-sm font-semibold text-yes-ink transition hover:bg-white"
            type="button"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
