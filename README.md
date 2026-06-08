# Virtual RGB LED — Control Dashboard

A lightweight web application that simulates an RGB LED and exposes an HTTP API for external control. Built with **Vite + React + TypeScript**.

> Perfect for classroom demos: Telegram → OpenClaw → HTTP API → Virtual LED

---

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production

```bash
npm run build
npm start
```

Server runs on [http://localhost:3000](http://localhost:3000).

---

## API

### Get current state

```bash
curl http://localhost:5173/api/state
```

Response:
```json
{ "state": "OFF" }
```

### Set state

```bash
curl -X POST http://localhost:5173/api/state \
  -H "Content-Type: application/json" \
  -d '{"state":"RED"}'
```

Valid states: `OFF`, `RED`, `GREEN`, `BLUE`

Response:
```json
{ "success": true, "state": "RED" }
```

---

## Docker

### Using Docker Compose (recommended)

```bash
docker-compose up --build
```

Access at [http://localhost:5173](http://localhost:5173) (host port mapped from container port 3000).

### Manual Docker

```bash
docker build -t led-control .
docker run -p 5173:3000 led-control
```

---

## Architecture

```
External Agent (curl / Arduino / Telegram bot)
        │
        ▼  POST /api/state
 ┌──────────────────────┐
 │  Vite dev middleware  │  ← dev mode (npm run dev)
 │  Express server       │  ← prod mode (npm start / Docker)
 └──────────────────────┘
        │  in-memory state update
        ▼
 Browser polls GET /api/state every 1s
        │
        ▼
 Zustand store → React re-render → LED glows
```

- **Dev mode**: API handled by a Vite plugin (`configureServer` hook)
- **Prod mode**: Express serves the built `dist/` and the same API routes
- **State sync**: Browser polls `/api/state` every second — no WebSocket needed

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with API (port 5173) |
| `npm run build` | Build frontend for production |
| `npm start` | Run Express production server (port 3000) |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
led-control/
├── server/
│   └── index.ts          # Express server (production)
├── src/
│   ├── components/
│   │   ├── LED.tsx        # CSS-only LED bulb component
│   │   ├── StatusPanel.tsx
│   │   └── Controls.tsx
│   ├── hooks/
│   │   └── useApiSync.ts  # 1s polling hook
│   ├── store/
│   │   └── ledStore.ts    # Zustand state
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── Dockerfile
├── docker-compose.yml
├── SKILLS.md              # AI agent integration guide
└── vite.config.ts         # Vite + API plugin (dev)
```
