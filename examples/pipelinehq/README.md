# PipelineHQ — Sales CRM for Small Teams

PipelineHQ gives small business sales teams a clear view of every deal — who's working it, what stage it's in, and what needs to happen next. No enterprise bloat, no six-month implementation. Just a pipeline your team will actually use.

## Who It's For

- **Small business owners** managing sales without a dedicated ops team
- **Boutique agencies** tracking proposals across multiple clients
- **Startup sales teams** (2–10 reps) outgrowing spreadsheets
- **Account executives** who need follow-up reminders and activity history in one place

## Key Features

- **Visual Sales Pipeline** — Kanban-style stages from Lead → Qualified → Proposal → Negotiation
- **Deal Cards** — Company, value, owner, and days-in-stage at a glance
- **Pipeline Metrics** — Total pipeline value, deals won, win rate, and average deal size
- **Follow-up Reminders** — This week's calls, emails, and proposals so nothing slips
- **Activity Feed** — See what your team logged — calls, stage changes, deals won
- **Team Leaderboard** — Rep performance by active deals, revenue won, and win rate
- **One-Click Reports** — Export pipeline snapshots for weekly sales reviews

## Why PipelineHQ?

Spreadsheets break the moment you have more than five active deals. Enterprise CRMs cost a fortune and take months to configure. PipelineHQ sits in the middle — built for teams who need to close deals this quarter, not migrate data for six months.

## Tech Stack

- React 18 + Vite 6
- Runs in the browser with demo data — no login or backend required
- Clean, professional CRM UI designed for daily sales workflows

## Quick Start

**1. Navigate to the project**
```bash
cd examples/pipelinehq
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the app**
```bash
npm run dev
```

Keep that terminal open — the server stops when you close it.

Open `http://localhost:5176` to see the sales dashboard.

> **Connection refused?** The dev server isn't running. Run `npm run dev` from `examples/pipelinehq` first and wait for `VITE ready` before opening the URL.

**4. Build for production**
```bash
npm run build
```

## Project Structure

```
examples/pipelinehq/
├── src/
│   ├── App.jsx              # CRM dashboard layout
│   ├── data.js              # Demo deals, metrics, team data
│   └── components/          # Pipeline board, follow-ups, activity
├── README.md                # Product overview (this file)
└── HEYGEN_DEMO.md           # Generate a demo video from this README
```

## Generate a Product Video with HeyGen

PipelineHQ is a **business-oriented HeyGen showcase**. In Cursor Agent mode:

```
Read examples/pipelinehq/README.md and make a 90-second product demo video
explaining what PipelineHQ does and who it's for. Professional B2B sales
energy — confident presenter, clean CRM visuals.
```

See [HEYGEN_DEMO.md](./HEYGEN_DEMO.md) for prompts and tips.

## License

MIT — use it as a template for your own CRM demo or HeyGen integration showcase.
