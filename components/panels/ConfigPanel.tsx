import { denmarkRankingConfig } from "@/data/ranking";
import type { HeroDecision, Scenario } from "@/lib/types";

type ConfigPanelProps = {
  hero: HeroDecision;
  scenario: Scenario;
};

const hardFilters = [
  "Denmark eligible",
  "Mobile ready",
  "DKK supported",
  "RG eligible",
  "Crash excluded",
];

const rankingFactors = [
  "Player relevance",
  "Local market performance",
  "Business/editorial priority",
  "Live availability",
  "Freshness",
  "Portfolio balance",
];

export function ConfigPanel({ hero, scenario }: ConfigPanelProps) {
  const configRows = [
    ["activeScenarioId", scenario.id],
    ["heroType", hero.heroType],
    ["layoutMode", scenario.layoutMode],
    ["heroPlacement", scenario.heroPlacement],
    ["playerType", scenario.playerType],
    ["market", denmarkRankingConfig.market],
  ];

  return (
    <section className="rounded-lg border border-yes-line bg-yes-panel p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-yes-teal">
        Config
      </p>
      <h2 className="mt-1 text-lg font-semibold text-yes-mist">Scenario configuration</h2>

      <div className="mt-4 rounded-lg border border-yes-line bg-yes-ink p-3 font-mono text-xs leading-6 text-yes-muted">
        {"{"}
        {configRows.map(([key, value]) => (
          <div key={key} className="pl-3">
            <span className="text-yes-green">{JSON.stringify(key)}</span>:{" "}
            {JSON.stringify(value)},
          </div>
        ))}
        {"}"}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ListBlock title="Hard filters" items={hardFilters} />
        <ListBlock title="Ranking factors" items={rankingFactors} />
      </div>

      <p className="mt-4 rounded-lg border border-yes-line bg-yes-ink p-3 text-sm leading-6 text-yes-muted">
        {denmarkRankingConfig.note}
      </p>
    </section>
  );
}

function ListBlock({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-yes-mist">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm text-yes-muted">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
