"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { BottomSheet } from "@/components/lobby/BottomSheet";
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
  highlightYesPicks?: boolean;
  scenarioId?: ScenarioId;
};

type SheetContent = {
  title: string;
  body?: string;
  bullets?: string[];
};

const infoSheetByHero: Record<Exclude<HeroType, "none">, SheetContent> = {
  "featured-game": {
    title: "Why this pick?",
    bullets: [
      "Featured for this scenario based on editorial or launch priority",
      "Eligible for Denmark",
      "Mobile-ready",
      "Balanced with supporting recommendations",
      "Commercial priority cannot override eligibility or responsible-gambling guardrails",
    ],
  },
  "daily-picks": {
    title: "Daily Picks details",
    bullets: [
      "This is treated as a reward/promotion card, not a standard game tile",
      "First deposit required",
      "Prize cap applies",
      "Terms apply",
      "Copy avoids aggressive free/win messaging in the lane",
    ],
  },
  "jackpot-pool": {
    title: "Jackpot pool details",
    bullets: [
      "These games are linked to the same jackpot pool",
      "Jackpot amounts are shown in DKK",
      "Eligibility and game rules must be available before launch",
      "Avoids urgency language such as hot or due to drop",
    ],
  },
};

const ctaSheetByHero: Record<Exclude<HeroType, "none">, SheetContent> = {
  "featured-game": {
    title: "Game launch simulated",
    body: "In production, this would call the EveryMatrix game launch flow for the selected game.",
  },
  "daily-picks": {
    title: "Daily Picks simulated",
    body: "In production, this would open the reward details and eligible games. Key terms would be visible before play.",
  },
  "jackpot-pool": {
    title: "Jackpot pool simulated",
    body: "In production, this would open the jackpot pool detail view and linked eligible games.",
  },
};

export function MobileLobby({
  highlightYesPicks = false,
  scenarioId = "new-player",
}: MobileLobbyProps) {
  const [sheet, setSheet] = useState<SheetContent | null>(null);

  const handleInfoClick = (heroType: HeroType, scenario: Scenario) => {
    if (heroType === "none") {
      return;
    }

    console.log("Yes Picks hero info", { heroType, scenarioId: scenario.id });
    setSheet(infoSheetByHero[heroType]);
  };

  const handleCtaClick = (heroType: HeroType, scenario: Scenario) => {
    console.log("Yes Picks hero CTA", { heroType, scenarioId: scenario.id });
    if (heroType === "none") {
      return;
    }

    setSheet(ctaSheetByHero[heroType]);
  };

  const handleGameClick = (game: RankedGame) => {
    console.log("Yes Picks game", { gameId: game.id, title: game.title });
    setSheet({
      title: "Game launch simulated",
      body: "This prototype does not connect to a real backend.",
      bullets: [`Selected game: ${game.title}`],
    });
  };

  return (
    <div className="relative h-full overflow-hidden bg-white text-slate-950">
      <div className="scrollbar-none h-full overflow-y-auto pb-32">
        <StatusBar />
        <TopBrandBar />
        <CategoryNav />
        <motion.main
          key={scenarioId}
          animate={{ opacity: 1, y: 0 }}
          className="pt-[15px]"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <HeroPlaceholder />
          <div className="mt-[10px] px-5">
            <YesPicksLane
              highlighted={highlightYesPicks}
              onCtaClick={handleCtaClick}
              onGameClick={handleGameClick}
              onInfoClick={handleInfoClick}
              scenarioId={scenarioId}
            />
          </div>
          <GenericSectionPlaceholder />
        </motion.main>
      </div>
      <BottomNav />
      <BottomSheet
        body={sheet?.body}
        bullets={sheet?.bullets}
        onClose={() => setSheet(null)}
        open={Boolean(sheet)}
        title={sheet?.title ?? ""}
      />
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
          className="grid h-7 w-7 place-items-center rounded-full border-2 border-white text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          type="button"
        >
          <Plus aria-hidden="true" className="h-5 w-5 stroke-[1.8]" />
        </button>
      </div>
      <button
        aria-label="Open profile"
        className="grid h-9 w-9 place-items-center rounded-full bg-slate-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
            className="min-h-8 shrink-0 rounded-md text-[1.02rem] font-medium text-violet-950/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
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
              className="flex h-full min-w-0 items-center justify-center rounded-full text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              type="button"
            >
              <span className="flex w-full min-w-0 flex-col items-center justify-center gap-0.5 px-1 text-center">
                <Icon aria-hidden="true" className="h-[22px] w-[22px] shrink-0 stroke-[1.7]" />
                <span className="block w-full truncate text-xs font-medium leading-none">
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
