# HeyGen Showcase — New Chat Quick Start

Use this repo to demo **README → product video** with HeyGen in Cursor. Open a **new Agent chat**, paste a prompt below, and go.

## One-time setup (do this once)

1. **HeyGen MCP** — Cursor Settings → MCP → add [HeyGen](https://developers.heygen.com/mcp/cursor) → sign in with OAuth
2. **Verify auth** — in any Agent chat:
   ```
   Check my HeyGen credits with get_current_user
   ```

That's it. Auth persists across new chats.

---

## Default SaaS demo — LaunchPad

**Product:** Product launch command center (dark-mode dashboard, startup energy)  
**Run locally:** `cd examples/launchpad && npm install && npm run dev` → http://localhost:5174

### New chat prompt (copy & paste)

```
Make the LaunchPad demo video from the README.
```

Or the explicit version:

```
Read examples/launchpad/README.md and make a 90-second product demo video.
High-energy SaaS launch tone — confident presenter, landscape format.
Verify HeyGen auth, poll until the video completes, and give me the direct MP4 link.
```

### After the video renders

```
Make the hook more energetic and emphasize the readiness score.
```

```
Translate the finished LaunchPad video to Spanish with voice cloning.
```

---

## Other showcase products

| Say this in a new chat | Product | Local URL |
|------------------------|---------|-----------|
| `Make the LaunchPad demo video` | SaaS launch dashboard | :5174 |
| `Make the PipelineHQ demo video` | B2B sales CRM | :5176 |
| `Make the PlantPal demo video` | Houseplant care app | :5175 |
| `Make the HeyGen integration showcase video` | Meta README→video demo | — |

Each example lives under `examples/<name>/` with its own `README.md` and `HEYGEN_DEMO.md`.

---

## Integration showcase (full workflow demo)

For a video that explains the HeyGen + Cursor integration itself:

```
Read examples/HEYGEN_INTEGRATION_SHOWCASE.md and create the integration
showcase video using LaunchPad as the example. ~2 minutes, builder-friendly tone.
```

Script and pre-rendered reference videos: `examples/HEYGEN_INTEGRATION_SHOWCASE.md`

---

## What the agent will do

1. Read the product README in this repo
2. Call HeyGen Video Agent via MCP (`create_video_agent`)
3. Wait for render (`get_video`)
4. Return a **direct MP4 link** you can open without logging in

> **Tip:** `app.heygen.com/videos/...` links only work when logged into HeyGen. The agent should give you a direct `resource2.heygen.ai` MP4 URL instead.

---

## Cursor rule (automatic)

This repo includes `.cursor/rules/heygen-video-showcase.mdc` so Agent mode knows the workflow when you mention demo videos, HeyGen, or LaunchPad — even in a fresh chat.
