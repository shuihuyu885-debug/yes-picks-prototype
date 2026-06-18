import { games } from "@/data/games";
import { scenarios } from "@/data/scenarios";
import type { Game, RankedGame, RankingConfig, RankingFactor, Scenario, ScenarioId } from "@/lib/types";

const excludedCategories = new Set<string>(["crash"]);

const factorOrder: RankingFactor[] = [
  "playerRelevance",
  "localMarketPerformance",
  "businessPriority",
  "liveAvailability",
  "freshness",
  "portfolioBalance",
];

export const denmarkRankingConfig: RankingConfig = {
  market: "DK",
  hardFilters: [
    'marketEligibility includes "DK"',
    "mobileReady is true",
    "dkkSupported is true",
    "rgEligible is true",
    "category is not crash",
  ],
  factorWeights: {
    playerRelevance: 0.3,
    localMarketPerformance: 0.25,
    businessPriority: 0.15,
    liveAvailability: 0.1,
    freshness: 0.1,
    portfolioBalance: 0.1,
  },
  note:
    "Final ordering should respond to live data and business strategy. If Live Casino becomes a stronger player preference, the lane should increase Live Casino exposure while maintaining portfolio balance and responsible-gambling guardrails.",
};

export function getScenarioById(scenarioId: ScenarioId): Scenario {
  const scenario = scenarios.find((item) => item.id === scenarioId);

  if (!scenario) {
    throw new Error(`Unknown scenario: ${scenarioId}`);
  }

  return scenario;
}

export function getGamesForScenario(scenarioId: ScenarioId): RankedGame[] {
  const scenario = getScenarioById(scenarioId);
  const heroGame = getHeroGameForScenario(scenarioId);
  const supportingGames = getSupportingGamesForScenario(scenarioId);

  if (!heroGame) {
    return supportingGames;
  }

  return [rankGame(heroGame, scenario), ...supportingGames];
}

export function getHeroGameForScenario(scenarioId: ScenarioId): Game | undefined {
  const scenario = getScenarioById(scenarioId);

  if (scenario.heroType === "none" || !scenario.heroGameId) {
    return undefined;
  }

  return games.find((game) => game.id === scenario.heroGameId && passesHardFilters(game));
}

export function getSupportingGamesForScenario(scenarioId: ScenarioId): RankedGame[] {
  const scenario = getScenarioById(scenarioId);
  const heroGame = getHeroGameForScenario(scenarioId);
  const eligibleGames = games.filter((game) => {
    if (!passesHardFilters(game)) {
      return false;
    }

    if (game.id === heroGame?.id) {
      return false;
    }

    if (game.category === "reward" || game.category === "jackpot") {
      return false;
    }

    return true;
  });

  return rankGames(eligibleGames, scenario);
}

export function rankGames(candidateGames: Game[], scenario: Scenario): RankedGame[] {
  return candidateGames
    .map((game) => rankGame(game, scenario))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function rankGame(game: Game, scenario: Scenario): RankedGame {
  const factorScores = getFactorScores(game, scenario);
  const weightedScore = factorOrder.reduce((score, factor) => {
    return score + factorScores[factor] * denmarkRankingConfig.factorWeights[factor];
  }, 0);
  const score = Math.round(weightedScore);

  return {
    ...game,
    score,
    factorScores,
    reasons: getRankingReasons(game, scenario, factorScores),
  };
}

function passesHardFilters(game: Game) {
  return (
    game.marketEligibility.includes("DK") &&
    game.mobileReady &&
    game.dkkSupported &&
    game.rgEligible &&
    !excludedCategories.has(game.category)
  );
}

function getFactorScores(game: Game, scenario: Scenario): Record<RankingFactor, number> {
  const tagMatches = scenario.preferredTags.filter((tag) => game.tags.includes(tag)).length;
  const categoryRank = scenario.preferredCategories.indexOf(game.category);
  const categoryMatch = categoryRank >= 0;
  const isJackpotScenario = scenario.id === "jackpot-event-available";

  return {
    playerRelevance: clampScore(
      35 +
        tagMatches * 18 +
        (scenario.playerType === "new" && game.volatility !== "high" ? 12 : 0) +
        (scenario.playerType === "returning" && game.isRecentlyPlayed ? 22 : 0) +
        (game.sessionFit === "quick" ? 6 : 0),
    ),
    localMarketPerformance: clampScore(
      55 +
        (game.marketEligibility.includes("DK") ? 18 : 0) +
        (game.dkkSupported ? 12 : 0) +
        (game.category === "slot" ? 8 : 0) +
        (game.category === "live" ? 6 : 0),
    ),
    businessPriority: clampScore(
      35 +
        (game.isPromoted ? 24 : 0) +
        (game.isExclusive ? 12 : 0) +
        (isJackpotScenario && game.jackpotPoolId === scenario.jackpotPoolId ? 24 : 0),
    ),
    liveAvailability: game.category === "live" ? 90 : game.category === "table" ? 58 : 40,
    freshness: clampScore(40 + (game.isNew ? 35 : 0) + (game.isRecentlyPlayed ? 12 : 0)),
    portfolioBalance: clampScore(categoryMatch ? 82 - categoryRank * 6 : 44),
  };
}

function getRankingReasons(
  game: Game,
  scenario: Scenario,
  factorScores: Record<RankingFactor, number>,
) {
  const reasons = [game.whyLabel];

  if (game.isRecentlyPlayed) {
    reasons.push("recently played");
  }

  if (game.isPromoted) {
    reasons.push("business priority");
  }

  if (scenario.id === "jackpot-event-available" && game.jackpotPoolId === scenario.jackpotPoolId) {
    reasons.push("same jackpot pool");
  }

  if (factorScores.portfolioBalance >= 70) {
    reasons.push("portfolio balance");
  }

  return reasons;
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, score));
}
