"use client";

import type { ReactNode } from "react";
import type { Game, HeroDecision } from "@/lib/types";

type HeroTileProps = {
  heroDecision: HeroDecision;
  game?: Game;
  onCtaClick: () => void;
  onInfoClick: () => void;
};

const jackpotTiers = [
  ["Super Jackpot", "DKK 4,000.00"],
  ["Grand Jackpot", "DKK 1,000.00"],
  ["Major Jackpot", "DKK 400.00"],
  ["Mini Jackpot", "DKK 200.00"],
];

export function HeroTile({ heroDecision, onCtaClick, onInfoClick }: HeroTileProps) {
  if (heroDecision.heroType === "daily-picks") {
    // Daily Picks hero = reward/promotion state with key conditions visible.
    return (
      <WireframeHeroShell
        ctaLabel="View picks"
        infoLabel="View Daily Picks details"
        onCtaClick={onCtaClick}
        onInfoClick={onInfoClick}
        ribbonLabel="Daily"
      >
        <div className="flex h-full flex-col items-center justify-center px-7 pb-16 pt-12 text-center">
          <h3 className="text-[1.35rem] font-medium italic leading-7 text-white">Daily Picks</h3>
          <p className="mt-4 text-sm font-semibold leading-5 text-white">
            6 daily picks available today
          </p>
          <p className="mt-4 bg-white px-4 py-2 text-xs font-medium text-slate-700 [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%,8%_50%)]">
            First deposit required
          </p>
          <p className="mt-2 text-[0.7rem] font-medium italic leading-4 text-white/85">
            Prize cap applies · Terms apply
          </p>
        </div>
      </WireframeHeroShell>
    );
  }

  if (heroDecision.heroType === "jackpot-pool") {
    // Jackpot hero = jackpot pool discovery, not a single game promotion.
    return (
      <WireframeHeroShell
        ctaLabel="View pool"
        infoLabel="View Yes Pots details"
        onCtaClick={onCtaClick}
        onInfoClick={onInfoClick}
        ribbonLabel="Pool"
      >
        <div className="flex h-full flex-col px-5 pb-16 pt-7 text-white">
          <h3 className="text-center text-[1.25rem] font-bold italic leading-6">Yes Pots</h3>
          <p className="mx-auto mt-2 max-w-[150px] text-center text-xs font-medium leading-4 text-white/90">
            4 games linked to the same jackpot pool
          </p>
          <div className="mt-4 space-y-1.5">
            {jackpotTiers.map(([label, value]) => (
              <div key={label} className="rounded-full bg-white/35 px-3 py-1">
                <p className="text-center text-[0.64rem] font-semibold italic leading-3 text-white">
                  {label}
                </p>
                <p className="mt-0.5 rounded-full bg-[#4a5259] px-2 py-0.5 text-center text-[0.68rem] font-bold leading-3 text-white tabular-nums">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </WireframeHeroShell>
    );
  }

  // Featured hero = content/editorial/business priority.
  return (
    <WireframeHeroShell
      ctaLabel="CTA"
      infoLabel="View featured pick details"
      onCtaClick={onCtaClick}
      onInfoClick={onInfoClick}
      ribbonLabel="NEW"
    >
      <div className="flex h-full items-center justify-center px-8 pb-14 pt-12 text-center">
        <h3 className="text-[1.35rem] font-normal italic leading-7 text-white">Promoted Game</h3>
      </div>
    </WireframeHeroShell>
  );
}

function WireframeHeroShell({
  children,
  ctaLabel,
  infoLabel,
  onCtaClick,
  onInfoClick,
  ribbonLabel,
}: {
  children: ReactNode;
  ctaLabel: string;
  infoLabel: string;
  onCtaClick: () => void;
  onInfoClick: () => void;
  ribbonLabel: string;
}) {
  return (
    <article className="relative h-[290px] w-[231px] shrink-0 overflow-hidden rounded-lg bg-[#8c96a1] text-white">
      <div className="absolute left-0 top-0 z-10 h-[63px] w-[49px] bg-white shadow-[0_6px_9px_rgba(44,51,57,0.32)] [clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]">
        <span className="flex h-full items-center justify-center px-1 text-center text-[0.68rem] font-black uppercase leading-3 text-black">
          {ribbonLabel}
        </span>
      </div>

      {children}

      <button
        aria-label={infoLabel}
        className="absolute bottom-2.5 left-2.5 grid h-11 w-11 place-items-center rounded-full bg-white/45 text-[1.4rem] font-bold leading-none text-white"
        onClick={onInfoClick}
        type="button"
      >
        i
      </button>
      <button
        aria-label={ctaLabel}
        className="absolute bottom-2.5 left-[61px] flex h-11 w-40 items-center justify-center rounded-lg border border-white bg-[#4a5259] text-sm font-bold text-white"
        onClick={onCtaClick}
        type="button"
      >
        {ctaLabel}
      </button>
    </article>
  );
}
