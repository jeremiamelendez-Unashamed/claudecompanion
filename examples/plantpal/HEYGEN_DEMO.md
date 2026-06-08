# HeyGen Demo Guide — PlantPal

PlantPal is the **lifestyle counterpart** to LaunchPad in this repo's HeyGen showcase collection. Same workflow — README in the repo, one prompt in Cursor, presenter-led video out — but the product is about **houseplants**, not shipping code.

## Why This Example?

| LaunchPad | PlantPal |
|-----------|----------|
| SaaS / dev audience | Lifestyle / home audience |
| Dark dashboard aesthetic | Warm botanical UI |
| Launch readiness metrics | Watering schedules & plant health |
| "Ship with confidence" | "Keep every leaf happy" |

Both prove the same point: **any product with a good README can become a video.**

## One-Shot Prompt

```
Read examples/plantpal/README.md and make a 90-second product demo video
for PlantPal. Explain what it does, who it's for, and the key features.
Use a warm, friendly presenter — lifestyle app energy, not a tech keynote.
Landscape format.
```

## What a Good Video Covers

1. **Hook** — "Ever killed a plant because you forgot to water it?"
2. **Problem** — Scattered reminders, guessing schedules, no health visibility
3. **Solution** — PlantPal as your calm daily care companion
4. **Features** — Garden view, watering schedule, daily tasks, health tracking, care tips
5. **Audience** — New plant parents, apartment gardeners, busy professionals
6. **Close** — "Your plants deserve better than guesswork"

## Run the App

```bash
cd examples/plantpal
npm install
npm run dev
```

Open **http://localhost:5175**

## Iteration Prompts

```
Make the opening hook more emotional — focus on plant guilt.
```

```
Emphasize the daily care task list for busy professionals.
```

```
Translate the finished video to French with voice cloning.
```

## README Tips for Non-Dev Products

- Lead with an **emotional problem** (forgetting to water, plant guilt)
- Use **human language** — rooms, nicknames, routines — not jargon
- Name features like a user would ("Today's Care", not "Task CRUD")
- Keep Quick Start simple; dev setup is secondary for the video

## Related

- [LaunchPad showcase](../launchpad/) — dev/SaaS-style example
- [HeyGen MCP for Cursor](https://developers.heygen.com/mcp/cursor)
