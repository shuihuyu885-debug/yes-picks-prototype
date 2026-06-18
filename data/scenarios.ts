import type { Scenario } from "@/lib/types";

export const scenarios: Scenario[] = [
  {
    key: "new-player",
    label: "New Player",
    shortLabel: "Safer discovery mix",
    description:
      "Prioritises low-stakes, familiar categories and avoids promotional pressure while the player is still early in their lifecycle.",
    playerState: "New account with limited gameplay history.",
    strategy: "Introduce the breadth of the lobby with low-stakes slots and simple instant games.",
    heroSignal: "player",
    weightedTags: ["new-player", "low-volatility", "popular"],
    categoryBoosts: { slot: 3, instant: 2, live: 1, table: 1 },
  },
  {
    key: "returning-player",
    label: "Returning Player",
    shortLabel: "Personalised favourites",
    description:
      "Uses known preferences to lift familiar categories while preserving some discovery slots in the lane.",
    playerState: "Known player with previous interest in live and table formats.",
    strategy: "Balance returning favourites with one or two broader discovery picks.",
    heroSignal: "player",
    weightedTags: ["returning-player", "popular", "live", "table"],
    categoryBoosts: { live: 3, table: 3, slot: 1, instant: 1 },
  },
  {
    key: "daily-picks",
    label: "Daily Picks Available",
    shortLabel: "Reward card first",
    description:
      "Places Daily Picks as a reward or promotion card before standard game tiles, keeping it separate from normal game ranking.",
    playerState: "Eligible player with a Daily Picks card available.",
    strategy: "Surface the reward card without making a real-money outcome claim.",
    heroSignal: "reward",
    weightedTags: ["daily-picks", "short-session", "popular"],
    categoryBoosts: { instant: 3, slot: 2, live: 1, table: 1 },
    flags: { dailyPicksAvailable: true },
  },
  {
    key: "jackpot-event",
    label: "Jackpot Event Available",
    shortLabel: "Event-led hero",
    description:
      "Promotes an available jackpot event as the hero state, while still showing a compliant mix of other in-scope game categories.",
    playerState: "Any eligible player during a configured jackpot event window.",
    strategy: "Lead with the event state, then rank relevant jackpot and popular games.",
    heroSignal: "event",
    weightedTags: ["jackpot", "popular", "returning-player"],
    categoryBoosts: { slot: 3, live: 1, table: 1, instant: 1 },
    flags: { jackpotEventAvailable: true },
  },
  {
    key: "balanced-grid",
    label: "Balanced Grid / No Hero State",
    shortLabel: "Neutral lane",
    description:
      "Falls back to a balanced content mix when there is no strong player, reward or event signal.",
    playerState: "No dominant state signal available.",
    strategy: "Use a balanced mix across slots, table, live and instant games.",
    heroSignal: "none",
    weightedTags: ["popular"],
    categoryBoosts: { slot: 2, live: 2, table: 2, instant: 2 },
    flags: { suppressHero: true },
  },
];
