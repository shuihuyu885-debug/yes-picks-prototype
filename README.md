# yes-picks-prototype

Clickable take-home prototype for a Games Lead role at Yes.

Yes Picks is a dynamic, state-based casino lobby lane for a mobile-first casino lobby. The prototype shows how a configurable lane can change its hero tile, game ordering and content mix based on player type, live data, business strategy and special event states.

This is not production software. It uses mock TypeScript data only, does not connect to a real gambling backend, and is intended to be deployed as a Vercel prototype link.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build validation

```bash
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub, GitLab or Bitbucket.
2. Import the project in Vercel.
3. Use the default Next.js settings.
4. Deploy and submit the Vercel prototype link.

## Key scenarios

- New Player
- Returning Player
- Daily Picks Available
- Jackpot Event Available
- Balanced Carousel / No Hero State

## Intended submission format

Submit a Vercel prototype link that opens directly into the clickable Yes Picks lobby preview.

## Prototype guardrails

- Mobile-first, optimised around an iPhone-sized casino lobby preview.
- Mock data only.
- Denmark-facing examples use DKK.
- Daily Picks is handled as a reward or promotion card, not a normal game tile.
- Slots, table, live and instant games are in scope.
- Crash games are excluded.
- Responsible-gambling guardrails remain visible.
- Hero treatment is reserved for strong player, commercial or event signals.
- Yes Picks is modelled as a horizontal mobile carousel, not a static grid.
- If no signal is strong enough, the lane collapses into a balanced two-row carousel.
