import type { Scenario } from "@/lib/types";

export const scenarios: Scenario[] = [
  {
    id: "new-player",
    playerType: "new",
    heroType: "featured-game",
    layoutMode: "hero-carousel",
    heroPlacement: "first-carousel-item",
    title: "New Player",
    purpose: "Reduce decision friction for a first lobby visit.",
    heroCopy: "Best place to start",
    annotation:
      "Cold-start recommendation logic favours mobile-ready, DKK-supported games with simple session fit and broad category familiarity.",
    preferredTags: ["cold-start", "low-friction", "featured"],
    preferredCategories: ["slot", "instant", "table"],
    heroGameId: "cash-eruption",
  },
  {
    id: "returning-player",
    playerType: "returning",
    heroType: "none",
    layoutMode: "balanced-carousel",
    heroPlacement: "none",
    title: "Returning Player",
    purpose: "Help player resume or discover without unnecessary hero dominance.",
    annotation:
      "Recently played and relevance signals lift familiar live and table formats, but no single signal is strong enough to dominate the lane.",
    preferredTags: ["returning", "recently-played", "live"],
    preferredCategories: ["live", "table", "slot", "instant"],
  },
  {
    id: "daily-picks-available",
    playerType: "returning",
    heroType: "daily-picks",
    layoutMode: "hero-carousel",
    heroPlacement: "first-carousel-item",
    title: "Daily Picks",
    purpose: "Show reward/promotion state with clear key conditions.",
    heroCopy: "6 daily picks available today",
    safeCopy: ["6 daily picks available today", "First deposit required", "Prize cap applies", "Terms apply"],
    annotation:
      "Daily Picks appears as a reward/promotion card before compact game cards. It is not ranked as a normal game tile.",
    preferredTags: ["daily-picks", "promotion-state", "returning"],
    preferredCategories: ["instant", "slot", "live", "table"],
    heroGameId: "daily-picks",
  },
  {
    id: "jackpot-event-available",
    playerType: "returning",
    heroType: "jackpot-pool",
    layoutMode: "hero-carousel",
    heroPlacement: "first-carousel-item",
    title: "Jackpot Event",
    purpose: "Group multiple games linked to the same jackpot pool.",
    heroCopy: "Yes Pots linked games",
    annotation:
      "The event state groups eligible jackpot-linked games without urgency language or claims about likelihood of winning.",
    preferredTags: ["jackpot-pool", "event-support", "returning"],
    preferredCategories: ["slot", "live", "table", "instant"],
    heroGameId: "yes-pots",
    jackpotPoolId: "yes-pots",
  },
];
