# PlantPal — Houseplant Care Companion

PlantPal helps indoor gardeners remember when to water, mist, and rotate their plants — and understand whether each one is actually thriving. It turns scattered sticky notes and guesswork into a calm, visual care routine for your home jungle.

## Who It's For

- **New plant parents** who aren't sure when to water
- **Apartment dwellers** juggling plants across multiple rooms
- **Busy professionals** who want reminders without another complicated app
- **Plant enthusiasts** tracking health, light needs, and care history for dozens of pots

## Key Features

- **My Garden** — A visual collection of every plant with nickname, species, room, and health score
- **Smart Watering Schedule** — Per-plant watering cadence based on species, pot size, and season
- **Daily Care Tasks** — A simple today view: water, mist, rotate, wipe leaves
- **Health Tracking** — Spot struggling plants before yellow leaves spread
- **Room & Light Guide** — Track light conditions and match them to each plant's needs
- **Care Tips** — Personalized suggestions based on your collection and environment
- **Care Journal** — Log what you did and when, so patterns emerge over time

## Why PlantPal?

Most plant apps feel like spreadsheets or social networks. PlantPal is different — it's a quiet companion for the routines that keep plants alive. Open it in the morning, see what needs care today, and get back to your day knowing Monty the Monstera won't go thirsty for another week.

## Tech Stack

- React 18 + Vite 6
- Runs in the browser with demo data — no account or backend required
- Warm, botanical UI designed for calm daily use

## Quick Start

**1. Navigate to the project**
```bash
cd examples/plantpal
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the app**
```bash
npm run dev
```

Open `http://localhost:5175` to see your garden dashboard.

**4. Build for production**
```bash
npm run build
```

## Project Structure

```
examples/plantpal/
├── src/
│   ├── App.jsx              # Main garden dashboard
│   ├── data.js              # Demo plants, tasks, tips
│   └── components/          # Plant cards, tasks, schedule
├── README.md                # Product overview (this file)
└── HEYGEN_DEMO.md           # Generate a demo video from this README
```

## Generate a Product Video with HeyGen

PlantPal is a **HeyGen + Cursor showcase** for non-technical products. In Cursor Agent mode:

```
Read examples/plantpal/README.md and make a 90-second product demo video
explaining what PlantPal does and who it's for. Warm, friendly tone — like
a lifestyle app launch, not a developer tool.
```

See [HEYGEN_DEMO.md](./HEYGEN_DEMO.md) for prompts and tips.

## License

MIT — remix it for your own plant app, wellness product, or HeyGen integration demos.
