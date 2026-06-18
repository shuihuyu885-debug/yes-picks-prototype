import type { HeroDecision, RankedGame, Scenario } from "@/lib/types";

type LogicPanelProps = {
  hero: HeroDecision;
  rankedGames: RankedGame[];
  scenario: Scenario;
};

export function LogicPanel({ hero, rankedGames, scenario }: LogicPanelProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <section className="rounded-lg border border-yes-line bg-yes-panel p-4">
        <h2 className="text-base font-semibold text-yes-mist">Scenario logic</h2>
        <p className="mt-2 text-sm leading-6 text-yes-muted">{scenario.purpose}</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-yes-mist">Player state</dt>
            <dd className="mt-1 text-yes-muted">{scenario.playerType}</dd>
          </div>
          <div>
            <dt className="font-medium text-yes-mist">Carousel layout</dt>
            <dd className="mt-1 text-yes-muted">
              {scenario.layoutMode} / {scenario.heroPlacement}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-yes-mist">Hero state</dt>
            <dd className="mt-1 text-yes-muted">
              {hero.heroType === "none" ? "No hero. Show balanced carousel." : hero.decisionReason}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-yes-mist">Annotation</dt>
            <dd className="mt-1 text-yes-muted">{scenario.annotation}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-yes-line bg-yes-panel p-4">
        <h2 className="text-base font-semibold text-yes-mist">Ranking preview</h2>
        <ol className="mt-3 space-y-3">
          {rankedGames.slice(0, 5).map((game) => (
            <li key={game.id} className="rounded-lg border border-yes-line bg-yes-ink p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-yes-mist">{game.title}</p>
                  <p className="mt-1 text-xs text-yes-muted">{game.reasons.join(" · ")}</p>
                </div>
                <span className="rounded-full bg-yes-green/15 px-2 py-1 text-xs font-semibold text-yes-green">
                  {game.score}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
