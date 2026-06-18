import { denmarkRankingConfig } from "@/data/ranking";
import {
  formatHeroPlacement,
  formatHeroType,
  hardFilterLabels,
} from "@/components/panels/reviewContent";
import type { HeroDecision, Scenario } from "@/lib/types";

type CompactConfigSummaryProps = {
  hero: HeroDecision;
  scenario: Scenario;
};

export function CompactConfigSummary({ hero, scenario }: CompactConfigSummaryProps) {
  const configRows = [
    ["market", denmarkRankingConfig.market],
    ["scenario id", scenario.id],
    ["layout mode", scenario.layoutMode],
    ["hero type", formatHeroType(hero.heroType)],
    ["hero placement", formatHeroPlacement(hero.heroPlacement)],
  ];

  return (
    <section className="rounded-lg border border-yes-line bg-yes-panel p-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-yes-muted">Config</p>
      <div className="mt-2 grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2">
        {configRows.map(([label, value]) => (
          <div key={label} className="flex min-w-0 items-baseline justify-between gap-3">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.06em] text-yes-muted">
              {label}
            </span>
            <span className="truncate font-mono text-xs font-semibold text-yes-mist">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {hardFilterLabels.map((filter) => (
          <span
            key={filter}
            className="rounded-full border border-yes-green/30 bg-yes-green/10 px-2 py-1 text-xs font-semibold text-yes-green"
          >
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
}
