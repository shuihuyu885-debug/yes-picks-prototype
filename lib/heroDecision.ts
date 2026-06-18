import { games } from "@/data/games";
import type { HeroDecision, Scenario } from "@/lib/types";

export function getHeroDecision(scenario: Scenario): HeroDecision {
  if (scenario.id === "daily-picks-available") {
    return {
      scenarioId: scenario.id,
      heroType: "daily-picks",
      layoutMode: "hero-carousel",
      heroPlacement: "first-carousel-item",
      decisionReason: "Daily Picks is available, so the reward card becomes the first carousel item.",
      heroGameId: scenario.heroGameId,
      heroTitle: getHeroTitle(scenario.heroGameId),
      heroCopy: scenario.heroCopy,
      safeCopy: scenario.safeCopy,
    };
  }

  if (scenario.id === "jackpot-event-available") {
    return {
      scenarioId: scenario.id,
      heroType: "jackpot-pool",
      layoutMode: "hero-carousel",
      heroPlacement: "first-carousel-item",
      decisionReason:
        "A configured jackpot pool event is active, so the pool tile leads the carousel.",
      heroGameId: scenario.heroGameId,
      heroTitle: getHeroTitle(scenario.heroGameId),
      heroCopy: scenario.heroCopy,
      jackpotPoolId: scenario.jackpotPoolId,
    };
  }

  if (scenario.id === "new-player") {
    return {
      scenarioId: scenario.id,
      heroType: "featured-game",
      layoutMode: "hero-carousel",
      heroPlacement: "first-carousel-item",
      decisionReason:
        "A cold-start player signal is strong enough to feature a simple starting point.",
      heroGameId: scenario.heroGameId,
      heroTitle: getHeroTitle(scenario.heroGameId),
      heroCopy: scenario.heroCopy,
    };
  }

  return {
    scenarioId: scenario.id,
    heroType: "none",
    layoutMode: "balanced-carousel",
    heroPlacement: "none",
    decisionReason:
      "No strong player, commercial or event signal is present, so the lane becomes a balanced carousel.",
  };
}

function getHeroTitle(heroGameId: string | undefined) {
  return games.find((game) => game.id === heroGameId)?.title;
}
