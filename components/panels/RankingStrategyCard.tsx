const stageOnePriorities = [
  "Promoted Games / Event",
  "Recently Played (1-2 tiles)",
  "Exclusive Tier 1 Game",
  "Top Local-Market - e.g. Big Bass Splash",
  "Top Global - Cash Eruption, Huff N Puff",
  "Top Global Table / Live - Lightning Roulette, Live Blackjack",
  "New Game",
];

const stageTwoPriorities = [
  "Promoted Games / Event",
  "Recently Played (1-2 tiles)",
  "Exclusive Games",
  "New Game",
  "Top Local-Market - e.g. Big Bass Splash",
  "Top Global - Cash Eruption, Huff N Puff",
  "Top Global Table / Live - Lightning Roulette, Live Blackjack",
];

export function RankingStrategyCard() {
  return (
    <section aria-label="Ranking strategy by product stage" className="space-y-2">
      <div className="grid gap-2">
        <StrategyStageCard
          title="Stage 1 - Drive lobby engagement"
          priorities={stageOnePriorities}
        />
        <StrategyStageCard
          title="Stage 2 - Balance revenue & engagement"
          priorities={stageTwoPriorities}
        />
      </div>

      <p className="rounded-md border border-yes-line bg-yes-ink p-3 text-sm leading-5 text-yes-mist">
        Final ordering responds to live data and business strategy. If Live Casino becomes a
        stronger preference, the lane increases Live Casino exposure while keeping portfolio
        balance and RG guardrails.
      </p>
    </section>
  );
}

function StrategyStageCard({
  priorities,
  title,
}: {
  priorities: string[];
  title: string;
}) {
  return (
    <article className="rounded-lg border border-yes-line bg-yes-panel p-3">
      <h4 className="text-sm font-bold leading-5 text-yes-mist">{title}</h4>
      <ul className="mt-3 space-y-2">
        {priorities.map((priority) => (
          <li key={priority} className="flex gap-2 text-sm leading-5 text-yes-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yes-green" aria-hidden="true" />
            <span>{priority}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
