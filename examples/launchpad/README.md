# LaunchPad — Product Launch Command Center

LaunchPad is a command center for indie hackers and startup teams shipping v1.0 — one dashboard for your launch checklist, readiness score, changelog, and stakeholder updates so nothing falls through the cracks before go-live.

## Who It's For

- **Indie hackers** shipping their first SaaS product
- **Startup founders** coordinating launch across engineering, marketing, and ops
- **Product managers** who need a single source of truth for launch readiness
- **Developer advocates** preparing demos, docs, and release materials

## Key Features

- **Launch Checklist** — Track every pre-launch task with owners, deadlines, and completion status across teams
- **Readiness Score** — Real-time launch readiness based on docs coverage, open issues, beta signups, and checklist progress
- **Changelog Studio** — Draft polished release notes from git commits and milestone history
- **Stakeholder Digest** — Auto-generate weekly launch updates for investors, advisors, and team leads
- **Countdown Dashboard** — Visual launch countdown with metrics that update as you get closer to ship day
- **Export Launch Plan** — One-click export of your full launch plan for sharing with the team

## Why LaunchPad?

Most teams scatter launch prep across Notion docs, Slack threads, and spreadsheets. LaunchPad replaces that chaos with a focused dashboard built specifically for the final stretch before a product launch. You always know what's done, what's blocking, and whether you're actually ready to ship.

## Quick Start

```bash
cd examples/launchpad
npm install
npm run dev
```

Open **http://localhost:5174** to see the LaunchPad dashboard.

```bash
npm run build
```

## Generate a Product Video with HeyGen

This project is designed as a **HeyGen + Cursor showcase**. In a new Cursor Agent chat, paste:

```
Make the LaunchPad demo video from the README.
```

Or the explicit version:

```
Read examples/launchpad/README.md and make a 90-second product demo video
for LaunchPad. Explain what the app does, who it's for, and the key features.
Use a professional tech presenter, landscape format, and SaaS product launch energy.
Poll until the video completes and return the direct MP4 link.
```

Cursor reads this README, structures a script, and HeyGen's Video Agent handles the presenter, scenes, music, and render — all from your editor.

See [HEYGEN_DEMO.md](./HEYGEN_DEMO.md) for one-shot prompts and iteration examples.

## License

MIT — use it as a template for your own launch dashboard or HeyGen integration demos.
