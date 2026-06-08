# HeyGen Demo Guide — PipelineHQ

PipelineHQ is the **business-oriented** example in this repo's HeyGen showcase collection — sales CRM for small teams, not lifestyle apps or dev launch tools.

## Showcase lineup

| Example | Domain | Vibe |
|---------|--------|------|
| **PipelineHQ** | B2B sales CRM | Professional, revenue-focused |
| PlantPal | Houseplant care | Warm, lifestyle |
| LaunchPad | Product launches | SaaS / dev-adjacent |

## One-Shot Prompt

```
Read examples/pipelinehq/README.md and make a 90-second product demo video
for PipelineHQ. Explain what it does, who it's for, and the key features.
Professional B2B sales energy — confident presenter, clean CRM dashboard visuals.
Landscape format.
```

## What a Good Video Covers

1. **Hook** — "Your sales pipeline shouldn't live in a spreadsheet"
2. **Problem** — Missed follow-ups, no visibility, enterprise CRM overkill
3. **Solution** — PipelineHQ for small teams who need to close deals now
4. **Features** — Pipeline board, deal cards, metrics, follow-ups, team leaderboard
5. **Audience** — Small business owners, agencies, startup sales teams
6. **Close** — "Close more deals. Miss fewer follow-ups."

## Run the App

```bash
cd examples/pipelinehq
npm install
npm run dev
```

Open **http://localhost:5176**

## Iteration Prompts

```
Open with a stronger pain point about lost deals from missed follow-ups.
```

```
Spend more time on the visual pipeline board and deal stages.
```

```
Add a scene about the team leaderboard for sales managers.
```

## README Tips for B2B Products

- Lead with a **business outcome** (close deals, miss fewer follow-ups)
- Name features in **sales language** (pipeline, win rate, follow-ups)
- Include concrete **metrics** in the README ($284K pipeline, 34% win rate) — Video Agent will use them
- Audience = job titles (owners, AEs, sales managers), not hobbies

## Related

- [PlantPal showcase](../plantpal/) — lifestyle example
- [HeyGen MCP for Cursor](https://developers.heygen.com/mcp/cursor)
