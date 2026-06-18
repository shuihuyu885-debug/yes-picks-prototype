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
    return <JackpotPoolHero onCtaClick={onCtaClick} onInfoClick={onInfoClick} />;
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

function JackpotPoolHero({
  onCtaClick,
  onInfoClick,
}: {
  onCtaClick: () => void;
  onInfoClick: () => void;
}) {
  return (
    <article className="relative h-[290px] w-[470px] shrink-0 overflow-hidden rounded-lg bg-[#626262] text-white">
      <div className="absolute inset-y-0 left-[221px] w-[249px] rounded-r-lg bg-white" />
      <div className="absolute inset-y-0 left-[181px] w-[138px] overflow-hidden">
        <div className="absolute left-[23px] top-[-37px] h-[97px] w-[102px] rounded-full bg-white" />
        <div className="absolute left-[23px] top-[30px] h-[97px] w-[102px] rounded-full bg-white" />
        <div className="absolute left-[8px] top-[75px] h-[127px] w-[102px] rounded-full bg-white" />
        <div className="absolute left-[23px] top-[133px] h-[127px] w-[102px] rounded-full bg-white" />
        <div className="absolute left-[23px] top-[217px] h-[97px] w-[102px] rounded-full bg-white" />
      </div>

      <div className="pointer-events-none absolute left-1 top-10 h-7 w-7 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-5 top-4 h-3.5 w-3.5 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-[108px] top-1 h-10 w-10 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-[105px] top-12 h-3.5 w-3.5 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-[166px] top-[125px] h-3.5 w-3.5 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-[188px] top-20 h-3.5 w-3.5 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-[166px] top-[197px] h-7 w-7 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-3 top-[164px] h-4 w-4 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-0 top-[209px] h-7 w-7 rounded-full border-2 border-white/25" />

      <div className="absolute left-0 top-0 h-full w-[221px] px-4 py-5">
        <h3 className="text-center text-xl font-semibold italic leading-5">Yes POTS!</h3>
        <div className="mt-4 flex flex-col gap-[7px]">
          {jackpotTiers.map(([label, value]) => (
            <div key={label} className="h-[49px] w-[160px] rounded-full bg-[#b1b1b1] pt-[1px]">
              <p className="flex h-[23px] items-center justify-center text-center text-sm font-semibold italic leading-4 text-white">
                {label}
              </p>
              <p className="mx-auto flex h-[25px] w-[135px] items-center justify-center rounded-full bg-[#707070] px-2 text-center text-sm font-semibold italic leading-4 text-white tabular-nums">
                {value.replace(",", "")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-[228px] top-4 grid h-[258px] w-[235px] grid-cols-2 grid-rows-2 gap-x-3 gap-y-4">
        {["Game 1", "Game 2", "Game 3", "Game 4"].map((label) => (
          <button
            key={label}
            aria-label={`View ${label} linked to Yes Pots`}
            className="flex items-center justify-center rounded-t-[58px] rounded-b-lg bg-[#b1b1b1] px-3 text-center text-base font-bold italic leading-5 text-white transition hover:bg-[#9fa3a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
            onClick={onCtaClick}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <button
        aria-label="View Yes Pots details"
        className="absolute bottom-3 left-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/35 text-xl font-bold leading-none text-white transition hover:bg-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={onInfoClick}
        type="button"
      >
        i
      </button>
    </article>
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
  ctaLabel?: string;
  infoLabel: string;
  onCtaClick?: () => void;
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
        className="absolute bottom-2.5 left-2.5 grid h-11 w-11 place-items-center rounded-full bg-white/45 text-[1.4rem] font-bold leading-none text-white transition hover:bg-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={onInfoClick}
        type="button"
      >
        i
      </button>
      {ctaLabel && onCtaClick ? (
        <button
          aria-label={ctaLabel}
          className="absolute bottom-2.5 left-[61px] flex h-11 w-40 items-center justify-center rounded-lg border border-white bg-[#4a5259] text-sm font-bold text-white transition hover:bg-[#3f474e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={onCtaClick}
          type="button"
        >
          {ctaLabel}
        </button>
      ) : null}
    </article>
  );
}
