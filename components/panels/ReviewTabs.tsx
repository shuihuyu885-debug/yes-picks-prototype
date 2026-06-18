"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { denmarkRankingConfig } from "@/data/ranking";
import {
  formatHeroType,
  formatLayoutMode,
  guardrailLabels,
  hardFilterLabels,
  rankingFactorLabels,
  type ReviewCopy,
  scenarioReviewCopy,
} from "@/components/panels/reviewContent";
import type { HeroDecision, RankedGame, RankingFactor, Scenario } from "@/lib/types";

type ReviewTabsProps = {
  hero: HeroDecision;
  rankedGames: RankedGame[];
  scenario: Scenario;
};

type TabId = "scenario" | "ranking" | "compliance" | "assumptions";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "scenario", label: "Scenario Logic" },
  { id: "ranking", label: "Ranking Config" },
  { id: "compliance", label: "Compliance" },
  { id: "assumptions", label: "Assumptions" },
];

const assumptions = [
  "EveryMatrix provides backend game launch and account flows; this prototype only shows frontend behaviour.",
  "Game and reward data is mocked in TypeScript, with no real gambling backend connected.",
  "Denmark-facing examples use DKK and exclude crash games.",
  "Daily Picks is a reward/promotion state, not a normal ranked game tile.",
  "Hero tiles only appear when a strong player, commercial or event signal is present.",
];

export function ReviewTabs({ hero, rankedGames, scenario }: ReviewTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("scenario");
  const copy = scenarioReviewCopy[scenario.id];

  return (
    <section className="rounded-lg border border-yes-line bg-yes-panel p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-yes-muted">Details</p>
          <h2 className="mt-0.5 text-base font-bold text-yes-mist">Review notes</h2>
        </div>
        <span className="rounded-full bg-yes-ink px-2 py-1 text-xs font-semibold text-yes-muted">
          {scenario.title}
        </span>
      </div>

      <div
        aria-label="Review detail sections"
        className="mt-3 grid gap-1.5 sm:grid-cols-4"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              aria-controls={`review-tabpanel-${tab.id}`}
              aria-selected={isActive}
              className={clsx(
                "min-h-9 rounded-md border px-2 py-1.5 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yes-green",
                isActive
                  ? "border-yes-green bg-yes-green text-yes-ink"
                  : "border-yes-line bg-yes-ink text-yes-mist hover:border-yes-teal",
              )}
              id={`review-tab-${tab.id}`}
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
        aria-labelledby={`review-tab-${activeTab}`}
        className="mt-3 rounded-lg border border-yes-line bg-yes-ink p-3"
        id={`review-tabpanel-${activeTab}`}
        role="tabpanel"
      >
        {activeTab === "scenario" ? (
          <ScenarioLogic copy={copy} hero={hero} rankedGames={rankedGames} />
        ) : null}
        {activeTab === "ranking" ? <RankingConfig /> : null}
        {activeTab === "compliance" ? <Compliance copy={copy} /> : null}
        {activeTab === "assumptions" ? <Assumptions /> : null}
      </div>
    </section>
  );
}

function ScenarioLogic({
  copy,
  hero,
  rankedGames,
}: {
  copy: ReviewCopy;
  hero: HeroDecision;
  rankedGames: RankedGame[];
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_0.85fr]">
      <dl className="grid gap-2 text-sm">
        <DetailRow label="Player state" value={copy.playerState} />
        <DetailRow label="Why this lane state appears" value={copy.whyLane} />
        <DetailRow label="Carousel change" value={copy.carouselChanges} />
        <DetailRow label="Mode" value={`${formatLayoutMode(hero.layoutMode)} · ${formatHeroType(hero.heroType)}`} />
      </dl>

      <div className="rounded-md border border-yes-line bg-yes-panel p-2.5">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-yes-muted">
          Ranked preview
        </p>
        <ol className="mt-2 space-y-1.5">
          {rankedGames.slice(0, 4).map((game, index) => (
            <li key={game.id} className="flex items-start justify-between gap-2 text-xs">
              <div className="min-w-0">
                <p className="truncate font-bold text-yes-mist">
                  {index + 1}. {game.title}
                </p>
                <p className="mt-0.5 line-clamp-2 leading-4 text-yes-muted">
                  {game.reasons.slice(0, 2).join(" · ")}
                </p>
              </div>
              <span className="rounded-full bg-yes-green/15 px-2 py-0.5 font-bold text-yes-green">
                {game.score}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function RankingConfig() {
  const weights = Object.entries(denmarkRankingConfig.factorWeights) as Array<
    [RankingFactor, number]
  >;

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div>
        <h3 className="text-sm font-bold text-yes-mist">Ranking weights</h3>
        <div className="mt-2 space-y-1.5">
          {weights.map(([factor, weight]) => (
            <div key={factor} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-yes-muted">{rankingFactorLabels[factor]}</span>
              <span className="font-mono text-xs font-bold text-yes-mist">{weight}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-yes-mist">Hard filters</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {hardFilterLabels.map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-yes-line bg-yes-panel px-2 py-1 text-xs font-semibold text-yes-muted"
            >
              {filter}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm leading-5 text-yes-muted">{denmarkRankingConfig.note}</p>
      </div>
    </div>
  );
}

function Compliance({ copy }: { copy: ReviewCopy }) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <h3 className="text-sm font-bold text-yes-mist">Scenario note</h3>
        <p className="mt-2 text-sm leading-5 text-yes-muted">{copy.complianceNote}</p>
        <p className="mt-2 text-sm leading-5 text-yes-muted">
          Commercial priority cannot override eligibility, mobile readiness, DKK support or
          responsible-gambling guardrails.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-yes-mist">Guardrails</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {guardrailLabels.map((guardrail) => (
            <span
              key={guardrail}
              className="rounded-full bg-yes-teal/15 px-2 py-1 text-xs font-semibold text-yes-teal"
            >
              {guardrail}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Assumptions() {
  return (
    <ul className="grid gap-2 text-sm leading-5 text-yes-muted">
      {assumptions.map((assumption) => (
        <li key={assumption} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yes-green" aria-hidden="true" />
          <span>{assumption}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.08em] text-yes-muted">{label}</dt>
      <dd className="mt-1 leading-5 text-yes-mist">{value}</dd>
    </div>
  );
}
