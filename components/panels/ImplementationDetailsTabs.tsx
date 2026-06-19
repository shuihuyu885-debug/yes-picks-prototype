"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { denmarkRankingConfig } from "@/data/ranking";
import { rankingFactorLabels } from "@/components/panels/reviewContent";
import type { HeroDecision, RankingFactor, Scenario } from "@/lib/types";

type ImplementationDetailsTabsProps = {
  hero: HeroDecision;
  scenario: Scenario;
};

type TabId = "config" | "weights" | "compliance" | "assumptions";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "config", label: "Config" },
  { id: "weights", label: "Ranking Weights" },
  { id: "compliance", label: "Compliance" },
  { id: "assumptions", label: "Assumptions" },
];

const complianceNotes = [
  "Slots, table, live and instant games are in scope",
  "Crash games are excluded for Denmark",
  "Daily Picks is treated as a reward/promotion card",
  "Key reward conditions must be visible",
  "Use DKK for Denmark examples",
  "Avoid hot, due to drop, win big, claim now and misleading win language",
];

const assumptions = [
  "Mock game catalogue only",
  "EveryMatrix integration is simulated",
  "Game availability, RTP, jackpot values and player eligibility would come from backend services",
  "Bonus / reward mechanics require compliance approval before launch",
  "Prototype focuses on lane logic, not production visual design",
];

export function ImplementationDetailsTabs({ hero, scenario }: ImplementationDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("config");

  return (
    <section aria-labelledby="implementation-details-title" className="space-y-2">
      <h2
        id="implementation-details-title"
        className="text-base font-black uppercase tracking-[0.12em] text-yes-green"
      >
        Implementation Details
      </h2>

      <div className="rounded-lg border border-yes-line bg-[#222]">
        <div
          aria-label="Implementation detail sections"
          className="grid grid-cols-2 gap-1 p-1 sm:grid-cols-4"
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                aria-controls={`implementation-tabpanel-${tab.id}`}
                aria-selected={isActive}
                className={clsx(
                  "min-h-9 rounded-md px-2 py-1.5 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yes-green",
                  isActive
                    ? "bg-yes-green text-yes-ink"
                    : "bg-yes-ink text-yes-muted hover:text-yes-mist",
                )}
                id={`implementation-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          aria-labelledby={`implementation-tab-${activeTab}`}
          className="border-t border-yes-line p-4"
          id={`implementation-tabpanel-${activeTab}`}
          role="tabpanel"
        >
          {activeTab === "config" ? <ConfigCode hero={hero} scenario={scenario} /> : null}
          {activeTab === "weights" ? <RankingWeights /> : null}
          {activeTab === "compliance" ? <BulletList items={complianceNotes} /> : null}
          {activeTab === "assumptions" ? <BulletList items={assumptions} /> : null}
        </div>
      </div>
    </section>
  );
}

function ConfigCode({ hero, scenario }: ImplementationDetailsTabsProps) {
  return (
    <pre className="scrollbar-none overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-6 text-yes-muted">
      {formatScenarioConfig(hero, scenario)}
    </pre>
  );
}

function RankingWeights() {
  const weights = Object.entries(denmarkRankingConfig.factorWeights) as Array<
    [RankingFactor, number]
  >;

  return (
    <div className="space-y-2">
      {weights.map(([factor, weight]) => {
        const percent = Math.round(weight * 100);

        return (
          <div key={factor} className="grid gap-1">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-yes-mist">{rankingFactorLabels[factor]}</span>
              <span className="font-mono font-black text-yes-green">{percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-yes-ink">
              <div className="h-full rounded-full bg-yes-green" style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-5 text-yes-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yes-green" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function formatScenarioConfig(hero: HeroDecision, scenario: Scenario) {
  const extraRows =
    scenario.id === "daily-picks-available"
      ? ['  rewardType: "promotion-card",']
      : scenario.id === "jackpot-event-available"
        ? ['  jackpotPool: "yes-pots",']
        : [];

  return [
    "{",
    '  market: "DK",',
    `  scenarioId: "${scenario.id}",`,
    `  layoutMode: "${hero.layoutMode}",`,
    `  heroType: "${hero.heroType}",`,
    `  heroPlacement: "${hero.heroPlacement}",`,
    ...extraRows,
    "  hardFilters: [",
    '    "DK eligible",',
    '    "mobile ready",',
    '    "DKK supported",',
    '    "RG eligible",',
    '    "crash excluded"',
    "  ]",
    "}",
  ].join("\n");
}
