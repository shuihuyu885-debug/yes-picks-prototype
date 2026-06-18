# AGENTS.md

- Prioritise clear prototype behaviour over production complexity.
- Keep the UI mobile-first and optimised for an iPhone-sized lobby preview.
- Use mock data only.
- Do not connect to any real gambling backend.
- Avoid claims that imply increased chances of winning.
- Denmark market assumptions:
  - slots, table, live and instant games are in scope;
  - crash games are excluded;
  - bonuses are heavily restricted;
  - responsible-gambling guardrails are mandatory;
  - use DKK for Denmark-facing examples.
- Daily Picks should be treated as a reward/promotion card, not a normal game tile.
- The hero tile should only appear when there is a strong player, commercial or event signal.
- Yes Picks is a horizontal mobile carousel, not a static grid.
- The hero tile, when present, should be the first carousel item.
- If no signal is strong enough, the lane should collapse into a balanced two-row carousel.
- Run `npm run build`, or the closest equivalent validation command, before completing each major implementation step.
