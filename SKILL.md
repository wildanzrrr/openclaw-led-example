# SKILLS.md — LED Control Dashboard

> This document is intended for AI agents, automation systems, and bots.

## Purpose

This application simulates an RGB LED. Agents can control the LED state through simple HTTP requests. The visual display updates immediately in any open browser window.

Default URL: `http://localhost:5173` (dev) or `http://localhost:3000` (production/Docker)

---

## Available States

| State   | Effect                         |
| ------- | ------------------------------ |
| `OFF`   | LED appears dark gray, no glow |
| `RED`   | LED glows bright red           |
| `GREEN` | LED glows bright green         |
| `BLUE`  | LED glows bright blue          |

---

## Read Current State

**GET /api/state**

```bash
curl http://localhost:5173/api/state
```

Response:

```json
{
  "state": "GREEN"
}
```

---

## Change State

**POST /api/state**

Body: `{ "state": "<STATE>" }`

### Turn RED

```bash
curl -X POST http://localhost:5173/api/state \
  -H "Content-Type: application/json" \
  -d '{"state":"RED"}'
```

### Turn GREEN

```bash
curl -X POST http://localhost:5173/api/state \
  -H "Content-Type: application/json" \
  -d '{"state":"GREEN"}'
```

### Turn BLUE

```bash
curl -X POST http://localhost:5173/api/state \
  -H "Content-Type: application/json" \
  -d '{"state":"BLUE"}'
```

### Turn OFF

```bash
curl -X POST http://localhost:5173/api/state \
  -H "Content-Type: application/json" \
  -d '{"state":"OFF"}'
```

### Success response

```json
{
  "success": true,
  "state": "RED"
}
```

### Error response (invalid state)

```json
{
  "error": "Invalid state. Must be one of: OFF, RED, GREEN, BLUE"
}
```

---

## State Mapping

Convert natural language commands to LED states:

| Natural language             | API state |
| ---------------------------- | --------- |
| red, turn red, set red       | `RED`     |
| green, turn green, set green | `GREEN`   |
| blue, turn blue, set blue    | `BLUE`    |
| off, turn off, disable       | `OFF`     |

---

## Typical Agent Workflow

1. Receive command (e.g., from Telegram, webhook, or automation)
2. Map command to a valid state: `RED`, `GREEN`, `BLUE`, or `OFF`
3. Call `POST /api/state` with the mapped state
4. Verify by calling `GET /api/state`
5. Confirm the returned state matches what was set

### Example

```
User: "turn led red"
        ↓
Agent: POST /api/state  {"state":"RED"}
        ↓
Agent: GET  /api/state  → {"state":"RED"}
        ↓
Agent: Confirm state = RED ✓
```

---

## Success Criteria

After calling the API:

- ✅ Visual LED updates immediately in the browser
- ✅ `GET /api/state` returns the new value
- ✅ UI status panel reflects current state
- ✅ Timestamp updates to current time

---

## Notes for Agents

- All state values are **uppercase strings** (`"RED"`, not `"red"`)
- `Content-Type: application/json` header is **required** for POST requests
- CORS is open (`*`) — requests from any origin are allowed
- State is held **in memory** — resets to `OFF` on server restart
- The browser polls the API every 1 second automatically
