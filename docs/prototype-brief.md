# Prototype Brief

## Concept Summary

Yes Picks is a dynamic, state-based casino lobby lane. The lane changes its hero tile, game ordering and content mix based on player state, live data, business strategy and special event states. The goal is to reduce lobby decision friction while giving the operator a configurable way to balance player relevance, content priority, market performance and responsible-gambling guardrails.

The prototype is designed around an iPhone 16 Pro Max lobby preview: 440px wide by 956px high. Desktop space is reserved for scenario controls and annotation panels.

## Five Scenarios

- New Player: uses a featured-game hero tile to reduce first-visit decision friction.
- Returning Player: removes the hero tile and uses a balanced carousel so resume and discovery signals do not over-dominate the lane.
- Daily Picks Available: uses a Daily Picks reward/promotion tile as the first carousel item with key conditions visible.
- Jackpot Event Available: uses a jackpot-pool tile as the first carousel item and groups linked games without urgency or winning claims.
- Balanced Carousel: removes the hero tile when no strong player, commercial or event signal exists.

## Hero Tile Types

- Featured Game: used for the new-player cold-start state.
- Daily Picks: treated as a reward/promotion card, not a normal game tile.
- Jackpot Pool: groups multiple eligible games linked to the same mock jackpot pool.
- None: collapses the lane into a balanced two-row carousel.

## Carousel Layout Logic

Yes Picks is a horizontal mobile carousel, not a static grid.

Hero Carousel mode places one large hero tile as the first item inside the carousel. Compact game cards then follow in a two-row horizontal carousel.

Balanced Carousel mode removes the hero tile. The lane becomes a two-row horizontal carousel of equal-weight compact game cards.

## Ranking Logic

The Denmark ranking config applies hard filters before scoring:

- Market eligibility includes DK.
- Mobile-ready games only.
- DKK-supported games only.
- Responsible-gambling eligible games only.
- Crash games are excluded.

Mock ranking factors:

- Player relevance: 0.30
- Local market performance: 0.25
- Business priority: 0.15
- Live availability: 0.10
- Freshness: 0.10
- Portfolio balance: 0.10

Final ordering should respond to live data and business strategy. If Live Casino becomes a stronger player preference, the lane should increase Live Casino exposure while maintaining portfolio balance and responsible-gambling guardrails.

## Compliance Assumptions

- No crash games are included.
- No copy implies increased chances of winning.
- Bonus and reward states show key conditions.
- Denmark-facing examples use DKK localisation.
- Responsible-gambling controls and eligibility checks are respected.
- Daily Picks is a reward/promotion state, not a normal game recommendation.

## Measurement Hypothesis

For mobile casino players in Denmark, a state-based Yes Picks carousel will increase lane-attributed game launches within 60 seconds compared with a static generic game row, without worsening responsible-gambling guardrail indicators.

Primary metric: Lane-attributed game launch conversion within 60 seconds of lobby view.

Guardrails:

- No crash games.
- No misleading winning claims.
- Bonus/reward states show key conditions.
- DKK market localisation.
- Responsible-gambling controls respected.
