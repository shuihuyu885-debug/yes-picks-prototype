import type { Game, RankedGame, Scenario } from "@/lib/types";

export function rankGames(games: Game[], scenario: Scenario): RankedGame[] {
  return games
    .map((game) => {
      const tagScore = scenario.weightedTags.reduce((score, tag) => {
        return score + (game.tags.includes(tag) ? 8 : 0);
      }, 0);
      const categoryScore = scenario.categoryBoosts[game.category] ?? 0;
      const jackpotScore = scenario.flags?.jackpotEventAvailable && game.isJackpot ? 10 : 0;
      const lowStakeScore = game.minStakeDkk <= 2 ? 3 : 0;
      const score = 40 + tagScore + categoryScore + jackpotScore + lowStakeScore;

      return {
        ...game,
        score,
        reasons: [
          categoryScore > 1 ? `${game.category} mix` : "category coverage",
          tagScore > 0 ? "scenario tag match" : "discovery slot",
          lowStakeScore > 0 ? "low DKK entry" : "standard stake",
        ],
      };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
