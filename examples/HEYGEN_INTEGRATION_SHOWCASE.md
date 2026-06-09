# HeyGen + Cursor Integration Showcase Script

**Runtime:** ~2 minutes  
**Format:** Landscape 16:9  
**Tone:** High-energy SaaS / startup launch — confident, fast-paced, builder-friendly  
**Example product:** LaunchPad (product launch command center)

---

## Scene 1 — Hook (0:00–0:12)

**Visual:** Founder at desk, Cursor open, launch checklist scattered across Notion + Slack.

**Narration:**
> Launch day is in two weeks. The product is ready — but the demo video, the stakeholder update, and the launch checklist are still spread across five different tools.

---

## Scene 2 — The old way vs. new way (0:12–0:28)

**Visual:** Script doc, camera, timeline editor → cut to Cursor chat with README open.

**Narration:**
> You shouldn't need a video team to ship a launch. If you're already in Cursor with HeyGen connected, your README is the brief. One prompt. One presenter-led product video. Without leaving your editor.

---

## Scene 3 — Show the repo (0:28–0:48)

**Visual:** Screen capture — `examples/launchpad/README.md`. Highlight: value prop, Who It's For, Key Features.

**Narration:**
> Take LaunchPad — a product launch command center in this repo. The README is structured like a video script: indie hackers, startup founders, launch checklist, readiness score, stakeholder digest. Cursor reads it straight from your codebase.

**On-screen text:** `examples/launchpad/README.md`

---

## Scene 4 — The prompt (0:48–1:02)

**Visual:** Cursor Agent chat. Paste and send:

```
Read examples/launchpad/README.md and make a 90-second product demo video.
High-energy SaaS launch tone — confident presenter, dark-mode dashboard visuals.
```

**Narration:**
> In Agent mode, describe what you want in plain English. Cursor calls HeyGen's Video Agent — scripting, presenter, scenes, music, render. All handled.

---

## Scene 5 — What happens behind the scenes (1:02–1:22)

**Visual:** HeyGen session progress / blueprint / scene generation.

**Narration:**
> HeyGen plans scenes from your README, picks a presenter and voice, generates visuals for the launch dashboard — checklist, metrics, countdown — assembles the timeline, and renders the MP4. OAuth auth, no API keys in chat. Your HeyGen plan credits.

**On-screen bullets:**
- Blueprint & scenes
- Presenter + voice
- B-roll & music
- Final MP4 + captions

---

## Scene 6 — Play the result (1:22–1:48)

**Visual:** 20–25 seconds of the finished LaunchPad product demo (hook → features → close).

**Narration:**
> And out comes a real launch demo — not a placeholder. Readiness score, launch checklist, changelog studio, stakeholder digest. Ninety seconds of high-energy SaaS content, generated from markdown in your repo.

---

## Scene 7 — Iterate in chat (1:48–2:02)

**Visual:** Cursor follow-up prompts on screen.

**Narration:**
> Want more startup energy? Say so. Need more time on the readiness score? Just ask. Translate the finished video into other languages with voice cloning. It's a repeatable launch workflow.

**On-screen prompts:**
- "Make the hook more urgent — launch is in 7 days"
- "Emphasize the readiness score feature"
- "Translate to Spanish"

---

## Scene 8 — Close (2:02–2:15)

**Visual:** LaunchPad dashboard at localhost:5174 or Cursor + HeyGen side by side.

**Narration:**
> README in your repo. Launch video out of your editor. That's HeyGen and Cursor — and LaunchPad is the showcase. Paste a prompt. Ship the video. Ship the product.

**CTA on-screen:**
- `cd examples/launchpad && npm run dev`
- `Read README.md → make a 90-second demo video`

---

## HeyGen prompt — Meta integration video (copy-paste)

```
Create a 2-minute showcase video explaining the HeyGen + Cursor integration.

STRUCTURE:
[0:00-0:12] Hook — launch is close, demo video still doesn't exist, you're a builder not a video editor
[0:12-0:28] Old way (script, record, edit) vs README in repo + one Cursor prompt + video out
[0:28-0:48] Show LaunchPad README as video-ready brief — startup founders, launch checklist, readiness score
[0:48-1:02] The Cursor Agent prompt that triggers HeyGen Video Agent
[1:02-1:22] What HeyGen does: blueprint, presenter, scenes, music, render, OAuth
[1:22-1:48] Show finished LaunchPad product demo — launch dashboard, metrics, checklist
[1:48-2:02] Iteration: more energy, emphasize features, translate
[2:02-2:15] Close: README in repo, launch video out of editor. Try examples/launchpad.

TONE: High-energy SaaS startup launch. Confident tech presenter. Landscape 16:9.
B-roll: code editors, README docs, dark-mode launch dashboards.
Focus on workflow value for founders and builders.
```

---

## HeyGen prompt — LaunchPad product demo (copy-paste)

```
Read examples/launchpad/README.md and make a 90-second product demo video
for LaunchPad. Explain what it does, who it's for, and the key features.
High-energy SaaS product launch tone — confident presenter, dark-mode dashboard
visuals, startup founder energy. Landscape format.
```

---

## Generated assets

| Video | Duration | Watch |
|-------|----------|-------|
| **HeyGen + Cursor integration showcase** | TBD | _generating…_ |
| **LaunchPad product demo** | TBD | _generating…_ |

---

## Recording checklist

- [x] HeyGen MCP authenticated in Cursor
- [ ] `examples/launchpad` runs at http://localhost:5174
- [ ] LaunchPad product demo pre-rendered (asset for Scene 6)
- [ ] Screen recordings: README scroll, Cursor prompt, HeyGen session page

## Showcase examples in this repo

| Example | Port | Audience | Best demo vibe |
|---------|------|----------|----------------|
| **LaunchPad** | 5174 | SaaS / startup launches | High-energy builder |
| PipelineHQ | 5176 | B2B sales teams | Professional CRM |
| PlantPal | 5175 | Lifestyle / plant parents | Warm, emotional |
