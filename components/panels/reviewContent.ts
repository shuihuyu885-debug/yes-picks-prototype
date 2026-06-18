import type { HeroPlacement, HeroType, LayoutMode, ScenarioId } from "@/lib/types";

export type ReviewCopy = {
  playerState: string;
  whyLane: string;
  carouselChanges: string;
  rankingLogic: string;
  complianceNote: string;
};

export const scenarioReviewCopy: Record<ScenarioId, ReviewCopy> = {
  "new-player": {
    playerState: "No player history",
    whyLane:
      "Cold-start logic uses local market performance, category balance and mobile readiness.",
    carouselChanges: "Hero carousel with a featured first tile and compact supporting games.",
    rankingLogic:
      "Local performance, mobile readiness and portfolio balance carry more weight without behavioural history.",
    complianceNote:
      "Copy avoids increased-chance claims and frames the first tile as an editorial starting point.",
  },
  "returning-player": {
    playerState: "Returning player with recent game signals",
    whyLane:
      "Recently played and similarity signals guide ordering, but no next-best-action is strong enough for a hero.",
    carouselChanges: "Balanced carousel with recently played games appearing first.",
    rankingLogic:
      "Recently played, similar categories and live availability lift familiar games while preserving variety.",
    complianceNote:
      "No urgency language is used and the lane avoids presenting one game as a stronger outcome.",
  },
  "daily-picks-available": {
    playerState: "Returning player with a reward state available",
    whyLane: "Daily Picks is treated as a reward card, not a standard game recommendation tile.",
    carouselChanges: "Hero carousel with Daily Picks first and eligible games as supporting tiles.",
    rankingLogic:
      "The reward state receives hero priority while supporting games stay governed by eligibility and relevance.",
    complianceNote:
      "Key conditions are visible at first presentation and copy avoids aggressive free or win language.",
  },
  "jackpot-event-available": {
    playerState: "Returning player during a jackpot pool event",
    whyLane: "The jackpot pool is the proposition, not one individual game.",
    carouselChanges:
      "Hero carousel with the Yes Pots tile first, then games linked to the same pool.",
    rankingLogic:
      "Same-pool games are prioritised first, then the lane fills with eligible ranked games.",
    complianceNote:
      "The tile avoids urgency, due-to-drop language and claims about likelihood of winning.",
  },
};

export const hardFilterLabels = [
  "DK eligible",
  "Mobile ready",
  "DKK supported",
  "RG eligible",
  "Crash excluded",
];

export const guardrailLabels = [
  "RG indicators",
  "Misleading claims",
  "Crash exclusion",
  "DKK localisation",
];

export const rankingFactorLabels = {
  playerRelevance: "Player relevance",
  localMarketPerformance: "Local market performance",
  businessPriority: "Business/editorial priority",
  liveAvailability: "Live availability",
  freshness: "Freshness",
  portfolioBalance: "Portfolio balance",
};

export function formatHeroType(heroType: HeroType) {
  const labels: Record<HeroType, string> = {
    "featured-game": "Featured Game",
    "daily-picks": "Daily Picks",
    "jackpot-pool": "Jackpot Pool",
    none: "No hero",
  };

  return labels[heroType];
}

export function formatLayoutMode(layoutMode: LayoutMode) {
  const labels: Record<LayoutMode, string> = {
    "hero-carousel": "Hero Carousel",
    "balanced-carousel": "No Hero Carousel",
  };

  return labels[layoutMode];
}

export function formatHeroPlacement(heroPlacement: HeroPlacement) {
  const labels: Record<HeroPlacement, string> = {
    "first-carousel-item": "First carousel item",
    none: "None",
  };

  return labels[heroPlacement];
}
