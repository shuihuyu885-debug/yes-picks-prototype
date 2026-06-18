"use client";

import {
  CircleUserRound,
  Gift,
  Home,
  Plus,
  Search,
  Signal,
  Sparkles,
  Trophy,
  Wifi,
} from "lucide-react";
import { YesPicksLane } from "@/components/lane/YesPicksLane";
import type { HeroType, RankedGame, Scenario, ScenarioId } from "@/lib/types";

const categories = ["Slots", "Jackpots", "Table Games", "Slingo", "Bingo", "Live Casino"];

const bottomNav = [
  { label: "Home", icon: Home },
  { label: "New", icon: Sparkles },
  { label: "Live Casino", icon: Trophy },
  { label: "Reward", icon: Gift },
  { label: "Search", icon: Search },
];

type MobileLobbyProps = {
  scenarioId?: ScenarioId;
};

export function MobileLobby({ scenarioId = "new-player" }: MobileLobbyProps) {
  const handleInfoClick = (heroType: HeroType, scenario: Scenario) => {
    console.log("Yes Picks hero info", { heroType, scenarioId: scenario.id });
  };

  const handleCtaClick = (heroType: HeroType, scenario: Scenario) => {
    console.log("Yes Picks hero CTA", { heroType, scenarioId: scenario.id });
  };

  const handleGameClick = (game: RankedGame) => {
    console.log("Yes Picks game", { gameId: game.id, title: game.title });
  };

  return (
    <div className="relative h-full overflow-hidden bg-white text-slate-950">
      <div className="scrollbar-none h-full overflow-y-auto pb-32">
        <StatusBar />
        <TopBrandBar />
        <CategoryNav />
        <main className="pt-[15px]">
          <HeroPlaceholder />
          <div className="mt-[10px] px-5">
            <YesPicksLane
              onCtaClick={handleCtaClick}
              onGameClick={handleGameClick}
              onInfoClick={handleInfoClick}
              scenarioId={scenarioId}
            />
          </div>
          <GenericSectionPlaceholder />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-[54px] items-center justify-between bg-white px-11 text-[1.05rem] font-medium italic text-slate-700">
      <span>9:52</span>
      <div className="flex items-center gap-2 text-slate-700" aria-hidden="true">
        <Signal className="h-4 w-4 stroke-[1.75]" />
        <Wifi className="h-4 w-4 stroke-[1.75]" />
        <span className="h-3 w-5 rounded-[2px] border-[1.5px] border-slate-700 after:ml-[18px] after:mt-[3px] after:block after:h-1.5 after:w-0.5 after:bg-slate-700" />
      </div>
    </div>
  );
}

function TopBrandBar() {
  return (
    <header className="flex h-[56px] items-center gap-3 bg-slate-500 px-8">
      <div className="mr-auto text-[2rem] font-black leading-none tracking-normal text-white">yes</div>
      <div className="flex h-9 items-center gap-2 rounded-full bg-slate-700 pl-4 pr-1.5 text-[0.92rem] font-semibold text-white">
        <span>Dkk 300.00</span>
        <button
          aria-label="Add funds"
          className="grid h-7 w-7 place-items-center rounded-full border-2 border-white text-white"
          type="button"
        >
          <Plus aria-hidden="true" className="h-5 w-5 stroke-[1.8]" />
        </button>
      </div>
      <button
        aria-label="Open profile"
        className="grid h-9 w-9 place-items-center rounded-full bg-slate-700 text-white"
        type="button"
      >
        <CircleUserRound aria-hidden="true" className="h-7 w-7 stroke-[1.6]" />
      </button>
    </header>
  );
}

function CategoryNav() {
  return (
    <nav aria-label="Game categories" className="bg-white">
      <div className="scrollbar-none flex h-[41px] items-center gap-10 overflow-x-auto px-5">
        {categories.map((category) => (
          <button
            key={category}
            aria-label={`Show ${category}`}
            className="min-h-8 shrink-0 text-[1.02rem] font-medium text-violet-950/75"
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HeroPlaceholder() {
  return (
    <section
      aria-label="Generic lobby hero placeholder"
      className="mx-[18px] flex h-[188px] items-center justify-center rounded-lg bg-[#d6dce1]"
    >
      <p className="text-2xl font-medium italic text-white">Hero Banner</p>
    </section>
  );
}

function GenericSectionPlaceholder() {
  return (
    <section aria-labelledby="lower-section-placeholder" className="mt-[27px] space-y-4">
      <div className="px-5">
        <h2
          id="lower-section-placeholder"
          className="text-2xl font-bold tracking-normal text-violet-950/75"
        >
          Title
        </h2>
      </div>
      <div className="bg-[#d6dce1] px-5 py-6">
        <div className="flex gap-3 overflow-hidden">
          {["", "", "", ""].map((_, index) => (
            <div
              key={index}
              className="h-[142px] w-[113px] shrink-0 rounded-lg bg-[#c6cad0]"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomNav() {
  return (
    <nav
      aria-label="Primary mobile navigation"
      className="absolute bottom-8 left-1/2 h-14 w-[370px] -translate-x-1/2 rounded-full bg-[#7f8a97]/90 px-0 py-0 text-white shadow-none"
    >
      <div className="grid h-full grid-cols-5">
        {bottomNav.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              aria-label={`Open ${item.label}`}
              className="flex h-full min-w-0 items-center justify-center text-white"
              type="button"
            >
              <span className="flex w-full min-w-0 flex-col items-center justify-center gap-0.5 px-1 text-center">
                <Icon aria-hidden="true" className="h-[22px] w-[22px] shrink-0 stroke-[1.7]" />
                <span className="block w-full truncate text-[0.62rem] font-medium leading-none">
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
