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

## LaunchPad — Product Launch Command Center

**Product:** Dark-mode SaaS dashboard for shipping v1.0 — checklist, readiness score, changelog, stakeholder updates  
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

### More prompts

See [examples/launchpad/HEYGEN_DEMO.md](examples/launchpad/HEYGEN_DEMO.md) for iteration examples and tips.
