# HeyGen + Cursor Integration Showcase Script

**Runtime:** ~2 minutes  
**Format:** Landscape 16:9  
**Tone:** Professional, approachable — developer-friendly but accessible to non-technical stakeholders  
**Example product:** PipelineHQ (B2B sales CRM)

---

## Scene 1 — Hook (0:00–0:12)

**Visual:** Developer at desk, Cursor open, terminal idle.

**Narration:**
> You shipped the product. The README is done. Now marketing wants a demo video — and you're back to scripting, recording, and editing instead of building.

---

## Scene 2 — The old way vs. new way (0:12–0:28)

**Visual:** Split or quick cuts — script doc, camera setup, timeline editor (B-roll) → cut to Cursor chat.

**Narration:**
> Usually that means a separate toolchain. But if you're already in Cursor with HeyGen connected, your README *is* the brief. One prompt. One presenter-led video. No leaving the editor.

---

## Scene 3 — Show the repo (0:28–0:48)

**Visual:** Screen capture — `examples/pipelinehq/README.md` scrolled slowly. Highlight: value prop, Who It's For, Key Features.

**Narration:**
> Take PipelineHQ — a sales CRM showcase in this repo. The README isn't just docs. It's structured like a video script: who it's for, what it does, why it matters, and how to run it. Cursor reads that context directly from your codebase.

**On-screen text:** `examples/pipelinehq/README.md`

---

## Scene 4 — The prompt (0:48–1:02)

**Visual:** Cursor Agent chat. Paste and send:

```
Read examples/pipelinehq/README.md and make a 90-second product demo video.
Professional B2B sales energy — confident presenter, clean CRM visuals.
```

**Narration:**
> In Agent mode, you describe what you want in plain English. Cursor calls HeyGen's Video Agent — which handles scripting, presenter selection, scene composition, music, and render.

---

## Scene 5 — What happens behind the scenes (1:02–1:22)

**Visual:** HeyGen session progress / blueprint / scene generation (app.heygen.com or session status).

**Narration:**
> HeyGen plans the scenes from your README, picks a presenter and voice, generates visuals for the pipeline board and metrics, assembles the timeline, and renders the final MP4. You authenticate once with OAuth — no API keys in chat. It runs on your existing HeyGen plan credits.

**On-screen bullets:**
- Blueprint & scenes
- Presenter + voice
- B-roll & music
- Final MP4 + captions

---

## Scene 6 — Play the result (1:22–1:48)

**Visual:** 20–25 seconds of the finished PipelineHQ product demo (hook → features → close).

**Narration:**
> And out comes a real product demo — not a placeholder. Pipeline value, deal stages, follow-ups, team leaderboard. Ninety seconds of presenter-led B2B content, generated from markdown in your repo.

---

## Scene 7 — Iterate in chat (1:48–2:02)

**Visual:** Cursor follow-up prompts appearing on screen.

**Narration:**
> Didn't love the hook? Say so. Want more time on the pipeline board? Say that too. You can even translate the finished video into other languages with voice cloning and lip-sync. It's a workflow, not a one-shot.

**On-screen prompts:**
- "Make the hook more emotional"
- "Emphasize the pipeline board"
- "Translate to Spanish"

---

## Scene 8 — Close (2:02–2:15)

**Visual:** Cursor + HeyGen logos side by side, or return to PipelineHQ dashboard running at localhost:5176.

**Narration:**
> README in your repo. Product video out of your editor. That's the HeyGen and Cursor integration — and PipelineHQ is just one example. Pick a showcase, paste a prompt, and ship the video.

**CTA on-screen:**
- `cd examples/pipelinehq && npm run dev`
- `Read README.md → make a 90-second demo video`

---

## HeyGen prompt — Meta integration video (copy-paste)

Use this to generate the 2-minute showcase video itself:

```
Create a 2-minute showcase video explaining the HeyGen + Cursor integration.

STRUCTURE:
[0:00-0:12] Hook — developers need demo videos but hate leaving their editor
[0:12-0:28] Old way (script, record, edit) vs new way (README in repo → one prompt → video)
[0:28-0:48] Show PipelineHQ README as a video-ready brief (audience, features, why)
[0:48-1:02] The Cursor Agent prompt that triggers HeyGen Video Agent
[1:02-1:22] What HeyGen does: blueprint, presenter, scenes, music, render, OAuth auth
[1:22-1:48] Show the finished PipelineHQ product demo as proof of output quality
[1:48-2:02] Iteration: refine hook, emphasize features, translate to other languages
[2:02-2:15] Close: README in repo, video out of editor. CTA to try examples/pipelinehq.

TONE: Professional but approachable. Developer-friendly. Landscape 16:9.
Use a confident tech presenter. Include B-roll of code editors, README docs, and CRM dashboards.
Do NOT make it feel like an ad for HeyGen — focus on the workflow value.
```

---

## HeyGen prompt — PipelineHQ product demo (copy-paste)

```
Read examples/pipelinehq/README.md and make a 90-second product demo video
for PipelineHQ. Explain what it does, who it's for, and the key features.
Professional B2B sales energy — confident presenter, clean CRM dashboard visuals.
Landscape format.
```

---

## Recording checklist

- [ ] HeyGen MCP authenticated in Cursor
- [ ] `examples/pipelinehq` runs at http://localhost:5176
- [x] PipelineHQ product demo pre-rendered (asset for Scene 6)
- [ ] Screen recordings: README scroll, Cursor prompt, HeyGen session page
- [ ] Optional: live generation clip (5–10 min wait — use as timelapse or cut)

## Showcase examples in this repo

| Example | Port | Audience |
|---------|------|----------|
| PipelineHQ | 5176 | B2B sales teams |
| PlantPal | 5175 | Lifestyle / plant parents |
| LaunchPad | 5174 | SaaS / product launches |
