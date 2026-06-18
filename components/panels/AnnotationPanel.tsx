import type { HeroDecision, RankedGame, Scenario, ScenarioId } from "@/lib/types";

type AnnotationPanelProps = {
  hero: HeroDecision;
  rankedGames: RankedGame[];
  scenario: Scenario;
};

type AnnotationCopy = {
  playerState: string;
  whyLane: string;
  carouselChanges: string;
  rankingLogic: string;
  complianceNote: string;
};

const scenarioCopy: Record<ScenarioId, AnnotationCopy> = {
  "new-player": {
    playerState: "No player history.",
    whyLane:
      "Cold-start logic uses local market performance, category balance, mobile readiness and editorial priority.",
    carouselChanges:
      "Hero Carousel. A featured pick leads the lane, followed by compact supporting tiles.",
    rankingLogic:
      "Local market performance, mobile readiness and portfolio balance carry more weight because there is no behavioural history yet.",
    complianceNote:
      "Copy avoids increased-chance claims and keeps the first recommendation framed as an editorial starting point.",
  },
  "returning-player": {
    playerState: "Returning player with recent game signals.",
    whyLane:
      "Recently played and similarity signals guide ordering, but no next-best-action is strong enough to dominate.",
    carouselChanges:
      "No Hero Carousel. The hero tile is removed and recently played games appear first.",
    rankingLogic:
      "Recently played, similar categories and live availability lift familiar games while preserving category variety.",
    complianceNote:
      "No urgency language is used and the lane avoids pushing one game as a stronger chance outcome.",
  },
  "daily-picks-available": {
    playerState: "Returning player with a reward/promotion state available.",
    whyLane:
      "Daily Picks is treated as a reward card, not a standard game recommendation tile.",
    carouselChanges:
      "Hero Carousel. Daily Picks leads the carousel and eligible game tiles support the state.",
    rankingLogic:
      "The promotion state gets hero priority, while supporting games stay governed by eligibility and relevance filters.",
    complianceNote:
      "Key conditions are visible at first presentation and copy avoids aggressive free or win language.",
  },
  "jackpot-event-available": {
    playerState: "Returning player during a jackpot pool event.",
    whyLane:
      "The jackpot pool is the proposition, not one individual game.",
    carouselChanges:
      "Hero Carousel. The Yes Pots tile leads, followed by games linked to the same pool before other eligible games.",
    rankingLogic:
      "Same-pool games are prioritised first, then the lane fills with eligible games using the normal ranking mix.",
    complianceNote:
      "The tile avoids urgency, due-to-drop language and claims about likelihood of winning.",
  },
};

export function AnnotationPanel({ hero, rankedGames, scenario }: AnnotationPanelProps) {
  const copy = scenarioCopy[scenario.id];

  return (
    <section className="rounded-lg border border-yes-line bg-yes-panel p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-yes-teal">
            Scenario
          </p>
          <h2 className="mt-1 text-lg font-semibold text-yes-mist">{scenario.title}</h2>
        </div>
        <span className="rounded-full bg-yes-teal/15 px-3 py-1 text-xs font-semibold text-yes-teal">
          {hero.heroType === "none" ? "No hero" : "Hero active"}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm">
        <PanelRow label="Player state" value={copy.playerState} />
        <PanelRow label="Why this lane state appears" value={copy.whyLane} />
        <PanelRow label="What changes in the carousel" value={copy.carouselChanges} />
        <PanelRow label="Ranking logic summary" value={copy.rankingLogic} />
        <PanelRow label="Compliance note" value={copy.complianceNote} />
      </dl>

      <div className="mt-4 rounded-lg border border-yes-line bg-yes-ink p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-yes-muted">
          Ranked preview
        </p>
        <ol className="mt-3 space-y-2">
          {rankedGames.slice(0, 4).map((game, index) => (
            <li key={game.id} className="flex items-start justify-between gap-3 text-sm">
              <div>
                <p className="font-semibold text-yes-mist">
                  {index + 1}. {game.title}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-yes-muted">
                  {game.reasons.slice(0, 3).join(" · ")}
                </p>
              </div>
              <span className="rounded-full bg-yes-green/15 px-2 py-1 text-xs font-semibold text-yes-green">
                {game.score}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PanelRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-medium text-yes-mist">{label}</dt>
      <dd className="mt-1 leading-6 text-yes-muted">{value}</dd>
    </div>
  );
}
