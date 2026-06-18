"use client";

import { CirclePlay, Gift, Info, Sparkles, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import type { Game, HeroDecision } from "@/lib/types";

type HeroTileProps = {
  heroDecision: HeroDecision;
  game?: Game;
  onCtaClick: () => void;
  onInfoClick: () => void;
};

export function HeroTile({ heroDecision, game, onCtaClick, onInfoClick }: HeroTileProps) {
  if (heroDecision.heroType === "daily-picks") {
    // Daily Picks hero = reward/promotion state with key conditions visible.
    return <DailyPicksHero onCtaClick={onCtaClick} onInfoClick={onInfoClick} />;
  }

  if (heroDecision.heroType === "jackpot-pool") {
    // Jackpot hero = jackpot pool discovery, not a single game promotion.
    return <JackpotPoolHero onCtaClick={onCtaClick} onInfoClick={onInfoClick} />;
  }

  // Featured hero = content/editorial/business priority.
  return (
    <FeaturedGameHero
      game={game}
      heroDecision={heroDecision}
      onCtaClick={onCtaClick}
      onInfoClick={onInfoClick}
    />
  );
}

function FeaturedGameHero({ heroDecision, game, onCtaClick, onInfoClick }: HeroTileProps) {
  const title = game?.title ?? heroDecision.heroTitle ?? "Yes Picks";
  const whyLabel = game?.whyLabel ?? heroDecision.decisionReason;
  const badges = getFeaturedBadges(game);
  const ribbonLabel = game?.isNew ? "New on Yes" : badges[0];

  return (
    <article className="relative flex h-[220px] w-[204px] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-300 bg-slate-400 p-3 text-white shadow-sm">
      <FoldedRibbon label={ribbonLabel} />
      <Sparkles aria-hidden="true" className="absolute right-4 top-4 h-6 w-6 text-white/50" />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-2 pb-12 pt-10 text-center">
        <p className="rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold leading-none text-white">
          {badges.includes("Yes Exclusive") ? "Yes Exclusive" : "Recommended Today"}
        </p>
        <h3 className="mt-3 line-clamp-2 text-xl font-semibold italic leading-6 text-white">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs font-medium leading-4 text-white/85">
          {whyLabel}
        </p>

        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
          <button
            aria-label={`Play ${title}`}
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white bg-slate-700 px-3 text-sm font-bold text-white transition hover:bg-slate-800"
            onClick={onCtaClick}
            type="button"
          >
            <CirclePlay aria-hidden="true" className="h-4 w-4" />
            Play
          </button>
          <button
            aria-label={`View details for ${title}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
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

function DailyPicksHero({ onCtaClick, onInfoClick }: Pick<HeroTileProps, "onCtaClick" | "onInfoClick">) {
  return (
    <article className="relative flex h-[220px] w-[204px] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-300 bg-slate-400 p-3 text-white shadow-sm">
      <FoldedRibbon icon={<Gift aria-hidden="true" className="h-4 w-4 text-violet-700" />} label="Daily" />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-12 pt-9 text-center">
        <h3 className="text-xl font-semibold italic leading-6 text-white">Daily Picks</h3>
        <p className="mt-3 text-sm font-bold leading-5 text-white">
          6 daily picks available today
        </p>
        <div className="mt-4 w-full bg-white px-2 py-2 text-center text-xs font-semibold text-slate-700 [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%,8%_50%)]">
          First deposit required
        </div>
        <p className="mt-2 text-[0.7rem] font-medium italic leading-3 text-white/80">
          Prize cap applies · Terms apply
        </p>

        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
          <button
            aria-label="View Daily Picks"
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white bg-slate-700 px-3 text-sm font-bold text-white transition hover:bg-slate-800"
            onClick={onCtaClick}
            type="button"
          >
            <Gift aria-hidden="true" className="h-4 w-4" />
            View picks
          </button>
          <button
            aria-label="View Daily Picks details"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
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

function JackpotPoolHero({ onCtaClick, onInfoClick }: Pick<HeroTileProps, "onCtaClick" | "onInfoClick">) {
  const tiers = [
    ["Super Jackpot", "DKK 4,000.00"],
    ["Grand Jackpot", "DKK 1,000.00"],
    ["Major Jackpot", "DKK 400.00"],
    ["Mini Jackpot", "DKK 200.00"],
  ];

  return (
    <article className="relative flex h-[220px] w-[204px] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-600 bg-slate-700 p-3 text-white shadow-sm">
      <div className="pointer-events-none absolute -left-5 top-4 h-8 w-8 rounded-full border border-white/25 bg-white/10" />
      <div className="pointer-events-none absolute -right-3 top-10 h-16 w-16 rounded-full border border-white/15 bg-white/10" />
      <div className="flex items-center gap-2">
        <Trophy aria-hidden="true" className="h-4 w-4 text-white/80" />
        <h3 className="text-lg font-bold italic leading-5">Yes Pots</h3>
      </div>

      <p className="mt-1 text-[0.68rem] font-medium leading-3 text-white/75">
        4 games linked to the same jackpot pool
      </p>

      <div className="mt-2 space-y-1.5">
        {tiers.map(([label, value]) => (
          <div key={label} className="rounded-full bg-white/30 px-2 py-1">
            <p className="truncate text-center text-[0.62rem] font-semibold italic leading-3 text-white">
              {label}
            </p>
            <p className="mt-0.5 rounded-full bg-slate-600 px-2 py-0.5 text-center text-[0.66rem] font-bold leading-3 text-white tabular-nums">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-2">
        <button
          aria-label="View Yes Pots pool"
          className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white bg-slate-800 px-3 text-sm font-bold text-white transition hover:bg-slate-900"
          onClick={onCtaClick}
          type="button"
        >
          <Trophy aria-hidden="true" className="h-4 w-4" />
          View pool
        </button>
        <button
          aria-label="View Yes Pots details"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          onClick={onInfoClick}
          type="button"
        >
          <Info aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function FoldedRibbon({ icon, label }: { icon?: ReactNode; label: string }) {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-16 w-14 flex-col items-center justify-center gap-1 bg-white px-1 text-[0.55rem] font-black uppercase leading-[0.7rem] text-slate-950 shadow-md after:absolute after:-bottom-3 after:left-0 after:h-3 after:w-full after:bg-slate-700/30 after:[clip-path:polygon(0_0,100%_0,100%_100%)]">
      {icon}
      <span className="text-center">{label}</span>
    </div>
  );
}

function getFeaturedBadges(game: Game | undefined) {
  const badges = ["Featured Pick"];

  if (game?.isNew) {
    badges.push("New on Yes");
  }

  if (game?.isExclusive) {
    badges.push("Yes Exclusive");
  }

  if (!game?.isNew && !game?.isExclusive) {
    badges.push("Recommended Today");
  }

  return badges;
}
