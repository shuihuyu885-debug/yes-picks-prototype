export type GameCategory = "slot" | "live" | "table" | "instant" | "jackpot" | "reward";

export type Market = "DK";

export type PlayerType = "new" | "returning";

export type ScenarioId =
  | "new-player"
  | "returning-player"
  | "daily-picks-available"
  | "jackpot-event-available"
  | "balanced-carousel";

export type HeroType = "featured-game" | "daily-picks" | "jackpot-pool" | "none";

export type LayoutMode = "hero-carousel" | "balanced-carousel";

export type HeroPlacement = "first-carousel-item" | "none";

export type Volatility = "low" | "medium" | "high";

export type SessionFit = "quick" | "standard" | "immersive";

export type RankingFactor =
  | "playerRelevance"
  | "localMarketPerformance"
  | "businessPriority"
  | "liveAvailability"
  | "freshness"
  | "portfolioBalance";

export type Game = {
  id: string;
  title: string;
  category: GameCategory;
  provider: string;
  marketEligibility: Market[];
  tags: string[];
  isExclusive: boolean;
  isNew: boolean;
  isPromoted: boolean;
  isRecentlyPlayed: boolean;
  isJackpotLinked: boolean;
  jackpotPoolId?: string;
  volatility: Volatility;
  sessionFit: SessionFit;
  mobileReady: boolean;
  dkkSupported: boolean;
  rgEligible: boolean;
  mockPrizeLabel?: string;
  whyLabel: string;
};

export type Scenario = {
  id: ScenarioId;
  playerType: PlayerType;
  heroType: HeroType;
  layoutMode: LayoutMode;
  heroPlacement: HeroPlacement;
  title: string;
  purpose: string;
  heroCopy?: string;
  safeCopy?: string[];
  annotation: string;
  preferredTags: string[];
  preferredCategories: GameCategory[];
  heroGameId?: string;
  jackpotPoolId?: string;
};

export type RankingConfig = {
  market: Market;
  hardFilters: string[];
  factorWeights: Record<RankingFactor, number>;
  note: string;
};

export type HeroDecision = {
  scenarioId: ScenarioId;
  heroType: HeroType;
  layoutMode: LayoutMode;
  heroPlacement: HeroPlacement;
  decisionReason: string;
  heroGameId?: string;
  heroTitle?: string;
  heroCopy?: string;
  safeCopy?: string[];
  jackpotPoolId?: string;
};

export type ComplianceNote = {
  id: string;
  title: string;
  detail: string;
};

export type RankedGame = Game & {
  score: number;
  factorScores: Record<RankingFactor, number>;
  reasons: string[];
};
