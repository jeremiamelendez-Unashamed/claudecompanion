# LaunchPad — Product Launch Command Center

LaunchPad is a lightweight command center for indie developers and startup teams who are shipping their next big release. It brings your launch checklist, readiness score, changelog, and stakeholder updates into one beautiful dashboard — so nothing falls through the cracks before go-live.

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

## Tech Stack

- React 18 + Vite 6
- Zero backend required — runs entirely in the browser with demo data
- Modern dark-mode SaaS UI with responsive layout

## Quick Start

**1. Navigate to the project**
```bash
cd examples/launchpad
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the dev server**
```bash
npm run dev
```

Open `http://localhost:5174` to see the LaunchPad dashboard.

**4. Build for production**
```bash
npm run build
```

## Project Structure

```
examples/launchpad/
├── src/
│   ├── App.jsx              # Main dashboard layout
│   ├── data.js              # Demo metrics, checklist, changelog
│   └── components/          # Metric cards, checklist, timeline
├── README.md                # Product overview (this file)
└── HEYGEN_DEMO.md           # Guide for generating a demo video
```

## Generate a Product Demo Video with HeyGen

This project is designed as a **HeyGen + Cursor showcase**. In Cursor Agent mode, paste:

```
Read examples/launchpad/README.md and make a 90-second product demo video
explaining what LaunchPad does and who it's for.
```

Cursor reads the README, structures a script, and HeyGen's Video Agent handles the presenter, scenes, music, and render — all from your editor.

See [HEYGEN_DEMO.md](./HEYGEN_DEMO.md) for the full walkthrough.

## License

MIT — use it as a template for your own launch dashboard or HeyGen integration demos.
