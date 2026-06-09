# HeyGen Demo Guide — README to Product Video

This folder is a **ready-made showcase** for the HeyGen + Cursor integration. The app is real, the README is written for video generation, and you can go from docs to a presenter-led demo in one prompt.

## What This Demonstrates

| Step | Who does it | What happens |
|------|-------------|--------------|
| 1. Product exists | You (or Cursor) | A real app with a polished README |
| 2. Prompt in Cursor | You | Ask Agent to read the README and create a video |
| 3. Script + scenes | Cursor + HeyGen Video Agent | README → structured narration + visuals |
| 4. Render | HeyGen | Presenter-led product demo video |

## Prerequisites

- [HeyGen MCP](https://developers.heygen.com/mcp/cursor) connected in Cursor (OAuth authenticated)
- Cursor Agent mode enabled
- HeyGen plan with Video Agent credits

## One-Shot Prompt (Copy & Paste)

```
Make the LaunchPad demo video from the README.
```

Or with more detail:

```
Read examples/launchpad/README.md and make a 90-second product demo video
for LaunchPad. Explain what the app does, who it's for, and the key features.
Use a professional tech presenter, landscape format, and SaaS product launch energy.
Poll until the video completes and return the direct MP4 link.
```

## What the Video Should Cover

A good demo generated from this README will hit:

1. **Hook** — "Shipping a product launch shouldn't feel like herding cats"
2. **Problem** — Scattered checklists, docs, and stakeholder updates
3. **Solution** — LaunchPad as a single launch command center
4. **Features** — Checklist, readiness score, changelog studio, stakeholder digest
5. **Audience** — Indie hackers, founders, PMs, dev advocates
6. **Setup** — `npm install` → `npm run dev` → dashboard live in seconds
7. **Close** — "Ship v1.0 with confidence"

## Iteration Prompts

After the first render, refine with follow-ups:

```
Make the hook more energetic and emphasize the readiness score feature.
```

```
Add more detail about the stakeholder digest for startup founders.
```

```
Translate the finished video to Spanish with voice cloning.
```

## Verify HeyGen Auth

In Cursor Agent chat:

```
Check my HeyGen account credits with get_current_user.
```

You should see your profile and remaining credits.

## Run the App Locally

While the video generates, preview the actual product:

```bash
cd examples/launchpad
npm install
npm run dev
```

Open http://localhost:5174 — keep the terminal open.

## Tips for Your Own Projects

When writing READMEs meant for HeyGen video generation:

- Lead with a **one-line value prop** (first paragraph)
- Include a **"Who It's For"** section with 3–4 audience bullets
- List **named features** with short descriptions
- Add a **Quick Start** with real commands
- Keep tone **confident and demo-friendly** — you're writing a script, not just docs

## Related

- [HeyGen MCP for Cursor](https://developers.heygen.com/mcp/cursor)
- [HeyGen Video Agent overview](https://developers.heygen.com/mcp/overview)
