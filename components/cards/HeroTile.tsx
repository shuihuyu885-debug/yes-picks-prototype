"use client";

import { CirclePlay, Info, Sparkles } from "lucide-react";
import type { Game, HeroDecision } from "@/lib/types";

type HeroTileProps = {
  heroDecision: HeroDecision;
  game?: Game;
  onCtaClick: () => void;
  onInfoClick: () => void;
};

export function HeroTile({ heroDecision, game, onCtaClick, onInfoClick }: HeroTileProps) {
  const isFeaturedGame = heroDecision.heroType === "featured-game";
  const title = game?.title ?? heroDecision.heroTitle ?? "Yes Picks";
  const whyLabel = game?.whyLabel ?? heroDecision.decisionReason;
  const badges = getHeroBadges(game, heroDecision);
  const ctaLabel = isFeaturedGame ? "Play" : "View details";

  return (
    <article className="flex h-[220px] w-[204px] shrink-0 flex-col overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
      <div className="relative h-[104px] bg-gradient-to-br from-violet-200 via-slate-100 to-slate-200">
        <div className="absolute inset-3 rounded-xl border border-white/80 bg-white/35" />
        <div className="absolute left-3 top-3 flex max-w-[180px] flex-wrap gap-1">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-white/95 px-2 py-1 text-[0.68rem] font-bold leading-none text-violet-700 shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
        <Sparkles aria-hidden="true" className="absolute bottom-3 right-3 h-6 w-6 text-violet-600" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-violet-700">
          {isFeaturedGame ? "Featured game" : "Hero placeholder"}
        </p>
        <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-5 text-slate-950">{title}</h3>
        <p className="mt-1 line-clamp-2 text-xs font-medium leading-4 text-slate-600">
          {whyLabel}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <button
            aria-label={`Play ${title}`}
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-violet-600 px-3 text-sm font-bold text-white transition hover:bg-violet-700"
            onClick={onCtaClick}
            type="button"
          >
            <CirclePlay aria-hidden="true" className="h-4 w-4" />
            {ctaLabel}
          </button>
          <button
            aria-label={`View details for ${title}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-violet-300"
            onClick={onInfoClick}
            type="button"
          >
            <Info aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function getHeroBadges(game: Game | undefined, heroDecision: HeroDecision) {
  const badges = heroDecision.heroType === "featured-game" ? ["Featured Pick"] : ["View details"];

  if (game?.isNew) {
    badges.push("New on Yes");
  }

  if (game?.isExclusive) {
    badges.push("Yes Exclusive");
  }

  return badges;
}
