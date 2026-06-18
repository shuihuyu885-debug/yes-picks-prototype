export type GameCategory = "slot" | "table" | "live" | "instant";

export type ScenarioKey =
  | "new-player"
  | "returning-player"
  | "daily-picks"
  | "jackpot-event"
  | "balanced-grid";

export type Game = {
  id: string;
  title: string;
  provider: string;
  category: GameCategory;
  minStakeDkk: number;
  tags: string[];
  isJackpot?: boolean;
};

export type RankedGame = Game & {
  score: number;
  reasons: string[];
};

export type Scenario = {
  key: ScenarioKey;
  label: string;
  shortLabel: string;
  description: string;
  playerState: string;
  strategy: string;
  heroSignal: "player" | "commercial" | "reward" | "event" | "none";
  weightedTags: string[];
  categoryBoosts: Record<GameCategory, number>;
  flags?: {
    dailyPicksAvailable?: boolean;
    jackpotEventAvailable?: boolean;
    suppressHero?: boolean;
  };
};

export type HeroDecision =
  | {
      kind: "daily-picks" | "jackpot" | "game";
      title: string;
      description: string;
      ctaLabel: string;
      reason: string;
      gameId?: string;
    }
  | {
      kind: "none";
      title: "Balanced grid";
      description: string;
      reason: string;
    };
