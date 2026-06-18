import type { HeroDecision, RankedGame, Scenario } from "@/lib/types";

export function decideHero(scenario: Scenario, rankedGames: RankedGame[]): HeroDecision {
  if (scenario.heroSignal === "none" || scenario.flags?.suppressHero) {
    return {
      kind: "none",
      title: "Balanced grid",
      description: "No hero tile is shown because there is no strong enough state signal.",
      reason: "No strong player, commercial or event signal is available.",
    };
  }

  if (scenario.flags?.dailyPicksAvailable) {
    return {
      kind: "daily-picks",
      title: "Daily Picks",
      description:
        "Reward or promotion card shown before normal game tiles. It explains availability without implying better winning chances.",
      ctaLabel: "View Daily Picks",
      reason: "Daily Picks availability is a strong reward signal.",
    };
  }

  if (scenario.flags?.jackpotEventAvailable) {
    const jackpotGame = rankedGames.find((game) => game.isJackpot);

    return {
      kind: "jackpot",
      title: jackpotGame ? `${jackpotGame.title} event` : "Jackpot event",
      description:
        "Event-led hero state for an eligible jackpot moment, followed by a compliant content mix.",
      ctaLabel: "View event",
      reason: "Configured jackpot event is active.",
      gameId: jackpotGame?.id,
    };
  }

  const topGame = rankedGames[0];

  return {
    kind: "game",
    title: topGame?.title ?? "Yes Picks",
    description:
      "Top-ranked game selected from a strong player signal, scenario tags, category mix and conservative stake assumptions.",
    ctaLabel: "Open game",
    reason: "Strong player signal allows the highest ranked eligible game to become the hero tile.",
    gameId: topGame?.id,
  };
}
