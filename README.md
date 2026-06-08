# Claude Companion — Johnny Joestar Desktop Pet

A Tauri v2 + React desktop companion app featuring Johnny Joestar from JoJo's Bizarre Adventure Part 7. He walks across the bottom of your screen, reacts to what you're doing, and chats with you via Claude AI.

## Features

- Animated sprite walking across your desktop
- Click Johnny to open a Claude AI chat window
- Right-click for the context menu:
  - Wake/sleep toggle
  - Hide for 5 minutes
  - Peek at Screen (Johnny comments on what's on your screen)
  - Start with Windows toggle
  - Watch My Screen toggle (passive screen awareness every 10 min)
- Drag Johnny anywhere on screen
- Speech bubbles with idle commentary

## Requirements

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://rustup.rs/)
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/jeremiamelendez-Unashamed/claudecompanion.git
cd claudecompanion
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your API key**

Create a `.env` file in the root folder:
```
VITE_ANTHROPIC_API_KEY=your-api-key-here
```

**4. Run in dev mode**
```bash
npx tauri dev
```

## Production Build

To build an installable `.exe`:
```bash
npx tauri build
```

Installer will be output to:
```
src-tauri/target/release/bundle/nsis/Johnny Pet_0.1.0_x64-setup.exe
```

## Returning to the Project

If you're picking this back up after closing the terminal, just run:
```bash
npx tauri dev
```

If the port is already in use from a previous session:
```bash
npx kill-port 1420 && npx tauri dev
```

## HeyGen + Cursor Showcase

**[PlantPal](./examples/plantpal/)** is a lifestyle product example for the README → product video workflow — houseplant care, not code launches. Real React app, video-optimized README, copy-paste HeyGen prompts.

```bash
cd examples/plantpal && npm install && npm run dev
```

Open `http://localhost:5175`, then in Cursor Agent mode:

```
Read examples/plantpal/README.md and make a 90-second product demo video.
```

See [examples/plantpal/HEYGEN_DEMO.md](./examples/plantpal/HEYGEN_DEMO.md) for the full walkthrough.
