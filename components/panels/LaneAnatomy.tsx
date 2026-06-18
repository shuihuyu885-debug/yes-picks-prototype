import { clsx } from "clsx";
import type { HeroDecision, RankedGame, Scenario } from "@/lib/types";

type LaneAnatomyProps = {
  hero: HeroDecision;
  rankedGames: RankedGame[];
  scenario: Scenario;
};

export function LaneAnatomy({ hero, rankedGames, scenario }: LaneAnatomyProps) {
  const hasHero = hero.heroType !== "none";
  const compactLabels = getCompactLabels(scenario, rankedGames);

  return (
    <section aria-labelledby="lane-anatomy-title" className="space-y-2">
      <h2
        id="lane-anatomy-title"
        className="text-base font-black uppercase tracking-[0.12em] text-yes-green"
      >
        Lane Anatomy
      </h2>

      <div className="overflow-hidden rounded-lg border border-yes-line bg-[#222] p-2">
        <div className="flex gap-1.5 overflow-hidden">
          {hasHero ? <AnatomyHero hero={hero} /> : null}

          <div
            className={clsx(
              "grid grid-flow-col grid-rows-2 gap-1.5",
              hasHero ? "w-max" : "w-full auto-cols-fr",
            )}
          >
            {compactLabels.map((label, index) => (
              <AnatomyCompactTile
                key={`${label}-${index}`}
                label={label}
                showBadge={hasHero && [0, 3, 5].includes(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnatomyHero({ hero }: { hero: HeroDecision }) {
  const label =
    hero.heroType === "daily-picks"
      ? "Daily Picks"
      : hero.heroType === "jackpot-pool"
        ? "Yes Pots"
        : "Promoted Game";

  return (
    <div className="relative h-[120px] w-[112px] shrink-0 rounded-md bg-[#8c96a1] p-2 text-white">
      <div className="absolute left-0 top-0 h-8 w-7 bg-white text-center text-[0.42rem] font-black uppercase leading-8 text-black shadow-sm">
        {hero.heroType === "featured-game" ? "New" : "Hero"}
      </div>
      <div className="flex h-full flex-col justify-end gap-2 pt-8">
        <p className="text-center text-[0.68rem] font-semibold italic leading-3">{label}</p>
        <div className="flex items-center gap-1">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white/40 text-[0.65rem] font-black">
            i
          </span>
          <span className="flex h-5 flex-1 items-center justify-center rounded-sm border border-white bg-[#4a5259] text-[0.52rem] font-black uppercase">
            CTA
          </span>
        </div>
      </div>
    </div>
  );
}

function AnatomyCompactTile({ label, showBadge }: { label: string; showBadge: boolean }) {
  return (
    <div className="relative h-[57px] min-w-[56px] rounded-md bg-[#8c96a1] text-center text-white">
      {showBadge ? (
        <div className="absolute inset-x-0 top-0 flex h-3 items-center justify-center rounded-t-md bg-[#4a5259] text-[0.4rem]">
          yes Exclusive
        </div>
      ) : null}
      <div className="flex h-full items-center justify-center px-1.5 pt-1">
        <p className="line-clamp-3 text-[0.48rem] font-semibold italic leading-[0.6rem]">
          {label}
        </p>
      </div>
    </div>
  );
}

function getCompactLabels(scenario: Scenario, rankedGames: RankedGame[]) {
  if (scenario.id === "returning-player") {
    return [
      "Recently Played 1",
      "Recently Played 2",
      "Similar Game",
      "Top Local",
      "Live Casino",
      "Table Game",
      "New Game",
      "Tier 2 Game",
    ];
  }

  if (scenario.id === "jackpot-event-available") {
    return [
      "Linked Game 1",
      "Linked Game 2",
      "Linked Game 3",
      "Linked Game 4",
      "Top Local",
      "Table Game",
      "Tier 2 Game",
      "New Game",
    ];
  }

  return rankedGames
    .slice(0, 8)
    .map((game, index) => getWireframeLabel(game, index, scenario.id === "daily-picks-available"));
}

function getWireframeLabel(game: RankedGame, index: number, isDailyPicks: boolean) {
  if (isDailyPicks && game.isRecentlyPlayed) {
    return "Recently Played";
  }

  if (index === 0 || game.isExclusive) {
    return "Exclusive Tier 1";
  }

  if (index === 1) {
    return "Top Local";
  }

  if (game.category === "live" || game.category === "table") {
    return "Top Global Table";
  }

  return game.isNew ? "New Game" : "Tier 2 Game";
}
